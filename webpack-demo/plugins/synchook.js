// 同步串行
const { SyncHook } = require('tapable')
let queue = new SyncHook(['name'])

queue.tap('1', (name, name2) => {
  console.log(name, name2, 1)
  return '1'
})

queue.tap('2', (name) => {
  console.log(name, 2)
  return '2'
})

queue.tap('3', (name) => {
  console.log(name, 3)
  return '3'
})
queue.call(['webpack'], ['webpack-cli'])

// 上一个监听函数的返回值可以传给下一个监听函数
const {
  SyncWaterfallHook
} = require("tapable");

let waterfall = new SyncWaterfallHook(['name'])

waterfall.tap('1', (name) => {
  return '1'
})

waterfall.tap('2', (data) => {
  console.log('SyncWaterfallHook', data, 2)
  return '2'
})

waterfall.tap('3', (data) => {
  console.log('SyncWaterfallHook', data, 3)
  return '3'
})

waterfall.call('webpack')