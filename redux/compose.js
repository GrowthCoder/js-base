var f1 = a => a
var f2 = b => b * 2
var f3 = c => c * 3

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => {
    return a(b(...args))
  })
}

compose(f1, f2, f3)
