/*
* https://mp.weixin.qq.com/s/_YxwV2umR7PH-R2ouCepSQ
* 观察者模式
* 1、promise接收一个executor，立即执行，内部任务被放进宏/微任务中
* 2、then()执行，收集成功或者失败回调，
* 3、executor() 异步任务被执行，触发resolve、reject，从成功/失败中取出回调依次执行
* 4、promiseA+规范 promise是一个状态机 pending、Fulfilled、Rejected，状态是单向的
* 5、then方法接收两个参数，then方法返回一个promise then可以被同一个promise调用多次
* 6、「处理状态为resolve/reject的情况」：其实我们上边 then() 的写法是对应状态为padding的情况，但是有些时候，resolve/reject 在 then() 之前就被执行（比如Promise.resolve().then()），如果这个时候还把then()回调push进resolve/reject的执行队列里，那么回调将不会被执行，因此对于状态已经变为
*/ 

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejeted';

class MyPromise {
  // 构造方法接收一个回调
  constructor(executor) {
    this._status = PENDING
    this._value = undefined // 储存then回调return的值
    this._resolveQueue = []    // then收集的执行成功的回调队列
    this._rejectQueue = []     // then收集的执行失败的回调队列

    // 由于resolve/reject是在executor内部被调用, 因此需要使用箭头函数固定this指向, 否则找不到this._resolveQueue
    let _resolve = (val) => {
      // //把resolve执行回调的操作封装成一个函数,放进setTimeout里,以兼容executor是同步代码的情况
      const run = () => {
        if (this._status !== PENDING) return // 对应规范中的"状态只能由pending到fulfilled或rejected"
        this._status = FULFILLED
        this._value = val

        // 从成功队列里取出回调依次执行
        while(this._resolveQueue.length) {
          const callback = this._resolveQueue.shift()
          callback(val)
        }
      }
      setTimeout(run)
    }
    // 实现同resolve
    let _reject = (val) => {
      const run = () => {
        if (this._status !== PENDING) return

        this._status = REJECTED
        this._value = val

        while(this._rejectQueue.length) {
          const callback = this._rejectQueue.shift()
          callback(val)
        }
      }

      setTimeout(run)
    }
    // new Promise()时立即执行executor,并传入resolve和reject
    executor(_resolve, _reject)
  }

  // then方法,接收一个成功的回调和一个失败的回调，并push进对应队列
  // 链式调用 需要返回一个新的promise
  then(resolveFn, rejectFn) {
    // 根据规范 如果then的参数不是一个function 
    typeof resolveFn !== 'function' ? resolveFn = value => value : null
    typeof rejectFn !== 'function' ? rejectFn = value => value : null

    return new MyPromise((resolve, reject) => {
      const fulfilledFn = value => {
        try {
          let x = resolveFn(value)
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch(error) {
          reject(error)
        }
      }
      
      const rejectedFn = value => {
        try {
          let x = rejectFn(value)

          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch(error) {
          reject(error)
        }
      }
     
      switch(this._status) {
        // 当前状态是pending时，把then回调push到resolve/reject执行队列 等待执行
        case PENDING:
          this._resolveQueue.push(fulfilledFn)
          this._rejectQueue.push(rejectedFn)
          break
          // 当状态非pending 直接执行回调
        case FULFILLED:
          fulfilledFn(this._value)
          break
        case REJECTED:
          rejectedFn(this._value)
          break
      }
    })
  }
  // 捕获异常
  catch(rejectFn) {
    return this.then(undefined, rejectFn)
  }
  // 静态resolve方法
  static resolve(value) {

  }
}

const p1 = new MyPromise((resolve, reject) => {
  // setTimeout(() => {
    resolve(1)
  // }, 500);
})

p1
  .then(res => {
    console.log(res, '1')
    return 2//链式调用测试
  })
  .then()
  .then(res => {
    console.log(res, '2')
    return new MyPromise((resolve, reject) => {
      resolve(3)
    })
  })
  .then(res => {
    console.log(res, '3')
    throw new Error('reject 测试')
  })
  .then(res => {
    console.log(res, '4')
  }, err => {
    console.log(err, 'err')
})

