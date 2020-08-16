// 防抖


// queryString


/*
* 业务需求中经常有只需要最后一次请求的结果
* 编写一个高阶函数，传递旧请求方法，返回一个新的方法，连续触发时，若上一次promise执行未结束则直接废弃
* 只有最后一次请求回触发then/catch
*/ 
function lastPromise(promiseFunction) {
    //todo
    promiseFunction()
}

let count = 0;
let promiseFunction = () =>
    new Promise(rs => {
        window.setTimeout(() => {
            rs(count++);
        })
    }
);

let lastFn = lastPromise(promiseFunction);

lastFn().then(console.log)
lastFn().then(console.log)
lastFn().then(console.log)