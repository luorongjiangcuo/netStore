<template>
    <view class="u-service-box">
        <view class="u-service cross-center" @click="show = true">
            <view class="box-grow-0 u-text">保障</view>
            <view class="box-grow-1 u-content">
                <view class="u-line-1">
                    <block v-for="(item, index) in list" :key="index">{{item.name}}{{list.length - 1 > index ? ' · ' : ''}}</block>
                </view>
            </view>
            <image class="u-icon-del" src="../../../static/image/icon/arrow-right.png"></image>
        </view>
        <u-popup v-model="show" mode="bottom" border-radius="14" @close="show = false">
            <view class="model" @touchmove.stop.prevent>
                <view class="f-top dir-left-nowrap main-between cross-center">
                    <view class="f-title dir-left-nowrap cross-center u-line-1">
                        <image class="u-top-icon" :src="guarantee_pic"></image>
                        <view>
                            {{guarantee_title}}
                        </view>
                    </view>
                    <view class="f-image" @click="show = false">
                        <image class="f-img" src="/static/image/icon/icon-close.png"></image>
                    </view>
                </view>
                <scroll-view scroll-y class="f-scroll">
                    <view class="f-scroll-content">
                        <view class="f-item dir-top-nowrap" v-for="(item, index) in list" :key="index">
                            <view class="dir-left-nowrap cross-center">
                                <image class="u-icon" :src="item.pic"></image>
                                <view class="u-name">{{item.name}}</view>
                            </view>
                            <text class="u-remark">{{item.remark}}</text>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </u-popup>
    </view>
</template>

<script>
    import uPopup from '../../basic-component/u-popup/u-popup.vue';

    export default {
        props: {
            list: Array,
            guarantee_title: {
                type: String
            },
            guarantee_pic: {
                type: String
            }
        },
        data() {
            return {
                show: false
            }
        },
        components: {
            uPopup
        }
    }
</script>

<style scoped lang="scss">
    .u-service {
        height: 100upx;
        background-color: #fff;
        font-size: 26upx;
        padding: 0 24upx;
    }
    .u-text {
        color: #999999;
    }
    .u-content {
        color: #353535;
        margin: 24upx;
        width: 570upx;
    }
    .u-icon-del {
        width: 12upx;
        height: 22upx;
        display: block;
    }
    .model {
        height: #{1100upx};
        width: 750upx;
    }
    .f-top {
        height: 105upx;
        background-color: #ffffff;
        position: relative;
        border-radius: 15rpx;
        .f-image {
            width: 78upx;
            height: 78upx;
            padding: 24upx;
            position: absolute;
            right: 0;
            .f-img {
                width: 30upx;
                height: 30upx;
            }
        }
    }
    .f-title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        max-width: 594upx;
    }
    .f-scroll {
        height: 995upx;
        width: 100%;
    }
    .f-scroll-content {
        padding: 0 24upx;
    }
    .u-icon {
        width: 24upx;
        height: 24upx;
    }
    .u-name {
        color: #353535;
        font-size: 24upx;
        margin-left: 20upx;
    }
    .u-remark {
        font-size: 24upx;
        color: #999999;
        margin-top: 26upx;
        margin-left: 44upx;
    }
    .f-item {
        margin-bottom: 30upx;
    }
    .u-top-icon {
        width: 28upx;
        height: 28upx;
        margin-right: 10upx;
    }
</style>