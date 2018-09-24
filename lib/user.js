"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

var _error = _interopRequireDefault(require("./error"));

var _core = _interopRequireDefault(require("./core"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// taobao.user.buyer.get
_core.default.prototype.userBuyerGet = function (httpArgs, args, callback) {
  var defaultArg = {
    method: 'taobao.user.buyer.get',
    fields: 'user_id,nick,sex,buyer_credit,avatar,has_shop,vip_info'
  };

  _this.callDefaultArg(defaultArg, httpArgs, args, callback);
}; // taobao.user.get


_core.default.prototype.userGet = function (httpArgs, args, callback) {
  var defaultArg = {
    method: 'taobao.user.get'
  };

  _this.callDefaultArg(defaultArg, httpArgs, args, callback);
}; // taobao.user.seller.get


_core.default.prototype.userSellerGet = function (httpArgs, args, callback) {
  var defaultArg = {
    method: 'taobao.user.seller.get',
    fields: 'user_id,nick,sex,seller_credit,type,has_more_pic,item_img_num,item_img_size,prop_img_num,' + 'prop_img_size,auto_repost,promoted_type,status,alipay_bind,consumer_protection,avatar,liangpin,' + 'sign_food_seller_promise,has_shop,is_lightning_consignment,has_sub_stock,is_golden_seller,vip_info,' + 'magazine_subscribe,vertical_market,online_gaming'
  };

  _this.callDefaultArg(defaultArg, httpArgs, args, callback);
}, // taobao.users.get
_core.default.prototype.usersGet = function (httpArgs, args, callback) {
  var defaultArg = {
    method: 'taobao.users.get'
  };

  _this.callDefaultArg(defaultArg, httpArgs, args, callback);
};