(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["plugins/community/activity/activity"],{4028:function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n=e("2f62");function a(t,i){var e;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(e=o(t))||i&&t&&"number"===typeof t.length){e&&(t=e);var n=0,a=function(){};return{s:a,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,r=!0,c=!1;return{s:function(){e=t[Symbol.iterator]()},n:function(){var t=e.next();return r=t.done,t},e:function(t){c=!0,s=t},f:function(){try{r||null==e.return||e.return()}finally{if(c)throw s}}}}function o(t,i){if(t){if("string"===typeof t)return s(t,i);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?s(t,i):void 0}}function s(t,i){(null==i||i>t.length)&&(i=t.length);for(var e=0,n=new Array(i);e<i;e++)n[e]=t[e];return n}function r(t,i){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);i&&(n=n.filter((function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable}))),e.push.apply(e,n)}return e}function c(t){for(var i=1;i<arguments.length;i++){var e=null!=arguments[i]?arguments[i]:{};i%2?r(Object(e),!0).forEach((function(i){d(t,i,e[i])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):r(Object(e)).forEach((function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(e,i))}))}return t}function d(t,i,e){return i in t?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,t}var l=function(){e.e("plugins/community/components/app-head").then(function(){return resolve(e("9780"))}.bind(null,e)).catch(e.oe)},u=function(){e.e("components/page-component/app-share-qr-code-poster/app-share-qr-code-poster").then(function(){return resolve(e("b12d"))}.bind(null,e)).catch(e.oe)},h=function(){e.e("components/page-component/goods/u-attr").then(function(){return resolve(e("fae7"))}.bind(null,e)).catch(e.oe)},m=function(){e.e("components/basic-component/app-close/app-close").then(function(){return resolve(e("699f"))}.bind(null,e)).catch(e.oe)},f={data:function(){return{id:null,showCart:!1,is_loading:!1,submitLock:!1,recommendDialog:!1,showShare:!1,stopLoad:!1,showOther:!1,more:!1,is_middleman:!1,share:!1,default:!1,inputRemark:!0,cartLength:0,windowHeight:0,is_exist:0,page:1,poster:"",mobile:"",remark:"",d:"",h:"",m:"",s:"",selectAttr:{},animationData:{},animation:{},attr_price:"0.00",number:1,space:"0m",display:"none",attrShow:!1,scrollTop:0,scrollHeight:0,goods:null,timeInterval:null,buyBool:!0,longitude:"",latitude:"",activity:{rate:0},middleman:{},setting:{},recommend:{},list:[],cart:[],user_list:[],template_message_list:[],end_time:"1小时前",title:"",total:"0.00",minus:"0.00",middleman_id:0,first:!0,showClose:!1,is_open:!1}},components:{appShareQrCode:u,appHead:l,uAttr:h,AppClose:m},computed:c(c(c({},(0,n.mapGetters)("mallConfig",{getTheme:"getTheme"})),(0,n.mapState)({community:function(t){return t.mallConfig.__wxapp_img.community},bonusImg:function(t){return t.mallConfig.__wxapp_img.bonus},appImg:function(t){return t.mallConfig.__wxapp_img.mall},appSetting:function(t){return t.mallConfig.mall.setting},userInfo:function(t){return t.user.info}})),{},{themeObject:function(){return{back:this.getTheme+"-m-back "+this.getTheme,theme:this.getTheme,color:this.getTheme+"-m-text "+this.getTheme,sBack:this.getTheme+"-s-back "+this.getTheme}}}),onLoad:function(i){var e=this;i.activity_id&&(this.id=i.activity_id),i.id&&(this.id=i.id),this.title=i.title,t.setNavigationBarTitle({title:i.title}),t.getSystemInfo({success:function(t){e.windowHeight=t.windowHeight}}),t.getLocation({success:function(n){t.hideLoading(),e.longitude=n.longitude,e.latitude=n.latitude,t.getStorage({key:"middleman_info",success:function(t){t.data&&t.data.id>0&&(i.middleman_id?(e.middleman_id=i.middleman_id,e.share=!0):e.middleman_id=t.data.user_id)},fail:function(){i.middleman_id&&(e.middleman_id=i.middleman_id,e.share=!0)}}),e.$showLoading({type:"global",text:"加载中..."}),e.getSetting()},fail:function(){t.hideLoading(),t.showModal({title:"提示",content:"获取位置信息失败，需要授权获取您的位置信息",showCancel:!1,confirmText:"打开授权",success:function(i){i.confirm&&t.openSetting({})}})}}),wx.showShareMenu({menus:["shareAppMessage","shareTimeline"]})},onUnload:function(){this.stopLoad=!0,clearInterval(this.timeInterval)},onShow:function(){var i=this;this.stopLoad&&(this.stopLoad=!1,t.getStorage({key:"bind",success:function(e){e.data>0?(i.$showLoading({type:"global",text:"加载中..."}),i.middleman={},i.middleman_id=0,t.getStorage({key:"middleman_info",success:function(t){t.data&&t.data.id>0&&(i.middleman_id=t.data.user_id),i.getList()},fail:function(){i.getList()}}),t.removeStorage({key:"bind"})):i.getList()},fail:function(){i.getList()}}))},onHide:function(){this.stopLoad=!0,clearInterval(this.timeInterval)},methods:{toSubmit:function(){var t=this;this.showClose=!1,setTimeout((function(){t.showClose=!0}))},getMall:function(t){this.is_open=1==t.is_open,this.is_open&&this.allBuy()},scroll:function(t){this.scrollHeight=t.detail.scrollTop},getMore:function(){this.more&&(this.page++,this.getOther(),this.more=!1)},getOther:function(){var t=this,i={id:t.id,page:t.page,longitude:t.longitude,latitude:t.latitude};t.middleman_id>0&&(i.middleman_id=t.middleman_id),t.$request({url:t.$api.community.user_activity,data:i}).then((function(i){t.$hideLoading(),0===i.code&&(20===i.data.list.length&&(t.more=!0),t.list=t.list.concat(i.data.list))}))},openCart:function(){this.showCart=!this.showCart,this.stopLoad=!0,0==this.showCart&&(this.stopLoad=!1,this.getList())},toList:function(){if("0"===this.middleman.is_allow_change)return!1;t.navigateTo({url:"/plugins/community/captain/captain?longitude="+this.longitude+"&latitude="+this.latitude})},showHiddenClick:function(){this.showShare=!this.showShare},toGoods:function(i){this.stopLoad=!0,t.navigateTo({url:"/plugins/community/goods/goods?goods_id="+i.id+"&middleman_id="+this.middleman.user_id})},toIndex:function(){this.stopLoad=!0,t.navigateTo({url:"/plugins/community/index/index"})},toOrder:function(){this.stopLoad=!0,t.navigateTo({url:"/plugins/community/order/order?is_user=1"})},toUser:function(){this.stopLoad=!0,t.navigateTo({url:"/pages/user-center/user-center"})},toActivity:function(){this.stopLoad=!0,t.redirectTo({url:"/plugins/community/activity/activity?id="+this.recommend.activity_id})},attr:function(t,i){this.selectAttr=t,this.number=i,this.attr_price=(+this.selectAttr.price*+this.number).toFixed(2)},imgLoad:function(){this.is_loading=!0},allBuy:function(){var i=this;return!this.submitLock&&(this.showCart=!1,this.scrollTop=this.scrollHeight,this.default?(this.$nextTick().then((function(){i.scrollTop=9999999,i.default=!1})),t.showToast({title:"请确认手机号",icon:"none",duration:1e3}),!1):void(11==this.mobile.length&&/0?(1)[0-9]{10}/.test(this.mobile)?this.$subscribe(this.template_message_list).then((function(t){i.submit()})).catch((function(){i.submit()})):(this.$nextTick().then((function(){i.scrollTop=9999999})),this.stopLoad=!1,this.getList(),t.showToast({title:"请输入正确的手机号码",icon:"none",duration:1e3}))))},submit:function(){var i=this;t.showLoading({title:"提交订单..."}),this.stopLoad=!0,this.submitLock=!0;var e=[];for(var n in this.cart)if(1==this.cart[n].is_exist){var a={};a.id=this.cart[n].goods_id,a.goods_attr_id=this.cart[n].goods_attr_id,a.num=this.cart[n].num,a.cart_id=this.cart[n].id,a.attr=this.cart[n].attr_list,a.cat_id=0,a.form_data=[],e.push(a)}if(0===e.length)return t.showToast({title:"请添加有效商品",icon:"none",duration:1e3}),!1;var o=[{mch_id:0,activity_id:this.id,middleman_id:this.middleman.user_id,goods_list:e,distance:0,remark:this.remark,order_form:[],use_integral:0,user_coupon_id:0}],s={};s.list=o,s.address_id=0,s.address={name:this.userInfo.nickname,mobile:this.mobile},this.$request({url:this.$api.community.order_submit,data:{form_data:JSON.stringify(s)},method:"post"}).then((function(e){0===e.code?i.getPayOrderId(e.data.queue_id,e.data.token):(i.submitLock=!1,i.stopLoad=!1,t.hideLoading(),t.showModal({title:"提示",content:e.msg,showCancel:!1}))})).catch((function(e){i.submitLock=!1,i.stopLoad=!1,t.hideLoading(),t.showModal({title:"提示",content:e.errMsg,showCancel:!1})}))},getPayOrderId:function(i,e){var n=this;this.$request({url:this.$api.order.pay_data,method:"post",data:{queue_id:i,token:e}}).then((function(a){0===a.code?a.data.retry&&1===a.data.retry?n.getPayDataTimer=setTimeout((function(){n.getPayOrderId(i,e)}),1e3):(t.hideLoading(),n.cart=[],n.pay(a.data)):(n.submitLock=!1,t.hideLoading(),t.showModal({title:"提示",content:a.msg,showCancel:!1}))})).catch((function(i){n.submitLock=!1,t.hideLoading(),t.showModal({title:"提示",content:i.errMsg,showCancel:!1})}))},pay:function(i){var e=this;t.removeStorage({key:"middleman_info"}),this.$payment.pay(i.id).then((function(){e.submitLock=!1;var n="/plugins/community/order/order";t.navigateTo({url:"/pages/order-submit/pay-result?payment_order_union_id=".concat(i.id,"&order_page_url=").concat(n)})})).catch((function(){e.submitLock=!1,e.toOrder()}))},_calcValue:function(t,i){"minus"===i?this.cart[t].num--:"plus"===i&&this.cart[t].num++,this._onBlur(t)},_onBlur:function(t){for(var i in this.total=0,this.cartLength=0,this.cart)this.total=+this.total+ +this.cart[i].price*this.cart[i].num,this.cartLength+=+this.cart[i].num;var e=0;for(var n in this.activity.full_price)(+this.activity.full_price[n].full_price<+this.total||+this.activity.full_price[n].full_price==+this.total)&&this.activity.full_price[n].reduce_price>e&&(e=+this.activity.full_price[n].reduce_price);this.total=(+this.total-e).toFixed(2),this.minus=e.toFixed(2),0==this.cart[t].num?this.delCart(t):this.$request({url:this.$api.community.cart_edit,data:{list:JSON.stringify(this.cart)}})},clearAll:function(){var t=this,i=[];for(var e in this.cart)i.push(this.cart[e].id);this.cart=[],this.showCart=!1,this.$request({url:this.$api.community.cart_delete,data:{cart_id_list:JSON.stringify(i)}}).then((function(){t.stopLoad=!1,t.getList()}))},delCart:function(i){var e=this,n=[];for(var a in n.push(this.cart[i].id),this.cart.splice(i,1),this.total=0,this.cartLength=0,this.cart)this.total=+this.total+ +this.cart[a].price*this.cart[a].num,this.cartLength+=+this.cart[a].num;var o=0;for(var s in this.activity.full_price)(+this.activity.full_price[s].full_price<+this.total||+this.activity.full_price[s].full_price==+this.total)&&this.activity.full_price[s].reduce_price>o&&(o=+this.activity.full_price[s].reduce_price);this.total=(+this.total-o).toFixed(2),this.minus=o.toFixed(2),0===this.cart.length&&(this.showCart=!1),this.$request({url:this.$api.community.cart_delete,data:{cart_id_list:n}}).then((function(){e.stopLoad=!1,e.getList()})).catch((function(){e.attrShow=!1,t.hideLoading()}))},add:function(){var i=this;t.showLoading({title:"加入购物车"});var e={activity_id:this.id,goods_id:this.selectAttr.goods_id,goods_attr_id:this.selectAttr.id,num:this.number};this.$request({url:this.$api.community.cart_add,data:e,method:"post"}).then((function(e){0===e.code?i.addResult(e.data.queue_id,e.data.token):(t.hideLoading(),i.attrShow=!1,t.showToast({title:e.msg,icon:"none",duration:1e3}))})).catch((function(){i.attrShow=!1,t.hideLoading()}))},addResult:function(i,e){var n=this;this.$request({url:this.$api.community.cart_result,method:"post",data:{queue_id:i,token:e}}).then((function(o){if(0===o.code)if(o.data&&1===o.data.retry)n.getResult=setTimeout((function(){n.addResult(i,e)}),1e3);else{n.attrShow=!1;var s=-1;for(var r in n.cart)n.cart[r].goods_id==n.selectAttr.goods_id&&n.cart[r].goods_attr_id==n.selectAttr.id&&(s=r);if(s>-1)n.cart[s].num+=+n.number;else{var c={activity_id:n.id,community_goods_id:n.goods.id,goods_id:n.selectAttr.goods_id,goods_attr_id:n.selectAttr.id,num:n.number,name:n.goods.name,attr_list:n.selectAttr.attr_list,pic_url:n.selectAttr.pic_url,id:0,price:n.selectAttr.price,is_exist:1};n.cart.push(c)}n.total=0,n.cartLength=0;var d,l=a(n.cart);try{for(l.s();!(d=l.n()).done;){var u=d.value;n.total=+n.total+ +u.price*u.num,n.cartLength+=+u.num}}catch(f){l.e(f)}finally{l.f()}var h=0;for(var m in n.activity.full_price)(+n.activity.full_price[m].full_price<+n.total||+n.activity.full_price[m].full_price==+n.total)&&n.activity.full_price[m].reduce_price>h&&(h=+n.activity.full_price[m].reduce_price);n.total=(+n.total-h).toFixed(2),n.minus=h.toFixed(2),t.hideLoading()}else t.hideLoading(),t.showModal({title:"提示",content:o.msg,showCancel:!1})})).catch((function(i){n.attrShow=!1,t.hideLoading(),t.showModal({title:"提示",content:i.errMsg,showCancel:!1})}))},toBuy:function(t){this.selectAttr=null,this.goods=t,this.attrShow=!0},getCart:function(){var i=this;if(i.stopLoad)return!1;i.$request({url:i.$api.community.cart,data:{middleman_id:i.middleman.user_id,activity_id:i.activity.id}}).then((function(e){if(i.stopLoad)return!1;if(0===e.code){for(var n in i.total=0,i.cartLength=0,i.cart=e.data.list,i.is_exist=0,i.cart)0==i.cart[n].is_exist&&i.is_exist++,i.total=+i.total+ +i.cart[n].price*i.cart[n].num,i.cartLength+=+i.cart[n].num;var a=0;for(var o in i.activity.full_price)(+i.activity.full_price[o].full_price<+i.total||+i.activity.full_price[o].full_price==+i.total)&&i.activity.full_price[o].reduce_price>a&&(a=+i.activity.full_price[o].reduce_price);i.total=(+i.total-a).toFixed(2),i.minus=a.toFixed(2)}else i.stopLoad=!0,t.showToast({title:e.msg,icon:"none",duration:1e3}),"所选活动已下架"===e.msg&&setTimeout((function(){t.navigateBack({})}),1e3)})).catch((function(){i.$hideLoading()}))},getTime:function(t){t>86399?(this.d=Math.floor(t/86400),t-=86400*this.d):this.d=0,t>3599?(this.h=Math.floor(t/3600),this.h<10&&(this.h="0"+this.h),t-=3600*this.h):this.h="00",t>59?(this.m=Math.floor(t/60),this.m<10&&(this.m="0"+this.m),t-=60*this.m):this.m="00",t<60&&(this.s=t,this.s<10&&(this.s="0"+this.s))},getSetting:function(){var i=this;i.$request({url:i.$api.community.setting}).then((function(e){if(0===e.code){switch(i.head=i.community.a,i.getTheme){case"b":i.head=i.community.b;break;case"c":i.head=i.community.c;break;case"d":i.head=i.community.d;break;case"e":i.head=i.community.e;break;case"g":i.head=i.community.g;break;case"h":i.head=i.community.h;break;case"i":i.head=i.community.i;break}i.setting=e.data,i.getList()}else i.$hideLoading(),t.showToast({title:e.msg,icon:"none",duration:1e3})})).catch((function(){i.$hideLoading()}))},getList:function(){var i=this,e={id:i.id,longitude:i.longitude,latitude:i.latitude};i.middleman_id>0&&(e.middleman_id=i.middleman_id),i.$request({url:i.$api.community.user_activity,data:e}).then((function(e){if(i.$hideLoading(),0===e.code){if(0===e.data.list.length)return i.stopLoad=!0,t.showToast({title:"活动商品异常，正在返回活动主页",icon:"none",duration:1e3}),setTimeout((function(){t.redirectTo({url:"/plugins/community/list/list"})}),1e3),!1;if(e.data.list.length<20)i.list=e.data.list;else for(var n in e.data.list)i.list[n]=e.data.list[n];if(i.first&&(i.first=!1,e.data.last_mobile&&(i.mobile=e.data.last_mobile,i.default=!0),e.data.list.length<20?i.more=!1:i.more=!0),i.activity=e.data.activity,i.is_middleman=e.data.is_middleman,i.middleman=e.data.middleman_info,0==i.middleman_id&&t.getStorage({key:"middleman_info",success:function(t){t.data&&t.data.id>0&&(i.middleman=t.data)}}),i.space=~~i.middleman.distance+"m",i.middleman.distance>1e3&&(i.space=(i.middleman.distance/1e3).toFixed(1)+"km"),i.share&&t.setStorage({key:"middleman_info",data:i.middleman}),i.user_list=e.data.user_list,i.user_list.length>i.activity.user_num&&(i.user_list=i.user_list.slice(0,i.activity.user_num)),i.template_message_list=e.data.template_message_list,1==i.activity.activity_status){i.stopLoad||setTimeout((function(){i.getList()}),5e3),i.getCart();var a=Math.floor(i.user_list[i.user_list.length-1].time/60);i.end_time=a>60?"1小时前":0==a?"刚刚":a+"分钟前"}if(2==i.activity.activity_status&&e.data.recommend_activity.activity_id>0&&setTimeout((function(){i.recommend=e.data.recommend_activity,i.recommendDialog=!0;var n=t.createAnimation({duration:1e3,timingFunction:"ease"});i.animation=n,setTimeout((function(){n.bottom(0).step(),i.animationData=n.export(),setTimeout((function(){i.showOther=!0}),1500)}),200)}),800),i.activity.time>0){var o=i.activity.time;i.timeInterval=setInterval((function(){i.getTime(o),o--,0==o&&(clearInterval(i.timeInterval),i.getList())}),1e3)}}else i.stopLoad=!0,"周边没有活动可参加"===e.msg?(t.showToast({title:"周边没有活动可参加，正在返回活动主页",icon:"none",duration:1e3}),setTimeout((function(){t.redirectTo({url:"/plugins/community/list/list"})}),1e3)):t.showToast({title:e.msg,icon:"none",duration:1e3})})).catch((function(){i.$hideLoading()}))}},onShareAppMessage:function(){return this.$shareAppMessage({title:this.setting.app_share_title?this.setting.app_share_title:this.title,imageUrl:this.setting.app_share_pic?this.setting.app_share_pic:this.list[0].cover_pic,path:"/plugins/community/activity/activity",params:{id:this.id,user_id:this.userInfo.options.user_id,middleman_id:this.middleman.user_id}})},onShareTimeline:function(){return this.$shareTimeline({title:this.share_title?this.share_title:this.title,query:{id:this.id,user_id:this.userInfo.options.user_id,middleman_id:this.middleman.user_id}})}};i.default=f}).call(this,e("543d")["default"])},"5a7d":function(t,i,e){"use strict";var n=e("fb96"),a=e.n(n);a.a},bdbc:function(t,i,e){"use strict";(function(t){e("b8bc");n(e("66fd"));var i=n(e("fce5"));function n(t){return t&&t.__esModule?t:{default:t}}t(i.default)}).call(this,e("543d")["createPage"])},f617:function(t,i,e){"use strict";var n;e.d(i,"b",(function(){return a})),e.d(i,"c",(function(){return o})),e.d(i,"a",(function(){return n}));var a=function(){var t=this,i=t.$createElement;t._self._c;t._isMounted||(t.e0=function(i){t.inputRemark=!1},t.e1=function(i){t.inputRemark=!0},t.e2=function(i){t.recommendDialog=!t.recommendDialog},t.e3=function(i){t.recommendDialog=!t.recommendDialog})},o=[]},fb96:function(t,i,e){},fce5:function(t,i,e){"use strict";e.r(i);var n=e("f617"),a=e("fe61");for(var o in a)"default"!==o&&function(t){e.d(i,t,(function(){return a[t]}))}(o);e("5a7d");var s,r=e("f0c5"),c=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"a7ed04a2",null,!1,n["a"],s);i["default"]=c.exports},fe61:function(t,i,e){"use strict";e.r(i);var n=e("4028"),a=e.n(n);for(var o in n)"default"!==o&&function(t){e.d(i,t,(function(){return n[t]}))}(o);i["default"]=a.a}},[["bdbc","common/runtime","common/vendor"]]]);