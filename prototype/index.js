/**
 * 原型链知识点汇总
 */
//test
function log() {
  console.log()
}
function Person(name) {
  this.name = name
}

Person.prototype.getName = function () {
  return this.name
}

var person = new Person();
person.name = 'gaoting';
console.log(person.name) // gaoting
console.log(Person.prototype)
console.log(person.__proto__ === Person.prototype) // true
console.log(person.constructor === Person, Person.prototype.constructor === Person)
//test constructor

// Person.prototype = {
//   age: 18,
//   company: 'yck'
// }

var gao = new Person()
console.log(gao.constructor === Person)
console.log(gao)
// 获取对象原型
console.log(Object.getPrototypeOf(gao))

// 原型链
function Man (sex) {
  this.sex = sex
}
Man.prototype = new Person()
var man = new Man('male')
man.name = 'qi'
console.log(man.getName())
console.log(man instanceof Man, man instanceof Person)


function SuperType (name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}

function SubType (name, age = 18) {
  SuperType.call(this, name)
  this.age = age
}
SubType.prototype = new SuperType()
SubType.prototype.getAge = function () {
  return this.age
}
var ins = new SubType('seven', 22)
ins.colors.push('black')
var ins2 = new SubType('six', 11)
console.log(ins2)



function SuperType(){
  this.colors = ["red", "blue", "green"];
}
function SubType(){
}
//继承了 SuperType
SubType.prototype = Object.create(SuperType.prototype); // SuperType的原型对象将拥有colors属性，之后的实例对colors的修改，将直接作用到原型上
var instance1 = new SubType(); 
instance1.colors.push("black");
console.log(instance1.colors); //"red,blue,green,black"
var instance2 = new SubType(); 
console.log(instance2.colors); 
