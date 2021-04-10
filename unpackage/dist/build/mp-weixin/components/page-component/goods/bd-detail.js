(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/page-component/goods/bd-detail"],{1545:function(t,n,e){},5109:function(t,n,e){"use strict";var o;e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return o}));var r=function(){var t=this,n=t.$createElement;t._self._c},a=[]},"57bb":function(t,n,e){"use strict";e.r(n);var o=e("748a"),r=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);n["default"]=r.a},"748a":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){Promise.all([e.e("common/vendor"),e.e("components/basic-component/app-rich/parse")]).then(function(){return resolve(e("46fb"))}.bind(null,e)).catch(e.oe)},r={name:"bd-detail",components:{"app-rich-text":o},props:{detail:{type:String,default:function(){return""}}},created:function(){this.$store.dispatch("gConfig/setImageWidth",48)},computed:{newDetail:function(){var t="正在加载数据，模拟网络延迟2秒😝";return this.detail&&(t=this.detail),t}}};n.default=r},c91c:function(t,n,e){"use strict";e.r(n);var o=e("5109"),r=e("57bb");for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);e("f800");var c,i=e("f0c5"),u=Object(i["a"])(r["default"],o["b"],o["c"],!1,null,"0741004f",null,!1,o["a"],c);n["default"]=u.exports},f800:function(t,n,e){"use strict";var o=e("1545"),r=e.n(o);r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/page-component/goods/bd-detail-create-component',
    {
        'components/page-component/goods/bd-detail-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c91c"))
        })
    },
    [['components/page-component/goods/bd-detail-create-component']]
]);
