(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/full_reduce/search/search"],{"065e":function(t,e,r){"use strict";r.r(e);var n=r("8aad"),o=r("7f25");for(var a in o)"default"!==a&&function(t){r.d(e,t,(function(){return o[t]}))}(a);r("cb72");var i,s=r("f0c5"),c=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,"74debea9",null,!1,n["a"],i);e["default"]=c.exports},"1b3c":function(t,e,r){},"3eeb":function(t,e,r){"use strict";(function(t){r("b8bc");n(r("66fd"));var e=n(r("065e"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,r("543d")["createPage"])},"7f25":function(t,e,r){"use strict";r.r(e);var n=r("b380"),o=r.n(n);for(var a in n)"default"!==a&&function(t){r.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},"8aad":function(t,e,r){"use strict";var n;r.d(e,"b",(function(){return o})),r.d(e,"c",(function(){return a})),r.d(e,"a",(function(){return n}));var o=function(){var t=this,e=t.$createElement;t._self._c},a=[]},b380:function(t,e,r){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(r("a34a")),o=r("2f62");function a(t){return t&&t.__esModule?t:{default:t}}function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function s(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){c(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function c(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function u(t){return g(t)||d(t)||l(t)||f()}function f(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(t,e){if(t){if("string"===typeof t)return p(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?p(t,e):void 0}}function d(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function g(t){if(Array.isArray(t))return p(t)}function p(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function h(t,e,r,n,o,a,i){try{var s=t[a](i),c=s.value}catch(u){return void r(u)}s.done?e(c):Promise.resolve(c).then(n,o)}function y(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function i(t){h(a,n,o,i,s,"next",t)}function s(t){h(a,n,o,i,s,"throw",t)}i(void 0)}))}}var b="FULL_REDUCE_SEARCH",m=function(){r.e("components/page-component/app-product-list/app-product-list").then(function(){return resolve(r("d4b5"))}.bind(null,r)).catch(r.oe)},v=function(){r.e("components/page-component/app-no-goods/app-no-goods").then(function(){return resolve(r("17fc"))}.bind(null,r)).catch(r.oe)},S={name:"search",data:function(){return{keyword:"",strong:[],page:1,goods_list:[],search:!1,is_search:0,loading:!1}},onLoad:function(){this.$storage.getStorageSync(b)?this.strong=this.$storage.getStorageSync(b):this.$storage.setStorageSync(b,[])},methods:{request:function(t){var e=this;return y(n.default.mark((function r(){var o,a;return n.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.$request({url:e.$api.full_reduce.list,method:"get",data:{page:e.page,keyword:e.keyword}});case 2:o=r.sent,e.loading=!0,0===o.code&&(t&&(e.goods_list=[]),(a=e.goods_list).push.apply(a,u(o.data.list)),e.page_count=o.data.pagination.page_count);case 5:case"end":return r.stop()}}),r)})))()},searchRequest:function(t){this.search=!0,this.goods_list=[],this.page=1,this.keyword=t,this.request(1)},setRequest:function(){var t=this;this.keyword=this.keyword.trim(),this.keyword.match(/^[ ]*$/)||(this.search=!0,this.goods_list=[],this.request().then((function(){for(var e=t.$storage.getStorageSync(b),r=0;r<e.length;r++)if(e[r]===t.keyword)return;e.unshift(t.keyword),e.length>15&&(e=e.slice(0,15)),t.$storage.setStorageSync(b,e)})))},routeGo:function(e){e.video_url&&1==this.getVideo?t.navigateTo({url:"/pages/goods/video?goods_id=".concat(e.id)}):t.navigateTo({url:e.page_url})},empyt_search:function(){this.goods_list=[],this.keyword="",this.search=!1,this.$storage.getStorageSync(b)?this.strong=this.$storage.getStorageSync(b):this.$storage.setStorageSync(b,[])},setClearStorage:function(){this.$storage.removeStorageSync(b),this.strong=[],this.$storage.setStorageSync(b,[])}},components:{"app-product-list":m,appNoGoods:v},computed:s(s({},(0,o.mapGetters)("mallConfig",{getTheme:"getTheme"})),(0,o.mapGetters)("mallConfig",{getVideo:"getVideo"})),onReachBottom:function(){this.page<this.page_count&&(this.page++,this.request())}};e.default=S}).call(this,r("543d")["default"])},cb72:function(t,e,r){"use strict";var n=r("1b3c"),o=r.n(n);o.a}},[["3eeb","common/runtime","common/vendor"]]]);