"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateString = exports.crypt = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crypt = function crypt(text, algo, key) {
  text = String(text || '');
  algo = algo || 'sha256';
  key = key || '';

  if (algo === 'md5') {
    return _crypto.default.createHash(algo).update(Buffer.from(text)).digest('hex');
  } else {
    return _crypto.default.createHmac('md5', key).update(Buffer.from(text)).digest('hex');
  }
};

exports.crypt = crypt;

var dateString = function dateString(d) {
  return d.getFullYear().toString() + '-' + ((d.getMonth() + 1).toString().length === 2 ? (d.getMonth() + 1).toString() : '0' + (d.getMonth() + 1).toString()) + '-' + (d.getDate().toString().length === 2 ? d.getDate().toString() : '0' + d.getDate().toString()) + ' ' + (d.getHours().toString().length === 2 ? d.getHours().toString() : '0' + d.getHours().toString()) + ':' + ((parseInt(d.getMinutes() / 5) * 5).toString().length === 2 ? (parseInt(d.getMinutes() / 5) * 5).toString() : '0' + (parseInt(d.getMinutes() / 5) * 5).toString()) + ':00';
};

exports.dateString = dateString;