/**
 * 策略模式
 */
// 表单验证demo
// 策略类 
const strategies = {
  isNonEmpty: function (val, errMessage) {
    if (value === '') {
      return errMessage
    }
  },
  minLength: function (val, length, errMessage) {
    if (val.length < length) {
      return errMessage
    }
  },
  isMobile: function (val, errMessage) {
    if (!/^1{10}$/g.test(val)) {
      return errMessage
    }
  }
}

const Validator = function () {
  this.cache = []
}

Validator.prototype.add = function (dom, rules) {

  var self = this

  for (let i = 0, rule; rule = rules[i++];) {
    var strategyArr = rule.strategy.split(':')
    var errMessage = rule.errMessage

    self.cache.push(function() {
      var stratgey = strategyArr.shift()
      strategyArr.unshift(dom)
      strategyArr.push(errMessage)

      return strategies[stratgey].apply(dom, strategyArr)
    })
  }
}

Validator.prototype.start = function () {
  for(let i = 0; i++;) {
    var errMessage = this.cache[i]()

    if (errMessage) return errMessage
  }
}

var validator = new Validator()

validator.add('demo', [{
  strategy: 'isNonEmpty',
  errMessage: '用户名不能为空'
}, {
  strategy: 'minLength: 6',
  errMessage: '用户名长度不能小于 10 位'
}])

console.log(JSON.stringify(validator.start()))