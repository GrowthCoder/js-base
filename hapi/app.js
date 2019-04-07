const config = require('./config');
const Hapi = require('hapi');
const hapiAuthJWT2 = require('hapi-auth-jwt2');
const pluginHapiAuthJWT2 = require('./plugins/hapi-auth-jwt2');
const pluginHapiSwagger = require('./plugins/hapi-swagger');
const pluginHapiPagination = require('./plugins/hapi-pagination');
const routeHello = require('./routes/hello');
const routeShops = require('./routes/shops');
const routeOrders = require('./routes/orders');
const routeUsers = require('./routes/users');
const routePlans = require('./routes/plans');
const routeNews = require('./routes/news');

const server = new Hapi.Server();
server.connection({
  port: config.port,
  host: config.host,
})

const init = async () => {
  // 注册swagger 插件
  await server.register([
    ...pluginHapiSwagger,
    hapiAuthJWT2,
    pluginHapiPagination
  ]);

  pluginHapiAuthJWT2(server);

  server.route([
    ...routeHello, 
    ...routeShops, 
    ...routeOrders,
    ...routeUsers,
    ...routePlans,
    ...routeNews
  ]);

  // 启动服务
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}
init()