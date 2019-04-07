const formidable = require("formidable");
const util = require('util');

module.exports = [{
  method: 'POST',
  path:'/api/upload',
  handler: async (request, reply) => {
    const form = new formidable.IncomingForm();
    console.log(request.raw.req)
    form.parse(request.raw.req, function (err, fields, files) {
      console.log(fields)
      reply(util.inspect({ fields: fields, files: files }));
    });
    
    reply(form);
  },
  config: {
    auth: false,
    tags: ['api', 'upload'],
    description: '图片上传',
    payload: {
      output: 'stream',
      parse: true,
      allow: 'multipart/form-data',
    }
  }
}]