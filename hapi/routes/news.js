const Joi = require('joi');
const GROUP_NAME = 'news';
const models = require('../models');
const { paginationDefine }  = require('../utils/router-helper');

module.exports = [{
  method: 'GET',
  path: `/api/${GROUP_NAME}`,
  handler: async(request, reply) => {
    const {rows: results, count: totalCount} = await models.news.findAndCountAll({
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
    description: '获取新闻列表列表',
    auth: false,
    validate: {
      query: {
        ...paginationDefine
      }
    }
  }
}, {
  method: 'POST',
  path: `/api/${GROUP_NAME}/{newsId}/delete`,
  handler: async(request, reply) => {
    const a = await models.news.destroy({where: {id: request.params.newsId}})
    reply({success: !!a});
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '新闻删除',
    auth: false,
    validate: {
      params: {
        newsId: Joi.string().required(),
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
    const a = await models.news.create({...request.payload, lang})

    reply({success: !!a.id});
  },
  config: {
    auth: false,
    tags: ['api', GROUP_NAME],
    description: '校招行程添加',
    validate: {
      payload: {
        newsTitle: Joi.string().required(),
        mainInfo: Joi.string().required(),
        // newsPictureId: Joi.string().required(),
      }
    }
  }
},]