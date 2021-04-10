(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/page-component/app-special-topic/app-special-topic-normal"],{"0d3e":function(t,n,c){"use strict";c.r(n);var e=c("c9c1"),i=c("3710");for(var u in i)"default"!==u&&function(t){c.d(n,t,(function(){return i[t]}))}(u);c("11be");var o,r=c("f0c5"),a=Object(r["a"])(i["default"],e["b"],e["c"],!1,null,"acc0ddf6",null,!1,e["a"],o);n["default"]=a.exports},"11be":function(t,n,c){"use strict";var e=c("f343"),i=c.n(e);i.a},3710:function(t,n,c){"use strict";c.r(n);var e=c("bda7"),i=c.n(e);for(var u in e)"default"!==u&&function(t){c.d(n,t,(function(){return e[t]}))}(u);n["default"]=i.a},bda7:function(t,n,c){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"app-special-topic",props:{topic_list:{type:Array,default:function(){return[]}},count:{type:Number,default:function(){return 2}},icon:String,logo_1:String,logo_2:String},computed:{newDataList:function(){if(2===this.count){for(var t=[],n=0;n<Math.ceil(this.topic_list.length/this.count);n++)t.push(this.topic_list.slice(n*this.count,(n+1)*this.count));return t}}}};n.default=e},c9c1:function(t,n,c){"use strict";var e;c.d(n,"b",(function(){return i})),c.d(n,"c",(function(){return u})),c.d(n,"a",(function(){return e}));var i=function(){var t=this,n=t.$createElement;t._self._c},u=[]},f343:function(t,n,c){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/page-component/app-special-topic/app-special-topic-normal-create-component',
    {
        'components/page-component/app-special-topic/app-special-topic-normal-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0d3e"))
        })
    },
    [['components/page-component/app-special-topic/app-special-topic-normal-create-component']]
]);
