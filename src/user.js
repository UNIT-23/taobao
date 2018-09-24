import _ from 'lodash'
import error from './error'
import Taobao from './taobao'

// taobao.user.buyer.get
Taobao.prototype.userBuyerGet = function(httpArgs, args, callback) {
	const defaultArg = {
		method: 'taobao.user.buyer.get',
		fields: 'user_id,nick,sex,buyer_credit,avatar,has_shop,vip_info'
	};

	this.core.callDefaultArg(defaultArg, httpArgs, args, callback);
}

// taobao.user.get
Taobao.prototype.userGet = function(httpArgs, args, callback) {
	const defaultArg = {
		method: 'taobao.user.get'
	};

	this.core.callDefaultArg(defaultArg, httpArgs, args, callback);
}

// taobao.user.seller.get
Taobao.prototype.userSellerGet = function(httpArgs, args, callback){
	const defaultArg = {
		method: 'taobao.user.seller.get',
		fields: 'user_id,nick,sex,seller_credit,type,has_more_pic,item_img_num,item_img_size,prop_img_num,' +
			'prop_img_size,auto_repost,promoted_type,status,alipay_bind,consumer_protection,avatar,liangpin,' +
			'sign_food_seller_promise,has_shop,is_lightning_consignment,has_sub_stock,is_golden_seller,vip_info,' +
			'magazine_subscribe,vertical_market,online_gaming'
	};

	this.core.callDefaultArg(defaultArg, httpArgs, args, callback);
},

// taobao.users.get
Taobao.prototype.usersGet = function(httpArgs, args, callback) {
	const defaultArg = {
		method: 'taobao.users.get'
	};

	this.core.callDefaultArg(defaultArg, httpArgs, args, callback);
}
