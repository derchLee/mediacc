(function (root) {
  async function processVideo(ff, task, progress = () => {}) {
    const format = (task.operation === 'compress' ? task.fileName.split('.').pop() : task.targetFormat).toLowerCase();
    const mux = {mkv:'matroska',wmv:'asf'}[format] || format;
    if (!['mp4','mov','avi','webm','mkv','wmv','flv'].includes(format)) throw new Error('Unsupported video format');
    const input = 'input.media', output = 'output.' + format;
    const logs = [];
    const logger = ({message}) => { logs.push(message); if(logs.length > 20) logs.shift(); };
    let maximum = 0;
    const handler = ({progress: value}) => { if(Number.isFinite(value)) { maximum = Math.max(maximum, Math.max(0, Math.min(98, value * 96 + 2))); progress(maximum); } };
    ff.on('log', logger); ff.on('progress', handler);
    const base = ['-y','-i',input,'-map','0:v:0','-map','0:a:0?','-sn','-dn'];
    const finish = ['-f',mux,output];
    const mov = ['mp4','mov'].includes(format) ? ['-movflags','+faststart'] : [];
    try {
      progress(1);
      await ff.writeFile(input, new Uint8Array(task.fileData));
      progress(2);
      let ok = false;
      // Changing a container needs no decoding. A failed mux falls back to encoding.
      if (task.operation !== 'compress' || task.mode === 'lossless') {
        ok = await ff.exec([...base,'-c','copy',...mov,...finish]) === 0;
        if (!ok) { try { await ff.deleteFile(output); } catch {} }
      }
      if (!ok) {
        if(task.operation === 'compress' && task.mode === 'lossless') throw new Error('Lossless remux failed: ' + logs.join('\n'));
        const quality = task.operation === 'compress' ? '26' : '20';
        const codecs = format === 'webm'
          ? ['-c:v','libvpx','-deadline','realtime','-cpu-used','4','-crf',quality,'-b:v','0','-c:a','libvorbis','-q:a','4']
          : format === 'wmv'
          ? ['-c:v','wmv2','-q:v','3','-c:a','wmav2','-b:a','192k']
          : ['-c:v','libx264','-preset','superfast','-crf',quality,'-vf','pad=ceil(iw/2)*2:ceil(ih/2)*2','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k'];
        if (await ff.exec([...base,...codecs,...mov,...finish]) !== 0) throw new Error('Video processing failed: ' + logs.join('\n'));
      }
      progress(99);
      const data = await ff.readFile(output);
      if (!(data instanceof Uint8Array) || !data.length) throw new Error('Video processing failed: empty output');
      progress(100);
      return data;
    } finally {
      ff.off('log',logger); ff.off('progress',handler);
      for (const name of [input,output]) { try { await ff.deleteFile(name); } catch {} }
    }
  }
  if(typeof module !== 'undefined') module.exports = {processVideo};
  else root.processVideo = processVideo;
})(globalThis);
