### path 模块
主要用来处理文件路径

- path.join 用于链接路径 会正确使用当前系统的分隔符
- path.resolve(from, to) 将to参数解析为绝对路径
- path.parse 返回**路径字符串的对象**
  - 返回 dir、root、base、name、ext属性

- __dirname 获得当前执行文件所在目录的**完整目录名**
- __filename 获得当前执行文件的带有完整绝对路径的文件名(当前文件所在的完整的绝对路径)
- process.cwd() 获取当前执行**node命令时**所在的文件夹目录名

比如在egg.js文件中使用这些命令
- __dirname  /Users/gaoting/frontDemos/JS/egg/egg-core
- __filename /Users/gaoting/frontDemos/JS/egg/egg-core/egg.js
- process.cwd() /Users/gaoting/frontDemos/JS/egg/egg-core