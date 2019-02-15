/** 
 * 响应系统依赖收集追踪原理
 * 对界面用到的数据进行收集，多处用到收集 遍历通知更新
 * 没有用到不收集
 * 
 * 触发条件
 * 1、触发get方法
 * 2、新建一个Watcher对象
*/
// 订阅者
class Dep {
  constructor () {
    this.subs = []
  }
  addSub (sub) {
    this.subs.push(sub)
  }
  notify () {
    this.subs.forEach(item => {
      item.update()
    })
  }
}
// 观察者
class Watcher {
  constructor () {
    Dep.target = this
  }
  update (item) {
    console.log('更新')    
  }
}
/**
 * 调用observer的过程会给data中的数据注册get方法 该方法用来收集依赖
 * 在他的闭包中，会用来存放Watcher对象的实例 
 * get方法将当前的Watcher对象（Dep.target）存放到它的subs中，
 * 数据变化时，set会调用Dep对象的notify方法，通知它内部所有的Watcher对象进行视图更新
 * @param {any} data 
 */
function observer (data) {
  if (!data || typeof data !== 'object') return

  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key])
  })
}

function defineReactive (obj, key, value) {
  // 依赖收集重点
  // 每个key都会建立自己的Dep对象，下面的get、set 都是针对每个Dep对象进行操作
  // dep是一个闭包 defineReactive执行之后 依然可以获取dep的方法
  const dep = new Dep() 

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      // 进行依赖收集
      // Dep.target 实例化的全局watcher对象
      dep.addSub(Dep.target)
      return value
    },
    set: (newVal) => {
      // 通过观察者来更新视图
      if (value === newVal) return
      value = newVal
      dep.notify()
    }
  })
}

class Vue {
  constructor (options) {
    this._data = options.data
    observer(this._data)
    new Watcher()
    // 模拟render，触发data中数据的get函数
    console.log('render~', this._data.test)
  }
}

let o = new Vue({
  data: {
    test: 'gao',
    demo: 'ting'
  }
})

let p = new Vue({
  data: {
    test: 'vivi'
  }
})
console.log(o._data.demo)
o._data.test = 'gaoting'
p._data.test = 'vivi2'
Dep.target = null




