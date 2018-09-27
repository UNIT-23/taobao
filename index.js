'use strict'

/**
  * The entry point.
  *
  * @module taobao
  */

const Taobao = require('./lib/taobao').default
const taobao = new Taobao()
const _ = require('lodash')
const fs = require('fs')
const path = require('path')

fs.readdirSync(path.join(__dirname, 'lib')).forEach(filename => {
  if (!/\.js$/.test(filename)) {
    return
  }

  const name = path.basename(filename, '.js')

  const excludeFiles = ['core', 'error', 'helper', 'index']

  if (!~excludeFiles.indexOf(name)) {
    const { apis, namespace = null } = require(path.join(__dirname,
      'lib', name)).default || {}

    const methods = taobao.core.generateApi(apis, namespace)
    _.extend(taobao, methods)
  }
})

module.exports = taobao
module.exports.taobao = taobao
module.exports.default = taobao
