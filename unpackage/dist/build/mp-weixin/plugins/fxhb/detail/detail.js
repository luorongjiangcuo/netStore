(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["plugins/fxhb/detail/detail"],{"0151":function(t,e,i){"use strict";i.r(e);var n=i("a5bd"),a=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},2393:function(t,e,i){"use strict";(function(t){i("b8bc");n(i("66fd"));var e=n(i("f549"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},2524:function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement;t._self._c},r=[]},"631c":function(t,e,i){},"8a2e":function(t,e,i){"use strict";var n=i("631c"),a=i.n(n);a.a},a5bd:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=r(i("a34a")),a=i("2f62");function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e,i,n,a,r,o){try{var s=t[r](o),u=s.value}catch(c){return void i(c)}s.done?e(u):Promise.resolve(u).then(n,a)}function s(t){return function(){var e=this,i=arguments;return new Promise((function(n,a){var r=t.apply(e,i);function s(t){o(r,n,a,s,u,"next",t)}function u(t){o(r,n,a,s,u,"throw",t)}s(void 0)}))}}function u(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function c(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?u(Object(i),!0).forEach((function(e){l(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):u(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function l(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var d=function(){i.e("components/page-component/u-goods-list/u-ordinary-list").then(function(){return resolve(i("1f2b"))}.bind(null,i)).catch(i.oe)},f={name:"detail",components:{uOrdinaryList:d},computed:c(c({},(0,a.mapState)({appImg:function(t){return t.mallConfig.plugin.fxhb.app_image}})),(0,a.mapGetters)("mallConfig",{getTheme:"getTheme"})),data:function(){var t;return{interval_time:t,user_activity_id:0,config:null,goods_list:[],show_share_model:!1,time_str:"00:00:00",is_new:!1,coupon_total_money:0,is_join:0,is_my_hongbao:!1,list:null,min_price:0,reset_time:null,status:-1,totalUser:0,user_num:0,user_num_list:[],user_price:0,again_open:!0,page_url:"",template_message:[]}},onLoad:function(t){this.user_activity_id=t.user_activity_id?t.user_activity_id:"",this.loadConfig()},onShareAppMessage:function(){return this.$shareAppMessage({title:this.config.share_title,path:"/plugins/fxhb/detail/detail",params:{user_activity_id:this.user_activity_id},imageUrl:this.config.share_pic_url})},onUnload:function(){clearInterval(this.intervalTime)},methods:{loadConfig:function(){var e=this;t.showLoading({title:"加载中"}),e.$request({url:e.$api.fxhb.index,data:{user_activity_id:e.user_activity_id}}).then((function(i){t.hideLoading(),0===i.code?(e.config=i.data.config,e.template_message=i.data.template_message,i.data.user_activity_id?(e.user_activity_id=i.data.user_activity_id,e.loadData()):e.user_activity_id?e.subscribe():e.openNew()):(t.showToast({icon:"none",title:i.msg}),setTimeout((function(){t.redirectTo({url:"/pages/index/index"})}),2e3))})).catch((function(){t.hideLoading()}))},openNew:function(){var t=[-1,!0,[]];this.status=t[0],this.is_new=t[1],this.goods_list=t[2]},open:function(){this.again_open&&(this.user_activity_id=0,this.subscribe(),this.again_open=!1)},rules:function(){t.navigateTo({url:"/pages/rules/index?url=".concat(encodeURIComponent(this.$api.fxhb.index),"&keys=").concat(JSON.stringify(["config","remark"]))})},homes:function(){t.navigateTo({url:"/pages/index/index"})},goods:function(){t.redirectTo({url:this.page_url})},subscribe:function(){this.detailSubmit()},detailSubmit:function(){var e=this;t.showLoading({title:"抢红包中",mask:!0}),this.$request({url:this.$api.fxhb.join,method:"post",data:{user_activity_id:this.user_activity_id}}).then((function(i){t.hideLoading(),0===i.code?e.result(i.data.queueId,i.data.token):(e.openNew(),t.showToast({icon:"none",title:i.msg}))})).catch((function(){t.hideLoading()}))},loadData:function(){var e=this;return s(n.default.mark((function i(){var a,r,o,s,u,c,l,d,f,_,h,m,p,g;return n.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return t.showLoading({title:"加载中",mask:!0}),i.next=3,e.$request({url:e.$api.fxhb.detail,data:{user_activity_id:e.user_activity_id}});case 3:if(a=i.sent,t.hideLoading(),0===a.code){for(r=a.data,o=r.coupon_total_money,s=r.is_join,u=r.is_my_hongbao,c=r.list,l=r.min_price,d=r.page_url,f=r.reset_time,_=r.status,h=r.totalUser,m=r.user_num,p=r.user_price,e.coupon_total_money=o,e.is_join=s,e.is_my_hongbao=u,e.list=c,e.min_price=l,e.page_url=d,e.reset_time=f,e.totalUser=h,e.status=_,e.user_num=m,e.user_price=p,e.user_num_list=[],g=0;g<e.user_num;g++)e.user_num_list.push(g);e.setTimeStart(),e.getRecommend(),e.again_open=!0}else t.showToast({icon:"none",title:a.msg,duration:2e3,success:function(){t.redirectTo({url:"/pages/index/index"})}});case 6:case"end":return i.stop()}}),i)})))()},setTimeStart:function(){var t=this;clearInterval(this.interval_time);var e=function(){var e=0,i=0,n=0,a=t.reset_time;a--,a>0&&(e=Math.floor(a/3600),i=Math.floor(a/60)-60*e,n=Math.floor(a)-60*e*60-60*i);var r=[a,{hour:e,minute:i,second:n}];t.reset_time=r[0],t.time_list=r[1],t.time_str=(e<10?"0"+e:e)+":"+(i<10?"0"+i:i)+":"+(n<10?"0"+n:n),a<=0&&clearInterval(t.intervalTime)};e(),this.interval_time=setInterval((function(){e()}),1e3)},result:function(e,i){var n=this;t.showLoading({title:"加载中",mask:!0}),this.$request({url:this.$api.fxhb.join_result,data:{queueId:e,token:i}}).then((function(a){0===a.code?a.data.retry&&1==a.data.retry?setTimeout((function(){n.result(e,i)}),1e3):(n.user_activity_id=a.data.user_activity_id,n.loadData(),t.hideLoading(),n.showShareModal()):(t.hideLoading(),n.status=2,t.showToast({icon:"none",title:a.msg,duration:2e3,success:function(){t.redirectTo({url:"/pages/index/index"})}}))}))},showShareModal:function(){var t=[!1,!0];this.is_new=t[0],this.show_share_model=t[1]},closeShareModal:function(){var t=[!1];this.show_share_model=t[0]},getRecommend:function(){var e=this;return s(n.default.mark((function i(){var a;return n.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return t.showLoading({title:"加载中",mask:!0}),i.next=3,e.$request({url:e.$api.fxhb.recommend});case 3:a=i.sent,t.hideLoading(),0===a.code&&(e.goods_list=a.data.list);case 6:case"end":return i.stop()}}),i)})))()}}};e.default=f}).call(this,i("543d")["default"])},f549:function(t,e,i){"use strict";i.r(e);var n=i("2524"),a=i("0151");for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);i("8a2e");var o,s=i("f0c5"),u=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"41b77da1",null,!1,n["a"],o);e["default"]=u.exports}},[["2393","common/runtime","common/vendor"]]]);