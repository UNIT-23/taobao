import _ from 'lodash'
import error from './error'
import Taobao from './taobao'

// taobao.itemcats.authorize.get
Taobao.prototype.itemcatsAuthorizeGet = function(httpArgs, args, callback) {
	const defaultArg = {
		method: 'taobao.itemcats.authorize.get',
		fields: ' brand.vid, brand.name, item_cat.cid, item_cat.name, item_cat.status,' +
			'item_cat.sort_order,item_cat.parent_cid,item_cat.is_parent, xinpin_item_cat.cid,' +
			' xinpin_item_cat.name, xinpin_item_cat.status, xinpin_item_cat.sort_order,' +
			' xinpin_item_cat.parent_cid, xinpin_item_cat.is_parent'
	};

	this.core.callDefaultArg(defaultArg, httpArgs, args, callback);
}

// taobao.itemcats.get
Taobao.prototype.itemcatsGet = function(httpArgs, args, callback) {
	const defaultArg = {
		method: 'taobao.itemcats.get',
		parent_cid: 0
	};

	this.core.callDefaultArg(defaultArg, httpArgs, args, callback);
}

// taobao.itemcats.increment.get
Taobao.prototype.itemcatsIncrementGet=function(httpArgs, args, callback) {
	const defaultArg = {
		method: 'taobao.itemcats.increment.get',
	};

	this.core.callDefaultArg(defaultArg, httpArgs, args, callback);
}

// taobao.itemprops.get 
Taobao.prototype.itempropsGet=function(httpArgs, args, callback) {
	const defaultArg = {
		method: 'taobao.itemprops.get'
	};

	this.core.callDefaultArg(defaultArg, httpArgs, args, callback);
}

// taobao.itempropvalues.get
Taobao.prototype.itempropvaluesGet=function(httpArgs, args, callback) {
	const defaultArg = {
		method: 'taobao.itempropvalues.get',
		fields: 'cid,pid,prop_name,vid,name,name_alias,status,sort_order'
	};

	this.core.callDefaultArg(defaultArg, httpArgs, args, callback);
},

// taobao.topats.itemcats.get
Taobao.prototype.topatsItemcatsGet=function(httpArgs, args, callback) {
	const defaultArg = {
		method: 'taobao.topats.itemcats.get'
	};

	this.core.callDefaultArg(defaultArg, httpArgs, args, callback);
}
