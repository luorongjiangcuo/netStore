<template>
    <app-layout>
        <view v-if="!goods" class="u-goods-detail"></view>
        <template v-if="goods">
            <!--商品轮播图-->
            <app-goods-banner
                :pic-list="goods.pic_url"
                :share="goods.share"
                :goods_id="id"
                sign="mch"
                :video-url="goods.video_url"
            ></app-goods-banner>
            <bd-info
                :theme="themeObject"
                :name="goods.name"
                :subtitle="goods.subtitle"
                :level-show="goods.level_show"
                :flash-sale="flash_sale"
                :price="goods.price"
                :original-price="goods.original_price"
                :price-max="goods.price_max"
                :price-min="goods.price_min"
                :price-member-max="goods.price_member_max"
                :price-member-min="goods.price_member_min"
                :sales="goods.sales"
                :unit="goods.unit"
                :is-sales="goods.is_sales"
                :goods-id="goods.id"
                :extra-quick-share="goods.extra_quick_share"
                :app-share-pic="goods.app_share_pic"
                :app-share-title="goods.app_share_title"
                :poster-config="poster_config + `&goods_id=` + goods.id + `&mch_id=` + goods.mch_id"
                :poster-generate="poster_generate + `&goods_id=` + goods.id + `&mch_id=` + goods.mch_id"
                :has-poster-nav="true"
                :share-url="poster + `&goods_id=` + goods.id + `&mch_id=` + goods.mch_id"
                v-bind:goods="goods"
            ></bd-info>
            <template v-if="mch_store">
                <view class="shop-info dir-left-nowrap cross-center" :clas="mch_store.distance ? 'shop-info-2' : 'shop-info-1'">
                    <image @click="navShop" class="box-grow-0" :src="mch_store.store.cover_url"></image>
                    <view @click="navShop" class="dir-top-nowrap box-grow-1">
                        <view class="store-name t-omit">{{mch_store.store.name}}</view>
                        <view class="dir-left-nowrap">
                            <view class="store-num">商品数量: {{mch_store.goods_count}}</view>
                            <view>已售: {{mch_store.order_goods_count}}</view>
                        </view>
                    </view>
                    <view class="box-grow-0">
                        <view @click="navService" v-if="mch_setting.is_web_service"
                              class="contain main-center cross-center dir-top-nowrap">
                            <image class="store-icon-contain"
                                   :src="mch_setting.web_service_pic ? mch_setting.web_service_pic : `../image/goods-contact.png`"></image>
                            <view class="store-contain">客服</view>
                        </view>
                        <view v-else class="main-center store-btn">
                            <view class="shop-btn" @click="navShop">进店逛逛</view>
                        </view>
                    </view>
                </view>
                <view v-if="mch_store.distance"  class="shop-address dir-left-nowrap cross-top">
                    <view class="dir-top-nowrap box-grow-1">
                        <view class="address">{{mch_store.store.address}}</view>
                        <view class="km">距离{{mch_store.distance}}</view>
                    </view>
                    <view @click="navMap" class="box-grow-0 icon-address main-center">
                        <image src="../image/summary-address.png"></image>
                    </view>
                </view>
            </template>
<!--            <bd-coupon @change="setCoupon" :theme="themeObject" :coupons="goods.goods_coupon_center"></bd-coupon>-->
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
                @openAttr="clickAttr()"
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
            <bd-comments :goods-id="goods.id"></bd-comments>
            <bd-detail :detail="goods.detail"></bd-detail>
            <!--相关推荐-->
            <view class="recommend">
                <view class="recommend-title dir-left-nowrap main-center">
                    <view class="dir-left-nowrap cross-center">
                        <view class="border"></view>
                        <image src="../../../static/image/icon/icon-favorite.png"></image>
                        <view style="color: #353535;">您或许喜欢</view>
                        <view class="border"></view>
                    </view>
                </view>
                <view class="recommend-list">
                    <u-ordinary-list :theme-object="themeObject" :isShowAttr="true" :list="recommend_list" :theme="getTheme" :list-style="2"></u-ordinary-list>
                </view>
            </view>
            <!-- 底部空格 -->
            <view class="safe-area-inset-bottom">
                <view class="u-bottom-height" :class="full_reduce ? 'u-bottom-height-1' : 'u-bottom-height-0'"></view>
            </view>
            <!-- 底部按钮 -->
            <view v-if="is_open == 1" class="safe-area-inset-bottom u-bottom-fixed">
                <view v-if="full_reduce">
                    <app-goods-full-reduce
                        :theme="getTheme"
                        :full_reduce="full_reduce"
                    >
                    </app-goods-full-reduce>
                </view>
                <view class="app-bottom dir-left-nowrap" >
                    <view class="dir-top-nowrap main-center cross-center little box-grow-0" @click="navShop">
                        <image src="../../../static/image/icon/icon-mch.png"></image>
                        <view>店铺</view>
                    </view>
                    <view class="dir-top-nowrap main-center cross-center little box-grow-0" @click="back">
                        <image src="../../../static/image/icon/index.png"></image>
                        <view>首页</view>
                    </view>
                    <view class="dir-top-nowrap main-center cross-center little box-grow-0" @click="favorite">
                        <image :src="goods.favorite ? '../../../static/image/icon/icon-favorite-active.png' : '../../../static/image/icon/icon-favorite.png'"></image>
                        <view>收藏</view>
                    </view>
                    <view class="box-grow-1 ">
                        <view class="dir-left-nowrap" style="height: 100%;" v-if="goods.goods_stock > 0">
                            <view class="main-center cross-center button"
                                  :class="getTheme === 'a' || getTheme === 'b' || getTheme === 'f' ? getTheme + '-s-back ' + 'text ' + getTheme : getTheme + '-s-back ' + getTheme + '-m-text ' + getTheme"
                                  @click="clickAttr">
                                加入购物车
                            </view>
                            <view class="main-center cross-center button"
                                  style="color: #ffffff;"
                                  :class="getTheme + '-m-back ' + getTheme"
                                  @click="clickAttr"
                            >立即购买
                            </view>
                        </view>
                        <view class="dir-left-nowrap" style="height: 100%;" v-else>
                            <view style="width: 100%;background-color: #CDCDCD;color: #fff;" class="main-center cross-center button">已售罄</view>
                        </view>
                    </view>
                </view>
            </view>
            <u-attr
                v-model="attrShow"
                :goods="goods"
                :themeObject="themeObject"
                :checked="selectAttr"
                @check="onAttr"
            >
            </u-attr>
        </template>
        <app-close v-if="showClose" :mch_id="mch_id" :modal="false" @update="getMall"></app-close>
    </app-layout>
</template>

<script>
    import {mapGetters, mapState} from "vuex";
    import appGoodsBanner from "@/components/page-component/goods/app-goods-banner.vue";
    import appGoodsFullReduce from "@/components/page-component/goods/app-goods-full-reduce";
    import uOrdinaryList from '@/components/page-component/u-goods-list/u-ordinary-list.vue';
    import uAttr from '@/components/page-component/goods/u-attr.vue';
    import bdInfo from '@/components/page-component/goods/bd-info';
    // import bdCoupon from '@/components/page-component/goods/bd-coupon.vue';
    import bdXbc from '@/components/page-component/goods/bd-xbc.vue';
    import bdKb from '@/components/page-component/goods/bd-kb.vue';
    import bdHc from '@/components/page-component/goods/bd-hc.vue';
    import bdDetail from '@/components/page-component/goods/bd-detail.vue';
    import bdComments from '@/components/page-component/goods/bd-comments.vue';
    import appClose from '@/components/basic-component/app-close/app-close.vue';

    export default {
        name: "goods",
        components: {
            appGoodsBanner,
            uOrdinaryList,
            uAttr,
            appGoodsFullReduce,
            bdInfo,
            // bdCoupon,
            bdXbc,
            bdKb,
            bdHc,
            bdDetail,
            bdComments,
            appClose
        },
        data() {
            return {
                showClose: false,
                is_open: 0,
                goods: null,
                full_reduce: null,
                selectAttr: null,
                recommend_list: null,
                attrShow: false,
                id: 0,
                mch_id: 0,
                mch_store: null,
                mch_setting: null,
                poster: this.$api.mch.poster,
                poster_config: this.$api.mch.poster_config,
                poster_generate: this.$api.mch.poster_generate
            };
        },
        computed: {
            ...mapState({
                mall: state => state.mallConfig.mall
            }),
            ...mapState('gConfig', {
                iphone: (data) => {
                    return data.iphone;
                },
                iphoneHeight: (state) => {
                    return state.iphoneHeight;
                },
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
            },
        },
        onLoad(options) {
            [this.mch_id, this.id] = [options.mch_id, options.id];
            this.getAddress();
            this.loadRecommend();
            // #ifdef MP-WEIXIN
            wx.showShareMenu({
                withShareTicket: true,
                menus: ['shareAppMessage', 'shareTimeline']
            })
            // #endif
        },
        onShow() {
            this.showClose = false;
            setTimeout(()=>{
                this.showClose = true;
            })
        },
        // #ifdef MP-WEIXIN
        onShareTimeline() {
            return this.$shareTimeline({
                title: this.goods.app_share_title ? this.goods.app_share_title : this.goods.name,
                query: {
                    id: this.id,
                    mch_id: this.mch_id,
                }
            });
        },
        // #endif
        onShareAppMessage() {
            return this.$shareAppMessage({
                title: this.goods.app_share_title ? this.goods.app_share_title : this.goods.name,
                imageUrl: this.goods.app_share_pic ? this.goods.app_share_pic : '',
                path: '/plugins/mch/goods/goods',
                params: {
                    id: this.id,
                    mch_id: this.mch_id,
                }
            });
        },
        methods: {
            getMall(e) {
                this.is_open = e.is_open;
            },
            // setCoupon(index) {
            //     this.$set(this.goods.goods_coupon_center[index], 'is_receive', 1);
            // },
            getAddress() {
                const self = this;
                uni.getLocation({
                    type: 'wgs84',
                    success(res) {
                        self.getMch(res.latitude, res.longitude);
                    },
                    fail(e) {
                        self.getMch(0, 0);
                    }
                });
            },

            getMch(latitude, longitude) {
                const self = this;
                self.$showLoading();
                self.$request({
                    url: self.$api.mch.detail,
                    data: {
                        id: self.mch_id,
                        latitude: latitude,
                        longitude: longitude,
                    }
                }).then(info => {
                    self.$hideLoading();
                    if (info.code === 0) {
                        [self.mch_store, self.mch_setting] = [info.data.detail, info.data.mchSetting];
                        self.getDetail();
                    } else {
                        uni.showModal({
                            title: '提示',
                            content: info.msg,
                            showCancel: false,
                            success: function (e) {
                                if (e.confirm) {
                                    uni.navigateBack({delta: 1});
                                }
                            }
                        });
                    }
                }).catch(() => {
                    self.$hideLoading();
                })
            },

            getDetail() {
                this.$showLoading();
                this.$request({
                    url: this.$api.mch.goods_detail,
                    data: {
                        id: this.id,
                        mch_id: this.mch_id
                    }
                }).then(e => {
                    this.$hideLoading();
                    if (e.code === 0) {
                        let { goods_activity } = e.data.detail;
                        this.goods = e.data.detail;
                        if (goods_activity) {
                            this.full_reduce = goods_activity.full_reduce;
                        }
                    } else {
                        uni.showModal({
                            title: '提示',
                            content: e.msg,
                            showCancel: false
                        });
                    }
                }).catch(() => {
                    this.$hideLoading();
                });
            },

            loadRecommend() {
                const self = this;
                self.$request({
                    url: self.$api.goods.new_recommend,
                    data: {
                        goods_id: self.id,
                    },
                    method: 'get'
                }).then(info => {
                    if (info.code === 0) {
                        this.recommend_list = info.data.list;
                    }
                });
            },

            navMap() {
                uni.openLocation({
                    latitude: parseFloat(this.mch_store.store.latitude),
                    longitude: parseFloat(this.mch_store.store.longitude),
                    name: this.mch_store.store.name,
                    address: this.mch_store.store.address,
                })
            },

            onAttr(data) {
                this.selectAttr = data;
            },

            navService() {
                uni.navigateTo({url: `/pages/web/web?url=` + this.mch_setting.web_service_url});
            },

            navShop() {
                uni.redirectTo({url: `/plugins/mch/shop/shop?mch_id=` + this.mch_id});
            },

            back() {
                uni.redirectTo({
                    url: '/pages/index/index'
                });
            },

            favorite() {
                this.goods.favorite ? this.goods.favorite = false :  this.goods.favorite = true;
                this.$request({
                    url: !this.goods.favorite ? this.$api.user.favorite_remove : this.$api.user.favorite_add,
                    data: {
                        goods_id: this.goods.id,
                    }
                }).then(e => {
                    if (e.code !== 0) {
                        uni.showModal({
                            title: '提示',
                            content: e.msg,
                            showCancel: false
                        });
                    }
                });
            },

            clickAttr() {
                if (this.goods.type === 'ecard') {
                    uni.showToast({
                        title: '虚拟商品不允许加入购物车',
                        icon: 'none'
                    });
                    return;
                }
                this.attrShow = true;
            }
        },
    }
</script>

<style scoped lang="scss">
    .goods-name {
        padding: #{24rpx};
        background-color: #ffffff;
        color: $uni-important-color-black;
    }

    .goods-subtitle {
        padding: #{24rpx};
        padding-top: 0;
        font-size: 24rpx;
        background-color: #ffffff;
        color: #999999;
    }


    .attr {
        padding: #{24rpx} 0;
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

    .shop-btn {
        height: #{64rpx};
        border: #{1px} solid #cdcdcd;
        color: #666666;
        background: #FFFFFF;
        width: #{146rpx};
        line-height: #{64rpx};
        border-radius: #{32rpx};
        text-align: center;
    }

    .app-bottom {
        width: 100%;
        height: #{110rpx};
        font-size: $uni-font-size-general-one;

        .little:nth-child(3) {
            border-style: none;
        }

        .little {
            width: #{110rpx};
            height: 100%;
            background-color: #ffffff;
            font-size: #{20rpx};
            color: $uni-general-color-two;
            border-right: #{1rpx} solid #e2e2e2;

            image {
                width: #{40rpx};
                height: #{40rpx};
                display: block;
                margin-bottom: #{10rpx};
            }
        }

        .button {
            width: #{265rpx};
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
    .shop-info-1 {
        border-radius: 15upx;
    }
    .shop-info-2 {
        border-radius: 15upx 15upx 0 0;
    }
    .shop-info {
        height: #{124rpx};
        color: #999999;
        font-size: #{24rpx};
        background: #FFFFFF;
        width: 702upx;
        margin: 24upx 24upx 0 24upx;
        > image {
            border-radius: #{8rpx};
            margin: 0 #{20rpx};
            height: #{80rpx};
            width: #{80rpx}
        }

        .store-name {
            font-size: #{32rpx};
            color: #353535;
            margin-bottom: #{16rpx};
        }

        .store-num {
            margin-right: #{32rpx};
        }

        .contain {
            width: #{152rpx};
            height: 100%;

            image {
                height: #{40rpx};
                width: #{40rpx};
                display: block;
            }

            view {
                margin-top: #{8rpx};
            }
        }

        .store-btn {
            margin: 0 #{20rpx};
        }
    }

    .shop-address {
        width: 702rpx;
        margin: 0 24upx 24upx 24upx;
        padding: 20upx;
        font-size: #{24rpx};
        background: #FFFFFF;
        border-radius: 0 0 15upx 15upx;
        .address {
            color: #666666;
            max-height: #{560rpx};
        }

        .km {
            color: #999999;
            margin-top:#{10rpx};
        }

        .icon-address {
            width: #{120rpx};
            border-left: 1px solid #e2e2e2;
        }

        image {
            height: #{32rpx};
            width: #{32rpx};
            display: block;
        }
    }
    .text {
        color: #ffffff;
    }
    .goods-margin {
        margin-top: 20upx;
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
