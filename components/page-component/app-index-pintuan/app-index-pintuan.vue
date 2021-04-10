<template>
    <view class="app-index-pintuan">
        <view class="top dir-left-nowrap cross-center" @click="jump(`/plugins/pt/index/index`)">
            <image class="box-grow-0" src="/static/image/icon/icon-home-pintuan.png" mode="aspectFit"></image>
            <view class="box-grow-1 cross-bottom">限量拼团，每日必逛</view>
            <view class="dir-left-nowrap cross-center">
                <view class="box-grow-0 more">更多</view>
                <image class="box-grow-0 icon" src="../../../static/image/icon/arrow-right.png"></image>
            </view>
        </view>
        <view v-if="style == '1'" class="dir-left-nowrap list">
            <block v-for="(item, key) in newData.list" :key="key">
                <app-form-id @click="jump_router(item)">
                    <view class="item box-grow-0 dir-top-nowrap">
                        <view class="cover-pic box-grow-0">
                            <view class="out-dialog" v-if="item.goods_stock == 0 && appSetting.is_show_stock == '1'">
                                <image :src="appSetting.is_use_stock == '1' ? appImg.plugins_out : appSetting.sell_out_pic"></image>
                            </view>
                            <app-image :img-src="item.cover_pic" width="220rpx" height="220rpx"></app-image>
                        </view>
                        <view class="title t-omit-two box-grow-0">{{item.name}}</view>
                        <view class="box-grow-1 dir-top-nowrap main-right">
                            <view v-if="item.is_level == 1">
                                <app-member-price :price="item.level_price"></app-member-price>
                            </view>
                            <app-sup-vip :is_vip_card_user="item.vip_card_appoint.is_vip_card_user" margin="4rpx 0 0" v-if="item.vip_card_appoint.discount > 0" :discount="item.vip_card_appoint.discount"></app-sup-vip>
                            <view class="price" :class="theme + '-m-text ' + theme">{{item.price_content}}</view>
                        </view>
                        <view class="cross-center count">{{item.group_count}}</view>
                    </view>
                </app-form-id>
            </block>
        </view>
        <view v-if="style === '2'">
            <app-goods-list :theme="theme" :list="newData.list" sign="pintuan"></app-goods-list>
        </view>
    </view>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import routeJump from '../../../core/routeJump.js';
    import appGoodsList from "../app-goods-list/app-goods-list.vue";

    export default {
        name: "app-index-pintuan",
        props: {
            theme: Object,
            index: Number,
            page_id: Number,
            is_required: Boolean
        },
        data() {
            return {
                newData: {},
                style: '1',
                goods_num: 10
            };
        },
        components: {
            appGoodsList
        },
        computed: {
            ...mapState({
                appImg: state => state.mallConfig.__wxapp_img.mall,
                appSetting: state => state.mallConfig.mall.setting,
            }),
            ...mapGetters('mallConfig', {
                getVideo: 'getVideo'
            }),
        },
        mounted() {
            let storage = this.$storage.getStorageSync('INDEX_MALL');
            this.style = storage.home_pages[this.index].style;
            this.goods_num = storage.home_pages[this.index].goods_num;
            if (this.is_required) {
                this.loadData();
            } else {
                this.newData = storage.home_pages[this.index].list;
            }
        },
        methods: {
            jump(url) {
                routeJump({
                    open_type: 'navigate',
                    page_url: url,
                    params: []
                })
            },

            jump_router(data) {
                // #ifndef MP-BAIDU
                if (data.video_url && this.getVideo == 1) {
                    uni.navigateTo({
                        url: `/pages/goods/video?goods_id=${data.id}&sign=pintuan`
                    });
                } else {
                    uni.navigateTo({
                        url: data.page_url
                    })
                }
                // #endif

                // #ifdef MP-BAIDU
                uni.navigateTo({
                    url: data.page_url
                })
                // #endif
            },

            async loadData() {
                let para = {
                    type: this.page_id === 0 ? 'mall' : 'diy',
                    key: 'pintuan',
                    page_id: this.page_id,
                    index: this.index
                }
                if(this.goods_num) {
                    para.goods_num = this.goods_num
                }
                const e = await this.$request({
                    url: this.$api.index.extra,
                    data: para
                });
                this.newData = e.data;
                if (e.code ===0 && e.data && this.page_id === 0) {
                    let storage = this.$storage.getStorageSync('INDEX_MALL');
                    storage.home_pages[this.index].list = this.newData;
                    this.$storage.setStorageSync('INDEX_MALL', storage);
                }
            }

        },
    }
</script>

<style scoped lang="scss">
    .text1 {
        color: #ff8831;
        font-size: $uni-font-size-general-one;
    }

    .app-index-pintuan {

        .top {
            background-color: #ffffff;
            padding: #{16rpx} #{24rpx};
            color: $uni-general-color-two;
            font-size: $uni-font-size-weak-one;

            image {
                width: #{88rpx};
                height: #{40rpx};
                display: block;
                margin-right: #{20rpx};
            }

            .more {
                font-size: $uni-font-size-general-two;
                margin-right: #{12rpx};
                color: $uni-general-color-two;
            }

            .icon {
                width: #{12rpx};
                height: #{22rpx};
                display: block;
                margin: 0;
            }
        }

        .list {
            margin-top: #{8rpx};
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;

            .item {
                background-color: #ffffff;
                margin-right: #{8rpx};
                padding: #{20rpx 20rpx 24rpx 20rpx};
                height: 100%;
                border-radius: #{8rpx};

                .cover-pic {
                    width: #{220rpx};
                    height: #{220rpx};
                    display: block;
                    margin-bottom: #{20rpx};
                    .out-dialog {
                        width: #{220rpx};
                        height: #{220rpx};
                        position: absolute;
                        top: #{20rpx};
                        left: #{20rpx};
                        z-index: 10;
                        background-color: rgba(0,0,0,.5);
                        image {
                            width: #{220rpx};
                            height: #{220rpx};
                        }
                    }
                }

                .title {
                    font-size: 26upx;
                    color: $uni-important-color-black;
                    width: #{220rpx};
                    /*#ifdef MP-ALIPAY*/
                    height: 55upx;
                    /* #endif */
                }

                .price {
                    font-size: $uni-font-size-import-two;
                    margin-bottom: #{10rpx};
                }

                .count {
                    font-size: $uni-font-size-weak-one;
                    color: $uni-general-color-two;
                }
            }
        }
    }
</style>