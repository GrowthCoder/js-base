const Joi = require('joi');
const GROUP_NAME = 'orders';
const { jwtHeaderDefine } = require('../utils/router-helper')

module.exports = [
  {
    method: 'GET',
    path: `/${GROUP_NAME}`,
    handler: async (request, reply) => {
      reply();
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '创建订单',
      validate: {
       ...jwtHeaderDefine
      }
    }
  },
  {
    method: 'GET',
    path: `/${GROUP_NAME}/{orderId}/pay`,
    handler: async (request, reply) => {
      reply();
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '支付某条订单',
      validate: {
        // params验证
        params: {
          orderId: Joi.string().required(),
        }
      }
    }
  }
]