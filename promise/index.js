function Promise(executor) {
  var self = this;
  self.status = 'pending';
  self.data = undefined;
  self.onResolvedCallback = [];
  self.onRejectedCallback = [];
  try {
    executor(resolve, reject)
  } catch(e) {
    reject(e);
  }

  function resolve(value) {
    if(self.status === 'pending') {
      self.status = 'resolved';
      self.data = value;
     
      self.onResolvedCallback.forEach(onFulFilled => {
        onFulFilled();
      })
    }
  }
  
  function reject(reason) {
    if(self.status === 'pending') {
      self.status = 'rejected';
      self.data = reason;
      
      self.onRejectedCallback.forEach(onRejected => {
        onRejected();
      })
    }
  }
}

Promise.prototype.then = function(onResolved, onRejected) {
  let promise2;
  let self = this;
  onResolved = typeof onResolved === 'function' ? onResolved : function(value) { return value}; // promise值穿透
  onRejected = typeof onRejected === 'function' ? onRejected : function(reason) { return reason};

  if(self.status === 'resolved') {
    return promise2 = new Promise(function(resolve, reject) {
      try {
        var x = onResolved(self.data);

        // 如果x是promise的实例，返回promise实例结果
        if (x instanceof Promise) {
          x.then(resolve, reject);
        }
        resolve(x);
      } catch(e) {
        reject(e);
      }
    })
  }

  if(this.status === 'rejected') {
    return promise2 = new Promise(function(resolve, reject) {
      try {
        var x = onRejected(self.data);

        if (x instanceof Promise) {
          x.then(resolve, reject);
        }
        resolve(x);
      } catch(e) {
        reject(e);
      }
    })
  }
  // promise状态未改变，将其添加进入数组，等待事件返回
  if(this.status === 'pending') {
    return promise2 = new Promise(function(resolve, reject) {
      self.onResolvedCallback.push(function(value) {
        try {
          var x = onResolved(value);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          }
          resolve(x);
        } catch(e) {
          reject(e);
        }
      })

      self.onRejectedCallback.push(function(reason) {
        try {
          var x = onRejected(self.data);
  
          if (x instanceof Promise) {
            x.then(resolve, reject);
          }
          resolve(x);
        } catch(e) {
          reject(e);
        }
      })
    })
  }
}

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
}

Promise.resolve = function(value) {
  return new Promise(function(resolve, reject) {
    if (value instanceof Promise) {
      value.then(resolve, reject);
    }
    resolve(value);
  })
}

Promise.all = function(promises) {
  return new Promise(function(resolve, reject) {
    var resolvedCounter = 0;
    var promiseNum = promises.length;
    var resolvedValues = new Array(promiseNum)

    for(let i = 0; i< promiseNum; i++) {
      Promise.resolve(promises[i]).then(function(value) {
        resolvedCounter++
        resolvedValues[i] = value;
        if(resolvedCounter === promiseNum) {
          return resolve(resolvedValues)
        }
      }, function(reason) {
        return reject(reason);
      })
    }
  })
}

// test

function timerPromisefy(delay) {
  return new Promise(function (resolve, reject) {
      setTimeout(function () {
        // console.log(delay);    // => 1
        // resolve(delay);
        reject(delay)
      }, delay);
  });
}

// Promise.all([
//   timerPromisefy(200),
//   timerPromisefy(300),
//   timerPromisefy(400)
// ]).then(function(val){
//   console.log(val, 'all')
// })

// new Promise(timerPromisefy(200)).then(val =>console.log(val, '1'))
timerPromisefy(200).then(val => console.log(val, 3), err => console.log(err, 4))