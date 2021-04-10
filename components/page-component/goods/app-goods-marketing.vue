<template>
    <view class="app-goods-marketing">
        <view class="marketing">
            <view class="block dir-left-nowrap cross-center" v-if="integral && integral.title">
                <view class="box-grow-0">活动</view>
                <view class="give box-grow-0 main-center cross-center" :class="sign !== 'gift' ? theme + '-m-border ' + theme + '-m-text ' + theme : theme + '-color'">
                    送积分
                </view>
                <view class="content box-grow-1">{{integral.title}}</view>
            </view>
            <view class="block dir-left-nowrap cross-center" v-if="balance && balance.title">
                <view class="box-grow-0">促销</view>
                <view class="give box-grow-0 main-center cross-center" :class="sign !== 'gift' ? theme + '-m-border ' + theme + '-m-text ' + theme : theme + '-color'">
                    赠余额
                </view>
                <view class="content box-grow-1">{{balance.title}}</view>
            </view>
            <view class="block dir-left-nowrap cross-center" v-if="card && card.list.length > 0" @click="change('cardShow')">
                <view class="box-grow-0">{{!(balance && balance.title) ? '促销' : ''}}</view>
                <view class="give box-grow-0 main-center cross-center" :class="sign !== 'gift' ? theme + '-m-border ' + theme + '-m-text ' + theme : theme + '-color'">
                    赠卡券
                </view>
                <view class="content box-grow-1">{{card.title}}</view>
                <image class="box-grow-0" src="../../../static/image/icon/arrow-right.png"></image>
            </view>
            <view class="block dir-left-nowrap cross-center" v-if="coupon && coupon.list.length > 0" @click="change('couponShow')">
                <view class="box-grow-0">{{!(balance && balance.title && card && card.list.length > 0) ? '促销' : ''}}</view>
                <view class="give box-grow-0 main-center cross-center" :class="sign !== 'gift' ? theme + '-m-border ' + theme + '-m-text ' + theme : theme + '-color'">
                    赠优惠券
                </view>
                <view class="content box-grow-1">{{coupon.title}}</view>
                <image class="box-grow-0" src="../../../static/image/icon/arrow-right.png"></image>
            </view>
        </view>
        <view class="marketing marketing-top">
            <view class="block dir-left-nowrap cross-center" v-if="express">
                <view class="box-grow-0">快递</view>
                <view class="content box-grow-1">{{express}}</view>
            </view>
            <view class="block dir-left-nowrap cross-center" v-if="shipping" @click="change('shippingShow')">
                <view class="box-grow-0">包邮</view>
                <view class="content box-grow-1">{{shipping}}</view>
                <image class="box-grow-0" src="../../../static/image/icon/arrow-right.png"></image>
            </view>
            <view class="block dir-left-nowrap cross-center" v-if="limit" @click="change('limitShow')">
                <view class="box-grow-0">限购</view>
                <view class="content box-grow-1">{{limit}}</view>
                <image class="box-grow-0" src="../../../static/image/icon/arrow-right.png"></image>
            </view>
            <view class="block dir-left-nowrap cross-center" v-if="pickup" @click="change('pickupShow')">
                <view class="box-grow-0">起送</view>
                <view class="content box-grow-1">{{pickup}}</view>
                <image class="box-grow-0" src="../../../static/image/icon/arrow-right.png"></image>
            </view>
        </view>
        <view class="card-modal">
            <app-model v-model="cardShow" type="1" :height="840">
                <view slot="title" class="title">赠卡券</view>
                <view slot="content" class="content">
                    <view class="card dir-left-nowrap cross-center" v-for="(item, index) in card.list" :key="index">
                        <image :src="item.pic_url"></image>
                        <view class="box-grow-1 dir-top-nowrap">
                            <text class="name">{{item.name}}</text>
                            <text class="number">赠送{{item.number}}张</text>
                        </view>
                    </view>
                </view>
            </app-model>
        </view>
        <view class="coupon-modal">
            <app-model v-model="couponShow" type="1" :height="840">
                <view slot="title" class="title">赠优惠券</view>
                <view slot="content" class="content">
                    <view class="coupon dir-left-nowrap cross-center" v-for="(item, index) in coupon.list" :key="index">
                        <view class="dis" v-if="item.type === 1">
                           <text>{{item.discount}}</text>
                           <text>折</text>
                        </view>
                        <view class="price" v-else-if="item.type === 2">
                            <text>￥</text>
                            <text>{{item.sub_price}}</text>
                        </view>
                        <view class="box-grow-1 dir-top-nowrap">
                            <text class="name">{{item.name}}</text>
                            <text class="limit">满{{item.min_price}}可用</text>
                            <text class="number">赠送{{item.number}}张</text>
                        </view>
                    </view>
                </view>
            </app-model>
        </view>
        <view class="pickup-modal">
            <app-model v-model="pickupShow" type="2">
                <view slot="title" class="title">起送</view>
                <view slot="content" class="content">
                    <scroll-view scroll-y class="scroll">{{pickup}}</scroll-view>
                </view>
            </app-model>
            <app-model v-model="limitShow" type="2">
                <view slot="title" class="title">限购</view>
                <view slot="content" class="content-area">
                    <scroll-view scroll-y class="scroll">{{limit}}</scroll-view>
                </view>
            </app-model>
            <app-model v-model="shippingShow" type="2">
                <view slot="title" class="title">包邮</view>
                <view slot="content" class="content">
                    <scroll-view scroll-y class="scroll">{{shipping}}</scroll-view>
                </view>
            </app-model>
        </view>
    </view>
</template>

<script>
    import appModel from '../../../components/basic-component/app-model/app-model.vue';

    export default {
        name: "app-goods-marketing",

        components: {
            'app-model': appModel
        },

        props: {
            limit: {
                type: String,
                default() {
                    return '';
                }
            },
            pickup: {
                type: String,
                default() {
                    return '';
                }
            },
            shipping: {
                type: String,
                default() {
                    return '';
                }
            },
            card: {
                type: Object,
                default() {
                    return {};
                }
            },
            integral: {
                type: Object,
                default() {
                    return {};
                }
            },
            balance:{
                type: Object,
                default() {
                    return {};
                }
            },
            coupon:{
                type: Object,
                default() {
                    return {};
                }
            },
            express: {
                type: String,
                default() {
                    return '';
                }
            },
            theme: String,
            sign: String
        },
        data() {
            return {
                shippingShow: false,
                limitShow: false,
                cardShow: false,
                pickupShow: false,
                couponShow: false
            };
        },
        methods: {
            change(key) {
                this[key] = true;
	        }
        }
    }
</script>

<style scoped lang="scss">
    .marketing-top {
        margin-top: #{20rpx};
    }
    .marketing {


        & .block:first-child {
            padding-top: #{32rpx};
            padding-bottom: #{28rpx};
        }

        & .block:last-child {
            padding-bottom: #{32rpx};
        }

        &:empty {
            margin: 0;
        }

        .block {
            background-color: #ffffff;
            font-size: $uni-font-size-general-one;
            color: $uni-general-color-two;
            padding: 0 #{24rpx} #{28rpx} #{24rpx};

            & view:first-child {
                margin-right: #{30rpx};
                width: 60upx;
            }

            .give {
                padding: #{2rpx} #{4rpx};
                border: #{1rpx} solid;
                border-radius: #{4rpx};
                font-size: $uni-font-size-weak-two;
                margin-right: #{12rpx};
            }

            .content {
                color: $uni-important-color-black;
                display: inline-block;
                white-space: nowrap;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            image {
                width: #{12rpx};
                height: #{22rpx};
                display: block;
                margin-left: #{24rpx};
            }
        }
    }

    .card-modal {
        .title {
            font-size: $uni-font-size-general-one;
            padding: #{40rpx} 0;
            text-align: center;
        }

        .content {
            width: 100%;
            padding: 0 #{24rpx} #{40rpx} #{24rpx};
            max-height: #{800rpx};
            overflow-y: auto;

            .card {
                width: 100%;
                height: #{160rpx};
                background-image: url('../../../static/image/icon/goods-card.png');
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
                padding: 0 #{32rpx} 0 #{36rpx};
                margin-bottom: #{20rpx};

                image {
                    width: #{88rpx};
                    height: #{88rpx};
                    display: block;
                    margin-right: #{68rpx};
                    border-radius: #{88rpx};
                }

                .name {
                    width: 478#{rpx};
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    font-size: 28#{rpx};
                    color: #353535;
                }

                .number {
                    font-size:24#{rpx};
                    color: #999999;
                    margin-top:10#{rpx};
                }
            }
        }
    }

    .pickup-modal {
        .title {
            font-size: $uni-font-size-general-one;
            padding: #{40rpx} 0;
            text-align: center;
        }

        .content {
            padding: 0 #{40rpx} #{48rpx};
            font-size: $uni-font-size-general-one;
        }

        .scroll {
            max-height: #{450rpx};
            word-wrap:break-word;
        }

        ::-webkit-scrollbar {
            width: 0;
            height: 0;
            color: transparent;
        }
        .content-area {
            font-size: $uni-font-size-general-one;
        }

    }

    .coupon-modal {
        .title {
            font-size: $uni-font-size-general-one;
            padding: #{40rpx} 0;
            text-align: center;
        }
        .content {
            width: 100%;
            padding: 0 #{24rpx} #{40rpx} #{24rpx};
            max-height: #{800rpx};
            overflow-y: auto;
            z-index: 1000;
            .coupon {
                width: 100%;
                height: #{160rpx};
                background-image: url('../../../static/image/icon/goods-card.png');
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
                margin-bottom: #{20rpx};
                .dis {
                    >text:first-child {
                        font-weight: bold;
                        font-size: 36upx;
                    }
                    >text:last-child {
                        font-size: 22upx;
                        font-weight: bold;
                    }
                }
                .price {
                    >text:first-child {
                        font-size: 18upx;
                        font-weight: bold;
                    }
                    >text:last-child {
                        font-size: 36upx;
                        font-weight: bold;
                    }
                }
                view:first-child {
                    width: 160upx;
                    text-align: center;
                }
                view:last-child {
                    padding-left: 32upx;
                }
                image {
                    width: #{88rpx};
                    height: #{88rpx};
                    display: block;
                    margin-right: #{68rpx};
                    border-radius: #{88rpx};
                }

                .name {
                    width: 478#{rpx};
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    font-size: 28#{rpx};
                    color: #353535;
                }

                .limit {
                    font-size: 19upx;
                    color: #353535;
                }
                .number {
                    font-size:24#{rpx};
                    color: #999999;
                    margin-top:10#{rpx};
                }
            }
        }
    }
</style>