const cfork = require('cfork')
const chokidar = require('chokidar') // 监听代码文件 当发生修改时，通过cluster-reload 重启进程
const reload = require('cluster-reload') 
const { resolve } = require('path')

cfork({
  exec: resolve(__dirname, 'index.js'),
  count: 2
})

chokidar.watch('./app').on('change', (event, path) => {
  console.log(event, path)
  reload(2)
})