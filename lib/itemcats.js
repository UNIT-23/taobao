"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _error = _interopRequireDefault(require("./error"));

var _taobao = _interopRequireDefault(require("./taobao"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  apis: [{
    method: 'taobao.itemcats.authorize.get',
    defaultArg: {
      fields: ' brand.vid, brand.name, item_cat.cid, item_cat.name, item_cat.status,' + 'item_cat.sort_order,item_cat.parent_cid,item_cat.is_parent, xinpin_item_cat.cid,' + ' xinpin_item_cat.name, xinpin_item_cat.status, xinpin_item_cat.sort_order,' + ' xinpin_item_cat.parent_cid, xinpin_item_cat.is_parent'
    }
  }, {
    method: 'taobao.itemcats.get',
    defaultArg: {
      parent_cid: 0
    }
  }, 'taobao.itemcats.increment.get', 'taobao.itemprops.get', {
    method: 'taobao.itempropvalues.get',
    defaultArg: {
      fields: 'cid,pid,prop_name,vid,name,name_alias,status,sort_order'
    }
  }, 'taobao.topats.itemcats.get']
};
exports.default = _default;