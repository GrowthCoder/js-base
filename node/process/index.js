var child_process = require('child_process')
console.log(process.argv)
console.log(process.execArgv)
// 返回当前工作路径
console.log(process.cwd())
// 切换当前工作路径
// console.log(process.chdir('/tmp'))
console.log(process.cwd())

child_process.fork('./child.js', {
    stdio: 'inherit'
});

// 编译当前node.js可执行文件的配置选项的js表现形式
console.log('process config', process.config)

// stdio stdout
process.stdin.setEncoding('utf-8')

process.stdin.on('readable', () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
        process.stdout.write(`数据: ${chunk}`);
    }
})

process.stdin.on('end', () => {
    process.stdout.write('end')
})