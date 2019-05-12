babel转码只要分为三个过程：分析（parse）、转换（transform）、生成（generate），转换阶段，则有插件来完成。
![image](http://h0.hucdn.com/open201919/8586058328ac306b_982x310.png)

### @babel/parser 
babel解析器
#### babelParser.parse(code, [options])

```
npm install --save-dev @babel/parser
```

```
babelParser.parse(code, {
  sourceType: "module", // default: "script"
  plugins: ["jsx"] // default: []
});
```

sourceType: module/script;
`"module"` 将会在严格模式下解析并且允许模块定义，`"script"` 则不会。
基于插件架构，使用`plugins`选项开关内置插件。
### @babel/traverse
Babel Traverse（遍历）模块维护了整棵树的状态，并且负责替换、移除和添加节点

```
const babylon = require('@babel/parser'); // babel解析器
const traverse = require('babel-traverse').default;
const generate = require('babel-generator').default;

const demo = (source) => {
  let ast = babylon.parse(source, {sourceType: 'module'})
  // start
  traverse(ast, {
    enter(path) {
      if (path.node.type === 'Identifier' &&
        path.node.name === 'n') {
          path.node.name = 'x';
        }
    }
  })

  // end
  const output = generate(ast, {}, source);
  console.log(output) 
  /*{ code: 'const code = function square(x) {\n  return x * x;\n};',
  map: null,
  rawMappings: null }*/
}

demo(`const code = function square(n) {
  return n * n;
}`)
```

### @babel/types
是一个用于AST节点的lodash工具库，包含构造、验证以及变换AST节点的方法。
```
npm install --save-dev @babel/types
```
可以创建两种验证方法。
第一种是 isX。
`t.isIdentifier(maybeIdentifierNode)`
用来确保节点是一个标识符。
第二种传入第二个参数来确保节点包含特定的属性和值。
`t.isIdentifier(maybeIdentifierNode, {name:'n'})`
这些方法还有一种断言式的版本，会抛出异常而不是返回 true 或 false
`t.assertIdentifier(maybeIdentifierNode)`

`t.assertIdentifier(maybeIdentifierNode, {name:'n'})`
```
// 验证路径名
const babylon = require('@babel/parser'); // babel解析器
const traverse = require('babel-traverse').default;
const generate = require('babel-generator').default;
const t = require('babel-types');

const demo = (source) => {
  let ast = babylon.parse(source, {sourceType: 'module'})
  // start
  traverse(ast, {
    enter(path) {
      if (t.isIdentifier(path.node, {name: 'n'})) {
          path.node.name = 'x';
        }
    }
  })

  // end
  const output = generate(ast, {}, source);
  console.log(output)
}

demo(`const code = function square(n) {
  return n * n;
}`)
```
### babel-generator AST树转化成源码
此模块是babel的代码生成器，它读取AST并将其转换为代码和源码映射（sourcemaps）

```
npm install --save babel-generator
```
可以添加参数配置

```
generate(ast, {
  retainLines: false,
  compact: "auto",
  concise: false,
  quotes: "double",
  // ...
}, code);
```
### babel-template
它能让你编写字符串形式且带有占位符的代码来代替手动编码，尤其是生成的大规模 AST的时候。

```
npm install --save babel-template
```
### 插件基础入门
- state: 代表了插件的状态，你可以通过state来访问插件的配置项
- path：是个对象，表示两个节点之间的关联。路径是一个节点在树中的位置以及关于该节点各种信息的响应式 Reactive 表示。当你调用一个修改树的方法后，路径信息也会被更新。 Babel 帮你管理这一切，从而使得节点操作简单，尽可能做到无状态。
- source 传递给当前plugin的其他信息，包括当前编译的文件、代码字符串以及我们在`.babelrc`中传入的参数等。


```
module.exports = function ({ types: t }) {
    return {
        visitor: {
            ImportDeclaration(path, source){
                const { opts: { libraryName, alias } } = source;
                if (!t.isStringLiteral(path.node.source, { value: libraryName })) {
                    return;
                }
                console.log(path.node);
                // todo
            }
        }    
    }
}
```
### 简版按需加载plugin开发
https://github.com/GrowthCoder/js-base/tree/master/babel-plugin

### 参考链接
- [blog](http://www.alloyteam.com/2017/04/analysis-of-babel-babel-overview/)
- [api](https://github.com/babel/babylon/blob/master/ast/spec.md)
- [插件开发](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-introduction)