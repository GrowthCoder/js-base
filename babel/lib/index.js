import _regeneratorRuntime from "@babel/runtime/regenerator";
import "core-js/modules/es6.promise";
import "regenerator-runtime/runtime";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import "core-js/modules/es7.array.includes";
import "core-js/modules/es6.string.includes";
import "core-js/modules/es6.object.assign";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.to-string";
import "core-js/modules/es6.string.iterator";
import "core-js/modules/es6.map";
var a = new Map();
Object.assign({}, {
  1: 1
});
"foobar".includes("foo");

function testAwait() {
  return _testAwait.apply(this, arguments);
}

function _testAwait() {
  _testAwait = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new Promise();

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _testAwait.apply(this, arguments);
}