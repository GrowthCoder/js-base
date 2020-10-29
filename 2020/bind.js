// 模拟bind bindES6中 call\apply早期版本已支持
var foo = {
    value: 1
}

function getValue () {
    return this.value
}
var bindFoo = getValue.bind(foo);
// console.log(bindFoo())

// 实现一个polyfill 
// 存储上下文且支持传参数
/**
 * 函数调用方式有两种
 * 一种是函数调用
 * 一种是new操作符 创建实例
 * @param {*} context 
 */
Function.prototype.myBind = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    var self = this;
    var args = [...arguments].slice(1);
    return function() {
        return self.apply(context, args.concat(...arguments))
    }
}
var bindFoo2 = getValue.myBind(foo)
console.log(bindFoo2())

/**
 * 第一个参数不传入 默认window
 * context 可选参数 如果不存在默认window
 * 在context创建属性fn,指向需要调用的函数
 * 参数处理
 * 调用函数，最后删除context上的fn属性
 * @param {*} context 
 */
Function.prototype.myCal = function(context) {
    // this必须是函数
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }

    context = context || window;
    context.fn = this;
    var args = [...arguments].slice(1);
    var result  = context.fn(...args);
    delete context.fn
    return result;
}

// 主要是参数不同 apply接收数组
Function.prototype.myApply = function(context) {
    // this必须是函数
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }

    context = context || window;
    context.fn = this;
    var args = [...arguments][1];
    var result;
    if (args.length) {
        result = context.fn(...args)
    } else {
        result = context.fn()
    }
    delete context.fn
    return result;
}
// console.log(getValue.myCal(foo, 1,2,3))