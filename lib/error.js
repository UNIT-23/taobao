"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// define api error code, code start from 10000
var _default = {
  NETERROR: {
    code: 10000,
    msg: 'network error'
  },
  PARSEERROR: {
    code: 10001,
    msg: 'parse error'
  },
  METHODNOTIMPL: {
    code: 10002,
    msg: 'method is not implemented'
  },
  ARGINVALID: {
    code: 10003,
    msg: 'arguments call api method is invalid'
  }
};
exports.default = _default;