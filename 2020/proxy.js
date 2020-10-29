// handler可以继承
// 如果读取obj继承属性时，就会向原型对象查询，触发原型的拦截

var proto = new Proxy({}, {
    get(target, propertyKey, receiver) {
        console.log('proto',target[propertyKey])
        return receiver;
    }
})

// var obj = Object.create(proto);
// obj.name = 'gao'
// console.log(obj.name)
// console.log(proto.a === proto)

// 简单proxy响应式
let getLogger = (target, property) => {
    console.log(`'${property}' = ${target[property]}`)
}

let setBind = (v, property) => {
    console.log(`监听到属性${property}改变为${v}`)
}

let onWatch = (obj) => {
    let handler = {
        get(target, property, receiver) {
            getLogger(target, property);
            return Reflect.get(target, property, receiver)
        },
        set(target, property, value, receiver) {
            setBind(value, property)
            return Reflect.set(target, property, value, receiver)
        }
    }

    return new Proxy(obj, handler);
}

let obj = {a :1}

let p = onWatch(obj)
p.a = 3;
p.a