(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["plugins/bonus/cash-detail/cash-detail"],{"2b48":function(t,n,e){},6464:function(t,n,e){"use strict";e.r(n);var i=e("c52b"),a=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);n["default"]=a.a},6950:function(t,n,e){"use strict";e.r(n);var i=e("f5d3"),a=e("6464");for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);e("e26c");var c,r=e("f0c5"),s=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"ad5645fc",null,!1,i["a"],c);n["default"]=s.exports},c52b:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=e("2f62");function a(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,i)}return e}function o(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?a(Object(e),!0).forEach((function(n){c(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):a(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function c(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var r=function(){e.e("components/basic-component/app-tab-nav/app-tab-nav").then(function(){return resolve(e("cf4b"))}.bind(null,e)).catch(e.oe)},s={data:function(){return{tabList:[{id:-1,name:"全部"},{id:0,name:"待审核"},{id:1,name:"待打款"},{id:2,name:"已打款"},{id:3,name:"无效"}],loading:null,list:[],activeTab:-1,noBorder:!1,id:null,page:2}},components:{"app-tab-nav":r},computed:o({},(0,i.mapState)({mall:function(t){return t.mallConfig.mall},custom_setting:function(t){return t.mallConfig.share_setting_custom},share_setting:function(t){return t.mallConfig.share_setting}})),methods:{open:function(t){this.id=t},tabStatus:function(n){t.showLoading({title:"加载中..."}),this.list=[],this.page=2,this.activeTab=n.currentTarget.dataset.id,this.getList()},getList:function(){var n=this;n.$request({url:n.$api.bonus.detail,data:{status:n.activeTab}}).then((function(e){n.$hideLoading(),t.hideLoading(),0==e.code?n.list=e.data.list:t.showToast({title:e.msg,icon:"none",duration:1e3})})).catch((function(e){n.$hideLoading(),t.hideLoading(),n.$event.on(n.$const.EVENT_USER_LOGIN).then((function(){n.getSetting()}))}))},getMore:function(){var n=this;t.showLoading({title:"加载中..."}),n.$request({url:n.$api.bonus.detail,data:{status:n.activeTab,page:n.page}}).then((function(e){if(t.hideLoading(),0==e.code){n.loading=null;var i=e.data.list;i.length>0&&(n.list[n.list.length-1].date==i[0].date?(n.list[n.list.length-1].list=n.list[n.list.length-1].list.concat(i[0].list),i.shift(),n.list=n.list.concat(i)):n.list=n.list.concat(i),n.page++)}else t.showToast({title:e.msg,icon:"none",duration:1e3})})).catch((function(n){t.hideLoading()}))},toGoods:function(n){t.navigateTo({url:"/pages/goods/goods?id="+n})}},onLoad:function(t){var n=this;n.$showLoading({type:"global",text:"加载中..."}),n.getList()},onReachBottom:function(){this.getMore()}};n.default=s}).call(this,e("543d")["default"])},e26c:function(t,n,e){"use strict";var i=e("2b48"),a=e.n(i);a.a},eb8d:function(t,n,e){"use strict";(function(t){e("b8bc");i(e("66fd"));var n=i(e("6950"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},f5d3:function(t,n,e){"use strict";var i;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return i}));var a=function(){var t=this,n=t.$createElement;t._self._c},o=[]}},[["eb8d","common/runtime","common/vendor"]]]);