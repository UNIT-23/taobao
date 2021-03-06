"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _helper = require("./helper");

var _querystring = _interopRequireDefault(require("querystring"));

var _error = _interopRequireDefault(require("./error"));

var _formData = _interopRequireDefault(require("form-data"));

var _axios = _interopRequireDefault(require("axios"));

var _fileType = _interopRequireDefault(require("file-type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var cfg = {
  httpRealHost: 'gw.api.taobao.com',
  httpRealPath: '/router/rest',
  httpSandHost: 'gw.api.tbsandbox.com',
  httpSandPath: '/router/rest',
  httpsRealHost: 'eco.taobao.com',
  httpsRealPath: '/router/rest',
  httpsSandHost: 'gw.api.tbsandbox.com',
  httpsSandPath: '/router/rest',
  'app_key': '',
  'app_secret': '',
  sandbox: false,
  session: ''
};

var Core =
/*#__PURE__*/
function () {
  function Core() {
    _classCallCheck(this, Core);

    this.api = _axios.default.create({
      baseUrl: '',
      timeout: 3000000,
      headers: {
        'Content-Type': 'multipart/form-data;charset=utf-8'
      }
    });
  }

  _createClass(Core, [{
    key: "config",
    value: function config(_config) {
      _lodash.default.extend(cfg, _config);
    }
    /*eslint-disable*/

    /**
    * low-level for call tao bao api
    *
    * @param {Object}
    *            httpArgs http arguments for call api
    * <pre>
    * {
    *   method : 'get',			//http method - optional, default is get
    *   protocol: 'http'			//http protocol(http or https) - optional, default is http
    *   sandbox: false				//whether to call api in sandbox - optional, default is false
    * }
    * </pre>
    *
    * @param {Object}
    *            args api args need to call taobao api
    * <pre>
    * {
    *   // system arguments
    *   method : 'taobao.taobaoke.items.get',		//api method - required
    *   timestamp: '2012-03-15 21:00:00',			//time stamp - optional, default is the time when call the api
    *   format: 'json',							//the result format - optional, default is json
    *   app_key: 'xxxx',							//app key - required, config use init method or pass through here
    *   app_secret: 'xxxxx',						//app secret - required, config use init method or pass through here
    *   v: '2.0',									//api version - optional, default is 2.0
    *   sign_method: 'md5'							//sign method - optional, default is md5, now only support md5
    *
    *   // method specific arguments
    *
    * }
    * </pre>
    *
    * @param {Function}
    *            callback function with parameters to get the result
    *
    * @returns {Array[search...]}
    */

  }, {
    key: "call",
    value: function call(httpArgs, args) {
      var _this = this;

      if (arguments.length === 1) {
        args = httpArgs;
        httpArgs = {};
      }

      args.timestamp = args.timestamp || (0, _helper.dateString)(new Date());
      args.format = args.format || 'json';
      args['app_key'] = args.app_key || cfg.app_key;
      args['app_secret'] = args.app_secret || cfg.app_secret;
      args.v = args.v || '2.0';
      args.sign_method = args.sign_method || 'md5';
      args.session = args.session || cfg.session;

      if (!args.session) {
        delete args.session;
      }

      args.sign = this.signArgs(args);
      var host, path;
      var protocol = (httpArgs.protocol || 'http').toLowerCase();
      var httpMethod = (httpArgs.method || 'get').toLowerCase();
      var sandbox = httpArgs.sandbox === true ? true : cfg.sandbox === true;

      switch (protocol) {
        case 'https':
          host = sandbox ? cfg.httpsSandHost : cfg.httpsRealHost;
          path = sandbox ? cfg.httpsSandPath : cfg.httpsRealPath;
          break;

        default:
          host = sandbox ? cfg.httpSandHost : cfg.httpRealHost;
          path = sandbox ? cfg.httpSandPath : cfg.httpsRealPath;
          break;
      }

      var headers = {};

      if (httpMethod == 'post') {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
      }

      var baseUrl = protocol + '://' + host + path + (httpMethod === 'get' ? '?' + _querystring.default.stringify(_lodash.default.omit(args, 'app_secret')) : '');
      var apiCall = null;

      if (httpMethod !== 'get') {
        var formData = new _formData.default();

        _lodash.default.each(_lodash.default.omit(args, 'app_secret'), function (val, key) {
          if (_lodash.default.isBuffer(val)) {
            var fileProps = null;
            var buffer = Buffer.from(val);

            if (fileProps = (0, _fileType.default)(buffer)) {
              formData.append(key, val, "".concat(moment().unix(moment()), ".").concat(fileProps.ext));
            }
          } else {
            formData.append(key, val);
          }
        });

        apiCall = this.getHeaders(formData).then(function (headers) {
          return _this.api.post(baseUrl, formData, {
            headers: _objectSpread({}, headers, {
              'transfer-encoding': 'chunked'
            })
          });
        });
      } else {
        apiCall = this.api.get(baseUrl);
      }

      return apiCall.then(function (response) {
        if (_lodash.default.has(response, 'data.error_response')) {
          throw response.data;
        }

        return response.data ? response.data : response;
      }).catch(function (e) {
        if (e.code === 'ENOTFOUND') {
          throw {
            error_response: _error.default.NETERROR
          };
        }

        throw e.data ? e.data : e;
      });
    }
  }, {
    key: "signArgs",
    value: function signArgs(args) {
      var argArr = [];

      for (var argName in args) {
        if (argName != 'sign' && argName != 'app_secret' && !_lodash.default.isBuffer(args[argName])) {
          argArr.push(argName + args[argName]);
        }
      }

      var c = argArr.sort().join('');

      if (args.sign_method === 'md5') {
        c = args.app_secret + c + args.app_secret;
      }

      return (0, _helper.crypt)(c, args.sign_method, args.app_secret).toUpperCase();
    }
  }, {
    key: "callDefaultArg",
    value: function callDefaultArg(defArg, httpArgs, args) {
      defArg = defArg || {};
      httpArgs = httpArgs || {};
      args = args || {};

      if (_lodash.default.isEmpty(defArg)) {
        throw _error.default.ARGINVALID;
      } else if (_lodash.default.isEmpty(httpArgs)) {
        return this.call(defArg);
      } else if (_lodash.default.isEmpty(args)) {
        return this.call(_objectSpread({}, defArg, httpArgs));
      } else {
        return this.call(httpArgs, _objectSpread({}, defArg, args));
      }
    }
  }, {
    key: "generateApi",
    value: function generateApi(apiArr, defaultNamespace) {
      var _this2 = this;

      apiArr = apiArr || [];
      var api = {};
      var dotReg = /\.([a-z])/ig;

      var upperRep = function upperRep(all, letter) {
        return letter.toUpperCase();
      };

      _lodash.default.each(apiArr, function (apiObj) {
        var method;
        var defaultArg = {};
        var namespace = defaultNamespace || 'taobao';

        if (typeof apiObj === 'string') {
          method = apiObj;
        } else {
          method = apiObj.method;
          namespace = apiObj.namespace || defaultNamespace || 'taobao';
          defaultArg = apiObj.defaultArg;
        }

        var methodName = (namespace === 'taobao' ? method : namespace + '.' + method).replace(dotReg, upperRep);

        api[methodName] = function (httpArgs, args) {
          var defArg = _lodash.default.extend({
            method: namespace + '.' + method
          }, defaultArg);

          return _this2.callDefaultArg(defArg, httpArgs, args);
        };
      });

      return api;
    }
  }, {
    key: "getConfig",
    value: function getConfig() {
      return cfg;
    }
  }, {
    key: "getHeaders",
    value: function getHeaders(formData) {
      return new Promise(function (resolve, reject) {
        return formData.getLength(function (err, length) {
          if (err) {
            return reject(err);
          }

          var headers = _lodash.default.extend({
            'Content-Length': length
          }, formData.getHeaders());

          return resolve(headers);
        });
      });
    }
  }]);

  return Core;
}();

exports.default = Core;