// 模拟一个new操作符
/**
 * new 返回对象
 * this指向实例 且能访问到原型对象上属性和方法
 * 
 * @param {*} Con 
 * @param  {...any} args 
 */
function MyNew(Con, ...args) {
    let obj = {};
    Object.setPrototypeOf(obj, Con.prototype);
    let result = Con.apply(obj, args)
    return result instanceof Object ? result : obj;
}

function People(name) {
    this.name = name;
}
People.prototype.getName = function() {
    return this.name;
}
let test = MyNew(People, 'gao');
console.log(test.getName())


/**
 * instanceof 原理 判断对象类型
 * @param {*} left 左操作符
 * @param {*} right 右操作符
 */
function myInstance(left, right) {
    let proto = right.prototype;
    left = left.__proto__;

    while(true) {
        if (left === null || left === undefined) {
            return false
        }

        if(left === proto) {
            return true
        }
        left = left.__proto__;
    }
}
// var a = {}
// console.log(myInstance(a, Array))