<template>
    <app-layout>
        <view v-if="!detail" class="u-goods-detail"></view>
        <template v-if="detail">
            <app-goods-banner
                :pic-list="detail.pic_url"
                :share="detail.share"
                :video-url="detail.video_url"
                :goods_id="detail.id"
                :isCart="false"
                sign="pick"
            ></app-goods-banner>
            <bd-info
                :theme="themeObject"
                :name="detail.name"
                :is-negotiable="detail.is_negotiable"
                :subtitle="detail.subtitle"
                :level-show="detail.level_show"
                :flash-sale="flash_sale"
                :price="detail.price"
                :original-price="detail.original_price"
                :price-max="detail.price_max"
                :price-min="detail.price_min"
                :price-member-max="detail.price_member_max"
                :price-member-min="detail.price_member_min"
                :discount='discount'
                :is-vip-card-user="is_vip_card_user"
                :sales="detail.sales"
                :unit="detail.unit"
                :is-sales="detail.is_sales"
                :is-vip="isVip"
                :goods-id="detail.id"
                :extra-quick-share="detail.extra_quick_share"
                :app-share-pic="detail.app_share_pic"
                :app-share-title="detail.app_share_title"
                :poster-config="poster_config + `&goods_id=` + detail.id"
                :poster-generate="poster_generate + `&goods_id=` + detail.id"
                :has-poster-nav="true"
                :is-show-member="false"
                @quickShare="quickShare"
                v-bind:goods="detail"
            ></bd-info>
            <bd-coupon @change="setCoupon" :theme="themeObject" :coupons="detail.goods_coupon_center"></bd-coupon>
            <bd-xbc
                :coAttr="is_open"
                :attr-list="selectAttr.attr_list"
                :type="detail.type"
                :guarantee-title="detail.guarantee_title"
                :guarantee-pic="detail.guarantee_pic"
                :param_content="detail.param_content"
                :param_name="detail.param_name"
                :services="detail.services"
                :attr-groups="detail.attr_groups"
                @openAttr="clickAttr(1)"
            ></bd-xbc>
            <view class="rule">
                <view class="content dir-left-nowrap main-between" @click="goBack">
                    <view class="dir-left-nowrap cross-center">
                        <view class="tag">N元任选</view>
                        <view class="activity-price">{{activity.rule_price}}元选{{activity.rule_num}}件</view>
                    </view>
                    <view class="dir-left-nowrap go cross-center">
                        <view>去凑单</view>
                        <image src="/static/image/icon/arrow-right.png"></image>
                    </view>
                </view>
            </view>
            <!--商品信息-->
            <bd-hc
                :integral="detail.goods_marketing_award.integral"
                :coupon="detail.goods_marketing_award.coupon"
                :card="detail.goods_marketing_award.card"
                :balance="detail.goods_marketing_award.balance"
                :theme="themeObject"
            ></bd-hc>
            <bd-kb
                :limit="detail.goods_marketing.limit"
                :express="detail.express"
                :shipping="detail.goods_marketing.shipping"
                :pickup="detail.goods_marketing.pickup"
            ></bd-kb>
            <bd-comments :goods-id="detail.id"></bd-comments>
            <bd-detail :detail="detail.detail"></bd-detail>
            <view class="recommend">
                <app-goods-recommend :detail="activity" :theme="getTheme" sign="pick" :is_show_member="false" :sureCart="false" :goods-list="recommend_list" :activity="activity"></app-goods-recommend>
            </view>
            <!-- 底部空格 -->
            <view class="safe-area-inset-bottom">
                <view class="u-bottom-height"></view>
            </view>
            <!-- 底部按钮 -->
            <view v-if="is_open == 1" class="safe-area-inset-bottom u-bottom-fixed">
                <view class="app-bottom dir-left-nowrap">
                    <view class="dir-top-nowrap main-center cross-center little box-grow-0" @click="back">
                        <image src="/static/image/icon/index.png"></image>
                        <view>首页</view>
                    </view>
                    <view class="dir-top-nowrap main-center cross-center little box-grow-0" @click="favorite">
                        <image :src="detail.favorite ? '/static/image/icon/icon-favorite-active.png' : '/static/image/icon/icon-favorite.png'"></image>
                        <view>收藏</view>
                    </view>
                    <view class="box-grow-1 dir-left-nowrap" style="height: 100%;" v-if="detail.goods_num == 0">
                        <view style="width: 100%;background-color: #CDCDCD;color: #fff;" class="main-center cross-center button">已售罄</view>
                    </view>
                    <view class="box-grow-1 dir-left-nowrap" style="height: 100%;" v-else>
                        <template v-if="activity_status === 1">
                            <view :class="getTheme === 'b' || getTheme === 'a' || getTheme === 'f' ? getTheme + '-s-back ' + 'text ' + getTheme : getTheme + '-s-back ' + getTheme + '-m-text ' + getTheme " class="secondary-background main-center cross-center button"
                                  @click="clickAttr(1)">
                                加入凑单池
                            </view>
                            <view class="background main-center cross-center button"
                                  :class="getTheme + '-m-back ' + getTheme"
                                  style="color: #ffffff;"
                                  @click="clickAttr"
                            >返回凑单池
                            </view>
                        </template>
                        <template v-else>
                            <view class="background main-center cross-center button"
                                  style="background-color: #999999;width: 100%"
                            >活动已结束
                            </view>
                        </template>
                    </view>
                </view>
            </view>
            <u-attr
                v-model="attrShow"
                :goods="detail"
                :themeObject="themeObject"
                :checked="selectAttr"
                :is_show_left="false"
                @check="onAttr"
                :rightFunc="true"
                @rightFunc="add"
                rightText="加入凑单池"
            >
            </u-attr>
            <app-quick-navigation></app-quick-navigation>
        </template>
        <app-close v-if="showClose" :modal="false" @update="getMall"></app-close>
    </app-layout>
</template>

<script>
    import {mapGetters} from "vuex";
    import appQuickNavigation from "../../../components/page-component/app-quick-navigation/app-quick-navigation.vue";
    import appGoodsBanner from "../../../components/page-component/goods/app-goods-banner";
    import appGoodsRecommend from "../../../components/page-component/app-goods-recommend/app-goods-recommend";
    import uAttr from '../../../components/page-component/goods/u-attr.vue';
    import bdInfo from '@/components/page-component/goods/bd-info';
    import bdCoupon from '@/components/page-component/goods/bd-coupon.vue';
    import bdXbc from '@/components/page-component/goods/bd-xbc.vue';
    import bdKb from '@/components/page-component/goods/bd-kb.vue';
    import bdHc from '@/components/page-component/goods/bd-hc.vue';
    import bdDetail from '@/components/page-component/goods/bd-detail.vue';
    import bdComments from '@/components/page-component/goods/bd-comments.vue';
    import appClose from '@/components/basic-component/app-close/app-close.vue';

    export default {
        name: 'detail',

        data() {
            return {
                showClose: false,
                is_open: 0,
                detail: null,
                attrShow: 0,
                selectAttr: {},
                isVip: false,
                discount: null,
                is_vip_card_user: 0,
                shareData: {},
                recommend_list: [],
                activity: {},
                shareUrl: '',
                activity_status: 1,
                poster_config: this.$api.pick.poster_config,
                poster_generate: this.$api.pick.poster_generate,
                // 限时抢购
                flash_sale: null,
            }
        },

        computed: {
            ...mapGetters('mallConfig', {
                getTheme: 'getTheme',
            }),
            themeObject:function() {
                return {
                    back: this.getTheme + '-m-back ' + this.getTheme,
                    theme: this.getTheme,
                    color: this.getTheme + '-m-text ' + this.getTheme,
                    sBack: this.getTheme + '-s-back ' + this.getTheme,
                    backP: this.getTheme + '-m-back-p ' + this.getTheme,
                }
            },
        },

        components: {
            'app-quick-navigation': appQuickNavigation,
            appGoodsBanner,
            'app-goods-recommend': appGoodsRecommend,
            uAttr,
            bdInfo,
            bdCoupon,
            bdXbc,
            bdKb,
            bdHc,
            bdDetail,
            bdComments,
            appClose
        },

        methods: {
            getMall(e) {
                this.is_open = e.is_open;
            },
            async getDetail(id) {
                const e = await this.$request({
                    url: this.$api.pick.goods,
                    method: 'get',
                    data: {
                        id: id
                    }
                });
                if (e.code === 0) {
                    let {
                        vip_card_appoint,
                        plugin_extra
                    } = e.data.detail;
                    this.detail = e.data.detail;
                    this.flash_sale = plugin_extra.flash_sale;
                    this.activity = e.data.activity;
                    this.recommend_list = e.data.list;
                    this.shareUrl = `${this.$api.pick.poster}&goods_id=${this.detail.id}`;
                    this.activity_status = e.data.activity_status;
                    if(vip_card_appoint.discount || vip_card_appoint.discount === '0.00') {
                        this.isVip = true;
                        this.discount = vip_card_appoint.discount
                    }
                    this.is_vip_card_user = vip_card_appoint.is_vip_card_user;
                } else {
                    uni.showToast({
                        title: e.msg,
                        icon: 'none'
                    })
                }
            },
            setCoupon(index) {
                this.$set(this.detail.goods_coupon_center[index], 'is_receive', 1);
            },
            onAttr(data) {
                this.selectAttr = data;
            },
            quickShare(info) {
                this.shareData = info;
            },
            clickAttr(status) {
                if (this.activity_status !== 1) return;
                if (status === 1) {
                    this.attrShow = true;
                } else {
                    uni.navigateTo({
                        url: `/plugins/pick/pond/pond?rule_num=${this.activity.rule_num}&pick_activity_id=${this.activity.id}`
                    })
                }
            },
            async add(data) {
                let goods = data.goods_list[0];
                const e = await this.$request({
                    url: this.$api.pick.add,
                    data: {
                        goods_id: goods.id,
                        attr: goods.goods_attr_id,
                        num: goods.num,
                        pick_activity_id: this.activity.id
                    }
                });
                if (e.code === 0) {
                    uni.navigateBack();
                }
            },

            back() {
                uni.navigateTo({
                    url: '/pages/index/index'
                });
            },

            goBack() {
                uni.navigateTo({
                    url: '/plugins/pick/index/index'
                });
            },

            favorite() {
                let url = this.$api.user.favorite_add;
                let favorite = true;
                if (this.detail.favorite) {
                    url = this.$api.user.favorite_remove;
                    favorite = false;
                }
                this.detail.favorite = favorite;
                this.$request({
                    url: url,
                    data: {
                        goods_id: this.detail.id,
                    }
                }).then(response => {
                    if (response.code === 0) {
                    } else {
                        uni.showModal({
                            title: '提示',
                            content: response.msg,
                            showCancel: false,
                        });
                    }
                }).catch(() => {
                });
            },
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
            this.getDetail(options.goods_id);
        },

        // #ifdef MP-WEIXIN
        onShareTimeline() {
            // 分享朋友圈beta
            return this.$shareTimeline({
                title: this.detail.app_share_title ? this.detail.app_share_title : this.detail.name,
                query: {
                    goods_id: this.detail.goods_id
                } // 此处填写页面的参数
            });
        },
        // #endif
    }
</script>

<style scoped lang="scss">
    .detail {

    }

    .goods-name {
        padding: #{24rpx 24rpx 0 24rpx};
        background-color: #ffffff;
        color: $uni-important-color-black;
        font-size: 28upx;
        line-height: 38upx;
    }
    
    .goods-subtitle {
        padding: #{24rpx};
        font-size: 24rpx;
        background-color: #ffffff;
        color: #999999;
    }


    .price {
        padding-top: #{24rpx};
        background-color: #ffffff;
    }

    .button {
        width: 50%;
        height: 100%;
    }

    .app-bottom {
        width: 100%;
        height: #{110rpx};
        font-size: $uni-font-size-general-one;
        background-color: #ffffff;
    }

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

    .rule {
        width: #{702upx};
        height: #{66upx};
        margin:#{0 24upx};
        background-color: #ffffff;
        .content {
            width: #{702upx};
            background-color: #fff0f0;
            height: #{66upx};
            padding: #{0 24upx};
        }
        .tag {
            border-radius: #{13upx};
            font-size: #{19upx};
            line-height: 29upx;
            background-color: #ff4544;
            color: #ffffff;
            padding: #{1upx 10upx};
        }
        .activity-price {
            font-size: #{23upx};
            margin-left: #{17upx};
        }
        .go {
            >view {
                font-size: #{23upx};
                color: #999999;
            }
            >image {
                width: #{12upx};
                height: #{22upx};
                margin-left: #{14upx};
            }
        }
    }
    .text {
        color: #ffffff;
    }

    .u-bottom-fixed {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 1602;
        background-color: #ffffff;
    }
    .u-bottom-height {
        height: 110upx;
    }
</style>
