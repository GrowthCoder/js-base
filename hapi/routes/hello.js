// 创建一个简单的hello hapi接口

module.exports = [{
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply('hello hapi');
  },
},
]