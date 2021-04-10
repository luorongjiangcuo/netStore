<template>
    <view class="f-flash">
        <view class="f-con cross-center" :class="theme !== 'a' ? theme + '-m-back-p ' + theme : ''"
              :style="{backgroundImage: theme === 'a' ? `url(${flash_sale.cover})` : ''}" @click="navigator">
            <view class="f-sign" :class="theme + '-m-back ' + theme">限时抢购</view>
            <view class="f-title">
                {{flash_sale.discount_type == 2 ? '减': ''}}
                {{flash_sale.min_discount}}
                {{flash_sale.discount_type == 2 ? '元' : '折'}}&nbsp;&nbsp;
                {{flash_sale.time_status == 1 ? flash_sale.start_at : flash_sale.end_at}}
                {{flash_sale.time_status == 1 ? '开始' : '结束'}}
            </view>
            <view class="f-text" :class="theme + '-m-text ' + theme">
                点我去{{flash_sale.time_status == 1 ? '加' : '抢'}}购
            </view>
            <image class="f-icon" src="/static/image/icon/flash-sale.gif"></image>
        </view>
    </view>
</template>

<script>
    export default {
        name: "app-goods-flash-sale",

        props: {
            flash_sale: {
                type: Object,
                default() {
                    return {
                        time_status: 1,
                        start_at: '',
                        end_at: '',
                        min_discount: ''
                    }
                }
            },
            theme: String
        },

        methods: {
            navigator() {
                uni.navigateTo({
                    url: this.flash_sale.url
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .f-flash {
        padding: 16upx 24upx;
        background-color: #ffffff;
    }
    .f-con {
        width: 702upx;
        height: 88upx;
        position: relative;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 16upx;
    }
    .f-back {
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .f-sign {
        height: 34upx;
        width: 100upx;
        font-size: 20upx;
        color: #fff;
        text-align: center;
        line-height: 34upx;
        border-radius: 17upx;
        margin:0 20upx;
    }
    .f-title {
        font-size: 26upx;
        color: #353535;
    }
    .f-icon {
        width: 54upx;
        height: 63upx;
        position: absolute;
        right: 22upx;
    }
    .f-text {
        font-size: 26upx;
        position: absolute;
        right: 80upx;
        font-weight: bold;
    }
</style>
