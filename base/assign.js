/*
* Object.assign原理
* 浅复制
* 如果参数为对象 则复制地址
*/
const lg = console.log

let a = {
  name: 'gao',
  info: {
    age: 20,
    company: 'beibei'
  }
}
let b = {
  name: 'ting',
  info: {
    age: 22,
    company: 'yck'
  }
}
// let c = Object.assign(a,b)
// lg(c)
// lg(a === c) // true
// b.info.age = 18
// lg(c) // { name: 'ting', info: { age: 18, company: 'yck' } } 

if (typeof Object.assign2 !== 'function') {
  Object.defineProperty(Object, 'assign2', {
    value: function(target) {
      if (target == null) {
        throw new TypeError('connot convert undefined')
      }
      var o = Object(target)

      for(var i = 0; i< arguments.length; i++) {
        debugger
      }

    }
  })
}

let c = Object.assign2(a,b)
lg(c)
lg(a === c) // true
b.info.age = 18
lg(c) // { name: 'ting', info: { age: 18, company: 'yck' } } 