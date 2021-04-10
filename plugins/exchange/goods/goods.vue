<template>
    <app-layout>
        <view class="app-goods" v-show="loading">
            <app-banner
                :videoUrl="goods.video_url"
                :share="goods.share"
                :picList="goods.pic_url"
                :goods_id="goods_id"
                :isCart="false"
                sign="exchange"
            ></app-banner>
            <bd-info
                :theme="themeObject"
                :name="goods.name"
                :is-negotiable="goods.is_negotiable"
                :subtitle="goods.subtitle"
                :level-show="goods.level_show"
                :price="goods.price"
                :original-price="goods.original_price"
                :price-max="goods.price_max"
                :price-min="goods.price_min"
                :price-member-max="goods.price_member_max"
                :price-member-min="goods.price_member_min"
                :discount='discount'
                :is-vip-card-user="is_vip_card_user"
                :sales="goods.sales"
                :unit="goods.unit"
                :is-sales="goods.is_sales"
                :is-vip="is_vip"
                :flash-sale="flash_sale"
                :goods-id="goods.id"
                :extra-quick-share="goods.extra_quick_share"
                :app-share-pic="goods.app_share_pic"
                :app-share-title="goods.app_share_title"
                :poster-config="posterConfig"
                :poster-generate="posterGenerate"
                :has-poster-nav="true"
                v-bind:goods="goods"
                :share-url="url"
            >
            </bd-info>
            <bd-coupon @change="setCoupon" :theme="themeObject" :coupons="goods.goods_coupon_center"></bd-coupon>
            <bd-xbc
                :coAttr="false"
                :guarantee-title="goods.guarantee_title"
                :guarantee-pic="goods.guarantee_pic"
                :param_content="goods.param_content"
                :param_name="goods.param_name"
                :services="goods.services"
            ></bd-xbc>
            <!--商品信息-->
            <bd-hc
                :integral="goods.goods_marketing_award.integral"
                :coupon="goods.goods_marketing_award.coupon"
                :card="goods.goods_marketing_award.card"
                :balance="goods.goods_marketing_award.balance"
                :theme="themeObject"
            ></bd-hc>
            <bd-comments :goods-id="goods.id"></bd-comments>
            <bd-detail :detail="goods.detail"></bd-detail>
            <!-- 底部空格 -->
            <view class="safe-area-inset-bottom">
                <view :class="full_reduce ? 'u-bottom-height-1' : 'u-bottom-height-0'"></view>
            </view>
            <!-- 底部按钮 -->
            <view v-if="is_open" class="safe-area-inset-bottom u-bottom-fixed">
                <view v-if="full_reduce">
                    <app-goods-full-reduce
                        :theme="getTheme"
                        :full_reduce="full_reduce"
                    >
                    </app-goods-full-reduce>
                </view>
                <view  class="buttons dir-left-nowrap">
                    <view class="app-button main-center cross-center">
                        <view @click="toExchange" v-if="goods.goods_num > 0" class="app-exhange" :class="getTheme + '-m-gradient-o ' + getTheme">
                            立即购买
                        </view>
                        <view class="app-over" v-else>
                            已售罄
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <app-close v-if="showClose" :modal="false" @update="getMall"></app-close>
    </app-layout>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';
    import appBanner from '../../../components/page-component/goods/app-goods-banner.vue';
    import appGoodsFullReduce from '../../../components/page-component/goods/app-goods-full-reduce.vue';
    import appClose from '@/components/basic-component/app-close/app-close.vue';
    import bdInfo from '@/components/page-component/goods/bd-info';
    import bdCoupon from '@/components/page-component/goods/bd-coupon.vue';
    import bdXbc from '@/components/page-component/goods/bd-xbc.vue';
    import bdKb from '@/components/page-component/goods/bd-kb.vue';
    import bdHc from '@/components/page-component/goods/bd-hc.vue';
    import bdDetail from '@/components/page-component/goods/bd-detail.vue';
    import bdComments from '@/components/page-component/goods/bd-comments.vue';

    export default {
        name: 'goods',
        data() {
            return {
                showClose: false,
                is_open: false,
                goods: {},
                posterConfig: this.$api.exchange.poster_config,
                posterGenerate: this.$api.exchange.poster_generate,
                url: '',
                is_vip: false,
                is_vip_card_user: 0,
                show: false,
                list: [],
                goods_id: -1,
                loading: false,
                first: true,
                discount: null,
                flash_sale: null,
                full_reduce: null
            }
        },
        onLoad(options) {
            // #ifdef MP-WEIXIN
            wx.showShareMenu({
                menus: ['shareAppMessage', 'shareTimeline']
            })
            // #endif
            this.goods_id = options.goods_id;
            this.posterConfig = this.posterConfig + '&goods_id=' + this.goods_id;
            this.posterGenerate = this.posterGenerate + '&goods_id=' + this.goods_id;
            this.$showLoading({
                type: 'global',
                text: '加载中...'
            });
            this.request({
                url: this.$api.exchange.detail,
                data: {
                    id: this.goods_id,
                }
            }).then(response => {
                if(response) {
                    this.first = false;
                    let { goods } = response;
                    this.goods = goods;
                    this.loading = true;
                    this.url = `${this.$api.goods.poster}&goods_id=${this.goods.id}`;
                    if(this.goods.vip_card_appoint.discount) {
                        this.is_vip = true;
                        this.discount = this.goods.vip_card_appoint.discount
                    }
                    this.full_reduce = goods.goods_activity.full_reduce;
                    this.flash_sale = this.goods.plugin_extra.flash_sale;
                    this.is_vip_card_user = this.goods.vip_card_appoint.is_vip_card_user;
                    this.$hideLoading();
                }
            });
        },
        onShow() {
            this.showClose = false;
            setTimeout(()=>{
                this.showClose = true;
            })
            if(this.first) {
                return false
            }
            this.$showLoading();
            this.$nextTick(() => {
                this.request({
                    url: this.$api.exchange.detail,
                    data: {
                        id: this.goods_id,
                    }
                }).then(response => {
                    let { goods } = response;
                    this.goods = goods;
                    this.loading = true;
                    this.full_reduce = goods.goods_activity.full_reduce;
                    this.url = `${this.$api.goods.poster}&goods_id=${this.goods.id}`;
                    if(this.goods.vip_card_appoint.discount) {
                        this.is_vip = true;
                        this.discount = this.goods.vip_card_appoint.discount
                    }
                    this.flash_sale = this.goods.plugin_extra.flash_sale;
                    this.is_vip_card_user = this.goods.vip_card_appoint.is_vip_card_user;
                    this.$hideLoading();
                });
            })
        },
        computed: {
            ...mapState('gConfig',{
                iphone: (data) => {
                    return data.iphone;
                },
                iphoneHeight: (state) =>{
                    return  state.iphoneHeight;
                },
            }),
            ...mapGetters('mallConfig', {
                getTheme: 'getTheme',
            }),
            ...mapState({
                mall: state => state.mallConfig.mall,
                userInfo: state => state.user.info
            }),
            themeObject:function() {
                return {
                    back: this.getTheme + '-m-back ' + this.getTheme,
                    backO: this.getTheme + '-m-back-o ' + this.getTheme,
                    theme: this.getTheme,
                    color: this.getTheme + '-m-text ' + this.getTheme,
                    sBack: this.getTheme + '-s-back ' + this.getTheme
                }
            },
        },
        onShareAppMessage() {
            return this.$shareAppMessage({
                path: '/plugins/exchange/goods/goods',
                title: this.goods.app_share_title ? this.goods.app_share_title : this.goods.name,
                imageUrl: this.goods.app_share_pic ? this.goods.app_share_pic : '',
                params: {
                    goods_id: this.goods.id,
                }
            });
        },
        // #ifdef MP-WEIXIN
        onShareTimeline() {
            // 分享朋友圈beta
            return this.$shareTimeline({
                title: this.goods.app_share_title ? this.goods.app_share_title : this.goods.name,
                query: {
                    goods_id: this.goods.id
                }
            });
        },
        // #endif
        methods: {
            getMall(e) {
                this.is_open = e.is_open == 1 ? true : false;
            },
            toExchange() {
                let attr = [];
                for (let i in this.goods.attr[0].attr_list) {
                    attr.push({
                        attr_id: this.goods.attr[0].attr_list[i].attr_id,
                        attr_group_id: this.goods.attr[0].attr_list[i].attr_group_id
                    });
                }
                let mch_list = [{
                    mch_id: 0,
                    goods_list: [{
                        id: this.goods.id,
                        attr: attr,
                        num: 1,
                        cat_id: 0,
                        goods_attr_id: this.goods.attr[0].id
                    }]
                }];
                let url = `/pages/order-submit/order-submit?mch_list=${JSON.stringify(mch_list)}`;
                url += `&preview_url=${encodeURIComponent(this.$api.exchange.order_preview)}&submit_url=${encodeURIComponent(this.$api.exchange.order_submit)}&plugin=exchange`;
                uni.navigateTo({
                    url: url
                })
            },
            async request({url, data}) {
                const response = await this.$request({
                    url: url,
                    data: data,
                });
                if (response.code === 0) {
                    return response.data;
                }else {
                    uni.showModal({
                        title: '提示',
                        content: response.msg,
                        showCancel: false,
                        success: function (res) {
                            uni.navigateBack();
                        }
                    });
                }
            },
            setCoupon(index) {
                this.$set(this.goods.goods_coupon_center[index], 'is_receive', 1);
            }
        },
        components: {
            'app-banner': appBanner,
            appClose,
            appGoodsFullReduce,
            bdInfo,
            bdCoupon,
            bdXbc,
            bdKb,
            bdHc,
            bdDetail,
            bdComments,
        }
    }
</script>

<style lang="scss">
    .buttons {
        width: #{750rpx};
        height: #{110rpx};
        border-top: #{1rpx} solid #e2e2e2;
        .app-button {
            width: 100%;
            height: #{110rpx};
            text-align: center;
            line-height: #{110rpx};
            background-color: #fff;
            .app-exhange {
                width: #{702rpx};
                color: #fff;
                border-radius: #{41rpx};
                height: #{82rpx};
                line-height: #{82rpx};
                font-size: #{28rpx};
            }
            .app-over {
                background: #e9e9e9;
                width: #{702rpx};
                color: #999999;
                border-radius: #{41rpx};
                height: #{82rpx};
                line-height: #{82rpx};
                font-size: #{28rpx};
            }
        }
    }
    .u-bottom-height-0 {
        height: 110upx;
    }
    .u-bottom-height-1 {
        height: 190upx;
    }
    .u-bottom-fixed {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 1602;
        background-color: #ffffff;
    }
</style>