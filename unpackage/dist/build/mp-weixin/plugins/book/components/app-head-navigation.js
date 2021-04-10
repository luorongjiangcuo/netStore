(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["plugins/book/components/app-head-navigation"],{"1fa1":function(n,t,e){"use strict";e.r(t);var a=e("9b9e"),i=e.n(a);for(var u in a)"default"!==u&&function(n){e.d(t,n,(function(){return a[n]}))}(u);t["default"]=i.a},"3dfa":function(n,t,e){"use strict";var a;e.d(t,"b",(function(){return i})),e.d(t,"c",(function(){return u})),e.d(t,"a",(function(){return a}));var i=function(){var n=this,t=n.$createElement;n._self._c},u=[]},"58fe":function(n,t,e){"use strict";e.r(t);var a=e("3dfa"),i=e("1fa1");for(var u in i)"default"!==u&&function(n){e.d(t,n,(function(){return i[n]}))}(u);e("97d1");var r,c=e("f0c5"),f=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,"1b800d44",null,!1,a["a"],r);t["default"]=f.exports},"7ced":function(n,t,e){},"97d1":function(n,t,e){"use strict";var a=e("7ced"),i=e.n(a);i.a},"9b9e":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={name:"app-head-navigation",props:{list:{type:Array,default:function(){return[{name:"全部",id:0},{name:"待支付",id:1},{name:"待使用",id:2},{name:"待评价",id:4},{name:"售后",id:9}]}}},data:function(){return{activeIndex:0}},methods:{active:function(n){this.activeIndex=n,this.$emit("click",n)}}};t.default=a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'plugins/book/components/app-head-navigation-create-component',
    {
        'plugins/book/components/app-head-navigation-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("58fe"))
        })
    },
    [['plugins/book/components/app-head-navigation-create-component']]
]);
