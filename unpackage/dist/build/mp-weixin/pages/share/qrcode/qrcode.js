(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/share/qrcode/qrcode"],{"2c7e":function(t,e,n){"use strict";n.r(e);var o=n("f2a8"),r=n("a761");for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);n("384b");var c,u=n("f0c5"),a=Object(u["a"])(r["default"],o["b"],o["c"],!1,null,"000de7af",null,!1,o["a"],c);e["default"]=a.exports},"384b":function(t,e,n){"use strict";var o=n("fd85"),r=n.n(o);r.a},"8e12":function(t,e,n){"use strict";(function(t){n("b8bc");o(n("66fd"));var e=o(n("2c7e"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"95d5":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("2f62");function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){c(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var u={data:function(){return{img:""}},computed:i({},(0,o.mapState)({mall:function(t){return t.mallConfig.mall},custom_setting:function(t){return t.mallConfig.share_setting_custom},share_img:function(t){return t.mallConfig.__wxapp_img.share}})),methods:{look:function(){var e=this;t.previewImage({current:e.img,urls:[e.img]})},saveImg:function(){var e=this;t.authorize({scope:"scope.writePhotosAlbum",success:function(n){"authorize:ok"==n.errMsg&&t.downloadFile({url:e.img,success:function(e){t.saveImageToPhotosAlbum({filePath:e.tempFilePath,success:function(e){t.showToast({title:"保存成功",icon:"success",duration:1e3})},fail:function(e){t.showToast({title:"保存失败",icon:"none",duration:1e3})}})}})},fail:function(e){t.showModal({title:"提示",content:"保存到相册失败，需要授权保存到相册权限",showCancel:!1,confirmText:"打开授权",success:function(e){e.confirm&&t.openSetting({})}})}})},getList:function(){var e=this;e.$request({url:e.$api.share.poster,method:"get"}).then((function(n){e.$hideLoading(),0==n.code?e.img=n.data.pic_url:t.showToast({title:n.msg,icon:"none",duration:1e3})})).catch((function(t){e.$hideLoading(),e.$event.on(e.$const.EVENT_USER_LOGIN).then((function(){e.getList()}))}))}},onLoad:function(e){var n=this;t.setNavigationBarTitle({title:n.custom_setting.menus.qrcode.name}),n.$showLoading({type:"global",text:"加载中..."}),n.getList()}};e.default=u}).call(this,n("543d")["default"])},a761:function(t,e,n){"use strict";n.r(e);var o=n("95d5"),r=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=r.a},f2a8:function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var r=function(){var t=this,e=t.$createElement;t._self._c},i=[]},fd85:function(t,e,n){}},[["8e12","common/runtime","common/vendor"]]]);