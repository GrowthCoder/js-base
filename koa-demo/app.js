/** 
 * KOA入门
 * 洋葱圈模型
 * 按照类似堆栈的方式组织执行
 * koa-router 组织路由
 * koa-bodyparser 解析post请求参数
*/
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const userAgent = require('koa-useragent')
const urlLog = require('./middleware/log')

const app = new Koa()
const router = require('./routes')
const log = console.log
const config = {
  format: text => `====== ${text}====`
}

app.use(bodyParser())
app.use(userAgent)
app.use(urlLog(config))
router(app)

// 查看userAgent
app.use(async(ctx, next) => {
  log(require('util').inspect(ctx.userAgent))
})

app.listen(4000, () => {
  log('server is running at http://localhost:4000')
})