(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/page-component/app-comments/app-comments"],{"16a3":function(t,e,n){},"33b0":function(t,e,n){"use strict";n.r(e);var r=n("8448"),o=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=o.a},3458:function(t,e,n){"use strict";n.r(e);var r=n("8764"),o=n("33b0");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("dbc4");var a,c=n("f0c5"),u=Object(c["a"])(o["default"],r["b"],r["c"],!1,null,"0bd8be4f",null,!1,r["a"],a);e["default"]=u.exports},8448:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n("2f62");function o(t){return u(t)||c(t)||a(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function a(t,e){if(t){if("string"===typeof t)return s(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(t,e):void 0}}function c(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function u(t){if(Array.isArray(t))return s(t)}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){d(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function d(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var m=1,p=!1,h=!1,b={name:"app-comments",props:{goodsId:Number,url:{type:String,default:function(){return""}},showType:{type:String,default:function(){return"detail"}},reachBottom:Number},watch:{goodsId:{handler:function(){this.loadData()}},reachBottom:{handler:function(){h||this.loadData()}}},computed:f(f({},(0,r.mapState)({mall:function(t){return t.mallConfig.mall}})),(0,r.mapGetters)("mallConfig",{getTheme:"getTheme"})),methods:{loadData:function(){var e=this;0!=this.mall.setting.is_comment&&(p||(p=!0,"detail"!==this.showType&&t.showLoading({title:"加载中"}),this.$request({url:this.url?this.url:this.$api.goods.comments_list,data:{goods_id:this.goodsId,page:m,status:this.status}}).then((function(n){if(p=!1,t.hideLoading(),0===n.code){e.commentCount=n.data.comment_count,1===m&&(e.list=[]);var r=n.data.comments;r.length>0?("detail"===e.showType&&(r=r.splice(0,2)),e.list=[].concat(o(e.list),o(r)),m++):h=!0}})).catch((function(){p=!1,t.hideLoading()}))))},goto:function(){t.navigateTo({url:"/pages/comments/comments?goods_id=".concat(this.goodsId)})},clickStatus:function(t){this.status=t,m=1,h=!1,this.loadData()},imgPreview:function(e,n){this.list&&this.list[e]&&this.list[e].pic_url&&this.list[e].pic_url.length>0&&t.previewImage({current:n,urls:this.list[e].pic_url})}},data:function(){return{commentCount:[],list:[],status:0}},created:function(){m=1,p=!1,h=!1},mounted:function(){this.goodsId&&this.loadData()}};e.default=b}).call(this,n("543d")["default"])},8764:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return r}));var o=function(){var t=this,e=t.$createElement;t._self._c},i=[]},dbc4:function(t,e,n){"use strict";var r=n("16a3"),o=n.n(r);o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/page-component/app-comments/app-comments-create-component',
    {
        'components/page-component/app-comments/app-comments-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3458"))
        })
    },
    [['components/page-component/app-comments/app-comments-create-component']]
]);
