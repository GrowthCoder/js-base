var count = 0;
setTimeout(() => {
    console.log("base1.count", ++count); // 1
}, 500)
export var count = count;