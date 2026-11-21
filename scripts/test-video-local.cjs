const fs=require('fs'),path=require('path'),os=require('os'),http=require('http'),{spawn}=require('child_process');
const sample=Number(process.env.VIDEO_SAMPLE_SECONDS || 0); const preset=process.env.VIDEO_PRESET;
const inputs=process.argv.slice(2); if(!inputs.length)throw Error('Provide videos');
const results=[]; const root=path.resolve(__dirname,'..');
const html=`<script src="/ffmpeg/ffmpeg.js"></script><script src="/video-engine.js"></script><script>
window.statusResult={stage:'starting'};
(async()=>{
 const ff=new FFmpegWASM.FFmpeg(); await ff.load({coreURL:location.origin+'/ffmpeg/ffmpeg-core.js',wasmURL:location.origin+'/ffmpeg/ffmpeg-core.wasm'});
 if (${sample}>0) { const exec=ff.exec.bind(ff); ff.exec=args=>exec(['-t',String(${sample}),...args]); }
 const meta=blob=>new Promise((resolve,reject)=>{const v=document.createElement('video');const url=URL.createObjectURL(blob);v.preload='auto';v.src=url;v.onloadeddata=()=>{resolve({width:v.videoWidth,height:v.videoHeight,duration:v.duration});URL.revokeObjectURL(url);v.removeAttribute('src');v.load()};v.onerror=()=>{URL.revokeObjectURL(url);reject(Error('Browser decode failed'))}});
 for(let i=0;i<${inputs.length};i++){
 const source=await(await fetch('/input/'+i)).arrayBuffer(); const original=await meta(new Blob([source],{type:'video/mp4'}));
 for(const operation of ${sample} > 0 ? ['compress'] : ['convert','lossless','compress']){
 window.statusResult={stage:'running',file:i,operation,progress:0};const start=performance.now();
 try{
 const bytes=await processVideo(ff,{fileData:source.slice(0),fileName:'clip.mp4',targetFormat:'mov',operation:operation==='convert'?'convert':'compress',mode:operation==='lossless'?'lossless':'lossy'},progress=>window.statusResult.progress=progress);
 const elapsed=(performance.now()-start)/1000;const output=await meta(new Blob([bytes],{type:operation==='convert'?'video/quicktime':'video/mp4'}));
 const row={file:i,operation,inputBytes:source.byteLength,outputBytes:bytes.length,seconds:elapsed,original,output};
 await fetch('/result',{method:'POST',body:JSON.stringify(row)});
 }catch(e){await fetch('/result',{method:'POST',body:JSON.stringify({file:i,operation,error:String(e)})})}
 }
 }
 ff.terminate();window.statusResult={stage:'done'};
})().catch(e=>window.statusResult={stage:'error',error:String(e)});
</script>`;
const server=http.createServer((req,res)=>{
 if(req.url==='/'){res.setHeader('Content-Type','text/html');return res.end(html)}
 if(req.url==='/result'){let body='';req.on('data',c=>body+=c);req.on('end',()=>{const row=JSON.parse(body);results.push(row);fs.writeFileSync(path.join(root,sample ? 'video-benchmark-' + preset + '.json' : 'video-test-results.json'),JSON.stringify({inputs,results},null,2));console.log(JSON.stringify(row));res.end('ok')});return}
 if(req.url==='/video-engine.js' && preset){res.setHeader('Content-Type','text/javascript');return res.end(fs.readFileSync(path.join(root,'public/video-engine.js'),'utf8').replace(/'superfast'|'veryfast'/g,JSON.stringify(preset)))}
 let file;if(req.url.startsWith('/input/'))file=inputs[Number(req.url.split('/').pop())];else file=path.join(root,'public',req.url);
 if(!file||!fs.existsSync(file)){res.statusCode=404;return res.end()}
 res.setHeader('Content-Type',file.endsWith('.wasm')?'application/wasm':file.endsWith('.js')?'text/javascript':'video/mp4');fs.createReadStream(file).pipe(res);
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const profile=fs.mkdtempSync(path.join(os.tmpdir(),'mediakit-video-'));let child,socket;
 try{
 child=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--no-first-run','--no-default-browser-check','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{windowsHide:true,stdio:'ignore'});
 const pause=ms=>new Promise(r=>setTimeout(r,ms));const active=path.join(profile,'DevToolsActivePort');while(!fs.existsSync(active))await pause(100);
 const [port,endpoint]=fs.readFileSync(active,'utf8').trim().split(/\r?\n/);socket=new WebSocket('ws://127.0.0.1:'+port+endpoint);await new Promise(r=>socket.onopen=r);let id=0;const pending=new Map();socket.onmessage=e=>{const m=JSON.parse(e.data);if(pending.has(m.id)){pending.get(m.id)(m.result);pending.delete(m.id)}};const send=(method,params={},sessionId)=>new Promise(r=>{pending.set(++id,r);socket.send(JSON.stringify({id,method,params,sessionId}))});
 const {targetId}=await send('Target.createTarget',{url:'about:blank'});const {sessionId}=await send('Target.attachToTarget',{targetId,flatten:true});await send('Page.navigate',{url:'http://127.0.0.1:'+server.address().port},sessionId);
 while(true){await pause(5000);const r=await send('Runtime.evaluate',{expression:'window.statusResult',returnByValue:true},sessionId);const state=r?.result?.value;console.log('STATUS',JSON.stringify(state));if(state?.stage==='done')break;if(state?.stage==='error')throw Error(state.error)}
 }finally{if(socket?.readyState===1){socket.send(JSON.stringify({id:999999,method:'Browser.close'}));socket.close()}if(child)child.kill();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
