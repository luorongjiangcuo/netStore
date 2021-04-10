<template>
    <app-layout>
        <view v-if="!goods" class="u-goods-detail"></view>
        <view v-if="goods">
            <app-goods-banner :pic-list="goods.pic_url"
                             :share="goods.share"
                             :goods_id="goods.id"
                             :video-url="goods.video_url"
            ></app-goods-banner>
            <view class="other-info">
                <view class="t-omit-two goods-name">{{goods.name}}</view>
                <view v-if="goods.subtitle" class="goods-subtitle">
                    <view class="t-omit-three">{{goods.subtitle}}</view>
                </view>
                <view class='price main-between'>
                   <view>
                       <view :class="getTheme+ '-m-text ' + getTheme">
                           {{goods.integralMallGoods.integral_num}}积分
                           <template v-if="goods.price > 0">+{{goods.price}}元</template>
                       </view>
                       <view class='original' v-if="isUnderlinePrice == 1">￥{{goods.original_price}}</view>
                   </view>
                   <view class="share" @click="shareClick">
                       <image src="/static/image/icon/icon-share.png"></image>
                       <view>分享</view>
                   </view>
               </view>
            </view>
            <!--商品优惠券-->
            <bd-coupon @change="setCoupon" :theme="themeObject" :coupons="goods.goods_coupon_center"></bd-coupon>
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
            <!--商品信息-->
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
            <!-- 底部空格 -->
            <view class="safe-area-inset-bottom">
               <view class="u-bottom-height"></view>
            </view>
	        <view v-if="is_open == 1" class="safe-area-inset-bottom u-bottom-fixed">
               <view class="app-bottom dir-left-nowrap">
                   <view class="dir-top-nowrap main-center cross-center little box-grow-0" @click="back">
                       <image src="/static/image/icon/index.png"></image>
                       <view>首页</view>
                   </view>
                   <view v-if="goods.goods_stock == 0" class="dir-left-nowrap">
                       <view class="main-center cross-center button" style="background-color: #CDCDCD;color: #fff;">已售罄
                       </view>
                   </view>
                   <view class="dir-left-nowrap" v-else>
                       <view class="main-center cross-center button"
                             :class="getTheme + '-m-back ' + getTheme"
                             @click="clickAttr"
                       >立即兑换
                       </view>
                   </view>
               </view>
            </view>
        </view>
        <app-close v-if="showClose" :modal="false" @update="getMall"></app-close>
        <app-share-qr-code
            v-model="shareShow"
            :url="shareUrl"
            :has-poster-nav="true"
            :poster-config="poster_config + `&goods_id=` + goods.id"
            :poster-generate="poster_generate + `&goods_id=` + goods.id"
        ></app-share-qr-code>
        <u-attr
            v-model="attrShow"
            :themeObject="themeObject"
            :checked="selectAttr"
            :goods="goods"
            @check="onAttr"
            :rightFunc="true"
            @rightFunc="rightFunc"
            :is_show_left="false"
            rightText="立即兑换"
        >
            <view slot="priceBefore">
                {{selectAttr.extra.value}}{{selectAttr.extra.name}} +
            </view>
        </u-attr>
    </app-layout>
</template>

<script>
	import {mapGetters, mapState} from "vuex";
    import appGoodsBanner from "../../../components/page-component/goods/app-goods-banner.vue";
    import appRecommendedProduct from "../../../components/page-component/app-recommended-product/app-recommended-product.vue";
    import appShareQrCode from '../../../components/page-component/app-share-qr-code-poster/app-share-qr-code-poster.vue';
    import uAttr from '../../../components/page-component/goods/u-attr.vue';
    import appClose from '@/components/basic-component/app-close/app-close.vue';
    import bdInfo from '@/components/page-component/goods/bd-info';
    import bdCoupon from '@/components/page-component/goods/bd-coupon.vue';
    import bdXbc from '@/components/page-component/goods/bd-xbc.vue';
    import bdKb from '@/components/page-component/goods/bd-kb.vue';
    import bdHc from '@/components/page-component/goods/bd-hc.vue';
    import bdDetail from '@/components/page-component/goods/bd-detail.vue';

    export default {
        name: "goods",
        components: {
            appGoodsBanner,
            appShareQrCode,
            appRecommendedProduct,
            uAttr,
            appClose,
            bdInfo,
            bdCoupon,
            bdXbc,
            bdKb,
            bdHc,
            bdDetail,
        },
        data() {
            return {
                showClose: false,
                is_open: 0,
                goods: null,
                selectAttr: null,
                recommend_list: null,
                shareShow: false,
                shareUrl: null,
                attrShow: false,
                loading: false,

                poster_config: this.$api.integral_mall.poster_config,
                poster_generate: this.$api.integral_mall.poster_generate,
            };
        },
        computed: {
            ...mapState({
                mall: state => state.mallConfig.mall,
                isUnderlinePrice: state => state.mallConfig.mall.setting.is_underline_price,
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
            let that = this;
            // #ifdef MP-WEIXIN
            wx.showShareMenu({
              menus: ['shareAppMessage', 'shareTimeline']
            })
            // #endif
            that.loadData(options.goods_id);
        },
        onShareAppMessage: function() {
            return this.$shareAppMessage({
                title: this.goods.app_share_title ? this.goods.app_share_title: this.goods.name,
                imageUrl: this.goods.app_share_pic ? this.goods.app_share_pic: this.goods.cover_pic,
                path: "/plugins/integral_mall/goods/goods",
                params: {
                    goods_id: this.goods.id
                }
            });
        },

        // #ifdef MP-WEIXIN
        onShareTimeline() {
          // 分享朋友圈beta
          return this.$shareTimeline({
            title: this.goods.app_share_title ? this.goods.app_share_title: this.goods.name,
            query: {
                goods_id: this.goods.id
            } // 此处填写页面的参数
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
                    url: this.$api.integral_mall.goods_detail,
                    data: {
                        id: id
                    }
                }).then(response => {
                    this.$hideLoading();
                    let {code, data, msg} = response;
                    if (code === 0) {
                        this.goods = data.detail;
                        this.shareUrl = this.$api.integral_mall.poster + '&goods_id=' + id;
                        this.goods.id = id;
                        this.loading = true;
                    } else {
                        uni.showModal({
                            title: '提示',
                            content: msg,
                            showCancel: false
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
            rightFunc: function(data) {
                uni.navigateTo({
                    url: `/pages/order-submit/order-submit?mch_list=${JSON.stringify([data])}&preview_url=${encodeURIComponent(this.$api.integral_mall.order_preview)}&submit_url=${encodeURIComponent(this.$api.integral_mall.order_submit)}`
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .preventTouchMove{
        top: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        position: fixed;
        z-index: 0;
    }
    .other-info {
        width: 702upx;
        background-color: #fff;
        padding: #{20rpx};
        margin: 24upx 24upx 0 24upx;
        border-radius: 15upx;
    }
    .goods-name {
        background-color: #ffffff;
        color: #353535;
        font-size: 32upx;
        line-height: 42upx;
        margin-top: 5upx;
    }

    .goods-subtitle {
        margin-top: 23upx;
        font-size: 24upx;
        line-height: 34upx;
        color: #999999;
        margin-bottom: 20upx;
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

    .u-bottom-height {
        height: 110upx;
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
        font-size: #{40rpx};
        color: #ff4544;
        font-family: DIN;
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
        font-size: $uni-font-size-weak-two;
        color: $uni-general-color-one;

        image {
            width: #{40rpx};
            height: #{40rpx};
            margin-bottom: #{10rpx};
        }
    }

    .original {
        background-color: #fff;
        text-decoration: line-through;
        color: #888;
        height: #{60rpx};
        line-height: #{60rpx};
        font-size: #{24rpx};
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
