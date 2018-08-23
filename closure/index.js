// 下面输出？
function foo () {
	var result = [];

	for(var i = 0; i< 10; i++) {
		result[i] = function (){
			return i
		}
	}
	return result	
}

console.log('foo', foo()[0]())

// 如何实现想要的结果
function bar () {
	var result = [];

	for(var i = 0; i< 10; i++) {
		result[i] = function (num){
			return function () {
				return num
			}
		}(i)
	}
	return result
}
console.log('bar', bar()[0]())


// this对象
var name = 'window'

var obj = {
  name: 'my_obj',
  getName: function () {
    return function () {
      return this.name
    }
  }
}

console.log(obj.getName()())

// 修改

var obj = {
  name: 'my_obj',
  getName: function () {
    var that = this
    return function () {
      return that.name
    }
  }
}
console.log(obj.getName()())


function zoo(num) {
	(function() {
		for (var i = 0; i < 5; i++) {
			num += i
		}
	})()

	console.log('zoo2', num)
	return num
}
console.log('zoo', zoo(10))

// 存储变量
function Store() {
	var state = 10

	return function () {
		return state
	}
}
var store = Store()
console.log(store())

// 循环

for (var i = 0; i < 5; i++) {
	setTimeout(function timer () {
		console.log(i)
	}, i*1000)
}