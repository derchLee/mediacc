const assert = require('node:assert/strict');
const { processVideo } = require('../public/video-engine.js');
async function run() {
 const commands=[]; const files=new Map(); let failures=0;
 const ff={on(){},off(){},async writeFile(n,d){files.set(n,d)},async deleteFile(n){files.delete(n)},async exec(args){commands.push(args); if(failures-->0)return 1;files.set(args.at(-1),new Uint8Array([1,2]));return 0},async readFile(n){return files.get(n)}};
 const task=(extra={})=>processVideo(ff,{fileData:new ArrayBuffer(4),fileName:'clip.mp4',targetFormat:'mp4',...extra});
 await task(); assert(commands[0].includes('copy')); assert.equal(files.size,0);
 commands.length=0; failures=1; await task(); assert.equal(commands.length,2); assert(commands[1].includes('libx264')); assert(commands[1].includes('superfast'));  assert(!commands[1].some(x=>String(x).includes('scale='))); assert(!commands[1].includes('-r'));
 commands.length=0; failures=1; await task({targetFormat:'webm'}); assert(commands.at(-1).includes('libvpx')); assert(commands.at(-1).includes('libvorbis'));
 commands.length=0; await task({operation:'compress',mode:'lossless'}); assert(commands[0].includes('copy'));
 failures=2; await assert.rejects(task(),/failed/i); assert.equal(files.size,0);
 console.log('PASS: remux, fallback, WebM codecs, source quality, failure cleanup');
}
run().catch(e=>{console.error(e);process.exitCode=1});

