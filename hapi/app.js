const config = require('./config');
const Hapi = require('hapi');
const pluginHapiSwagger = require('./plugins/hapi-swagger');
const routeHello = require('./routes/hello');
const routeShops = require('./routes/shops');
const routeOrders = require('./routes/orders');

const server = new Hapi.Server();
server.connection({
  port: config.port,
  host: config.host,
})

const init = async () => {
  // 注册swagger
  await server.register([
    ...pluginHapiSwagger
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