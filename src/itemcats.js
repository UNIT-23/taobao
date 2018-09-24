import _ from 'lodash'
import error from './error'
import Core from './core'

// taobao.itemcats.authorize.get
Core.prototype.itemcatsAuthorizeGet = (httpArgs, args, callback) =>{
	const defaultArg = {
		method: 'taobao.itemcats.authorize.get',
		fields: ' brand.vid, brand.name, item_cat.cid, item_cat.name, item_cat.status,' +
			'item_cat.sort_order,item_cat.parent_cid,item_cat.is_parent, xinpin_item_cat.cid,' +
			' xinpin_item_cat.name, xinpin_item_cat.status, xinpin_item_cat.sort_order,' +
			' xinpin_item_cat.parent_cid, xinpin_item_cat.is_parent'
	};

	this.callDefaultArg(defaultArg, httpArgs, args, callback);
}

// taobao.itemcats.get
Core.prototype.itemcatsGet = (httpArgs, args, callback)=> {
	const defaultArg = {
		method: 'taobao.itemcats.get',
		parent_cid: 0
	};

	this.callDefaultArg(defaultArg, httpArgs, args, callback);
}

// taobao.itemcats.increment.get
Core.prototype.itemcatsIncrementGet=(httpArgs, args, callback)=> {
	const defaultArg = {
		method: 'taobao.itemcats.increment.get',
	};

	this.callDefaultArg(defaultArg, httpArgs, args, callback);
}

// taobao.itemprops.get 
Core.prototype.itempropsGet=(httpArgs, args, callback)=> {
	const defaultArg = {
		method: 'taobao.itemprops.get'
	};

	this.callDefaultArg(defaultArg, httpArgs, args, callback);
}

// taobao.itempropvalues.get
Core.prototype.itempropvaluesGet=(httpArgs, args, callback)=> {
	const defaultArg = {
		method: 'taobao.itempropvalues.get',
		fields: 'cid,pid,prop_name,vid,name,name_alias,status,sort_order'
	};

	this.callDefaultArg(defaultArg, httpArgs, args, callback);
},

// taobao.topats.itemcats.get
Core.prototype.topatsItemcatsGet=(httpArgs, args, callback)=> {
	const defaultArg = {
		method: 'taobao.topats.itemcats.get'
	};

	this.callDefaultArg(defaultArg, httpArgs, args, callback);
}
