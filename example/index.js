const taobao = require('./../taobao')
const config = require('./config')
taobao.config(config)

taobao.itemcatsGet({}, null, function (res) {
  console.log(res) // eslint-disable-line no-console
})
