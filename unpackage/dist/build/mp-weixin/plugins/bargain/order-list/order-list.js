(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["plugins/bargain/order-list/order-list"],{"04ff":function(t,e,n){"use strict";var r=n("edda"),a=n.n(r);a.a},"0d28":function(t,e,n){"use strict";n.r(e);var r=n("c370"),a=n("b812");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("04ff");var i,c=n("f0c5"),u=Object(c["a"])(a["default"],r["b"],r["c"],!1,null,"b496b198",null,!1,r["a"],i);e["default"]=u.exports},a0ba:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n("2f62");function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c=function(){n.e("plugins/bargain/common-buttom").then(function(){return resolve(n("851f"))}.bind(null,n)).catch(n.oe)},u={name:"order-list",components:{commonButtom:c},data:function(){var t;return{integral:t,list:null,args:!1,page:1,load:!1}},computed:o({},(0,r.mapGetters)("mallConfig",{getTheme:"getTheme"})),onReachBottom:function(){var t=this;if(!t.args&&!t.load){t.load=!0;var e=t.page+1;t.$request({url:t.$api.bargain.list,data:{page:e}}).then((function(n){if(0===n.code){var r=[e,0===n.data.list.length];t.page=r[0],t.args=r[1],t.getIntegral(t.list.concat(n.data.list))}t.load=!1}))}},onShow:function(){var t=this;t.$showLoading(),t.$request({url:t.$api.bargain.list}).then((function(e){t.$hideLoading(),0===e.code&&t.getIntegral(e.data.list),t.args=!1,t.page=1})).catch((function(e){t.$hideLoading()}))},onUnload:function(){clearInterval(this.integral)},methods:{navGoods:function(e){t.navigateTo({url:"/plugins/bargain/goods/goods?goods_id="+e.goods_id})},goto:function(e){t.navigateTo({url:"/plugins/bargain/activity/activity?id="+e.bargain_order_id})},getIntegral:function(t){var e=this;clearInterval(e.integral);var n=function(){t.forEach((function(t,e,n){if(!t.status){var r=t.finish_at.replace(/-/g,"/"),a=parseInt((new Date(r).getTime()-(new Date).getTime())/1e3),o=0,i=0,c=0,u=0;a>0?(o=Math.floor(a/86400),i=Math.floor(a/3600)-24*o,c=Math.floor(a/60)-24*o*60-60*i,u=Math.floor(a)-24*o*60*60-60*i*60-60*c,t.times={day:o,hour:i,minute:c,second:u}):t.times=u}})),e.list=t};n(t),e.integral=setInterval((function(){n(t)}),1e3)},submit:function(e){var n=[{mch_id:0,bargain_order_id:e.bargain_order_id,goods_list:[{id:e.goods_id,attr:[],num:1,cart_id:0,goods_attr_id:e.goods_attr_id}]}];t.navigateTo({url:"/pages/order-submit/order-submit?mch_list="+JSON.stringify(n)+"&preview_url="+encodeURIComponent(this.$api.bargain.order_preview)+"&submit_url="+encodeURIComponent(this.$api.bargain.order_submit)})}}};e.default=u}).call(this,n("543d")["default"])},b812:function(t,e,n){"use strict";n.r(e);var r=n("a0ba"),a=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=a.a},c370:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var a=function(){var t=this,e=t.$createElement;t._self._c},o=[]},dc73:function(t,e,n){"use strict";(function(t){n("b8bc");r(n("66fd"));var e=r(n("0d28"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},edda:function(t,e,n){}},[["dc73","common/runtime","common/vendor"]]]);