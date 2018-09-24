require('dotenv').config()
const taobao = require('./../taobao')
const config = require('./config')

taobao.config({
    app_key: config.config.app_key,
    app_secret: config.config.app_secret
});

taobao.core.call({
    method: 'taobao.areas.get',
    fields: 'id,type,name,parent_id,zip'
}, function(data) {
    console.log(data);
});