const Joi = require('joi');
const GROUP_NAME = 'plans';
const models = require('../models');
const { paginationDefine }  = require('../utils/router-helper');

module.exports = [{
  method: 'GET',
  path: `/api/${GROUP_NAME}`,
  handler: async(request, reply) => {
    const {rows: results, count: totalCount} = await models.plans.findAndCountAll({
      attributes: {
        exclude: ['type']
      }, // 对数据进行过滤
      limit: request.query.limit,
      offset: (request.query.page - 1) * request.query.limit
    });

    reply({ results, totalCount, code: 200 });
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '获取校招行程安排列表',
    auth: false,
    validate: {
      query: {
        ...paginationDefine
      }
    }
  }
}, {
  method: 'POST',
  path: `/api/${GROUP_NAME}/add`,
  handler: async(request, reply) => {
    let { type } = request.payload;
    type = type || 'cn';
    console.log(request.payload)
    const a = await models.plans.create({...request.payload, type})

    reply({success: !!a.id, code: 200 });
  },
  config: {
    auth: false,
    tags: ['api', GROUP_NAME],
    description: '校招行程添加',
    validate: {
      payload: {
        school: Joi.string().required(),
        date: Joi.string().required(),
        address: Joi.string().required(),
        time: Joi.string().required(),
        activity: Joi.string(),
        type: Joi.string()
      }
    }
  }
}, {
  method: 'POST',
  path: `/api/${GROUP_NAME}/{planId}/modify`,
  handler: async(request, reply) => {
    const { planId } = request.params
    const data = {id: planId}
    const result = await models.plans.update(
      request.payload, 
      {
        where: data
      }
    )
    const success = !!result[0]
    reply({success, code: 200 });
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '校招行程编辑',
    auth: false,
    validate: {
      params: {
        planId: Joi.string().required(),
      }
    }
  }
}, {
  method: 'POST',
  path: `/api/${GROUP_NAME}/{planId}/delete`,
  handler: async(request, reply) => {
    const a = await models.plans.destroy({where: {id: request.params.planId}})
    reply({success: !!a, code: 200 });
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '校招行程删除',
    auth: false,
    validate: {
      params: {
        planId: Joi.string().required(),
      }
    }
  }
}]