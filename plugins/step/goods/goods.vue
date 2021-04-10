<template>
    <app-layout>
        <view v-if="!goods" class="u-goods-detail"></view>
        <template v-if="goods">
            <app-goods-banner
                :pic-list="goods.pic_url"
                :share="goods.share"
                :goods_id="goods.id"
                :video-url="goods.video_url"
            ></app-goods-banner>
            <view class="bd-info">
                <view class="goods-name u-line-2">{{goods.name}}</view>
                <view v-if="goods.subtitle" class="goods-subtitle">
                    <view class="t-omit-three">{{goods.subtitle}}</view>
                </view>
                <view class='price main-between' :class="getTheme+ '-m-text ' + getTheme">
                    <view class="dir-left-nowrap cross-bottom">
                        <image src='./../image/detail-price.png'></image>
                        <view class="cross-bottom">{{goods.min_currency}}</view>
                        <view class="goods-currency" v-if="goods.max_currency > goods.min_currency">起</view>
                        <view>+</view>
                        <view style="font-size: 14px">￥</view>
                        <view>{{goods.min_price}}</view>
                        <view class="goods-currency" v-if="goods.max_price > goods.min_price">起</view>
                    </view>
                    <view class="share" @click="shareClick">
                        <image src="/static/image/icon/icon-share.png"></image>
                        <view>分享</view>
                    </view>
                </view>
                <app-share-qr-code :url="shareUrl"
                                   :has-poster-nav="true"
                                   :poster-config="poster_config + `&goods_id=` + goods.id"
                                   :poster-generate="poster_generate + `&goods_id=` + goods.id"
                                   v-model="shareShow"
                ></app-share-qr-code>
            </view>
            <bd-coupon  @change="setCoupon" :theme="themeObject" :coupons="goods.goods_coupon_center"></bd-coupon>
            <bd-xbc
                :coAttr="is_open"
                :attr-list="selectAttr.attr_list"
                :type="goods.type"
                :guarantee-title="goods.guarantee_title"
                :guarantee-pic="goods.guarantee_pic"
                :param_content="goods.param_content"
                :param_name="goods.param_name"
                :services="goods.services"
                :attr-groups="goods.attr_groups"
                :goods-stock="goods.goods_stock"
                @openAttr="clickAttr"
            ></bd-xbc>
            <bd-hc
                :integral="goods.goods_marketing_award.integral"
                :coupon="goods.goods_marketing_award.coupon"
                :card="goods.goods_marketing_award.card"
                :balance="goods.goods_marketing_award.balance"
                :theme="themeObject"
            ></bd-hc>
            <bd-kb
                :limit="goods.goods_marketing.limit"
                :express="goods.express"
                :shipping="goods.goods_marketing.shipping"
                :pickup="goods.goods_marketing.pickup"
            ></bd-kb>
            <bd-detail :detail="goods.detail"></bd-detail>
            <!--空格区域-->
            <view class="safe-area-inset-bottom u-bottom">
                <view class="u-bottom-height"></view>
            </view>
            <!--底部按钮-->
            <view v-if="is_open == 1" class="safe-area-inset-bottom u-bottom-fixed">
                <view class="app-bottom dir-left-nowrap">
                    <view class="dir-top-nowrap main-center cross-center little box-grow-0" @click="back">
                        <image src="/static/image/icon/index.png"></image>
                        <view>首页</view>
                    </view>
                    <view class="dir-left-nowrap">
                        <view v-if="goods.goods_stock == 0" class="dir-left-nowrap">
                            <view class="main-center cross-center button" style="background-color: #CDCDCD;color: #fff;">已售罄
                            </view>
                        </view>
                        <view v-else class="main-center cross-center button"
                              :class="getTheme + '-m-back ' + getTheme"
                              @click="clickAttr"
                        >立即兑换
                        </view>
                    </view>
                </view>
            </view>
            <u-attr
                :goods="goods"
                v-model="attrShow"
                :themeObject="themeObject"
                :checked="selectAttr"
                :is_show_left="false"
                rightText="立即兑换"
                @check="onAttr"
                :rightFunc="true"
                @rightFunc="rightFunc"
            >
                <view slot="priceBefore">
                    {{selectAttr.extra.value}}{{selectAttr.extra.name}} +
                </view>
            </u-attr>
        </template>
        <app-close v-if="showClose" :modal="false" @update="getMall"></app-close>
    </app-layout>
</template>

<script>
    import {mapGetters, mapState} from "vuex";
    import appGoodsBanner from "../../../components/page-component/goods/app-goods-banner.vue";
    import appShareQrCode from '../../../components/page-component/app-share-qr-code-poster/app-share-qr-code-poster.vue';
    import uAttr from '../../../components/page-component/goods/u-attr.vue';
    import bdCoupon from '@/components/page-component/goods/bd-coupon.vue';
    import bdXbc from '@/components/page-component/goods/bd-xbc.vue';
    import bdDetail from '@/components/page-component/goods/bd-detail.vue';
    import bdKb from '@/components/page-component/goods/bd-kb.vue';
    import bdHc from '@/components/page-component/goods/bd-hc.vue';
    import appClose from '@/components/basic-component/app-close/app-close.vue';

    export default {
        name: "goods",
        components: {
            appGoodsBanner,
            appShareQrCode,
            uAttr,
            bdCoupon,
            bdXbc,
            bdDetail,
            bdHc,
            bdKb,
            appClose
        },
        data() {
            return {
                showClose: false,
                is_open: 0,
                goods: null,
                selectAttr: null,
                shareShow: false,
                shareUrl: null,
                attrShow: false,
                poster_config: this.$api.step.poster_config,
                poster_generate: this.$api.step.poster_generate,
            };
        },
        computed: {
            ...mapState({
                mall: state => state.mallConfig.mall
            }),
            ...mapGetters('mallConfig', {
                getTheme: 'getTheme',
            }),
            themeObject:function() {
                return {
                    back: this.getTheme + '-m-back ' + this.getTheme,
                    theme: this.getTheme,
                    color: this.getTheme + '-m-text ' + this.getTheme,
                    sBack: this.getTheme + '-s-back ' + this.getTheme
                }
            }
        },
        onShow() {
            this.showClose = false;
            setTimeout(()=>{
                this.showClose = true;
            })
        },
        onLoad(options) {
            // #ifdef MP-WEIXIN
            wx.showShareMenu({
              menus: ['shareAppMessage', 'shareTimeline']
            })
            // #endif
            this.loadData(options.goods_id);
        },

        onShareAppMessage: function() {
            let { app_share_title, name, app_share_pic, cover_pic, id } = this.goods;
            return this.$shareAppMessage({
                title: app_share_title ? app_share_title: name,
                imageUrl: app_share_pic ? app_share_pic: cover_pic,
                path: "/plugins/step/goods/goods",
                params: {
                    goods_id: id
                }
            });
        },
        // #ifdef MP-WEIXIN
        onShareTimeline() {
            let { app_share_title, name, id } = this.goods;
            return this.$shareTimeline({
                title: app_share_title ? app_share_title: name,
                query: {
                    goods_id: id
                }
            });
        },
        // #endif
        methods: {
            getMall(e) {
                this.is_open = e.is_open;
            },
            loadData(id) {
                this.$showLoading();
                this.$request({
                    url: this.$api.step.goods_detail,
                    data: {
                        id: id
                    }
                }).then(response => {
                    this.$hideLoading();
                    if (response.code === 0) {
                        this.goods = response.data.detail;
                        this.shareUrl = this.$api.step.goods_poster + '&goods_id=' + id;
                        this.goods.id = id;
                    } else {
                        uni.showToast({
                            title: response.msg,
                            icon: 'none'
                        });
                    }
                }).catch(() => {
                    this.$hideLoading();
                });
            },
            onAttr(data) {
                this.selectAttr = data;
            },
            shareClick() {
                this.shareShow = true;
            },
            back() {
                uni.redirectTo({
                    url: '/pages/index/index'
                });
            },
            clickAttr() {
                this.attrShow = true;
            },
            setCoupon(index) {
                this.$set(this.goods.goods_coupon_center[index], 'is_receive', 1);
            },
            rightFunc(data) {
                uni.navigateTo({
                    url: `/pages/order-submit/order-submit?mch_list=${JSON.stringify([data])}&preview_url=${encodeURIComponent(this.$api.step.order_preview)}&submit_url=${encodeURIComponent(this.$api.step.order_submit)}`
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .goods-currency {
        font-size: #{22rpx};
        padding-bottom:#{2rpx};
    }

    .goods-currency+view {
        font-size: #{32rpx};
        padding: 0 #{5rpx};
    }

    .goods-name {
        padding: 24upx 24upx 0 24upx;
        background-color: #ffffff;
        color: $uni-important-color-black;
    }

    .goods-subtitle {
        padding: #{24rpx};
        padding-bottom: #{30rpx};
        font-size: 24rpx;
        background-color: #ffffff;
        color: #999999;
    }

    .attr {
        background-color: #f7f7f7;
    }

    .recommend {
        .recommend-title {
            margin: #{40rpx} 0 #{32rpx} 0;
            font-size: $uni-font-size-weak-one;
            color: $uni-general-color-two;

            .border {
                border-top: #{1rpx} solid #bbbbbb;
                height: 0;
                width: #{40rpx};
                margin: 0 #{24rpx};
            }

            image {
                width: #{24rpx};
                height: #{24rpx};
                display: block;
                margin-right: #{12rpx};
            }
        }
    }

    .bottom {
        width: 100%;
        height: #{110rpx};
    }

    .app-bottom {
        width: 100%;
        height: #{110rpx};
        font-size: $uni-font-size-general-one;

        .little {
            width: #{110rpx};
            height: 100%;
            background-color: #ffffff;
            font-size: #{20rpx};
            color: $uni-general-color-two;

            &:first-child {
                border-right: #{1rpx} solid #e2e2e2;
            }

            image {
                width: #{40rpx};
                height: #{40rpx};
                display: block;
                margin-bottom: #{10rpx};
            }
        }

        .button {
            width: #{650rpx};
            height: #{110rpx};
            color: #ffffff;
        }

        .service {
            background-color: #446dfd;
            color: #ffffff;
        }

        .contact-tel {
            background-color: #f39800;
            color: #ffffff;
        }

        .contact {
            background-color: #4cbf2a;
            color: #ffffff;
        }
    }

    .comments {
        margin-bottom: #{20rpx};
        background-color: #ffffff;
    }

    .detail {
        background-color: #ffffff;

        image {
            width: 100%;
            height: #{80rpx};
            display: block;
        }
    }

    .price {
        height: #{106rpx};
        font-size: #{40rpx};
        font-family: DIN;
        padding-left: #{24rpx};
        padding-bottom: #{24rpx};
        background-color: #fff;
        position: relative;
    }

    .price image {
        height: #{44rpx};
        width: #{44rpx};
        display: block;
        float: left;
        margin-right: #{16rpx};
    }

    .share {
        margin-right: #{20rpx};
        margin-top: #{10rpx};
        font-size: $uni-font-size-weak-two;
        color: $uni-general-color-one;

        image {
            width: #{40rpx};
            height: #{40rpx};
            margin-bottom: #{10rpx};
        }
    }

    .u-bottom-fixed {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 1500;
        background-color: #ffffff;
    }
    .u-bottom-height {
        height: 110upx;
    }

    .bd-info {
        width: 702upx;
        border-radius: 15upx;
        overflow: hidden;
        margin: 24upx 24upx 0 24upx;
    }
</style>
