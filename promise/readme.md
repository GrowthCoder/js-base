### Promise对象特点
- 有了Promise对象，就可以**将异步操作以同步操作的流程**表达出来，避免了层层嵌套的回调函数。
- 对象的状态不受外界影响，三种状态：Pending（进行中）、Resolved、Rejected;只有异步操作的结果，可以决定当前是哪一种状态
```
var promise = new Promise(function(resolve, reject) {
// ... some code
if (/* 异步操作成功 */){
    resolve(value);
} else {
        reject(error);
    }
});

```
Promise构造函数接受一个函数作为参数， 该函数的两个参数分别是 resolve 和 reject 。 它们是两个函数， 由JavaScript引擎
提供， 不用自己部署。

Promise实例生成以后， 可以用 **then** 方法分别指定 Resolved 状态和 Reject 状态的回调函数。

```
promise.then(function(value) {
// success
}, function(error) {
// failure
})
```
then 方法可以接受两个回调函数作为参数。 第一个回调函数是Promise对象的状态变为Resolved时调用， 第二个回调函数是
Promise对象的状态变为Reject时调用。 其中， **第二个函数是可选的**， 不一定要提供。 这两个函数都接受Promise对象传出的值
作为参数。

**Promise 新建后就会立即执行**
```
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```
上面代码中，Promise 新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出



#### Promise.prototype.then()
==then方法每次都会创建并返回一个新的promise==

为Promise实例添加状态改变时的回调函数，then 方法的第一个参数是Resolved状态的回调函数， 第二个参数（ 可选） 是Rejected
状态的回调函数。

==**then 方法返回的是一个新的Promise实例（ 注意， 不是原来那个Promise实例） 。 因此可以采用链式写法， 即 then 方法后面
再调用另一个 then 方法。**==

```
getJSON("/posts.json").then(function(json) {
    return json.post;
}).then(function(post) {
// ...
});

 上面的代码使用 then 方法， 依次指定了两个回调函数。 第一个回调函数完成以后， 会将返回结果作为参数， 传入第二个回调函数
```
==采用链式的 then ， 可以指定一组按照次序调用的回调函数==
这时， 前一个回调函数，有可能返回的还是一个Promise对象（ 即
有异步操作）,这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。


```
getJSON("/post/1.json").then(function(post) {
    return getJSON(post.commentURL);
}).then(function funcA(comments) {
    console.log("Resolved: ", comments);
}, function funcB(err){
    console.log("Rejected: ", err);
});
```
上面代码中，第一个 then 方法指定的回调函数， 返回的是另一个Promise对象。这时第二个 then 方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。如果变为Resolved，就调用 funcA，如果状态变为Rejected，就调用funcB。


```
// 采用箭头函数写法
getJSON("/post/1.json").then(
    post => getJSON(post.commentURL)
).then(
    comments => console.log("Resolved: ", comments),
    err => console.log("Rejected: ", err)
);
```


> 使用promise.then(onFulfilled, onRejected)的话<br>
在 onFulfilled 中发生异常的话，<br>在onRejected 中是捕获不到这个异常的。<br>在promise.then(onFulfilled).catch(onRejected) 的情况下,then 中产生的异常能在 .catch 中捕获


#### 非链式写法 vs 链式写法
```

// 1: 对同一个promise对象同时调用 `then` 方法
var aPromise = new Promise(function (resolve) {
    resolve(100);
});
aPromise.then(function (value) {
    return value * 2;
});
aPromise.then(function (value) {
    return value * 2;
});
aPromise.then(function (value) {
    console.log("1: " + value); // => 100
})

// vs

// 2: 对 `then` 进行 promise chain 方式进行调用
var bPromise = new Promise(function (resolve) {
    resolve(100);
});
bPromise.then(function (value) {
    return value * 2;
}).then(function (value) {
    return value * 2;
}).then(function (value) {
    console.log("2: " + value); // => 100 * 2 * 2
});
```
方法1，每个then都是独立的，互不影响，每个value值都是100，

方法2，链式调用，传给每个then方法的value,都是前一个promise对象通过return返回的

#### Promise.prototype.catch()
用于指定发生错误时的回调函数


### Promise静态方法
- Promise.resolve
静态方法Promise.resolve(value) 可以认为是 new Promise() 方法的快捷方式
```
//Promise.resolve(42)，让promise对象立即进入确定状态（resolved）
// 两个写法等价
new Promise(function(resolve){
    resolve(42);
});
```

- Promise.reject

### Thenable
具有then方法的对象，但实现方式和promise.then不完全一样。使用的时候，需要将thenable转化为相应的promise对象。

```
var Q = require("Q");
// 这是一个ES6的promise对象
var promise = new Promise(function(resolve){
    resolve(1);
});
// 变换为Q promise对象
Q(promise).then(function(value){
    console.log(value);
}).finally(function(){ 
    console.log("finally");
});
```
最开始创建的promise具有then方法，因此是一个Thenable对象，但不具备finally方法，通过`Q(promise)`方法，将promise转化为Q promise对象。

#### Promise在规范上规定 Promise只能使用异步调用方式 。

#### Promise.all()
用于将多个Promise实例，包装成一个新的Promise实例，同时、并行执行传递的参数，

```
var p = Promise.all([p1,p2,p3]);
```
#### Promise.race()
只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理。

```
// `delay`毫秒后执行resolve
function timerPromisefy(delay) {
    return new Promise(function (resolve) {
        setTimeout(function () {
          console.log(delay);    // => 1
            resolve(delay);
        }, delay);
    });
}
// 任何一个promise变为resolve或reject 的话程序就停止运行
Promise.race([
    timerPromisefy(1),
    timerPromisefy(32),
    timerPromisefy(64),
    timerPromisefy(128)
]).then(function (value) {
    console.log(value);    // => 1
});
```
每个promise都会执行，但只要有一个状态先改变（FuFilled）即进入then方法。==promise的执行状态不会被取消。==

### Advanced



### 参考资料
- [promise-book](http://liubin.org/promises-book/#introduction) 
- [q](https://github.com/kriskowal/q)
- [手写promise](https://github.com/xieranmaya/Promise3/blob/master/Promise3.js)
- [手写promise](https://github.com/xieranmaya/blog/issues/3)