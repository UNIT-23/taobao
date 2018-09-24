"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

var _error = _interopRequireDefault(require("./error"));

var _core = _interopRequireDefault(require("./core"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// taobao.itemcats.authorize.get
_core.default.prototype.itemcatsAuthorizeGet = function (httpArgs, args, callback) {
  var defaultArg = {
    method: 'taobao.itemcats.authorize.get',
    fields: ' brand.vid, brand.name, item_cat.cid, item_cat.name, item_cat.status,' + 'item_cat.sort_order,item_cat.parent_cid,item_cat.is_parent, xinpin_item_cat.cid,' + ' xinpin_item_cat.name, xinpin_item_cat.status, xinpin_item_cat.sort_order,' + ' xinpin_item_cat.parent_cid, xinpin_item_cat.is_parent'
  };

  _this.callDefaultArg(defaultArg, httpArgs, args, callback);
}; // taobao.itemcats.get


_core.default.prototype.itemcatsGet = function (httpArgs, args, callback) {
  var defaultArg = {
    method: 'taobao.itemcats.get',
    parent_cid: 0
  };

  _this.callDefaultArg(defaultArg, httpArgs, args, callback);
}; // taobao.itemcats.increment.get


_core.default.prototype.itemcatsIncrementGet = function (httpArgs, args, callback) {
  var defaultArg = {
    method: 'taobao.itemcats.increment.get'
  };

  _this.callDefaultArg(defaultArg, httpArgs, args, callback);
}; // taobao.itemprops.get 


_core.default.prototype.itempropsGet = function (httpArgs, args, callback) {
  var defaultArg = {
    method: 'taobao.itemprops.get'
  };

  _this.callDefaultArg(defaultArg, httpArgs, args, callback);
}; // taobao.itempropvalues.get


_core.default.prototype.itempropvaluesGet = function (httpArgs, args, callback) {
  var defaultArg = {
    method: 'taobao.itempropvalues.get',
    fields: 'cid,pid,prop_name,vid,name,name_alias,status,sort_order'
  };

  _this.callDefaultArg(defaultArg, httpArgs, args, callback);
}, // taobao.topats.itemcats.get
_core.default.prototype.topatsItemcatsGet = function (httpArgs, args, callback) {
  var defaultArg = {
    method: 'taobao.topats.itemcats.get'
  };

  _this.callDefaultArg(defaultArg, httpArgs, args, callback);
};