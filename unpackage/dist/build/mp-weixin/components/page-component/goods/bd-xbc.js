(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/page-component/goods/bd-xbc"],{"2a9a":function(t,n,r){"use strict";var a=r("950f"),e=r.n(a);e.a},"5b420":function(t,n,r){"use strict";var a;r.d(n,"b",(function(){return e})),r.d(n,"c",(function(){return i})),r.d(n,"a",(function(){return a}));var e=function(){var t=this,n=t.$createElement;t._self._c;t._isMounted||(t.e0=function(n){t.show=!1},t.e1=function(n){t.show=!1})},i=[]},"950f":function(t,n,r){},abb7:function(t,n,r){"use strict";r.r(n);var a=r("5b420"),e=r("fcab");for(var i in e)"default"!==i&&function(t){r.d(n,t,(function(){return e[t]}))}(i);r("2a9a");var o,c=r("f0c5"),u=Object(c["a"])(e["default"],a["b"],a["c"],!1,null,"44dd10fc",null,!1,a["a"],o);n["default"]=u.exports},e926:function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=function(){r.e("components/basic-component/u-popup/u-popup").then(function(){return resolve(r("62f5"))}.bind(null,r)).catch(r.oe)},e={name:"bd-xbc",props:{attrGroups:Array,services:Array,attrList:Array,guaranteeTitle:String,guaranteePic:String,param_content:Array,param_name:String,type:String,goodsStock:Number,coAttr:{type:Number,default:1}},data:function(){return{attrStr:"请选择规格",serviceStr:"",paramStr:"",newAttrGroups:[],attrCount:[],attrName:"",pictureList:[],show:!1,isShow:""}},watch:{attrList:{deep:!0,immediate:!0,handler:function(t){var n="";this.$validation.isEmpty(t)?n="请选择规格":t.forEach((function(t){n+="".concat(t.attr_group_name,":").concat(t.attr_name," ")})),this.attrStr=n}},services:{immediate:!0,handler:function(){var t="";this.$validation.isEmpty(this.services)||this.services.forEach((function(n){t+="".concat(n.name," · ")})),t=t.substring(0,t.lastIndexOf(" · ")+1),this.serviceStr=t}},attrGroups:{immediate:!0,handler:function(t){var n=this;this.newAttrGroups=[],this.pictureList=[],this.attrCount=0,this.attrName="",t.forEach((function(t,r){n.attrName||(n.attrName=t.attr_group_name,t.attr_list.forEach((function(){n.attrCount+=1}))),0===r&&t.attr_list.forEach((function(t){n.newAttrGroups.length<3&&n.newAttrGroups.push(t),t.pic_url&&n.pictureList.length<5&&n.pictureList.push(t.pic_url)}))}))}},param_content:{immediate:!0,handler:function(t){var n="";this.$validation.isEmpty(t)||t.forEach((function(t){n+="".concat(t.key," ")})),n=n.substring(0,n.lastIndexOf(" ")+1),this.paramStr=n}}},components:{uPopup:a},methods:{open:function(t){"attr"===t?this.$emit("openAttr"):(this.show=!0,this.isShow=t)}}};n.default=e},fcab:function(t,n,r){"use strict";r.r(n);var a=r("e926"),e=r.n(a);for(var i in a)"default"!==i&&function(t){r.d(n,t,(function(){return a[t]}))}(i);n["default"]=e.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/page-component/goods/bd-xbc-create-component',
    {
        'components/page-component/goods/bd-xbc-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("abb7"))
        })
    },
    [['components/page-component/goods/bd-xbc-create-component']]
]);