const { parse, join, resolve } = require('path')
const globby = require('globby') //搜索目录下所有文件

module.exports = app => {
  const AppPath = resolve(__dirname, 'app')
  const context = app['context']

  // 此处代码值得学习 获取文件夹路径 箭头函数传参
  // 目录映射变量
  const fileAbsolutePath = ['config', 'service', 'middleware']
    .reduce((folderMap, v) => (folderMap[v] = join(AppPath, v), folderMap), {})

  Object.keys(fileAbsolutePath).forEach(v => {
    const path = fileAbsolutePath[v] //prop对应的路径
    const prop = v
    // 上述目录对应的文件 之后逐个require导入
    const files = globby.sync('**/*.js', {
      cwd: path
    })

    prop != 'middleware' && (context[prop] = {})

    // config、service都挂载到ctx上
    files.forEach(file => {
      const filename = parse(file).name // parse返回路径字符串对象
      const content = require(join(path, file)) //导入所有文件

      // middleware 处理逻辑
      if (prop == 'middleware') {
        
        if (filename in context['config']) {
          const plugin = content(context['config'][filename])
          app.use(plugin) // 加载中间件
        }
        return
      }

      // 配置文件处理
      if (prop == 'config' && content) {
        context[prop] = Object.assign({}, context[prop], content)
        return
      }

      context[prop][filename] = content; // 挂载 service
    })
  })
}