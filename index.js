const taobao = require('./taobao');
const { config, apiLocalMode } = rootRequire('./config/tmall')
const { api } = require('./taobao.axios')
const taobao = require('taobao')
const crypto = require('crypto')
const moment = require('moment')
const Promise = require('bluebird')
const {
    isBuffer,
    extend,
    each,
    omit,
    has,
    isFunction
} = require('lodash')
const fs = require('fs')
const path = require('path')
const FormData = require('form-data')
const fileType = require('file-type')

taobao.core.API_CONFIG = config

taobao.core.getConfig = function () {
    return this.API_CONFIG
}

taobao.core.signArgs = function (args) {
    const argArr = []

    for (const argName in args) {
        if (argName !== 'sign' && argName !== 'app_secret' &&
            !isBuffer(args[argName])) {
            argArr.push(argName + args[argName])
        }
    }
    const dataStr = argArr.sort().join('')

    return crypto.createHmac('md5', args.app_secret)
        .update(dataStr)
        .digest('hex')
        .toString()
        .toUpperCase()
}

taobao.core.call = function (httpArgs, args, callback) {
    // compatiple with call (args, callback) signature
    if (arguments.length < 3) {
        callback = args
        args = httpArgs
        httpArgs = {}
    }

    args = extend({}, this.getConfig(), args)
    // Mock Sample Data
    if (apiLocalMode) {
        callback(null, JSON.parse(fs.readFileSync(path.join(__dirname, '../',
            'sample-data', `${args.method}.json`))))
    }

    if (!args.session) {
        delete args.session
    }

    args.timestamp = args.timestamp || moment().format('YYYY-MM-DD HH:mm:ss')

    args.sign = this.signArgs(args)

    const formData = new FormData()

    each(omit(args, 'app_secret'), (val, key) => {
        if (isBuffer(val)) {
        let fileProps = null

        const buffer = Buffer.from(val)

        if ((fileProps = fileType(buffer))) {
            formData.append(key, val, `${moment().unix(moment())}.${fileProps.ext}`)
        }
    } else {
        formData.append(key, val)
    }
})

    getHeaders(formData)
        .then(headers =>
    api
        .post('/router/rest', formData, { headers: headers })
        .then(response => has(response.data, 'error_response')
        ? callback(response.data)
        : callback(null, response.data))
)
.catch(callback)
}

const getHeaders = formData =>
new Promise((resolve, reject) =>
formData.getLength((err, length) => {
    if (err) {
        return reject(err)
    }

    const headers = extend({
        'Content-Length': length
    }, formData.getHeaders())

    return resolve(headers)
})
)

extend(taobao, taobao.core.generateApi([
    'promotion.tip.campaign.create',
    'promotion.tjb.campaign.get',
    'promotion.tip.campaign.remove',
    'promotion.tip.campaign.modify',
    'promotion.tip.item.add',
    'item.add.schema.get',
    'item.schema.add'
], 'tmall'))

each(taobao, (value, key) => {
    if (isFunction(value)) {
    taobao[key] = Promise.promisify(value)
}
})

module.exports = taobao
