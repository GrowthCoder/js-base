const config = require('./config');
const Hapi = require('hapi');
const pluginHapiSwagger = require('./plugins/hapi-swagger');
const pluginHapiPagination = require('./plugins/hapi-pagination');
const routeHello = require('./routes/hello');
const routeShops = require('./routes/shops');
const routeOrders = require('./routes/orders');

const server = new Hapi.Server();
server.connection({
  port: config.port,
  host: config.host,
})

const init = async () => {
  // 注册swagger 插件
  await server.register([
    ...pluginHapiSwagger,
    pluginHapiPagination
  ]);
  server.route([
    ...routeHello, 
    ...routeShops, 
    ...routeOrders
  ]);
  // 启动服务
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}
init()