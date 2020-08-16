// 1. new 操作符
/**
 * new 通过构造函数创建的实例 可以访问到构造函数中的属性、原型对象的属性和方法
 * 给构造函数添加返回值，如果返回的是对象，则会被正常使用，否则会被忽略
 * 
 * 汇总：
 * new 操作符返回一对象
 * 这个对象也就是构造函数中的this，能够访问到挂载在this上的任意属性
 * 这个对象可以访问到构造函数原型上的属性，需要将对象和构造函数链接起来
 * 返回原始值需要忽略，返回对象需要正常处理
 */

// function Person(name) {
//     this.name = name;

//     return {
//         age: 1
//     }
// }

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.getName = function() {
    return this.name;
}

// myNew 

function myNew(Con, ...args) {
    let obj = {};
    Object.setPrototypeOf(obj, Con.prototype);
    let result = Con.apply(obj, args);
    console.log(obj, 'obj')

    return result instanceof Object ? result : obj;
}
let test = myNew(Person, 'gt', 31)
console.log(test.getName())
