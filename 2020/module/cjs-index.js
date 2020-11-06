const { count } = require('./cjs-base');
setTimeout(() => {
    console.log("count is" + count + 'in commonjs');
}, 1000)