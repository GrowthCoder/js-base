/**
 * compile 编译可以分为parse、optimize、generate 三个阶段
 * 最终需要得到render function
 * 
 * optimize
 * 一些静态节点不会根据数据变化而产生变化，这些节点没有对比的必要，patch的时候可以直接跳过
 * 经过optimize处理，会对静态节点加上static
 * 文本节点是静态节点
 * 
 * generate
 * 会将AST转化为render function字符串，最终得到render的字符串以及staticRenders字符串
 * 
 */

/**
 * parse 
 * 利用正则解析template
 */

 
// isStatic
function isStatic (node) {
  // Attr 类型节点 
  if (node.type === 2) {
    return false
  }

  // 文本节点 Text类型
  if (node.type == 3) {
    return true
  }

  return (!node.if || !node.for)
}

function markStatic (node) {
  // 为所以节点添加static
  node.static = isStatic(node)
  // Elememt类型 提供了对元素标签名、子节点及特性的访问
  if (node.type === 1) {
    for(let i = 0; i < node.children.length; i++) {
      const child = node.children[i]

      markStatic(child)
      if(!child.static) {
        node.static = false // 如果子节点是非静态节点 那么当前节点也是非静态节点
      }
    }
  }
}

// 标记静态根
function markStaticRoots (node) {
  if (node.type === 1) {
    // 当前节点是静态节点 必须有子节点并且不为纯文本 否则消耗更大
    if (node.static && node.children.length && !(
      node.children[0].type === 3 &&
      node.children.length === 1
    )) {
      node.staticRoot = true
    } else {
      node.staticRoot = false
    }
  }
}

function optimize (rootAst) {
  markStatic(rootAst)
  markStaticRoots(rootAst)
}