const useragent = require('useragent')
const { resolve } = require('path')
const { readFileSync } = require('fs')

const viewPath = resolve(__dirname, '../view/report.html')

module.exports = ({ getUser, getIp, save, auth, pathUrl, getData }, app) => {
  const tempalte = readFileSync(viewPath).toString()
  const report = async ctx => {
    if (ctx.path === pathUrl) {
      const can = await auth()

      if (can) {
        ctx.type = 'text/html'
        const data = await getData()
        ctx.body = eval(tempalte)
        return true
      } else {
        ctx.status = 403
        return false
      }
    }
  }

  return async (ctx, next) => {
    const skip = await report

    const agent = (ctx.agent = useragent.parse(ctx.request.header['user-agent']))

    await next()

    if (skip) {
      return
    }

    const user = await getUser(ctx)
    const path = ctx.request.path
    const ip = await getIp(ctx)
    const referrer = ctx.request.header['referrer'] || ''
    const data = {
      username: user.username || '',
      user_id: user.id,
      path,
      referrer,
      ip,
      os: agent.os.family,
      browser: agent.family,
      device: agent.device.family
    }

    try {
      await save(data)
    } catch (e) {
      ctx.logger.error(e)
      console.log(e)
    }
  }
}