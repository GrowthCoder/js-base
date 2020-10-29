/**
  * Object.defineProperty 可以劫持数组 可以监控数组下标变化 只是在 Vue 的实现中，从性能 / 体验的性价比考虑，放弃了这个特性
  * push方法并未触发setter和getter 数组的下标可以看作对象的key 对新的下标并未进行observe
  * unshift 头部添加元素 导致原来索引值都发生变化 需要将原来索引值取出来 重新赋值 但是新的下标没有进行observe
  * 
  * 总结：
  * object.defineProperty在数组中的表现和在对象中表现一致，数组的索引就是对象中的key
  * 通过下标访问或者设置值时，是可以触发getter、setter的
  * 通过push或者unshift 会添加索引，需要手动初始化才能被observe
  * 通过pop或者shift 会删除并更新索引，也会触发setter或者getter
  * 
  * vue 2.x放弃了监控数组下标变化的能力
  * 
  * https://mp.weixin.qq.com/s/O8iL4o8oPpqTm4URRveOIA
  */

function defineReactive(data, key, value) {
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function defineGet() {
            console.log(`get key: ${key} value: ${value}`)
            return value
        },
        set: function defineSet(newVal) {
            console.log(`set key: ${key} value: ${newVal}`)
            value = newVal
        }
    })
}
function observe(data) {
    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key])
    })
}
let arr = [[1], 2, 3, {name:'ga'}]
// observe(arr)
// arr.push(45) // 监听不到
// arr.unshift(0) 
// console.log(arr)

