/*
 * @description: 深拷贝 
 * 深拷贝可以通过以下几种方式进行
 * 1. JSON.parse(JSON.stringify(target)) 缺陷会忽略以下属性内容 function symbol undefined，不能解决循环引用
 * 2. 手动实现深拷贝 递归方法
 */

// 破解递归爆栈
function cloneLoop(x) {
    const root = {};

    // 栈
    const loopList = [
        {
            parent: root,
            key: undefined,
            data: x,
        }
    ];

    while(loopList.length) {
        // 广度
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = {};
        }

        for(let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    // 下一次循环
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
                }
            }
        }
    }

    return root;

}
// 对象也可以当成树形结构
var a = {
    a1: 1,
    a2: {
        b1: 1,
        b2: {
            c1: 1
        }
    }
}

var arr = [1,2,3,{info: 'name'}]

var b = cloneLoop(a)
b.a1 = 2

// 递归遍历
function deepClone(source){
    const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
    for(let keys in source){ // 遍历目标
        if(source.hasOwnProperty(keys)){
            if(source[keys] && typeof source[keys] === 'object'){ // 如果值是对象，就递归一下
            //   targetObj[keys] = source[keys].constructor === Array ? [] : {};
                targetObj[keys] = deepClone(source[keys]);
            } else { // 如果不是，就直接赋值 目的 存储值而不是存储引用
                targetObj[keys] = source[keys];
            }
        } 
    }
    return targetObj;
}
var c = deepClone(arr)
a.a1 = 33
arr[3].info = 'gao'
// console.log(c)


function deepClone2(obj) {
    function isObject(o) {
      return (typeof o === 'object' || typeof o === 'function') && o !== null
    }
  
    if (!isObject(obj)) {
      throw new Error('非对象')
    }
  
    let isArray = Array.isArray(obj)
    let newObj = isArray ? [...obj] : { ...obj }
    Reflect.ownKeys(newObj).forEach(key => {
      newObj[key] = isObject(obj[key]) ? deepClone2(obj[key]) : obj[key]
    })
  
    return newObj
}

let obj = {
    a: [1, 2, 3],
    b: {
        c: 2,
        d: 3
    }
}
let newObj = deepClone2(obj)
newObj.b.c = 1
console.log(obj.b.c) // 2