import _ from 'lodash'
import { crypt, dateString } from './helper'
import querystring from 'querystring'
import apierror from './error'

const cfg = {
  httpRealHost : 'gw.api.taobao.com',
  httpRealPath : '/router/rest',
  httpSandHost : 'gw.api.tbsandbox.com',
  httpSandPath : '/router/rest',
  httpsRealHost: 'eco.taobao.com',
  httpsRealPath: '/router/rest',
  httpsSandHost: 'gw.api.tbsandbox.com',
  httpsSandPath: '/router/rest',
  'app_key'    : '',
  'app_secret' : '',
  sandbox      : false,
  session      : ''
}

export default class Core {
  constructor () {
    this.error = apierror
  }

  config (config) {
    _.extend(cfg, config)
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
  /* eslint-enable */
  call (httpArgs, args, callback) {
    // compatiple with call (args, callback) signature
    if (arguments.length === 2) {
      callback = args
      args = httpArgs
      httpArgs = {}
    }
    args.timestamp = args.timestamp || dateString(new Date())
    args.format = args.format || 'json'
    args['app_key'] = args['app_key'] || cfg['app_key']
    args['app_secret'] = args['app_secret'] || cfg['app_secret']
    args.v = args.v || '2.0'
    args['sign_method'] = args.sign_method || 'md5'
    args.session = args.session || cfg.session

    if (!args.session) {
      delete args.session
    }

    args.sign = this.signArgs(args)

    let	params = ''

    delete args['app_secret']
    params = querystring.stringify(args)

    let host, path
    const protocol = (httpArgs.protocol || 'http').toLowerCase()
    const httpMethod = (httpArgs.method || 'get').toLowerCase()
    const sandbox = httpArgs.sandbox === true ? true : cfg.sandbox === true

    switch (protocol) {
    case 'https':
      host = sandbox ? cfg.httpsSandHost : cfg.httpsRealHost
      path = sandbox ? cfg.httpsSandPath : cfg.httpsRealPath
      break
    default:
      host = sandbox ? cfg.httpSandHost : cfg.httpRealHost
      path = sandbox ? cfg.httpSandPath : cfg.httpsRealPath
      break
    }

    const protocolProxy =
        protocol === 'https' ? require('https') : require('http')
    let resData = ''

    const headers = {}

    if (httpMethod === 'post') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    const reqOpts = {
      method : httpMethod,
      host   : host,
      headers: headers,
      path   : path + (httpMethod === 'get' ? '?' + params : '')
    }

    const req = protocolProxy.request(reqOpts, res => {
      if (res.statusCode !== 200) {
        // eslint-disable-next-line standard/no-callback-literal
        callback && callback({
          'error_response': {
            code      : apierror.NETERROR.code,
            msg       : apierror.NETERROR.msg,
            statusCode: res.statusCode
          } })
        req.isErrorReturned = true
      } else {
        res.setEncoding('utf-8')
        res.on('data', chunk => {
          resData += chunk
        })
        res.on('end', () => {
          let data
          try {
            data = JSON.parse(resData)
          } catch (e) {
            data = resData
          }
          callback && callback(data)
        })
      }
    })

    req.on('error', e => {
      if (req.isErrorReturned) {

      } else {
        // eslint-disable-next-line standard/no-callback-literal
        callback && callback({
          'error_response': {
            code: apierror.NETERROR.code,
            msg : e.message || apierror.NETERROR.msg
          } })
        req.isErrorReturned = true
      }
    })

    if (httpMethod === 'post') {
      req.write(params)
    }

    req.end()
  }

  signArgs (args) {
    const argArr = []

    for (const argName in args) {
      if (argName !== 'sign' && argName !== 'app_secret') {
        argArr.push(argName + args[argName])
      }
    }
    let c = argArr.sort().join('')
    if (args.sign_method === 'md5') {
      c = args.app_secret + argArr.sort().join('') + args.app_secret
    }
    return crypt(c, args.sign_method, args.app_secret).toUpperCase()
  }

  callDefaultArg (defArg, httpArgs, args, callback) {
    defArg = defArg || {}
    httpArgs = httpArgs || {}

    if (_.isFunction(httpArgs)) {
      callback = httpArgs
      this.call(defArg, callback)
    } else if (_.isFunction(args)) {
      callback = args
      args = httpArgs
      _.extend(defArg, args)
      this.call(defArg, callback)
    } else if (_.isFunction(callback)) {
      _.extend(defArg, args)
      this.call(httpArgs, defArg, callback)
    } else {
      throw apierror.ARGINVALID
    }
  }
  generateApi (apiArr, defaultNamespace) {
    apiArr = apiArr || []
    const api = {}

    const dotReg = /\.([a-z])/ig

    const upperRep = (all, letter) => letter.toUpperCase()

    _.each(apiArr, apiObj => {
      let method
      let defaultArg = {}
      let namespace = defaultNamespace || 'taobao'

      if (typeof apiObj === 'string') {
        method = apiObj
      } else {
        method = apiObj.method
        namespace = apiObj.namespace || defaultNamespace || 'taobao'
        defaultArg = apiObj.defaultArg
      }

      const methodName = (namespace === 'taobao'
        ? method : namespace + '.' + method).replace(dotReg, upperRep)

      api[methodName] = (httpArgs, args, callback) => {
        const defArg = _.extend({
          method: namespace + '.' + method
        }, defaultArg)

        this.callDefaultArg(defArg, httpArgs, args, callback)
      }
    })

    return api
  }

  getConfig () {
    return cfg
  }
};
