// 多进程http服务 添加热重启功能
const Koa = require('koa')
const init = require('./egg')

const app = new Koa()
const lg = console.log

init(app)

app.use(async(ctx, next) => {
  //lg(ctx.service)
  //lg(ctx.config)
  ctx.type = 'application/json'
  ctx.body = ctx.service.user.getUser()
})

app.listen(4000, function() {
  console.log('4000')
})