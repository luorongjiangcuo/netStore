(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/page-component/app-buy-prompt/app-buy-prompt"],{5903:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u={name:"app-buy-prompt",data:function(){return{buy_data:null}},created:function(){var t=this;t.$request({url:t.$api.index.buy_data}).then((function(n){0===n.code&&(t.buy_data=n.data)}))},methods:{catchTouchMove:function(){return!1}}};n.default=u},7018:function(t,n,e){"use strict";var u;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return u}));var a=function(){var t=this,n=t.$createElement;t._self._c},r=[]},"8d1e":function(t,n,e){"use strict";var u=e("f1d0"),a=e.n(u);a.a},"9e26":function(t,n,e){"use strict";e.r(n);var u=e("7018"),a=e("e9fe");for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);e("8d1e");var c,o=e("f0c5"),f=Object(o["a"])(a["default"],u["b"],u["c"],!1,null,"647b9866",null,!1,u["a"],c);n["default"]=f.exports},e9fe:function(t,n,e){"use strict";e.r(n);var u=e("5903"),a=e.n(u);for(var r in u)"default"!==r&&function(t){e.d(n,t,(function(){return u[t]}))}(r);n["default"]=a.a},f1d0:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/page-component/app-buy-prompt/app-buy-prompt-create-component',
    {
        'components/page-component/app-buy-prompt/app-buy-prompt-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9e26"))
        })
    },
    [['components/page-component/app-buy-prompt/app-buy-prompt-create-component']]
]);
