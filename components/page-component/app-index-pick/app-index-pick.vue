<template>
    <view class="index-advance">
        <view class="top dir-left-nowrap cross-center" @click="jump(`/plugins/pick/index/index`)">
            <image class="box-grow-0" src="../../../static/image/icon/pick.png"></image>
            <view class="box-grow-1">N元任选</view>
            <view class="dir-left-nowrap cross-center">
                <view class="box-grow-0 more">更多</view>
                <image class="box-grow-0 icon" src="../../../static/image/icon/arrow-right.png"></image>
            </view>
        </view>
        <view v-if="style == '1'" class="dir-left-nowrap list">
            <block v-for="(item, key) in newData.list" :key="key">
                <view class="box-grow-0 item" @click="jump_router(item)" >
                    <view class="cover-pic">
                        <app-image :img-src="item.goodsWarehouse.cover_pic" width="220rpx" height="220rpx"></app-image>
                        <view class="out-dialog" v-if="item.goods_stock == 0 && appSetting.is_show_stock == '1'">
                            <image :src="appSetting.is_use_stock == '1' ? appImg.plugins_out : appSetting.sell_out_pic"></image>
                        </view>
                        <view class="title  t-omit-two">
                            {{item.name}}
                        </view>
                        <view class="des-price" v-if="item.use_attr == 0" :class="theme + '-m-back ' + theme">
                            {{newData.activity.rule_price}}元任选{{newData.activity.rule_num}}件
                        </view>
                        <view class="des-price" v-else-if="item.use_attr == 1" :class="theme + '-m-back ' + theme">
                            {{newData.activity.rule_price}}元任选{{newData.activity.rule_num}}件
                        </view>
                    </view>
                    <view class="content dir-top-nowrap main-right">
                        <view  class="price" :class="theme + '-m-text ' + theme">
                            <text class="text"  style="font-size: 28rpx;">￥{{item.price}}</text>
                        </view>
                        <view class="old-price">
                            ￥{{item.original_price}}
                        </view>
                    </view>
                </view>
            </block>
        </view>
        <view v-if="style === '2'">
            <app-goods-list :detail="newData.activity" :theme="theme" :list="newData.list" sign="pick"></app-goods-list>
        </view>
    </view>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import appGoodsList from "../app-goods-list/app-goods-list.vue";

    export default {
        name: "app-index-pick",
        props: {

            activity: {
                type: Object,
                default() {
                    return {}
                }
            },
            theme: String,
            index: Number,
            is_required:Boolean,
            page_id: Number
        },
        components: {
            appGoodsList
        },
        data() {
            return {
                newData: [],
                style: '1',
                goods_num: 20
            };
        },
        computed: {
            ...mapState({
                appImg: state => state.mallConfig.__wxapp_img.mall,
                appSetting: state => state.mallConfig.mall.setting,
                mall: state => state.mallConfig.mall,
            }),
            ...mapGetters('mallConfig',{
                vip: 'getVip'
            }),
            ...mapGetters('mallConfig', {
                getVideo: 'getVideo'
            }),
        },
        methods: {
            jump(url) {
                this.$jump({
                    url: url,
                    open_type: 'navigate'
                })
            },
            jump_router(data) {
                // #ifndef MP-BAIDU
                if (data.goodsWarehouse.video_url && this.getVideo == 1) {
                    uni.navigateTo({
                        url: `/pages/goods/video?goods_id=${data.id}&sign=pick`
                    });
                } else {
                    uni.navigateTo({
                        url: `/plugins/pick/detail/detail?goods_id=${data.id}`
                    })
                }
                // #endif

                // #ifdef MP-BAIDU
                uni.navigateTo({
                    url: `/plugins/pick/detail/detail?goods_id=${data.id}`
                })
                // #endif
            },
            loadData() {
                let para = {
                    type: this.page_id === 0 ? 'mall' : 'diy',
                    key: 'pick',
                    page_id: this.page_id,
                    index: this.index
                }
                if(this.goods_num) {
                    para.goods_num = this.goods_num
                }
                this.$request({
                    url: this.$api.index.extra,
                    data: para
                }).then(e => {
                    this.newData = e.data;
                    if (e.code ===0 && e.data && this.page_id === 0) {
                        let storage = this.$storage.getStorageSync('INDEX_MALL');
                        storage.home_pages[this.index].data = this.newData;
                        this.$storage.setStorageSync('INDEX_MALL', storage);
                    }
                })
            }
        },
        mounted() {
            let storage = this.$storage.getStorageSync('INDEX_MALL');
            this.style = storage.home_pages[this.index].style;
            this.goods_num = storage.home_pages[this.index].goods_num;
            if (this.is_required) {
                this.loadData();
            } else {
                this.newData = storage.home_pages[this.index].data;
            }
        }
    }
</script>

<style scoped lang="scss">
    .index-advance {
        background-color: #f7f7f7;
        margin-bottom: #{20upx};
        .top {
            padding: #{0 24rpx};
            color: #ff4544;
            font-size: $uni-font-size-general-one;
            height: #{72rpx};
            background-color: white;
            image {
                width: #{46rpx};
                height: #{46rpx};
                display: block;
                margin-right: #{8rpx};
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
            }
        }

        .list {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            background-color: #f7f7f7;
            margin-top: #{4rpx};
            .item {
                margin-right: #{4rpx};
                font-size: $uni-font-size-general-one;
                width: #{260rpx};
                padding:  #{0 20rpx 20upx 20rpx};
                background-color: white;
                overflow: hidden;
                .cover-pic {
                    width: #{220rpx};
                    height: #{331upx};
                    display: block;
                    margin-top: #{20rpx};
                    position: relative;
                    .out-dialog {
                        width: #{220rpx};
                        height: #{220rpx};
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 10;
                        will-change: transform;
                        background-color: rgba(0,0,0,.5);
                        image {
                            width: #{220rpx};
                            height: #{220rpx};
                        }
                    }
                }

                .title {
                    width: #{224rpx};
                    height: #{64rpx};
                    font-size: #{25rpx};
                    line-height: #{32upx};
                    margin-top: #{10upx};
                    color: $uni-important-color-black;
                }
                .content {
                    height: calc(100% - #{331upx});
                }
                .member-price {
                    height: #{28upx};
                    margin-bottom: #{8upx};
                    margin-top: #{4upx};
                }
                .price {
                    .text {
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                        line-height: 1;
                        vertical-align: sub;
                    }
                }
                .old-price {
                    font-size: #{21upx};
                    line-height: 1;
                    color: #999999;
                    text-decoration:line-through;
                    margin: #{5upx 0 20upx 0};
                }
                .des-price {
                    display: inline-block;
                    font-size: #{19rpx};
                    color: #ffffff;
                    line-height: 1;
                    border-radius: #{7rpx};
                    padding: #{5rpx 5rpx};
                    word-break: break-all;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    margin: #{4upx 0};
                }
            }
        }
    }
</style>