(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/foot/index/index"],{"03a1":function(t,e,i){"use strict";i.r(e);var o=i("77af"),n=i("ca64");for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("74a0");var a,r=i("f0c5"),c=Object(r["a"])(n["default"],o["b"],o["c"],!1,null,"7b551e1d",null,!1,o["a"],a);e["default"]=c.exports},"384a":function(t,e,i){"use strict";(function(t){i("b8bc");o(i("66fd"));var e=o(i("03a1"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},"74a0":function(t,e,i){"use strict";var o=i("a46c"),n=i.n(o);n.a},"77af":function(t,e,i){"use strict";var o;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return o}));var n=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.beDelete=!0})},s=[]},a46c:function(t,e,i){},ba61:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i("2f62");function n(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,o)}return i}function s(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?n(Object(i),!0).forEach((function(e){a(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):n(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function a(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}for(var r=new Date,c=[],h=[],d=[],u=2017;u<=r.getFullYear();u++)c.push(u);for(var l=1;l<=12;l++)h.push(l);for(var g=1;g<=31;g++)d.push(g);var f={data:function(){return{showMenu:!1,otherday:!1,beDelete:!1,page:1,detail:{},chooseTime:!1,end_time:"",start_time:"",today:"",yesterday:"",showText:!1,weekday:"",monthday:"",list:[],start:[],end:[],chooseStart:[],chooseEnd:[],showTime:"",years:c,months:h,days:d,selectAttr:null,loading:!1,index:-1,dateList:null,buyText:"立即购买",sign:"",cartShow:1,plugin:"",buyBool:!1,previewUrl:"",submitUrl:"",attrShow:0}},computed:s(s({},(0,o.mapState)({appSetting:function(t){return t.mallConfig.mall.setting},appImg:function(t){return t.mallConfig.__wxapp_img.mall}})),(0,o.mapGetters)("mallConfig",{getVideo:"getVideo"})),methods:{redirect:function(e){t.redirectTo({url:e})},toDetail:function(e){e.goodsWarehouse.video_url&&1==this.getVideo?t.navigateTo({url:"/pages/goods/video?goods_id=".concat(e.goods_id,"&sign=").concat(e.sign)}):t.navigateTo({url:e.page_url})},startChange:function(t){this.chooseStart=t.detail.value},endChange:function(t){this.chooseEnd=t.detail.value},toChoose:function(){var e=this.years[this.chooseStart[0]],i=this.months[this.chooseStart[1]],o=this.days[this.chooseStart[2]],n=this.years[this.chooseEnd[0]],s=this.months[this.chooseEnd[1]],a=this.days[this.chooseEnd[2]];+n==+e?s==+i?+a>=+o?this.getTimeList(e,n,i,s,o,a):t.showToast({title:"结束时间不应早于开始时间",icon:"none",duration:1e3}):+s>+i?this.getTimeList(e,n,i,s,o,a):+s<+i&&t.showToast({title:"结束时间不应早于开始时间",icon:"none",duration:1e3}):+n>+e?this.getTimeList(e,n,i,s,o,a):+n<+e&&t.showToast({title:"结束时间不应早于开始时间",icon:"none",duration:1e3})},getTimeList:function(e,i,o,n,s,a){this.otherday=!0,o>=1&&o<=9&&(o="0"+o),s>=1&&s<=9&&(s="0"+s),this.start_time=e+"-"+o+"-"+s,n>=1&&n<=9&&(n="0"+n),a>=1&&a<=9&&(a="0"+a),this.end_time=i+"-"+n+"-"+a,this.chooseTime=!1,this.showTime=this.start_time.substr(5).replace("-",".")+"-"+this.end_time.substr(5).replace("-","."),t.showLoading({title:"加载中..."}),this.page=1,this.list=[],this.getList()},choose:function(){var t,e,i=this;i.start=[],i.end=[],t=i.start_time?i.start_time:i.today,e=i.end_time?i.end_time:i.today,i.years.forEach((function(e,o){t.substring(0,4)==i.years[o]&&(i.start[0]=+o)})),i.months.forEach((function(e,o){t.substring(5,7)==i.months[o]&&(i.start[1]=+o)})),i.days.forEach((function(e,o){t.substring(8,10)==i.days[o]&&(i.start[2]=+o)})),i.years.forEach((function(t,o){e.substring(0,4)==i.years[o]&&(i.end[0]=+o)})),i.months.forEach((function(t,o){e.substring(5,7)==i.months[o]&&(i.end[1]=+o)})),i.days.forEach((function(t,o){e.substring(8,10)==i.days[o]&&(i.end[2]=+o)})),i.chooseStart=i.start,i.chooseEnd=i.end,i.chooseTime=!i.chooseTime},toDelete:function(){var e=this;this.$request({url:this.$api.foot.del,data:{id:this.detail.id}}).then((function(i){t.hideLoading(),e.$hideLoading(),0===i.code?(e.showText=i.msg,e.closeMenu(),e.dateList.goods.splice(e.index,1),setTimeout((function(){e.showText=!1}),1e3)):t.showToast({title:i.msg,icon:"none",duration:1e3})})).catch((function(){t.hideLoading(),e.$hideLoading()}))},toShow:function(t,e,i){this.detail=t,this.dateList=e,this.index=i,this.showMenu=!0},closeMenu:function(){this.detail={},this.beDelete=!1,this.showMenu=!1},cancel:function(){this.chooseTime=!1,this.otherday=!1,this.chooseStart=[],this.chooseEnd=[]},getList:function(){var e=this;if(e.loading)return!1;e.loading=!0,e.$request({url:e.$api.foot.index,data:{start_time:e.start_time+" 00:00:00",end_time:e.end_time+" 23:59:59",page:e.page}}).then((function(i){e.loading=!1,t.hideLoading(),e.$hideLoading(),0===i.code?e.list.length>0?(e.list[e.list.length-1].date==i.list[0].date&&(e.list[e.list.length-1].goods=e.list[e.list.length-1].goods.concat(i.list.shift().goods)),e.list=e.list.concat(i.list)):e.list=e.list.concat(i.list):t.showToast({title:i.msg,icon:"none",duration:1e3})})).catch((function(){e.loading=!1,t.hideLoading(),e.$hideLoading(),e.$event.on(e.$const.EVENT_USER_LOGIN).then((function(){e.getList()}))}))},toFavorite:function(){var e=this;e.$request({url:e.$api.user.favorite_add,data:{goods_id:e.detail.goods_id}}).then((function(i){0===i.code||"已经收藏过啦！"===i.msg?(e.showText=i.msg,e.closeMenu(),setTimeout((function(t){e.showText=!1}),1e3)):t.showToast({title:i.msg,icon:"none",duration:1e3})}))},getDate:function(){var t=new Date,e=t.getFullYear(),i=t.getMonth()+1;i>=1&&i<=9&&(i="0"+i);var o=t.getDate();this.today=e+"-"+i+"-"+o;var n=Date.parse(new Date),s=1e3*(n/1e3-86400),a=new Date(s),r=a.getFullYear(),c=a.getMonth()+1;c>=1&&c<=9&&(c="0"+c);var h=a.getDate();this.yesterday=r+"-"+c+"-"+h;var d=1e3*(n/1e3-604800),u=new Date(d),l=u.getFullYear(),g=u.getMonth()+1;g>=1&&g<=9&&(g="0"+g);var f=u.getDate();this.weekday=l+"-"+g+"-"+f;var m=1e3*(n/1e3-2592e3),p=new Date(m),y=p.getFullYear(),b=p.getMonth()+1;b>=1&&b<=9&&(b="0"+b);var v=p.getDate();this.monthday=y+"-"+b+"-"+v},chooseDate:function(e,i){if(this.loading)return!1;t.showLoading({title:"加载中..."}),this.otherday=!1,this.list=[],this.page=1,this.start_time=e,this.end_time=i,this.getList()}},onLoad:function(){this.$showLoading({type:"global",text:"加载中..."}),this.getDate(),this.start_time=this.today,this.end_time=this.today,this.getList()},onReachBottom:function(){this.page++,this.getList()}};e.default=f}).call(this,i("543d")["default"])},ca64:function(t,e,i){"use strict";i.r(e);var o=i("ba61"),n=i.n(o);for(var s in o)"default"!==s&&function(t){i.d(e,t,(function(){return o[t]}))}(s);e["default"]=n.a}},[["384a","common/runtime","common/vendor"]]]);