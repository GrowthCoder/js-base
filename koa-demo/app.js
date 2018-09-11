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

app.listen(4000, () => {
  log('server is running at http://localhost:4000')
})