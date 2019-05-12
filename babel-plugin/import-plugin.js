module.exports = function({ types: t }) {
  // plugin contents
  return {
    visitor: {
      // 插件访问者
      // 对import转码
      ImportDeclaration(path, {opts}) {
        const {libraryName} = opts
        const {specifiers, source } = path.node;
        // 对仅限配置的libraryName 按需加载
        if (libraryName === source.value && !t.isImportDefaultSpecifier(specifiers[0])) {
          var declarations = specifiers.map(specifier => {
            return t.ImportDeclaration(
              // importDefaultSpecifier: import foo from './foo';
              [t.importDefaultSpecifier(specifier.local)],
              t.StringLiteral(`${source.value}/${specifier.local.name}`))
          })
          // 替换多个节点
          path.replaceWithMultiple(declarations);
        }
      }
    }
  }
}