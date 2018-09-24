import _ from 'lodash'
import error from './error'
import Core from './core'

	// taobao.user.buyer.get
	Core.prototype.userBuyerGet=(httpArgs, args, callback) =>{
		const defaultArg = {
			method: 'taobao.user.buyer.get',
			fields: 'user_id,nick,sex,buyer_credit,avatar,has_shop,vip_info'
		};

		this.callDefaultArg(defaultArg, httpArgs, args, callback);
	}

	// taobao.user.get
	Core.prototype.userGet=(httpArgs, args, callback) =>{
		const defaultArg = {
			method: 'taobao.user.get'
		};

		this.callDefaultArg(defaultArg, httpArgs, args, callback);
	}

	// taobao.user.seller.get
	Core.prototype.userSellerGet = (httpArgs, args, callback) =>{
		const defaultArg = {
			method: 'taobao.user.seller.get',
			fields: 'user_id,nick,sex,seller_credit,type,has_more_pic,item_img_num,item_img_size,prop_img_num,' +
				'prop_img_size,auto_repost,promoted_type,status,alipay_bind,consumer_protection,avatar,liangpin,' +
				'sign_food_seller_promise,has_shop,is_lightning_consignment,has_sub_stock,is_golden_seller,vip_info,' +
				'magazine_subscribe,vertical_market,online_gaming'
		};

		this.callDefaultArg(defaultArg, httpArgs, args, callback);
	},

	// taobao.users.get
	Core.prototype.usersGet = (httpArgs, args, callback)=> {
		const defaultArg = {
			method: 'taobao.users.get'
		};

		this.callDefaultArg(defaultArg, httpArgs, args, callback);
	}
