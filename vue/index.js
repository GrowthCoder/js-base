class Vue {
  constructor (options) {
    this._data = options.data
    this.observer()
  }
  observer () {
    if (!this._data || typeof this._data !== 'object') return

    Object.keys(this._data).forEach(key => {
      this.defineReactive(this._data, key, this._data[key])
    })
  }
  defineReactive (obj, key, value) {
    Object.defineProperty(obj, key, {
      enumerable: true, // 属性可枚举
      configurable: true, // 属性可被修改或删除 
      get: () => {
        return value
      },
      set: (newVal) => {
        if (value === newVal) return

        value = newVal
        this.cb(newVal)
      }
    })
  }
  cb (val) {
    console.log('视图更新了', val)
  }
}

let o = new Vue({
  data: {
    test: 'gao'
  }
})

o._data.test = 'gaoting'

console.log(o._data.test)