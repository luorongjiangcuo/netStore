<template>
    <view class="style-one" :class="list.length === 0 ? '' : 'padding'">
        <!--  赵 张 朱 陶 宋 范 姚 金 -->
        <image class="item" v-for="(it, k) in list" :key="k" @click="r(it)" :src="it.big_pic_url"></image>
        <view class="no-empty main-center" v-if="list.length === 0">
            <n background="#f7f7f7" title="该分类下无相关内容哦~">
            </n>
        </view>
    </view>
</template>

<script>
    import n from '../../components/page-component/app-no-goods/app-no-goods.vue';

    export default {
        name: 'style-one',

        props: ['list'],

        components: {
            'n': n
        },

        methods: {
            r(i) {
                uni.navigateTo({
                    url: i.page_url
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .style-one {
        width: #{750rpx};
        background-color: white;
    }
    .padding {
        padding: #{0 24upx 24upx 24upx};
    }
    .item {
        width: #{702rpx};
        height: #{212rpx};
        margin-top: #{20rpx};
    }
    .no-empty {
        width: 100%;
        margin-top: #{150upx};
        background-color: #f7f7f7;
    }
</style>