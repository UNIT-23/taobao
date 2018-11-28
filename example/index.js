const taobao = require('./../index')
const config = require('./config')
taobao.config(config)

taobao.itemcatsGet({}).catch((res) => {
  console.log('Response', res) // eslint-disable-line no-console
})
