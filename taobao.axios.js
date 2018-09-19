const config = require('./config')
const axios = require('axios')
const baseURL = config.apiSandMode ? config.tmallSandUrl : config.tmallHostUrl
module.exports = {
  api: axios.create({
    baseURL: baseURL,
    timeout: 3000000,
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8'
    }
  })
}
