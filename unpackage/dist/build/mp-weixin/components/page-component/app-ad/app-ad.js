(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/page-component/app-ad/app-ad"],{2857:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"app-ad",props:{type:String,unitId:String,picUrl:String,videoUrl:String,theme:{type:String,default:function(){return"white"}},couponUrl:String,couponParams:Object},data:function(){return{rewardedVideoAd:null,interstitialAd:null}},created:function(){this.init()},methods:{onAdLoad:function(){},onAdPlay:function(){},onAdClose:function(){},onAdError:function(){},init:function(){switch(this.type){case"rewarded-video":this.initRewardedVideoAd();break;case"interstitial":this.initInterstitialAd();break;default:break}},initRewardedVideoAd:function(){var t=this;wx.createRewardedVideoAd&&(this.rewardedVideoAd=wx.createRewardedVideoAd({adUnitId:this.unitId}),this.rewardedVideoAd.onClose((function(n){n&&n.isEnded&&t.getUserCoupon()})))},initInterstitialAd:function(){wx.createInterstitialAd&&(this.interstitialAd=wx.createInterstitialAd({adUnitId:this.unitId}))},showRewardedVideoAd:function(){var n=this;this.rewardedVideoAd.show().catch((function(){n.rewardedVideoAd.load().then((function(){return n.rewardedVideoAd.show()})).catch((function(n){t.showToast({title:n.errMsg,icon:"none"})}))}))},showInterstitialAd:function(){this.interstitialAd.show().catch((function(n){t.showToast({title:n.errMsg,icon:"none"})}))},getUserCoupon:function(){var n=this;this.$request({url:this.couponUrl,method:"POST",data:Object.assign({},this.couponParams)}).then((function(e){0===e.code?n.$store.dispatch("page/actionSetCoupon",{list:e.data.list,type:"award"}):t.showToast({title:e.msg,icon:"none"})}))}}};n.default=e}).call(this,e("543d")["default"])},"5a39":function(t,n,e){"use strict";var i=e("7b7e"),a=e.n(i);a.a},"71d4":function(t,n,e){"use strict";e.r(n);var i=e("e0c4"),a=e("a3a0");for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);e("5a39");var r,d=e("f0c5"),c=Object(d["a"])(a["default"],i["b"],i["c"],!1,null,"b01a8b4a",null,!1,i["a"],r);n["default"]=c.exports},"7b7e":function(t,n,e){},a3a0:function(t,n,e){"use strict";e.r(n);var i=e("2857"),a=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);n["default"]=a.a},e0c4:function(t,n,e){"use strict";var i;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return i}));var a=function(){var t=this,n=t.$createElement;t._self._c},o=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/page-component/app-ad/app-ad-create-component',
    {
        'components/page-component/app-ad/app-ad-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("71d4"))
        })
    },
    [['components/page-component/app-ad/app-ad-create-component']]
]);