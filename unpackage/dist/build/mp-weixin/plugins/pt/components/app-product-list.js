(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["plugins/pt/components/app-product-list"],{"0b9e":function(t,e,n){"use strict";n.r(e);var r=n("d0b8"),o=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=o.a},4213:function(t,e,n){"use strict";var r=n("c8a5"),o=n.n(r);o.a},b533:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return r}));var o=function(){var t=this,e=t.$createElement;t._self._c},i=[]},c508:function(t,e,n){"use strict";n.r(e);var r=n("b533"),o=n("0b9e");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("4213");var c,u=n("f0c5"),a=Object(u["a"])(o["default"],r["b"],r["c"],!1,null,"9195298c",null,!1,r["a"],c);e["default"]=a.exports},c8a5:function(t,e,n){},d0b8:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n("2f62");function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){c(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var u={name:"app-product-list",computed:i(i({},(0,r.mapState)({appSetting:function(t){return t.mallConfig.mall.setting},appImg:function(t){return t.mallConfig.__wxapp_img.mall}})),(0,r.mapGetters)("mallConfig",{getVideo:"getVideo"})),props:{list:{type:Array,default:function(){return[]}},themeObject:Object},methods:{route_go:function(e){e.video_url&&1==this.getVideo?t.navigateTo({url:"/pages/goods/video?goods_id=".concat(e.id,"&sign=pintuan")}):t.navigateTo({url:"/plugins/pt/goods/goods?goods_id=".concat(e.id)})}}};e.default=u}).call(this,n("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'plugins/pt/components/app-product-list-create-component',
    {
        'plugins/pt/components/app-product-list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c508"))
        })
    },
    [['plugins/pt/components/app-product-list-create-component']]
]);
