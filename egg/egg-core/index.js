const Koa = require('koa')
const init = require('./egg')

const app = new Koa()

init(app)

app.listen(3000, function() {
  console.log('3000')
})