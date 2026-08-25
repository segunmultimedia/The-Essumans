const fs = require('fs');
function getJpegSize(file) {
  const buf = fs.readFileSync(file);
  let i = 4;
  while(i < buf.length) {
    if (buf[i] === 0xFF && [0xC0,0xC1,0xC2].includes(buf[i+1])) {
      return { height: buf.readUInt16BE(i+5), width: buf.readUInt16BE(i+7) };
    }
    i += 2 + buf.readUInt16BE(i+2);
  }
}
['f1.jpg','f2.jpg','f3.jpg','f4.jpg','f5.jpg','f6.jpg'].forEach(f => console.log(f, getJpegSize('public/gallery/'+f)));
