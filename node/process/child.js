console.log('child')
// 如果当前进程是子进程，且与父进程之间通过IPC通道连接着，则为true；
console.log( 'process.connected: ' + process.connected );
process.disconnect();
console.log( 'process.connected: ' + process.connected );