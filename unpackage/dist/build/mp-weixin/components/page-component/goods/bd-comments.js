(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/page-component/goods/bd-comments"],{"22b8":function(t,e,n){"use strict";var r=n("f932"),o=n.n(r);o.a},"57fa":function(t,e,n){"use strict";n.r(e);var r=n("70180"),o=n("bab2");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("22b8");var c,s=n("f0c5"),u=Object(s["a"])(o["default"],r["b"],r["c"],!1,null,"79374018",null,!1,r["a"],c);e["default"]=u.exports},70180:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return r}));var o=function(){var t=this,e=t.$createElement;t._self._c},i=[]},bab2:function(t,e,n){"use strict";n.r(e);var r=n("e01c"),o=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=o.a},e01c:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n("2f62");function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){c(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var s={name:"bd-comments",props:{goodsId:Number},data:function(){return{list:[]}},computed:i({},(0,r.mapState)({isComment:function(t){return t.mallConfig.mall.setting.is_comment}})),methods:{getList:function(e){var n=this;this.$request({url:this.$api.goods.comments_list,data:{goods_id:e}}).then((function(e){0===e.code?n.list=e.data.comments.slice(0,2):t.showToast({icon:"none",title:e.msg})}))},imgPreview:function(e,n){this.list&&this.list[e]&&this.list[e].pic_url&&this.list[e].pic_url.length>0&&t.previewImage({current:n,urls:this.list[e].pic_url})},goto:function(){t.navigateTo({url:"/pages/comments/comments?goods_id=".concat(this.goodsId)})}},watch:{goodsId:{immediate:!0,handler:function(t){this.getList(t)}}}};e.default=s}).call(this,n("543d")["default"])},f932:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/page-component/goods/bd-comments-create-component',
    {
        'components/page-component/goods/bd-comments-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("57fa"))
        })
    },
    [['components/page-component/goods/bd-comments-create-component']]
]);