(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/page-component/app-navigation-icon/app-navigation-icon"],{"1d1b":function(t,n,e){"use strict";e.r(n);var u=e("c379"),r=e("e513");for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);e("f4a1");var i,c=e("f0c5"),o=Object(c["a"])(r["default"],u["b"],u["c"],!1,null,"e3b943b2",null,!1,u["a"],i);n["default"]=o.exports},"62f8":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"app-navigation-icon",data:function(){return{width:t.upx2px(0)+"px",height:0}},props:{background:{type:String,default:function(){return"#ffffff"}},color:{type:String,default:function(){return""}},columns:{type:Number,default:function(){return 3}},rows:{type:Number,default:function(){return 4}},scroll:{type:Boolean,default:function(){return!1}},navs:{type:Array,default:function(){return[]}}},computed:{newData:function(){this.width="".concat(t.upx2px(750/this.columns),"px");var n=[],e=[],u=Number(this.columns)*this.rows;if(!0===this.scroll){for(var r=0;r<Math.ceil(this.navs.length/u);r++)n.push(this.navs.slice(r*u,(r+1)*u));for(var a=0;a<n.length;a++){for(var i=[],c=0;c<Math.ceil(n[a].length/Number(this.columns));c++)i.push(n[a].slice(c*Number(this.columns),(c+1)*Number(this.columns)));e.push(i)}}else{-1===this.rows?n=[this.navs]:n.push(this.navs.slice(0,u));for(var o=0;o<n.length;o++){for(var s=[],f=0;f<Math.ceil(n[o].length/Number(this.columns));f++)s.push(n[o].slice(f*Number(this.columns),(f+1)*Number(this.columns)));e.push(s)}}return e.length,e}},watch:{newData:{handler:function(n){this.height="".concat(t.upx2px(156*n[0].length),"px")},immediate:!0}}};n.default=e}).call(this,e("543d")["default"])},c379:function(t,n,e){"use strict";var u;e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return u}));var r=function(){var t=this,n=t.$createElement;t._self._c},a=[]},dd5f:function(t,n,e){},e513:function(t,n,e){"use strict";e.r(n);var u=e("62f8"),r=e.n(u);for(var a in u)"default"!==a&&function(t){e.d(n,t,(function(){return u[t]}))}(a);n["default"]=r.a},f4a1:function(t,n,e){"use strict";var u=e("dd5f"),r=e.n(u);r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/page-component/app-navigation-icon/app-navigation-icon-create-component',
    {
        'components/page-component/app-navigation-icon/app-navigation-icon-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("1d1b"))
        })
    },
    [['components/page-component/app-navigation-icon/app-navigation-icon-create-component']]
]);