const fs = require('fs')
const readable = fs.createWriteStream('../package.json');
const writable = fs.createWriteStream('file.txt');
// readable 的所有数据都推送到 'file.txt'。
readable.pipe(writable);