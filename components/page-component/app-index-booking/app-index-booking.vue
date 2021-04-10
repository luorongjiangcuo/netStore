<template>
    <view class="app-index-booking">
        <view class="top dir-left-nowrap cross-center">
            <image class="box-grow-0" src="../../../static/image/icon/icon-home-booking.png"></image>
            <view class="box-grow-1">预约</view>
            <app-form-id @click="jump(`/plugins/book/index/index`)">
                <view class="dir-left-nowrap cross-center">
                    <view class="box-grow-0 more">更多</view>
                    <image class="box-grow-0 icon" src="../../../static/image/icon/arrow-right.png"></image>
                </view>
            </app-form-id>
        </view>
        <view v-if="style == '1'" class="dir-left-nowrap list">
            <block v-for="(book, key) in newData.list" :key="key">
                <app-form-id @click="router_jump(book)">
                    <view class="box-grow-0 dir-top-nowrap item">
                        <view class="box-grow-0 cover-pic">
                            <view class="out-dialog" v-if="book.goods_stock == 0 && appSetting.is_show_stock == '1'">
                                <image :src="appSetting.is_use_stock == '1' ? appImg.plugins_out : appSetting.sell_out_pic"></image>
                            </view>
                            <app-image :img-src="book.cover_pic" width="224rpx" height="224rpx"></app-image>
                        </view>
                        <view class="box-grow-0 title t-omit-two">{{book.name}}</view>
                        <view class="content dir-top-nowrap main-right">
                            <view class="box-grow-1 dir-top-nowrap main-right price">
                                <view v-if="book.is_level == 1">
                                    <app-member-price :price="book.level_price"></app-member-price>
                                </view>
                                <app-sup-vip :is_vip_card_user="book.vip_card_appoint.is_vip_card_user" margin="4rpx 0 0" v-if="book.vip_card_appoint.discount > 0" :discount="book.vip_card_appoint.discount"></app-sup-vip>
                                <view :class="getTheme + '-m-text ' + getTheme">{{book.price_content}}</view>
                            </view>
                        </view>
                    </view>
                </app-form-id>
            </block>
        </view>
        <view v-if="style === '2'">
            <app-goods-list :theme="getTheme" :list="newData.list" sign="booking"></app-goods-list>
        </view>
    </view>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import appGoodsList from "../app-goods-list/app-goods-list.vue";

    export default {
        name: "app-index-booking",
        props: {
            theme: String,
            index: Number,
            page_id: Number,
            is_required: Boolean
        },
        data() {
            return {
                newData: {},
                style: '1',
                goods_num: 20
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
            ...mapGetters('mallConfig', {
                getTheme: 'getTheme',
            }),
        },
        methods: {
            jump(url) {
                this.$jump({
                    url: url,
                    open_type: 'navigate'
                })
            },
            router_jump(data) {
                // #ifndef MP-BAIDU
                if (data.video_url && this.getVideo == 1) {
                    uni.navigateTo({
                        url: `/pages/goods/video?goods_id=${data.id}&sign=booking`
                    });
                } else {
                    uni.navigateTo({
                        url: data.page_url
                    });
                }
                // #endif

                // #ifdef MP-BAIDU
                uni.navigateTo({
                    url: data.page_url
                });
                // #endif
            },

            loadData() {
                let para = {
                    type: this.page_id === 0 ? 'mall' : 'diy',
                    key: 'booking',
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
                        storage.home_pages[this.index].list = this.newData;
                        this.$storage.setStorageSync('INDEX_MALL', storage);
                    }
                })
            }
        },

        created() {
            let storage = this.$storage.getStorageSync('INDEX_MALL');
            this.style = storage.home_pages[this.index].style;
            this.goods_num = storage.home_pages[this.index].goods_num;
            if (this.is_required) {
                this.loadData();
            } else {
                this.newData = storage.home_pages[this.index].list;
            }
        },
    }
</script>

<style scoped lang="scss">
    .vip-price {
        width: #{148upx};
        height: #{27upx};
        margin-top: #{4upx};
        .vip-item {
            height: #{27upx};
            width: 50%;
        }
        .vip-left {
            border-top-left-radius: #{13upx};
            border-bottom-left-radius: #{13upx};
            background-color: #4e4040;
            position: relative;
        }
        .vip-right {
            border-top-right-radius: #{13upx};
            border-bottom-right-radius: #{13upx};
            background: linear-gradient(45deg, #edc9a8, #fdebde);
            font-size: #{18upx};
            line-height: #{27upx};
            text-align: center;
            color: #4e4040;
        }
        .vip-icon {
            width: #{51upx};
            height: #{14upx};
            position:absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .app-index-booking {
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
                    width: #{224rpx};
                    height: #{224rpx};
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
                    height: #{100rpx};
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