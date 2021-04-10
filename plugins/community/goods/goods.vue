<template>
    <app-layout>
        <view v-if="!detail" class="u-goods-detail"></view>
        <view class="app-goods" v-else>
            <!--商品轮播图-->
            <app-banner
                :videoUrl="detail.video_url"
                :share="detail.share"
                :picList="detail.pic_url"
                :goods_id="goods_id"
                :isCart="false"
                sign="community"
            ></app-banner>
            <!-- 商品时间 -->
            <app-goods-time
                :day="day"
                :second="second"
                :minute="minute"
                :hour="hour"
                :theme="getTheme"
                :status="activity.status"
                :goods="detail"
            ></app-goods-time>
            <view class="other-info">
                <view class="t-omit-two goods-name">{{detail.name}}</view>
                <view v-if="detail.subtitle" class="goods-subtitle">
                    <view class="t-omit-three">{{detail.subtitle}}</view>
                </view>
                <view class="middleman dir-top-nowrap main-center">
                    <view v-if="middleman.id > 0" class="middleman-info dir-left-nowrap">
                        <image class="avatar" :src="middleman.avatar"></image>
                        <view class="user-info">
                            <view class="t-omit">{{middleman.name}}</view>
                            <view class="t-omit-two middleman-address">
                                <image class="icon" src="./../image/add.png"></image>
                                <text>提货地址:{{middleman.province}}<text v-if="middleman.province != middleman.city">{{middleman.city}}</text>{{middleman.district}}{{middleman.detail}}</text>
                            </view>
                        </view>
                    </view>
                    <view v-if="activity.status != 2" class="app-share">
                        <app-form-id @click="shareShow = true">
                            <image class="app-icon" src="../../../static/image/icon/icon-share.png"></image>
                            <text class="app-text">分享</text>
                        </app-form-id>
                    </view>
                </view>
            </view>
            <!--商品优惠券-->
            <bd-coupon @change="setCoupon" :theme="themeObject" :coupons="detail.goods_coupon_center"></bd-coupon>
            <bd-xbc
                :coAttr="is_open"
                :attr-list="checked.attr_list"
                :type="detail.type"
                :guarantee-title="detail.guarantee_title"
                :guarantee-pic="detail.guarantee_pic"
                :param_content="detail.param_content"
                :param_name="detail.param_name"
                :services="detail.services"
                :attr-groups="detail.attr_groups"
                :goods-stock="detail.goods_stock"
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
            <!--空格区域-->
            <view class="safe-area-inset-bottom">
                <view class="u-bottom-height"></view>
            </view>
            <!-- 底部按钮 -->
            <view v-if="is_open == 1" class="safe-area-inset-bottom u-bottom-fixed">
                <view class="buttons dir-left-nowrap">
                    <view class="app-home">
                        <app-jump-button form arrangement="a" open_type="redirect" url="/plugins/community/list/list">
                            <view class="app-view dir-top-nowrap main-center cross-center">
                                <image src="./../image/activity.png"></image>
                                <text>活动</text>
                            </view>
                        </app-jump-button>
                    </view>
                    <view v-if="detail.goods_stock > 0 && activity.status === 1" class="app-button dir-left-nowrap">
                        <view @click="joinCart" class="app-join-cart box-grow-1" :class="getTheme + '-m-back '+ getTheme">
                            加入购物车
                        </view>
                    </view>
                    <view class="app-button dir-left-nowrap" v-else>
                        <view class="app-over box-grow-1" style="background-color: #CDCDCD;">
                            加入购物车
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <app-close v-if="showClose" :modal="false" @update="getMall"></app-close>
        <!--商品规格-->
        <u-attr
            v-if="detail.goods_stock > 0 && activity.status === 1"
            v-model="show"
            :goods="detail"
            :theme-object="themeObject"
            :checked="checked"
            :is_show_left="false"
            :right-func="true"
            right-text="加入购物车"
            @rightFunc="rightFunc"
            @check="check"
        >
        </u-attr>
        <app-share-qr-code
            v-model="shareShow"
            :url="url"
            :goods="detail"
            :poster-config="posterConfig"
            :poster-generate="posterGenerate"
            :has-poster-nav="hasPosterNav"
        ></app-share-qr-code>
    </app-layout>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';
    import appBanner from '../../../components/page-component/goods/app-goods-banner.vue';
    import appGoodsTime from '../components/app-goods-time.vue';
    import appGoodsService from '../../../components/page-component/goods/app-goods-service.vue';
    import appShareQrCode from '../../../components/page-component/app-share-qr-code-poster/app-share-qr-code-poster.vue';
    import appGoodsMarketing from "../../../components/page-component/goods/app-goods-marketing.vue";
    import appGoodsCoupon from "../../../components/page-component/goods/app-goods-coupon.vue";
    import uAttr from '../../../components/page-component/goods/u-attr.vue';
    import appClose from '@/components/basic-component/app-close/app-close.vue';
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
                is_open: 0,
                detail: null,
                middleman: {},
                activity: {},
                hasPosterNav: true,
                posterConfig: this.$api.community.goods_config,
                posterGenerate: this.$api.community.goods_generate,
                isShowBuy: false,
                shareShow: false,
                checked: null,
                url: '',
                show: false,
                list: [],
                goods_id: -1,
                hour: 0,
                minute: 0,
                second: 0,
                longitude: 0,
                latitude: 0,
                day: 0,
                loading: false,
                first: true,
                middleman_id: 0,
            }
        },
        onLoad(options) {
            let that = this;
            // #ifdef MP-WEIXIN
            wx.showShareMenu({
                menus: ['shareAppMessage', 'shareTimeline']
            })
            // #endif
            that.goods_id = options.goods_id;
            that.posterConfig = that.posterConfig + '&goods_id=' + that.goods_id;
            that.posterGenerate = that.posterGenerate + '&goods_id=' + that.goods_id;
            if(options.middleman_id > 0) {
                that.middleman_id = options.middleman_id;
                that.$showLoading({
                    type: 'global',
                    text: '加载中...'
                });
                that.request({
                    url: that.$api.community.goods_detail,
                    data: {
                        goods_id: that.goods_id,
                        middleman_id: that.middleman_id,
                    }
                }).then(response => {
                    that.first = false;
                    let { goods, activity,middleman } = response;
                    that.detail = goods;
                    that.activity = activity;
                    that.middleman = middleman;
                    that.loading = true;
                    that.url = `${that.$api.goods.poster}&goods_id=${that.detail.id}`;
                    if(activity.time > 0) {
                        that.getTime(activity.time);
                    }
                    that.$hideLoading();
                });
            }else {
                uni.getLocation({
                    success: (e) => {
                        uni.hideLoading();
                        that.longitude = e.longitude;
                        that.latitude = e.latitude;
                        that.$showLoading({
                            type: 'global',
                            text: '加载中...'
                        });
                        that.request({
                            url: that.$api.community.goods_detail,
                            data: {
                                goods_id: that.goods_id,
                                longitude: that.longitude,
                                latitude: that.latitude
                            }
                        }).then(response => {
                            that.first = false;
                            let { goods, activity,middleman } = response;
                            that.detail = goods;
                            that.activity = activity;
                            that.middleman = middleman;
                            that.loading = true;
                            that.url = `${that.$api.goods.poster}&goods_id=${that.detail.id}`;
                            if(activity.time > 0) {
                                that.getTime(activity.time);
                            }
                            that.$hideLoading();
                        });
                    },
                    fail: () => {
                        uni.hideLoading();
                        uni.showModal({
                            title: '提示',
                            content: '获取位置信息失败，需要授权获取您的位置信息',
                            showCancel: false,
                            confirmText: '打开授权',
                            success(e) {
                                if (e.confirm) {
                                    uni.openSetting({});
                                }
                            }
                        });
                    },
                });
            }
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
                    url: this.$api.community.goods_detail,
                    data: {
                        goods_id: this.goods_id,
                        middleman_id: this.middleman_id,
                        longitude: this.longitude,
                        latitude: this.latitude
                    }
                }).then(response => {
                    let { goods, activity,middleman } = response;
                    this.detail = goods;
                    this.activity = activity;
                    this.middleman = middleman;
                    this.loading = true;
                    this.url = `${this.$api.goods.poster}&goods_id=${this.detail.id}`;
                    if(activity.time > 0) {
                        this.getTime(activity.time);
                    }
                    this.$hideLoading();
                });
            })
        },
        onHide() {
            clearInterval(this.time);
        },
        onUnload() {
            clearInterval(this.time);
        },
        computed: {
            ...mapGetters('mallConfig', {
                getTheme: 'getTheme'
            }),
            ...mapState({
                mall: state => state.mallConfig.mall,
                userInfo: state => state.user.info
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
        onShareAppMessage() {
            let { app_share_title, app_share_pic, name, id } = this.detail;
            return this.$shareAppMessage({
                path: '/plugins/community/goods/goods',
                title: app_share_title ? app_share_title : name,
                imageUrl: app_share_pic ? app_share_pic : '',
                params: {
                    goods_id: id,
                    user_id: this.userInfo.options.user_id
                }
            });
        },
        // #ifdef MP-WEIXIN
        onShareTimeline() {
            // 分享朋友圈beta
            return this.$shareTimeline({
                title: this.detail.app_share_title ? this.detail.app_share_title : this.detail.name,
                query: {
                    goods_id: this.detail.id,
                    user_id: this.userInfo.options.user_id
                }
            });
        },
        // #endif
        methods: {
            getMall(e) {
                this.is_open = e.is_open;
            },
            async request({url, data}) {
                const response = await this.$request({
                    url: url,
                    data: data,
                });
                if (response.code === 0) {
                    return response.data;
                }else {
                    if(response.msg == '所选商品不在活动中') {
                        uni.showToast({
                            title: response.msg,
                            icon: 'none',
                            duration: 1000
                        });
                        setTimeout(()=>{
                            uni.redirectTo({
                                url: '/plugins/community/list/list'
                            });
                        },1000)
                        return false
                    }
                }
            },
            check(data) {
                this.checked = data;
            },
            rightFunc(data) {
                let { id, goods_attr_id, num } = data.goods_list[0];
                this.$request({
                    url: this.$api.community.cart_add,
                    data: {
                        activity_id: this.activity.id,
                        goods_id: id,
                        goods_attr_id: goods_attr_id,
                        num: num
                    },
                    method: 'post'
                }).then(response => {
                    if (response.code === 0) {
                        this.addResult(response.data.queue_id, response.data.token);
                    }
                });
            },
            joinCart() {
                this.show = true;
            },
            addResult(queue_id, token) {
                this.$request({
                    url: this.$api.community.cart_result,
                    method: 'post',
                    data: {
                        queue_id: queue_id,
                        token: token,
                    },
                }).then(response => {
                    if (response.code === 0) {
                        if (response.data && response.data.retry === 1) {
                            setTimeout(() => {
                                this.addResult(queue_id, token);
                            }, 1000);
                        } else {
                            this.attrShow = 0;
                            uni.hideLoading();
                            uni.showToast({
                                title: '添加成功',
                                duration: 1000
                            });
                        }
                    } else {
                        uni.hideLoading();
                        uni.showToast({
                            title: response.msg,
                            icon: 'none',
                            duration: 1000
                        });
                    }
                });
            },
            getTime(newValue) {
                newValue = newValue - 1;
                this.day = parseInt(newValue / 3600 / 24);
                this.hour = parseInt(newValue / 3600 % 24);
                if(this.hour < 10) {
                    this.hour = '0' + this.hour
                }
                this.minute = parseInt(newValue / 60 % 60);
                if(this.minute < 10) {
                    this.minute = '0' + this.minute
                }
                this.second = parseInt(newValue % 60);
                if(this.second < 10) {
                    this.second = '0' + this.second
                }
                clearInterval(this.time);
                this.time = setInterval(() => {
                    newValue = newValue - 1;
                    if (newValue < 0) {
                        clearInterval(this.time);
                    }
                    this.day = parseInt(newValue / 3600 / 24);
                    this.hour = parseInt(newValue / 3600 % 24);
                    if(this.hour < 10) {
                        this.hour = '0' + this.hour
                    }
                    this.minute = parseInt(newValue / 60 % 60);
                    if(this.minute < 10) {
                        this.minute = '0' + this.minute
                    }
                    this.second = parseInt(newValue % 60);
                    if(this.second < 10) {
                        this.second = '0' + this.second
                    }
                }, 1000);
            },
            setCoupon(index) {
                this.$set(this.detail.goods_coupon_center[index], 'is_receive', 1);
            }
        },
        components: {
            'app-banner': appBanner,
            'app-goods-time': appGoodsTime,
            'app-goods-service': appGoodsService,
            'app-share-qr-code': appShareQrCode,
            appGoodsMarketing,
            appGoodsCoupon,
            appClose,
            uAttr,
            bdCoupon,
            bdXbc,
            bdKb,
            bdHc,
            bdDetail,
            bdComments,
        }
    }
</script>

<style scoped lang="scss">
    .other-info {
        background-color: #fff;
        padding: 20upx;
        width: 702upx;
        border-radius: 15upx;
        margin: 24upx 24upx 0 24upx;
        .goods-name {
            font-size: #{32rpx};
            line-height: 42upx;
            color: #353535;
            margin-bottom: #{24rpx};
        }
        .goods-subtitle {
            font-size: 24rpx;
            line-height: 34upx;
            background-color: #ffffff;
            color: #999999;
            margin-bottom: #{24rpx};
        }
        .middleman {
            height: #{88rpx};
            color: #ffffff;
            position: relative;
            .app-share {
                width: #{40rpx};
                height: #{136rpx};
                position: absolute;
                right: #{24rpx};
                top: #{12rpx};
                .app-icon {
                    width: #{40rpx};
                    height: #{40rpx};
                }
                .app-text {
                    color: #666666;
                    font-size: #{20rpx};
                    position: absolute;
                    top: #{50rpx};
                    left: 0;
                }
            }
            .middleman-info {
                .avatar {
                    width: #{88rpx};
                    height: #{88rpx};
                    border-radius: 50%;
                    margin-right: #{24rpx};
                }
                .user-info {
                    font-size: #{30rpx};
                    color: #353535;
                    width: #{520rpx};
                    .middleman-address {
                        margin-top: #{16rpx};
                        font-size: #{24rpx};
                        .icon {
                            height: #{25rpx};
                            width: #{19rpx};
                            margin-right: #{5rpx};
                            color: #ff4544;
                        }
                    }
                }
            }
        }
    }
    .app-goods {
        background-color: #f7f7f7;
    }
    .buttons {
        width: #{750rpx};
        height: #{110rpx};
        border-top: #{1rpx} solid #e2e2e2;
        .app-home {
            width: 14%;
            height: #{110rpx};
            background-color: white;
            .app-view {
                width: #{105rpx};
                height: #{110rpx};
                image {
                    width: #{40rpx};
                    height: #{40rpx};
                }
                text {
                    font-size: #{18rpx};
                    color: #707070;
                    
                }
            }
        }
        .app-button {
            width: 86%;
            height: #{110rpx};
            text-align: center;
            line-height: #{110rpx};
            .app-join-cart {
                height: #{110rpx};
                color: #ffffff;
            }
            .app-buy {
                height: #{110rpx};
                color: white;
            }
            .notStart {
                height: #{110rpx};
                background-color: #cccccc;
                color: #FFFFFF;
            }
            .app-over {
                height: #{110rpx};
                background: #666;
                color: #FFFFFF;
            }
        }
    }
    .product-list {
        background-color: white;
    }

    .join-member {
        background-color: #ffffff;
        padding: 0 #{24rpx};
    }
    .app-bottom {
        background-color: white;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }
    .text {
        color: #ffffff;
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
    .u-bottom-height {
        height: 110upx;
    }
    .goods-margin {
        margin-top: 20upx;
    }
</style>