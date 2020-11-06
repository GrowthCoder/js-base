// 对象遍历


function Person(name) {
    this.name = name;
}

Person.prototype.age = 11;

var man = new Person('gao')
// 1. for in遍历 可遍历原型链上属性
for(var i in man) {
    // console.log(i, man[i])
}
// name gao
// age 11
// 2. Object.keys(man)
// 3. Object.values(man)
// 4. Reflect.ownKeys(man) 返回数组，包含对象自身的所有属性 不管属性名是Symbol或字符串,也不管是否可枚举.  
// 5. Object.getOwnPropertyNames(man) 返回一个数组,包含对象自身的所有属性
console.log()