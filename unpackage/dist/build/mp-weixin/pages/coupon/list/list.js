(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/coupon/list/list"],{"005c":function(t,e,n){"use strict";var i=n("f890"),o=n.n(i);o.a},"0aea":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.list,(function(e,n){var i=t.__get_orig(e),o=2==e.type?t._f("keepNumbers")(e.sub_price):null,r=2!=e.type?t._f("keepNumbers")(e.discount):null,a=e.min_price>0?t._f("keepNumbers")(e.min_price):null,c=e.discount_limit?t._f("keepNumbers")(e.discount_limit):null;return{$orig:i,f0:o,f1:r,f2:a,f3:c}})));t.$mp.data=Object.assign({},{$root:{l0:n}})},r=[]},"5ad2":function(t,e,n){"use strict";n.r(e);var i=n("a2fc"),o=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},"5d3d":function(t,e,n){"use strict";(function(t){n("b8bc");i(n("66fd"));var e=i(n("f283"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},a2fc:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("2f62");function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c={data:function(){return{list:[],loading:!1,page:2}},computed:r({},(0,i.mapState)({couponImg:function(t){return t.mallConfig.__wxapp_img.coupon}})),methods:{getList:function(){var e=this;e.$request({url:e.$api.coupon.list,method:"get"}).then((function(n){t.hideLoading(),e.$hideLoading(),0===n.code?e.list=n.data.list:t.showToast({title:n.msg,icon:"none",duration:1e3})})).catch((function(){t.hideLoading(),e.$hideLoading()}))},getMore:function(){var e=this;t.showLoading({title:"加载中..."}),e.$request({url:e.$api.coupon.list,data:{page:e.page}}).then((function(n){t.hideLoading(),0==n.code?n.data.list.length>0&&(e.list=e.list.concat(n.data.list),e.page++):t.showToast({title:n.msg,icon:"none",duration:1e3})})).catch((function(e){t.hideLoading()}))},toDetail:function(e){t.navigateTo({url:"/pages/coupon/details/details?id="+e})},receive:function(e){var n=this;if(n.loading)return!1;n.loading=!0,t.showLoading({title:"领取中..."}),n.$request({url:n.$api.coupon.receive,data:{coupon_id:e.id}}).then((function(i){n.loading=!1,t.hideLoading(),0===i.code?setTimeout((function(t){n.$store.dispatch("page/actionSetCoupon",{list:[Object.assign(e,i.data)],type:"receive"}),n.getList()}),200):(t.showToast({title:i.msg,icon:"none",duration:1e3}),n.getList())})).catch((function(){t.hideLoading(),n.$event.on(n.$const.EVENT_USER_LOGIN).then((function(){n.receive(e)}))}))}},onLoad:function(){},onShow:function(){this.$showLoading({text:"加载中..."}),this.getList()},filters:{keepNumbers:function(t){return Number(t)}},onReachBottom:function(){this.getMore()}};e.default=c}).call(this,n("543d")["default"])},f283:function(t,e,n){"use strict";n.r(e);var i=n("0aea"),o=n("5ad2");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("005c");var a,c=n("f0c5"),u=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,"10249218",null,!1,i["a"],a);e["default"]=u.exports},f890:function(t,e,n){}},[["5d3d","common/runtime","common/vendor"]]]);