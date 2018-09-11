/**
 * 虚拟DOM
 * Virtual DOM 是以js对象作为基础的树，用对象属性来描述节点，不依赖真实环境，是对真实DOM的抽象
 * 
 */
class VNode {
  constructor (tag, data, children, text, elm) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
  }
}

// 创建空节点
function createEmptyNode () {
  const node = new VNode()
  node.text = ''

  return node
}

// 创建文本节点
function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}
// 克隆节点
function cloneVNode (node) {
  const cloneVNode = new VNode(
    node.tag,
    node.data,
    node.children,
    node.text,
    node.elm
  )
  return cloneVNode
}

function render () {
  return new VNode(
    'span',
    {
      directives: [
        {
          rawName: 'v-show',
          expression: 'isShow',
          name: 'show',
          value: true
        }
      ],
      staticClass: 'demo'
    },
    [new VNode(undefined, undefined, undefined, 'this is')]
  )
}

console.log(createEmptyNode())