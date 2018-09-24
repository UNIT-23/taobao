require('dotenv').config()
const taobao = require('./../taobao')
const config = require('./config')

console.log(config.config.app_key)
console.log(config.config.app_secret)
console.log(config.config.session)
taobao.config({
    app_key: config.config.app_key,
    app_secret: config.config.app_secret,
    session: config.config.session
});

taobao.userBuyerGet({
    fields: 'user_id,nick,sex,buyer_credit,avatar,has_shop,vip_info'
}, function(data) {
    console.log(data);
});