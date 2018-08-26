/** 
 * KOA入门
 * 洋葱圈模型
 * 按照类似堆栈的方式组织执行
 * koa-router 组织路由
 * koa-bodyparser 解析post请求参数
*/
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = require('./routes')
const log = console.log
app.use(bodyParser())

router(app)

// 洋葱圈模型 
// app.use(async (ctx, next) =>{
//   console.log(ctx.request.url)
//   // if (ctx.request.url == '/data') {
//   //   ctx.body = 'hello data'
//   // } else if (ctx.request.url == '/test') {
//   //   ctx.body = 'test'
//   // } else {
//   //   ctx.body = '<h3>404</h3>'
//   // }
//   const start = new Date().getTime()
//   next()
//   ctx.body = ctx.body + '1'
//   const end = new Date().getTime()
// })

// app.use(async (ctx, next) =>{
//   ctx.body += '2'
//   next()
//   ctx.body += '3'
// })

// app.use(async (ctx, next) =>{
//   ctx.body += '4'
//   next()
//   ctx.body += '5'
// })

// app.use(async (ctx, next) =>{
//   ctx.body += '6'
//   next()
//   ctx.body += '7'
// })

app.listen(3000, () => {
  log('server is running at http://localhost:3000')
})