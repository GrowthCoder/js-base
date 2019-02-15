const routeHello = require('./routes/hello');
const config = require('./config');

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
  port: config.port,
  host: config.host,
})

const init = async () => {
  server.route([...routeHello]);
  // 启动服务
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}
init()