<template>
    <app-layout>
        <view v-if="!detail" class="u-goods-detail"></view>
        <view class="app-goods" v-if="detail">
            <view class="banner">
                <app-banner :videoUrl="detail.video_url" :share="detail.share" :picList="detail.pic_url" :goods_id="goods_id" sign="flash_sale"></app-banner>
            </view>
            <!-- 时间 -->
            <view class="f-timing">
                <view class="f-image" :class="getTheme + '-m-back ' + getTheme"></view>
                <view class="f-activity" :class="getTheme + '-m-text ' + getTheme">
                    {{detail.discount_type === 1 ? detail.min_discount + '折' : '减' + detail.min_discount  + '元' }}
                </view>
                <view class="f-content dir-top-nowrap">
                    <view class="app-text" v-if="activity_status === 0">距离开始仅剩</view>
                    <view class="app-text" v-else-if="activity_status === 1">距离结束仅剩</view>
                    <view class="app-text over-text" v-else-if="activity_status === 2">活动已结束</view>
                    <view class="app-time cross-center main-around" v-if="activity_status !== 2">
                        <text class="app-num app-right" >{{time_str.day}}</text>
                        <text>天</text>
                        <text class="app-num app-right">{{time_str.hou}}</text>
                        <text>时</text>
                        <text class="app-num app-right">{{time_str.min}}</text>
                        <text>分</text>
                        <text class="app-num app-right">{{time_str.sec}}</text>
                        <text>秒</text>
                    </view>
                </view>
            </view>
            <bd-info
                :theme="themeObject"
                :name="detail.name"
                :is-negotiable="detail.is_negotiable"
                :subtitle="detail.subtitle"
                :level-show="detail.level_show"
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
                :is-vip="is_vip"
                :goods-id="detail.id"
                :extra-quick-share="detail.extra_quick_share"
                :app-share-pic="detail.app_share_pic"
                :app-share-title="detail.app_share_title"
                :poster-config="poster_config + `&goods_id=` + detail.id"
                :poster-generate="poster_generate + `&goods_id=` + detail.id"
                :has-poster-nav="true"
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
                :goods-stock="detail.goods_stock"
                :co-attr="activity_status"
                @openAttr="joinCart"
            ></bd-xbc>
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
            <!-- 相关推荐 -->
            <template  v-if="list.length > 0">
                <app-related-suggestion-product :theme="getTheme" :list="list"></app-related-suggestion-product>
            </template>
            <!--空格区域-->
            <view class="safe-area-inset-bottom">
                <view class="u-bottom-height" :class="full_reduce ? 'u-bottom-height-1' : 'u-bottom-height-0'"></view>
            </view>
            <!-- 底部按钮 -->
            <view v-if="is_open == 1" class="safe-area-inset-bottom u-bottom-fixed">
                <view v-if="full_reduce">
                    <app-goods-full-reduce
                        :theme="getTheme"
                        sign="flash_sale"
                        :full_reduce="full_reduce"
                    >
                    </app-goods-full-reduce>
                </view>
                <view class="buttons dir-left-nowrap">
                    <view class="app-home">
                        <app-jump-button form arrangement="a" url="/pages/index/index">
                            <view class="app-view dir-top-nowrap main-center cross-center">
                                <image src="../../../static/image/icon/index.png"></image>
                                <text>首页</text>
                            </view>
                        </app-jump-button>
                    </view>
                    <view class="app-button dir-left-nowrap" v-if="detail.goods_stock == 0">
                        <view class="app-over box-grow-1" style="background-color: #CDCDCD;">
                            已售罄
                        </view>
                    </view>
                    <view v-else class="app-button dir-left-nowrap">
                        <view class="app-join-cart box-grow-1" :class="getTheme === 'a' || getTheme === 'b' || getTheme === 'f' ? getTheme + '-s-back '+ 'text ' + getTheme : getTheme + '-s-back '+ getTheme + '-m-text ' + getTheme" v-if="activity_status === 1">
                            <app-form-id @click="joinCart">
                                加入购物车
                            </app-form-id>
                        </view>
                        <view class="app-buy box-grow-1" :class="[getTheme + '-m-back', getTheme]" v-if="activity_status === 1">
                            <app-form-id @click="joinCart">立即购买</app-form-id>
                        </view>
                        <view class="notStart dir-left-nowrap" v-if="activity_status === 0">
                            <view class="box-grow-0" :class="[getTheme + '-s-back', getTheme, getTheme + '-m-text']">
                                <app-form-id @click="joinCart">
                                    加入购物车
                                </app-form-id>
                            </view>
                            <view style="background: #999999;line-height: 1" class="dir-top-nowrap main-center cross-center">
                                <view style="font-size: 28rpx">{{activity.start_at | getStart}}</view>
                                <view style="font-size: 20rpx">{{activity.start_at | getStartT}}</view>
                            </view>
                        </view>
                        <view class="app-over box-grow-1" v-if="activity_status === 2">
                            活动已结束
                        </view>
                    </view>
                </view>
            </view>
            <u-attr
                v-model="show"
                :goods="detail"
                :themeObject="themeObject"
                :checked="selectAttr"
                @check="onAttr"
                :rightFunc="true"
                @rightFunc="rightFunc"
            >
            </u-attr>
        </view>
        <app-close v-if="showClose" :modal="false" @update="getMall"></app-close>
    </app-layout>
</template>
<script>
    import { mapGetters } from 'vuex';
    import appBanner from '../../../components/page-component/goods/app-goods-banner.vue';
    import appRelatedSuggestionProduct from '../../../components/page-component/app-related-suggestion-product/app-related-suggestion-product.vue';
    import appGoodsFullReduce from '../../../components/page-component/goods/app-goods-full-reduce.vue';
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
        name: 'goods',
        data() {
            return {
                showClose: false,
                is_open: 0,
                goods_id: -1,
                detail: null,
                full_reduce: null,
                activity: {},
                activity_status: 0,
                time_str: {
                    day: 0,
                    hou: 0,
                    min: 0,
                    sec: 0
                },
                timing: null,
                discount: null,
                is_vip: false,
                is_vip_card_user: 0,
                shareData: null,
                poster_config: this.$api.flash_sale.poster_config,
                poster_generate: this.$api.flash_sale.poster_generate,
                selectAttr: {},

                url: '',
                show: false,
                list: [],
                miaosha_buy_count: 0,
                is_activity: 0,
                loading: false,
                is_show_buy: true,
                share: false

            }
        },
        onLoad(options) {
            this.goods_id = options.id;
            this.share = options.share;
            // #ifdef MP-WEIXIN
            wx.showShareMenu({
                menus: ['shareAppMessage', 'shareTimeline']
            })
            // #endif
        },
        onHide() {
            clearInterval(this.timing);
        },
        onUnload() {
            clearInterval(this.timing);
        },
        onShow() {
            this.showClose = false;
            setTimeout(()=>{
                this.showClose = true;
            })
        },
        computed: {
            ...mapGetters('mallConfig', {
                getTheme: 'getTheme'
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
        onShareAppMessage() {
            let { app_share_title, name, app_share_pic, id } = this.detail;
            return this.$shareAppMessage({
                path: '/plugins/flash_sale/goods/goods',
                title: app_share_title ? app_share_title : name,
                imageUrl: app_share_pic ? app_share_pic : '',
                params: {
                    id,
                    share: true
                }
            });
        },
        // #ifdef MP-WEIXIN
        onShareTimeline() {
            let { app_share_title, name, id } = this.detail;
            return this.$shareTimeline({
                title: app_share_title ? app_share_title : name,
                query: {
                    id,
                    share: true
                }
            });
        },
        // #endif
        methods: {
            getMall(e) {
                this.is_open = e.is_open;
            },
            async getDetail() {
                this.loading = false;
                const e = await this.$request({
                    url: this.$api.flash_sale.detail,
                    data: {
                        id: this.goods_id
                    }
                });
                if (e.code === 0) {
                    this.loading = true;
                    let { detail, activity, activity_status } = e.data;
                    this.detail = detail;
                    this.activity = activity;
                    if (detail.goods_activity) {
                        this.full_reduce = detail.goods_activity.full_reduce;
                    }
                    this.activity_status = activity_status;
                    if(detail.vip_card_appoint.discount) {
                        this.is_vip = true;
                        this.discount = detail.vip_card_appoint.discount;
                    }
                    this.is_vip_card_user = detail.vip_card_appoint.is_vip_card_user;
                    if (activity_status === 1) {
                        this.set_time(activity.end_at);
                    } else if (activity_status === 0) {
                        this.set_time(activity.start_at);
                        this.is_show_buy = false;
                    }
                } else {
                    uni.showToast({
                        title: e.msg,
                        icon: 'none'
                    });
                    if (!this.share) {
                        uni.navigateBack();
                    } else {
                        uni.navigateTo({
                            url: `/plugins/flash_sale/index/index`
                        })
                    }

                }
            },

            set_time(time_at) {
                clearInterval(this.timing);
                let time_str = new Date(time_at.replace(/-/g, '/'));
                this.now_time(time_str);
                this.timing = setInterval(() => {
                    this.now_time(time_str);
                }, 1000);
            },

            now_time(time_str) {
                let time = time_str.getTime() - new Date().getTime();
                if (time < 0) {
                    clearInterval(this.timing);
                }
                let day = parseInt(time/1000/60/60/24);
                let hou = parseInt((time/1000/60/60)%24);
                let min = parseInt((time/1000/60)%60);
                let sec = parseInt((time/1000)%60);
                this.time_str.day = day < 10 ? '0' + day : day;
                this.time_str.hou = hou < 10 ? '0' + hou : hou;
                this.time_str.min = min < 10 ? '0' + min : min;
                this.time_str.sec = sec < 10 ? '0' + sec : sec;
            },

            quickShare(info) {
                this.shareData = info;
            },
            async request({ url, data }) {
                const response = await this.$request({
                    url: url,
                    data: data,
                });
                if (response.code === 0) {
                    return response.data;
                }
            },
            onAttr(data) {
                this.selectAttr = data;
            },
            joinCart() {
                this.show = true;
            },
            rightFunc(data) {
                uni.navigateTo({
                    url: `/pages/order-submit/order-submit?mch_list=${JSON.stringify([data])}`
                })

            },
            setCoupon(index) {
                this.$set(this.detail.goods_coupon_center[index], 'is_receive', 1);
            }
        },

        watch: {
            goods_id: {
                handler() {
                  this.getDetail();
                }
            }
        },

        filters: {
            getStart(data) {
                if (!data) return;
                let time_str = new Date(data.replace(/-/g, '/'));
                return `${time_str.getHours() < 10 ? '0'
                    + time_str.getHours() : time_str.getHours()}:${time_str.getMinutes() < 10 ? '0' +
                    time_str.getMinutes() : time_str.getMinutes()} 开抢 `;
            },
            getStartT(data) {
                if (!data) return;
                let time_str = new Date(data.replace(/-/g, '/'));
                return `${time_str.getFullYear()}.${time_str.getMonth() + 1}.${time_str.getDate()}`
            }
        },

        components: {
            'app-banner': appBanner,
            'app-related-suggestion-product': appRelatedSuggestionProduct,
            appGoodsFullReduce,
            uAttr,
            bdInfo,
            bdCoupon,
            bdXbc,
            bdKb,
            bdHc,
            bdDetail,
            bdComments,
            appClose
        }
    }
</script>
<style scoped lang="scss">
    @import './goods.scss';
    .u-coupon {
        margin-top: 20upx;
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
    .u-bottom-height-0 {
        height: 110upx;
    }
    .u-bottom-height-1 {
        height: 190upx;
    }
</style>
