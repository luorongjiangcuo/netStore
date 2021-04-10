<template>
    <view class="app-form-data">
        <view class='info-title'>表单内容</view>
        <block v-for="(goods,key) in detail" :key="key">
            <view class="goods-info">
                <app-order-goods-info style="width:100%;" :goods="goods.goods_info"></app-order-goods-info>
            </view>
            <view v-if="form.value  && [`,`,``, null].indexOf(String(form.value)) === -1"
                  v-for="(form, keyA) in goods.form_data" :key="keyA" class="form-value"
                  :class="{'dir-left-wrap' : form.key != `img_upload`}">
                <view class="label">{{form.label}}:</view>
                <view v-if="form.key === `img_upload`">
                    <view v-if="Array.isArray(form.value)">
                        <block v-for="(img,keyB) in form.value" v-if="img" :key="keyB">
                            <image :src="img" @click="showImgg(img)"></image>
                        </block>
                    </view>
                    <view v-else>
                        <image :src="form.value" @click="showImgg(form.value)"></image>
                    </view>
                </view>
                <view v-else>{{form.value}}</view>
            </view>
        </block>
    </view>
</template>

<script>
    import appOrderGoodsInfo from "../../page-component/app-order-goods-info/app-order-goods-info";

    export default {
        components: {
            appOrderGoodsInfo,
        },
        props: {
            detail: {
                type: Array,
                default: [],
            }
        },
        data() {
            return {}
        },
        methods: {
            showImgg(e) {
                uni.previewImage({
                    current: e, // 当前显示图片的http链接
                    urls: [e] // 需要预览的图片http链接列表
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .app-form-data {
        .info-title {
            font-size: #{24rpx};
            color: #353535;
            margin-bottom: #{20rpx};
        }

        .form-value {
            margin-bottom: #{10rpx};
            font-size: #{24rpx};
            color: #353535;

            .label {
                color: #999;
                font-size: #{24rpx};
                margin-right: #{10rpx};
                margin-bottom: #{10rpx};
            }

            image {
                height: #{120rpx};
                width: #{120rpx};
                display: inline-block;
            }
        }

    }
</style>