<template>
    <app-layout :haveBackground="haveBackground">
        <app-my-app v-if="config.is_add_app == 1"></app-my-app>
        <template v-if="type === 'mall'">
            <app-index @buyProduct="buyProduct" v-if="destroy" :page-hide="pageHide" :home-pages="homePages" :is_storage="is_storage" :theme="themeObject" :page_id="page_id" :is_required="is_required" :coupon_req="coupon_req"></app-index>
        </template>
        <template v-else-if="type === 'diy'">
            <app-diy-page @buyProduct="buyProduct" v-if="destroy" :page-hide="pageHide" :home-pages="homePages" :is_storage="is_storage" :theme="getTheme" :page_id="page_id" :is_required="is_required" :coupon_req="coupon_req"></app-diy-page>
        </template>
        <app-buy-prompt v-if="config.is_purchase_frame === `1`"></app-buy-prompt>
        <app-attr :goods="attrGoods.goods" :attrGroupList="attrGoods.goods.attr_groups" :theme="getTheme" :show="attrGoods.attrShow"></app-attr>
    </app-layout>
</template>
<script>
    import { mapGetters, mapState } from 'vuex';

    import appIndex from '../../components/page-component/index/app-index.vue';
    import appDiyPage from '../../components/page-component/index/app-diy-page.vue';
    import appBuyPrompt from '../../components/page-component/app-buy-prompt/app-buy-prompt.vue';
    import appMyApp from '../../components/page-component/app-my-app/app-my-app.vue';
    import appAttr from '../../components/page-component/app-attr/app-attr.vue';

    export default {
        name: 'index',

        components: {
            appIndex,
            'app-diy-page': appDiyPage,
            appBuyPrompt,
            appMyApp,
            appAttr
        },

        data() {
            return {
                homePages: [],
                type: '',
                is_storage: false,
                haveBackground: true,
                destroy: true,
                pageHide: false,
                is_required: true,
                coupon_req: false,
                page_id: 0,
                //
                attrGoods: {
                    goods: {},
                    attrShow: 0
                },
            }
        },

        onShow() {
            // #ifdef MP-TOUTIAO
            this.destroy = true;
            // #endif
            this.pageHide = false;
        },
        onHide() {
            // #ifdef MP-TOUTIAO
            this.destroy = false;
            // #endif
            this.pageHide = true;
        },
        onLoad(options) {
            // 测试下分支
            if (typeof options.scene !== 'undefined') {
                if (options.scene === 'share') {
                    this.share(options);
                } else {
                    this.qrcode(options);
                }
            } else {
                // this.$showLoading();
            }

            // #ifdef MP-ALIPAY
            let query = this.$store.state.page.query;
            if (query && typeof query.scene !== 'undefined') this.qrcode(query);
            // #endif


            if (typeof options.user_id !== 'undefined') {
                this.$store.dispatch('user/setTempParentId', options.user_id);
            }

            this.page_id = typeof options.page_id !== 'undefined' ? Number(options.page_id) : 0;
            // mall
            if (this.page_id === 0) {
                let storage = this.$storage.getStorageSync('INDEX_MALL');
                if (storage) {
                    let old = new Date(storage.time.replace(/-/g, '/'));
                    old.setMinutes(old.getMinutes() + 10);
                    let now = new Date();
                    let time = now.getTime() - old.getTime();
                    if (time >= 0) {
                        this.type = storage.type;
                        this.homePages = storage.home_pages;
                        this.loadMall();
                    } else {
                        this.type = storage.type;
                        if (this.type === 'diy') {
                            this.coupon_req = true;
                            this.homePages = {}
                        }
                        this.$nextTick(() => {
                            this.homePages = storage.home_pages;
                            let that = this;
                            if(this.homePages.navs && this.homePages.navs.length > 0) {
                                this.homePages.navs.forEach(function(row,inedx){
                                    row.template.data.forEach(function(v,idx){
                                        if(v.id === 'background') {
                                            that.haveBackground = false;
                                            return false;
                                        }
                                    })
                                })
                            }
                        });
                        this.is_required = false;
                    }
                } else {
                    this.loadMall();
                }
                //  DIY
            } else {
                this.coupon_req = true;
                this.loadDiy();
            }

            // #ifdef MP-WEIXIN
            wx.showShareMenu({
                menus: ['shareAppMessage', 'shareTimeline']
            })
            const updateManager = wx.getUpdateManager()
            if (updateManager) {
                updateManager.onCheckForUpdate(function (res) {
                    // 请求完新版本信息的回调
                })

                updateManager.onUpdateReady(function () {
                    wx.showModal({
                        title: '更新提示',
                        content: '新版本已经准备好，是否重启应用？',
                        success(res) {
                            if (res.confirm) {
                                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                updateManager.applyUpdate()
                            }
                        }
                    })
                })
            }
            // #endif
        },

        /* #ifdef MP_WEIXIN || MP_BAIDU */
        onPageScroll(e) {
            this.$store.dispatch('page/actionSetScrollTop', e.scrollTop);
        },
        /* #endif */

        methods: {
            async loadMall() {
                const e = await this.$request({
                    url: this.$api.index.tplIndex,
                    data: {
                        page_id: 0
                    },
                    method: 'get'
                });

                let { code, data } = e;
                this.$hideLoading();
                if (code === 0) {
                    this.is_storage = false;
                    this.$popupAd.show = null;
                    this.type = data.type;
                    let that = this;
                    this.is_required = true;
                    if (this.type === 'diy') {
                        this.coupon_req = true;
                        this.homePages = {};
                    }
                    this.$nextTick(() => {
                        this.homePages = data.home_pages;
                        if (this.homePages.navs && that.homePages.navs.length > 0) {
                            this.homePages.navs.forEach(function(row, inedx) {
                                row.template.data.forEach(function(v, idx) {
                                    if (v.id === 'background') {
                                        that.haveBackground = false;
                                        return false;
                                    }
                                })
                            })
                        }
                    });
                    this.$storage.setStorageSync('INDEX_MALL', data);
                }
            },
            async loadDiy() {
                const e = await this.$request({
                    url: this.$api.index.tplIndex,
                    data: {
                        page_id: this.page_id
                    },
                    method: 'get'
                });
                let { code, data } = e;
                this.$hideLoading();
                if (code === 0) {
                    this.is_storage = false;
                    this.$popupAd.show = null;
                    this.homePages = data.home_pages;
                    this.type = data.type;
                    let that = this;
                    if (this.homePages.navs && that.homePages.navs.length > 0) {
                        this.homePages.navs.forEach(function(row, inedx) {
                            row.template.data.forEach(function(v, idx) {
                                if (v.id === 'background') {
                                    that.haveBackground = false;
                                    return false;
                                }
                            })
                        })
                    }
                }
            },
            share(options) {
                if (typeof options.params !== 'undefined') {
                    let params = JSON.parse(options.params);
                    this.$jump({
                        url: params.path + '?' + this.$utils.objectToUrlParams(params),
                        open_type: 'navigate'
                    });
                }
            },
            qrcode(options) {
                this.$request({
                    url: this.$api.default.qrcode_parameter,
                    data: {
                        token: options.scene
                    }
                }).then(response => {
                    if (response.code === 0) {
                        this.$store.dispatch('page/actionSetQeury', null);
                        let { data, path } = response.data.detail;
                        let url = path == 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin' ? `${path}` : `/${path}`;
                        if (data) {
                            url += '?' + this.$utils.objectToUrlParams(data);
                            if (typeof data.user_id !== 'undefined') {
                                this.$store.dispatch('user/setTempParentId', data.user_id)
                            }
                        }
                        if (`/${path}` != '/pages/index/index' || (typeof data.page_id !== 'undefined' && data.page_id !== this.homePages.id !== 0)) {
                            this.$jump({
                                url: url,
                                open_type: 'navigate'
                            });
                        }
                    }
                }).catch(() => {});
            },
            buyProduct(data) {
                this.attrGoods.goods = data.goods;
                this.attrGoods.attrShow = data.attrShow;
            }
        },
        onShareAppMessage() {
            let args = {
                path: '/pages/index/index',
                params: {}
            };
            if (this.page_id == 0) {
                args.title = this.mall.setting.share_title ? this.mall.setting.share_title : this.mall.name;
                args.imageUrl = this.mall.setting.share_pic
            } else {
                args.title = this.homePages.title;
                args.params.page_id = this.page_id;
            }
            return this.$shareAppMessage(args);
        },
        computed: {
            ...mapGetters('mallConfig', {
                tabBarNavs: 'getNavBar',
                getTheme: 'getTheme',
            }),
            ...mapState('mallConfig', {
                config: state => state.mall.setting,
                mall: state => state.mall,
            }),
            themeObject:function() {
                return {
                    back: this.getTheme + '-m-back ' + this.getTheme,
                    backP: this.getTheme + '-m-back-p ' + this.getTheme,
                    backO: this.getTheme + '-m-back-o ' + this.getTheme,
                    theme: this.getTheme,
                    color: this.getTheme + '-m-text ' + this.getTheme,
                    sBack: this.getTheme + '-s-back ' + this.getTheme,
                    border: this.getTheme + '-m-border ' + this.getTheme,
                }
            },
        },
        // #ifdef MP-WEIXIN
        onShareTimeline() {
            // 分享朋友圈beta
            let query = {};
            let title = '';
            if (this.page_id == 0) {
                title = this.mall.setting.share_title ? this.mall.setting.share_title : this.mall.name;
            } else {
                title = this.homePages.title;
                query.page_id = this.page_id;
            }
            return this.$shareTimeline({
                title: title,
                query: query
            });
        },
        // #endif
    };
</script>
