const _ = require('lodash')

const fs = require('fs')

const path = require('path')

const core = require('./lib/core')

module.exports = {
  config: function (config) {
    core.config(config)
  },

  updateSession: function (session) {
    core.config({
      session: session
    })
  },

  core: core
}

fs.readdirSync(path.join(__dirname, 'lib')).forEach(function (filename) {
  if (!/\.js$/.test(filename)) {
    return
  }

  const name = path.basename(filename, '.js')

  const excludeFiles = ['core', 'error', 'helper']

  if (!~excludeFiles.indexOf(name)) {
    _.extend(module.exports, require('./lib/' + name))
  }
})
