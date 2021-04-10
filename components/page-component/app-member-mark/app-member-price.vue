<template>
    <view class="app-member-price dir-left-nowrap cross-center" v-if="price >= 0">
        <view class="box-grow-0">
            <app-member-mark height="28rpx" :theme="theme"></app-member-mark>
        </view>
        <view class="box-grow-1 price" :class="[theme.color]">
            <app-price :theme="theme.theme" :price="price" type="text-price-all"></app-price>
        </view>
    </view>
</template>

<script>
    import appMemberMark from "./app-member-mark.vue";
    import appPrice from "../goods/app-price.vue";

    export default {
        name: "app-member-price",

        components: {
            'app-member-mark': appMemberMark,
            'app-price': appPrice
        },
        props: {
            price: {
                type: Number | String
            },
            theme: Object
        }
    }
</script>

<style scoped lang="scss">
    .price {
        margin-left: #{10rpx};
        font-size: $uni-font-size-weak-one;
    }
</style>