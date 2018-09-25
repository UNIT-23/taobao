export default {
  apis: [
    {
      method    : 'itemcats.authorize.get',
      defaultArg: {
        fields: ' brand.vid, brand.name, item_cat.cid,' +
        ' item_cat.name, item_cat.status,' +
        'item_cat.sort_order,item_cat.parent_cid,' +
        'item_cat.is_parent, xinpin_item_cat.cid,' +
        ' xinpin_item_cat.name, xinpin_item_cat.status,' +
        ' xinpin_item_cat.sort_order,' +
        ' xinpin_item_cat.parent_cid, xinpin_item_cat.is_parent'
      }
    },
    {
      method    : 'itemcats.get',
      defaultArg: { 'parent_cid': 0 }
    },
    'itemcats.increment.get',
    'itemprops.get',
    {
      method    : 'itempropvalues.get',
      defaultArg: {
        fields: 'cid,pid,prop_name,vid,name,name_alias,status,sort_order'
      }
    },
    'topats.itemcats.get'
  ]
}
