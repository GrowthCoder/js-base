/*
*  1、原型继承：当前函数的原型对象是另外一个函数的的实例
*  2、缺点 包含引用类型值的原型属性会被所有实例共享
*  3、修改了原型对象上的属性 会影响所有实例
*  4、没有办法在不影响所有实例的情况下，向超类传递参数
*/ 

function SuperType(name) {
    this.colors = ['red']
    this.name = name
}
SuperType.prototype.getName = function() {
    return this.name
}
function SubType() {
}
SubType.prototype = new SuperType()

var a = new SubType('vivi', 12)
a.colors.push('blue')
console.log(a)
var b = new SubType()
console.log(b.getName())
/**
 * 2、借用构造函数 在新创建的对象上执行构造函数;可以向超类传递参数
 * 缺点：在超类型原型对象中定义的方法 对子类型是不可见的，无法使用超类型原型对象内容
 * @param {*} name
 * @param {*} age
 */
function callType(name, age) {
    SuperType.call(this, name)
    this.age = age
}

var a = new callType('vivi', 12)
a.colors.push('blue')
console.log(a)
var b = new callType()


/**
 * 组合继承
 * 避免了原型继承和借用继承的缺点 融合了他们的有点 常用继承方式
 */
function ComType(name, age) {
    SuperType.call(this, name)
    this.age = age
}

ComType.prototype.getAge = function() {
    return this.age
}

ComType.prototype = new SuperType()

var c = new ComType('aa', 11)
c.colors.push('black')
console.log('c', c)
var d = new ComType('bb', 12)
console.log('d', d)

// 原型式继承 Object.create()
