export default {
  apis: [
    {
      method    : 'taobao.user.buyer.get',
      defaultArg: {
        fields: 'user_id,nick,sex,buyer_credit,avatar,has_shop,vip_info'
      }
    },
    'taobao.user.get',
    {
      method    : 'taobao.user.seller.get',
      defaultArg: {
        fields: 'user_id,nick,sex,seller_credit,type,has_more_pic,' +
        'item_img_num,item_img_size,prop_img_num,' +
        'prop_img_size,auto_repost,promoted_type,status,' +
        'alipay_bind,consumer_protection,avatar,liangpin,' +
        'sign_food_seller_promise,has_shop,is_lightning_consignment,' +
        'has_sub_stock,is_golden_seller,vip_info,' +
        'magazine_subscribe,vertical_market,online_gaming'
      }
    },
    'taobao.users.get'
  ]
}
