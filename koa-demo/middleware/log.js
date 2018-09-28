module.exports = options => {
  if (!options.format) {
    console.log('error: need format params')
  }

  return async(ctx, next) => {
    console.log(options.format(ctx.url))
    await next()
  }
}