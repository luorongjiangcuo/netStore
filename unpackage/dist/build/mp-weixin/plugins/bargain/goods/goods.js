(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["plugins/bargain/goods/goods"],{"170a":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=t("2f62");function o(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,i)}return t}function a(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?o(Object(t),!0).forEach((function(e){r(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function r(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}var s=function(){t.e("components/page-component/app-quick-navigation/app-quick-navigation").then(function(){return resolve(t("36d8"))}.bind(null,t)).catch(t.oe)},c=function(){Promise.all([t.e("common/vendor"),t.e("components/basic-component/app-rich/parse")]).then(function(){return resolve(t("46fb"))}.bind(null,t)).catch(t.oe)},u=function(){t.e("components/page-component/goods/app-goods-banner").then(function(){return resolve(t("b169"))}.bind(null,t)).catch(t.oe)},g=function(){t.e("components/page-component/goods/app-goods-service").then(function(){return resolve(t("49ac"))}.bind(null,t)).catch(t.oe)},p=function(){t.e("components/page-component/app-share-qr-code-poster/app-share-qr-code-poster").then(function(){return resolve(t("b12d"))}.bind(null,t)).catch(t.oe)},l=function(){t.e("components/page-component/goods/app-goods-marketing").then(function(){return resolve(t("0fed"))}.bind(null,t)).catch(t.oe)},d=function(){t.e("plugins/bargain/components/app-plugin-time-bar").then(function(){return resolve(t("37c4"))}.bind(null,t)).catch(t.oe)},b=function(){Promise.all([t.e("common/vendor"),t.e("components/page-component/goods/app-goods-coupon")]).then(function(){return resolve(t("4a6a"))}.bind(null,t)).catch(t.oe)},h=function(){Promise.all([t.e("common/vendor"),t.e("components/page-component/goods/bd-coupon")]).then(function(){return resolve(t("cfa2"))}.bind(null,t)).catch(t.oe)},f=function(){t.e("components/page-component/goods/bd-xbc").then(function(){return resolve(t("abb7"))}.bind(null,t)).catch(t.oe)},m=function(){t.e("components/page-component/goods/bd-kb").then(function(){return resolve(t("7e79"))}.bind(null,t)).catch(t.oe)},_=function(){t.e("components/page-component/goods/bd-hc").then(function(){return resolve(t("ecb3"))}.bind(null,t)).catch(t.oe)},v=function(){t.e("components/page-component/goods/bd-comments").then(function(){return resolve(t("57fa"))}.bind(null,t)).catch(t.oe)},w=function(){t.e("components/basic-component/app-close/app-close").then(function(){return resolve(t("699f"))}.bind(null,t)).catch(t.oe)},$={name:"goods",components:{appQuickNavigation:s,appRichText:c,appGoodsBanner:u,appService:g,appShareQrCode:p,appGoodsMarketing:l,appPluginTimeBar:d,appGoodsCoupon:b,appClose:w,bdCoupon:h,bdXbc:f,bdKb:m,bdHc:_,bdComments:v},computed:a(a(a(a(a({},(0,i.mapState)({appImg:function(n){return n.mallConfig.plugin.bargain.app_image},userInfo:function(n){return n.user.info},isUnderlinePrice:function(n){return n.mallConfig.mall.setting.is_underline_price}})),(0,i.mapState)("gConfig",{iphone:function(n){return n.iphone},iphoneHeight:function(n){return n.iphoneHeight}})),(0,i.mapGetters)("mallConfig",{getTheme:"getTheme"})),(0,i.mapState)({themeObject:function(n){var e=n.mallConfig.mall.setting.theme_color;return{back:e+"-m-back "+e,backO:e+"-m-back-o "+e,theme:e,color:e+"-m-text "+e,sBack:e+"-s-back "+e}}})),{},{compareTime:function(){if(this.bargain){var n=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return n?(n=n.trim().substring(0,19),n=n.replace(/-/g,"/"),new Date(n).getTime()):(new Date).getTime()},e=this.bargain,t=e.begin_time,i=e.end_time,o=n(t),a=n(i),r=n();if(o<=r&&r<a)return"";if(r>=a)return"end";if(r<o)return"no-start"}return""}}),data:function(){return{showClose:!1,is_open:!1,timeIntegral:null,goods_id:"",bargain:null,finish_list:null,begin_list:null,end_list:null,shareShow:!1,title:"砍价",page:1,circuit:[{name:"点击砍价",url:"./../image/bargain-click.png"},{name:"",url:"./../image/bargain-jiantou.png"},{name:"找人砍价",url:"./../image/bargain-help.png"},{name:"",url:"./../image/bargain-jiantou.png"},{name:"价格合适",url:"./../image/bargain-price.png"},{name:"",url:"./../image/bargain-jiantou.png"},{name:"优惠购买",url:"./../image/bargain-buy.png"}],poster:this.$api.bargain.poster,poster_config:this.$api.bargain.poster_config,poster_generate:this.$api.bargain.poster_generate}},onLoad:function(e){wx.showShareMenu({menus:["shareAppMessage","shareTimeline"]});var t=this;this.$store.dispatch("user/info"),this.goods_id=e.goods_id,this.$showLoading(),this.$request({url:this.$api.bargain.goods_detail,data:{goods_id:this.goods_id}}).then((function(e){if(t.$hideLoading(),0===e.code){t.bargain=e.data.bargain;var i=function(){t.begin_list=t.setTimeStart(t.bargain.begin_time),t.end_list=t.setTimeStart(t.bargain.end_time),t.bargain.bargain_info&&(t.finish_list=t.setTimeStart(t.bargain.bargain_info.finish_at))};i(),t.timeIntegral=setInterval((function(){i()}),1e3)}else n.showToast({icon:"none",title:e.msg}),n.navigateBack()})).catch((function(){t.$hideLoading()}))},onShow:function(){var n=this;this.showClose=!1,setTimeout((function(){n.showClose=!0}))},onUnload:function(){clearInterval(this.timeIntegral)},onShareAppMessage:function(){return this.$shareAppMessage({title:this.bargain.goods.app_share_title?this.bargain.goods.app_share_title:this.bargain.name,path:"/plugins/bargain/goods/goods",imageUrl:this.bargain.goods.app_share_pic?this.bargain.goods.app_share_pic:this.bargain.cover_pic,params:{goods_id:this.bargain.goods_id}})},onShareTimeline:function(){return this.$shareTimeline({title:this.bargain.goods.app_share_title?this.bargain.goods.app_share_title:this.bargain.name,query:{goods_id:this.bargain.goods_id}})},methods:{getMall:function(n){this.is_open=1==n.is_open},bargainFriend:function(){n.navigateTo({url:"/plugins/bargain/activity/activity?id="+this.bargain.bargain_info.bargain_order_id})},setTimeStart:function(n){var e=n.replace(/-/g,"/"),t=parseInt((new Date(e).getTime()-(new Date).getTime())/1e3),i=0,o=0,a=0,r=0;return t>0?(i=Math.floor(t/86400),o=Math.floor(t/3600)-24*i,a=Math.floor(t/60)-24*i*60-60*o,r=Math.floor(t)-24*i*60*60-60*o*60-60*a,{d:i,h:o<10?"0"+o:o,m:a<10?"0"+a:a,s:r<10?"0"+r:r}):null},subscribe:function(){var n=this;this.$subscribe(this.bargain.template_message).then((function(e){n.save()})).catch((function(){n.save()}))},save:function(){var e=this;e.$showLoading(),e.$request({url:e.$api.bargain.bargain_submit,data:{goods_id:e.bargain.goods_id}}).then((function(t){e.$hideLoading(),0==t.code?e.bargainResult(t):n.showToast({icon:"none",title:t.msg})})).catch((function(n){e.$hideLoading()}))},bargainResult:function(e){var t=this;t.$showLoading(),t.$request({url:t.$api.bargain.bargain_result,data:{queueId:e.data.queueId,token:e.data.token}}).then((function(i){if(0===i.code){if(i.data.retry)return void setTimeout((function(){t.bargainResult(e)}),1e3);t.$hideLoading(),n.redirectTo({url:"/plugins/bargain/activity/activity?order_id="+i.data.bargain_order_id})}else t.$hideLoading(),n.showToast({icon:"none",title:i.msg})})).catch((function(n){t.$hideLoading()}))},submit:function(){var e=this.bargain,t=[{mch_id:0,bargain_order_id:e.bargain_info.bargain_order_id,goods_list:[{id:e.goods_id,attr:[],num:1,cart_id:0,goods_attr_id:e.goods_attr_id}]}];n.navigateTo({url:"/pages/order-submit/order-submit?mch_list="+JSON.stringify(t)+"&preview_url="+encodeURIComponent(this.$api.bargain.order_preview)+"&submit_url="+encodeURIComponent(this.$api.bargain.order_submit)})},shareClick:function(){this.shareShow=!0},setCoupon:function(n){this.$set(this.bargain.goods_coupon_center[n],"is_receive",1)}}};e.default=$}).call(this,t("543d")["default"])},"3b67":function(n,e,t){"use strict";t.r(e);var i=t("6767"),o=t("5929");for(var a in o)"default"!==a&&function(n){t.d(e,n,(function(){return o[n]}))}(a);t("4422");var r,s=t("f0c5"),c=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"62154532",null,!1,i["a"],r);e["default"]=c.exports},4422:function(n,e,t){"use strict";var i=t("bb8a"),o=t.n(i);o.a},5929:function(n,e,t){"use strict";t.r(e);var i=t("170a"),o=t.n(i);for(var a in i)"default"!==a&&function(n){t.d(e,n,(function(){return i[n]}))}(a);e["default"]=o.a},6767:function(n,e,t){"use strict";var i;t.d(e,"b",(function(){return o})),t.d(e,"c",(function(){return a})),t.d(e,"a",(function(){return i}));var o=function(){var n=this,e=n.$createElement;n._self._c},a=[]},"93f1":function(n,e,t){"use strict";(function(n){t("b8bc");i(t("66fd"));var e=i(t("3b67"));function i(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("543d")["createPage"])},bb8a:function(n,e,t){}},[["93f1","common/runtime","common/vendor"]]]);