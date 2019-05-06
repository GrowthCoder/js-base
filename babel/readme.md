### Babel
babel的配置文件，存放在项目的根目录下，设置项目中==转码规则和插件=。
- 以编程方式的配置文件`babel.config.js`
- 简单的并且只用于单个软件包的配置，`.babelrc`

**babel作用**
- 语法转化
- 通过Polyfill，添加环境中缺失的特性
- 源码转换
- ……

```
// Babel 输入： ES2015 箭头函数
[1, 2, 3].map((n) => n + 1);

// Babel 输出： ES5 语法实现的同等功能
[1, 2, 3].map(function(n) {
  return n + 1;
});
```

### babel-polyfill
Babel 包含一个可自定义的 regenerator runtime 和 core-js 的 polyfill。
模仿了一个完整的ECMAScript2015+环境，可以使用新的内置对象，Promise、WeakMap，静态方法Array.from或者Object.assign，实例方法比如：Array.prototype.includes和生成器函数。

使用babel-polyfill这个插件
由于babel-polyfill是个运行时垫片，所以==需要声明在dependencies而非devDependencies里==

#### 问题：
- babel-polyfill会将需要转化的api直接转化，这就导致用到这些api的地方，存在大量的重复代码。
比如：

```
//before
async function testAwait() {
  await new Promise();
}
//after
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function testAwait() {
  return _testAwait.apply(this, arguments);
}
```

- 直接在全局作用域进行垫片，会污染全局作用域

使用下述`transform-runtime`解决上述问题

#### plugins
 告诉babel使用哪些插件
 比如`transform-runtime`，对应的插件名称为`babel-plugin-transform-runtime`，即在前面加上`babel-plugin-`，需要安装相关插件。
 
 ##### babel-plugin-transform-runtime 官方提供的一个插件 目的减少冗余代码。
 babel将ES6转化为ES5的过程中，需要一些由ES5编写的辅助函数来完成新语法的实现。
 此插件的作用是将原本注入到js文件的辅助函数，替换成导入语句，
 `var _extend = require('babel-runtime/helpers/_extend')`,
减少babel编译出来的文件大小。

```
function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;
```

还需要安装`babel-runtime`，两者配套使用，==`@babel/runtime/helpers`下面有很多的辅助函数供使用。==
`babel-runtime`将开发者依赖的全局内置对象等抽取成单独的模块，并通过模块导入的方式引入，避免对全局作用域的污染。


#### presets
 设置转码规则，告诉babel要转换的源码，包含哪些特性，是一个数组，
 主要分为三类：
 - 已经被ES写入标准的特性：ES2015、ES2016、ES2017、==Env(包含之前所有ECMAScript标准里的最新特性)==
 - 被社区提出来的但未被写入ECMAScript标准里的特性
    - stage0, 只是一个激进想法
    - state1，值得被纳入标准
    - state2，已经被起草，将会被纳入标准
    - state3，特性已经定稿，各大厂商正着手实施
    - stage4，接下来一年将会加入标准
- 用于支持一些特定应用场景下的语法的特性，和ECMAScript特性没有太大关系，比如babel-preset-react用于支持react开发里的JSX语法。
- ==目前babel7，提倡使用env预设，弃用stage、以及一些早期的预设==

```
babel-preset-es2015
babel-preset-es2016
babel-preset-es2017
babel-preset-latest
We are removing the stage presets in favor of explicit proposal usage
```
presets顺序从后往前，插件顺序从前往后排列。

```
{
    "presets": [
        ["env", {
            //用来指定模块化方式 false，即交由webpack来处理模块化
            "modules": false,
            // 兼容浏览器版本
            "targets": {
                    "browsers": ["last 2 versions", "not ie <= 8"]
                }
            }
        ]
    ],
    "plugins": [
        [
            "transform-runtime", {
                "helpers": false,
                "polyfill": false,
                "regenerator": true,
                "moduleName": "babel-runtime"
            }
        ],
    ]
}
```
#### useBuiltIns //@babel/preset-env如何处理polyfill
- **usage**: 不需要手动import '@babel/polyfill',==按需导入需要的polyfill==
- entry: 启用，需要手动 import '@babel/polyfill', 这样会根据 browserlist 过滤出 需要的 polyfill
- false : 不启用polyfill, 如果 import '@babel/polyfill', 会无视 browserlist 将所有的 polyfill 加载进来
Babel 将检查你的所有代码，以便查找目标环境中缺失的功能，然后只把必须的 polyfill 包含进来


```
Promise.resolve().finally();
```
将被转换为（由于 Edge 17 没有 Promise.prototype.finally）：

```
require("core-js/modules/es.promise.finally");

Promise.resolve().finally();
```
如果我们不使用 env preset 的 "useBuiltIns" 参数（即设置为 "usage"），那么我们必须在所有代码之前通过 require 加载一次完整的 polyfill。

```
{
  "presets": [
    ["@babel/env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      },
      "useBuiltIns": "usage",
      "debug": true
    }],
  ],
  "plugins": ["@babel/plugin-transform-runtime"]
}

npm install --save-dev @babel/preset-env
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save @babel/polyfill
```

进行babel编译，输出到lib目录下
`npx babel src --out-dir lib`

babel根据配置的targets，babel回去查用到的api，对当前target环境不支持的添加polyfill

```
var a = new Map();
Object.assign({}, {1: 1});
"foobar".includes("foo");
async function testAwait() {
  await new Promise();
}
```
引入需要的polyfill

![image](http://h0.hucdn.com/open201919/0c0391c2aa03f877_1764x526.png)