"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crypt = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crypt = function crypt(text, algo, key) {
  text = String(text || '');
  algo = algo || 'sha256';
  key = key || '';

  if (algo === 'md5') {
    return _crypto.default.createHash(algo).update(new Buffer(text)).digest('hex');
  } else {
    return _crypto.default.createHmac('md5', key).update(new Buffer(text)).digest('hex');
  }
};

exports.crypt = crypt;