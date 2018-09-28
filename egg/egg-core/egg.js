const { parse, join, resolve } = require('path')
const globby = require('globby')

module.exports = app => {
  const AppPath = resolve(__dirname, 'app')
  console.log(AppPath,  process.cwd() )
}