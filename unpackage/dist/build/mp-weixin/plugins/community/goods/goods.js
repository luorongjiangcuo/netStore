(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["plugins/community/goods/goods"],{"1a33":function(e,t,n){"use strict";var o=n("65c8"),i=n.n(o);i.a},"1d11":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n("a34a")),i=n("2f62");function a(e){return e&&e.__esModule?e:{default:e}}function s(e,t,n,o,i,a,s){try{var r=e[a](s),d=r.value}catch(c){return void n(c)}r.done?t(d):Promise.resolve(d).then(o,i)}function r(e){return function(){var t=this,n=arguments;return new Promise((function(o,i){var a=e.apply(t,n);function r(e){s(a,o,i,r,d,"next",e)}function d(e){s(a,o,i,r,d,"throw",e)}r(void 0)}))}}function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l=function(){n.e("components/page-component/goods/app-goods-banner").then(function(){return resolve(n("b169"))}.bind(null,n)).catch(n.oe)},h=function(){n.e("plugins/community/components/app-goods-time").then(function(){return resolve(n("80b0"))}.bind(null,n)).catch(n.oe)},m=function(){n.e("components/page-component/goods/app-goods-service").then(function(){return resolve(n("49ac"))}.bind(null,n)).catch(n.oe)},p=function(){n.e("components/page-component/app-share-qr-code-poster/app-share-qr-code-poster").then(function(){return resolve(n("b12d"))}.bind(null,n)).catch(n.oe)},f=function(){n.e("components/page-component/goods/app-goods-marketing").then(function(){return resolve(n("0fed"))}.bind(null,n)).catch(n.oe)},g=function(){Promise.all([n.e("common/vendor"),n.e("components/page-component/goods/app-goods-coupon")]).then(function(){return resolve(n("4a6a"))}.bind(null,n)).catch(n.oe)},b=function(){n.e("components/page-component/goods/u-attr").then(function(){return resolve(n("fae7"))}.bind(null,n)).catch(n.oe)},v=function(){n.e("components/basic-component/app-close/app-close").then(function(){return resolve(n("699f"))}.bind(null,n)).catch(n.oe)},_=function(){Promise.all([n.e("common/vendor"),n.e("components/page-component/goods/bd-coupon")]).then(function(){return resolve(n("cfa2"))}.bind(null,n)).catch(n.oe)},y=function(){n.e("components/page-component/goods/bd-xbc").then(function(){return resolve(n("abb7"))}.bind(null,n)).catch(n.oe)},w=function(){n.e("components/page-component/goods/bd-kb").then(function(){return resolve(n("7e79"))}.bind(null,n)).catch(n.oe)},T=function(){n.e("components/page-component/goods/bd-hc").then(function(){return resolve(n("ecb3"))}.bind(null,n)).catch(n.oe)},$=function(){n.e("components/page-component/goods/bd-detail").then(function(){return resolve(n("c91c"))}.bind(null,n)).catch(n.oe)},O=function(){n.e("components/page-component/goods/bd-comments").then(function(){return resolve(n("57fa"))}.bind(null,n)).catch(n.oe)},k={name:"goods",data:function(){return{showClose:!1,is_open:0,detail:null,middleman:{},activity:{},hasPosterNav:!0,posterConfig:this.$api.community.goods_config,posterGenerate:this.$api.community.goods_generate,isShowBuy:!1,shareShow:!1,checked:null,url:"",show:!1,list:[],goods_id:-1,hour:0,minute:0,second:0,longitude:0,latitude:0,day:0,loading:!1,first:!0,middleman_id:0}},onLoad:function(t){var n=this;wx.showShareMenu({menus:["shareAppMessage","shareTimeline"]}),n.goods_id=t.goods_id,n.posterConfig=n.posterConfig+"&goods_id="+n.goods_id,n.posterGenerate=n.posterGenerate+"&goods_id="+n.goods_id,t.middleman_id>0?(n.middleman_id=t.middleman_id,n.$showLoading({type:"global",text:"加载中..."}),n.request({url:n.$api.community.goods_detail,data:{goods_id:n.goods_id,middleman_id:n.middleman_id}}).then((function(e){n.first=!1;var t=e.goods,o=e.activity,i=e.middleman;n.detail=t,n.activity=o,n.middleman=i,n.loading=!0,n.url="".concat(n.$api.goods.poster,"&goods_id=").concat(n.detail.id),o.time>0&&n.getTime(o.time),n.$hideLoading()}))):e.getLocation({success:function(t){e.hideLoading(),n.longitude=t.longitude,n.latitude=t.latitude,n.$showLoading({type:"global",text:"加载中..."}),n.request({url:n.$api.community.goods_detail,data:{goods_id:n.goods_id,longitude:n.longitude,latitude:n.latitude}}).then((function(e){n.first=!1;var t=e.goods,o=e.activity,i=e.middleman;n.detail=t,n.activity=o,n.middleman=i,n.loading=!0,n.url="".concat(n.$api.goods.poster,"&goods_id=").concat(n.detail.id),o.time>0&&n.getTime(o.time),n.$hideLoading()}))},fail:function(){e.hideLoading(),e.showModal({title:"提示",content:"获取位置信息失败，需要授权获取您的位置信息",showCancel:!1,confirmText:"打开授权",success:function(t){t.confirm&&e.openSetting({})}})}})},onShow:function(){var e=this;if(this.showClose=!1,setTimeout((function(){e.showClose=!0})),this.first)return!1;this.$showLoading(),this.$nextTick((function(){e.request({url:e.$api.community.goods_detail,data:{goods_id:e.goods_id,middleman_id:e.middleman_id,longitude:e.longitude,latitude:e.latitude}}).then((function(t){var n=t.goods,o=t.activity,i=t.middleman;e.detail=n,e.activity=o,e.middleman=i,e.loading=!0,e.url="".concat(e.$api.goods.poster,"&goods_id=").concat(e.detail.id),o.time>0&&e.getTime(o.time),e.$hideLoading()}))}))},onHide:function(){clearInterval(this.time)},onUnload:function(){clearInterval(this.time)},computed:c(c(c({},(0,i.mapGetters)("mallConfig",{getTheme:"getTheme"})),(0,i.mapState)({mall:function(e){return e.mallConfig.mall},userInfo:function(e){return e.user.info}})),{},{themeObject:function(){return{back:this.getTheme+"-m-back "+this.getTheme,theme:this.getTheme,color:this.getTheme+"-m-text "+this.getTheme,sBack:this.getTheme+"-s-back "+this.getTheme}}}),onShareAppMessage:function(){var e=this.detail,t=e.app_share_title,n=e.app_share_pic,o=e.name,i=e.id;return this.$shareAppMessage({path:"/plugins/community/goods/goods",title:t||o,imageUrl:n||"",params:{goods_id:i,user_id:this.userInfo.options.user_id}})},onShareTimeline:function(){return this.$shareTimeline({title:this.detail.app_share_title?this.detail.app_share_title:this.detail.name,query:{goods_id:this.detail.id,user_id:this.userInfo.options.user_id}})},methods:{getMall:function(e){this.is_open=e.is_open},request:function(t){var n=this;return r(o.default.mark((function i(){var a,s,r;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return a=t.url,s=t.data,o.next=3,n.$request({url:a,data:s});case 3:if(r=o.sent,0!==r.code){o.next=8;break}return o.abrupt("return",r.data);case 8:if("所选商品不在活动中"!=r.msg){o.next=12;break}return e.showToast({title:r.msg,icon:"none",duration:1e3}),setTimeout((function(){e.redirectTo({url:"/plugins/community/list/list"})}),1e3),o.abrupt("return",!1);case 12:case"end":return o.stop()}}),i)})))()},check:function(e){this.checked=e},rightFunc:function(e){var t=this,n=e.goods_list[0],o=n.id,i=n.goods_attr_id,a=n.num;this.$request({url:this.$api.community.cart_add,data:{activity_id:this.activity.id,goods_id:o,goods_attr_id:i,num:a},method:"post"}).then((function(e){0===e.code&&t.addResult(e.data.queue_id,e.data.token)}))},joinCart:function(){this.show=!0},addResult:function(t,n){var o=this;this.$request({url:this.$api.community.cart_result,method:"post",data:{queue_id:t,token:n}}).then((function(i){0===i.code?i.data&&1===i.data.retry?setTimeout((function(){o.addResult(t,n)}),1e3):(o.attrShow=0,e.hideLoading(),e.showToast({title:"添加成功",duration:1e3})):(e.hideLoading(),e.showToast({title:i.msg,icon:"none",duration:1e3}))}))},getTime:function(e){var t=this;e-=1,this.day=parseInt(e/3600/24),this.hour=parseInt(e/3600%24),this.hour<10&&(this.hour="0"+this.hour),this.minute=parseInt(e/60%60),this.minute<10&&(this.minute="0"+this.minute),this.second=parseInt(e%60),this.second<10&&(this.second="0"+this.second),clearInterval(this.time),this.time=setInterval((function(){e-=1,e<0&&clearInterval(t.time),t.day=parseInt(e/3600/24),t.hour=parseInt(e/3600%24),t.hour<10&&(t.hour="0"+t.hour),t.minute=parseInt(e/60%60),t.minute<10&&(t.minute="0"+t.minute),t.second=parseInt(e%60),t.second<10&&(t.second="0"+t.second)}),1e3)},setCoupon:function(e){this.$set(this.detail.goods_coupon_center[e],"is_receive",1)}},components:{"app-banner":l,"app-goods-time":h,"app-goods-service":m,"app-share-qr-code":p,appGoodsMarketing:f,appGoodsCoupon:g,appClose:v,uAttr:b,bdCoupon:_,bdXbc:y,bdKb:w,bdHc:T,bdDetail:$,bdComments:O}};t.default=k}).call(this,n("543d")["default"])},2576:function(e,t,n){"use strict";n.r(t);var o=n("a58b"),i=n("d41b");for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);n("1a33");var s,r=n("f0c5"),d=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,"d3be66ea",null,!1,o["a"],s);t["default"]=d.exports},"5b3fa":function(e,t,n){"use strict";(function(e){n("b8bc");o(n("66fd"));var t=o(n("2576"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"65c8":function(e,t,n){},a58b:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}));var i=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.shareShow=!0})},a=[]},d41b:function(e,t,n){"use strict";n.r(t);var o=n("1d11"),i=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=i.a}},[["5b3fa","common/runtime","common/vendor"]]]);