const Joi = require('joi');
const GROUP_NAME = 'jobs';
const models = require('../models');
const { paginationDefine }  = require('../utils/router-helper');

module.exports = [{
  method: 'GET',
  path: `/api/${GROUP_NAME}`,
  handler: async(request, reply) => {
    const {rows: results, count: totalCount} = await models.jobs.findAndCountAll({
      where: {type: request.query.type},
      // order: 'id DESC',
      limit: request.query.limit,
      offset: (request.query.page - 1) * request.query.limit
    });

    reply({ results, totalCount, code: 200 });
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '招聘',
    auth: false,
    validate: {
      query: {
        ...paginationDefine,
        type: Joi.string().required()
      }
    }
  }
}, {
  method: 'POST',
  path: `/api/${GROUP_NAME}/add`,
  handler: async(request, reply) => {
    let { lang } = request.payload;
    lang = lang || 'cn';
    console.log(request.payload)
    const a = await models.jobs.create({...request.payload, lang})

    reply({success: !!a.id, code: 200 });
  },
  config: {
    auth: false,
    tags: ['api', GROUP_NAME],
    description: '添加招聘',
    validate: {
      payload: {
        area: Joi.string().required(),
        name: Joi.string().required(),
        detail: Joi.string().required(),
        type: Joi.string()
      }
    }
  }
}, {
  method: 'POST',
  path: `/api/${GROUP_NAME}/{jobId}/modify`,
  handler: async(request, reply) => {
    const { jobId } = request.params
    const data = {id: jobId}
    const result = await models.jobs.update(
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
        jobId: Joi.string().required(),
      }
    }
  }
}, {
  method: 'POST',
  path: `/api/${GROUP_NAME}/{jobId}/delete`,
  handler: async(request, reply) => {
    const a = await models.jobs.destroy({where: {id: request.params.jobId}})
    reply({success: !!a, code: 200 });
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '校招行程删除',
    auth: false,
    validate: {
      params: {
        jobId: Joi.string().required(),
      }
    }
  }
}]