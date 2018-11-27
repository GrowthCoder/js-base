const lg = console.log

function add () {
  let args = arguments

  if (args.length === 1) {
    return function () {
      return args[0] + arguments[0]
    }
  }

  return args[0] + args[1]
}
lg(add(2, 5))
lg(add(2)(5))

function getValue (value, time) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(value)
    }, time)
  })
}

(async () => {
  await getValue(1, 300)
  await getValue(2, 200)
})()

// (async () => {
//   const a = getValue(1, 300)
//   const b = getValue(2, 200)

//   await a
//   await b
// })()