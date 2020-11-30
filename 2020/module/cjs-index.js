const { count } = require('./cjs-base');
setTimeout(() => {
    console.log("count is " + count + 'in commonjs');

    console.log(require.cache)
}, 1000)

