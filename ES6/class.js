class Person {
  constructor (name) {
    this._name = name
  }
  
  get name () {
    return this._name
  }
  set name (val) {
    this._name = val
  }
}

var gao = new Person('gao')
gao.name = 'ting'
console.log(gao.name)
