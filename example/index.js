const taobao = require('./../taobao');
const config = require('./config')
taobao.config(config)

// taobao.core.call({
//     method: 'taobao.product.get',
// 	cid: 50011999,
// 	product_id: 271824,
// 	fields: 'name'
// },null)
// .then(res => console.log(res.data), err => console.log(err.message))
//
// taobao.productGet({
// 		cid: 50011999,
// 		product_id: 271824,
// 		fields: 'name'
// }, function(api){
// 	api.then(res => console.log(res.data), err => console.log(err.message))
// })
//
taobao.itemcatsGet({}, null, function(res){
	console.log(res)
})
