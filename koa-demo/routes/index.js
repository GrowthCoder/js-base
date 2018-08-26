const router = require('koa-router')({
  prefix: '/api'
})
const controller = require('../controller')

module.exports = (app) => {
  router
    .get('/', controller.index)
    .get('/data', controller.data)
    .get('/user/:id', controller.user) 
    .post('/user/register', controller.register)

  app
    .use(router.routes())
    .use(router.allowedMethods())
}