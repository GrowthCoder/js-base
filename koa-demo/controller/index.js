/**
 * 抽离业务逻辑层
 */
const log = console.log
module.exports = {
  index: async(ctx, next) => {
    ctx.body = '<h1>index</h1>'
  },
  user: async(ctx, next) => {
    ctx.body = '<h2>hello user</h2>'
    log(ctx.query, ctx.querystring) // 路由参数
    log(ctx.params) 
  },
  register: async(ctx, next) => {
    // post 请求body 需要bodyparser解析
    // 此处解析json格式
    const { username, password } = ctx.request.body

    ctx.body = JSON.stringify({username, password})
  },
  data: async(ctx, next) => {
    ctx.body = '<h3>hello data</h3>'
    log(ctx.params, 'data')
  }
}