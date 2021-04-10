<template>
    <view class="app-index-miaosha">
        <view class="dir-left-nowrap cross-center top" @click="jump(`/plugins/miaosha/advance/advance`)">
            <image class="box-grow-0 img" src="../../../static/image/icon/icon-home-miaosha.png"></image>
            <view class="box-grow-0 text1">整点秒杀</view>
            <template v-if="newData.open_date">
                <view :class="timer ? 'box-grow-0' : 'box-grow-1'">{{newData.str}}</view>
                <view class="box-grow-1 dir-left-nowrap time-box" v-if="timer">
                    <view class="main-center cross-center time">{{timer.hour}}</view>
                    <view class="main-center cross-center maohao">:</view>
                    <view class="main-center cross-center time">{{timer.min}}</view>
                    <view class="main-center cross-center maohao">:</view>
                    <view class="main-center cross-center time">{{timer.sec}}</view>
                </view>
            </template>
            <view class="box-grow-0">
                <view class="dir-left-nowrap cross-center">
                    <view class="box-grow-0 more">更多</view>
                    <image class="box-grow-0 icon" src="../../../static/image/icon/arrow-right.png"></image>
                </view>
            </view>
        </view>
        <view v-if="style === '1'" class="dir-left-nowrap list">
            <block v-for="(item, key) in newData.list" :key="key">
                <app-form-id @click="router_jump(item)">
                    <view class="box-grow-0 dir-top-nowrap item">
                        <view class="box-grow-0 cover-pic">
                            <view class="out-dialog" v-if="item.goods_stock == 0 && appSetting.is_show_stock == '1'">
                                <image :src="appSetting.is_use_stock == '1' ? appImg.plugins_out : appSetting.sell_out_pic"></image>
                            </view>
                            <app-image :img-src="item.cover_pic" width="220rpx" height="220rpx"></app-image>
                        </view>
                        <view class="box-grow-0 t-omit-two goods-name">{{item.name}}</view>
                        <view class="box-grow-1 dir-top-nowrap main-right">
                            <view v-if="item.is_level == 1">
                                <app-member-price :price="item.level_price"></app-member-price>
                            </view>
                            <app-sup-vip :is_vip_card_user="item.vip_card_appoint.is_vip_card_user" margin="4rpx 0 0" v-if="item.vip_card_appoint.discount > 0" :discount="item.vip_card_appoint.discount"></app-sup-vip>
                            <view :class="[getTheme, getTheme + '-m-text']">{{item.price_content}}</view>
                        </view>
                    </view>
                </app-form-id>
            </block>
        </view>
        <view v-if="style === '2'">
            <app-goods-list :theme="getTheme" :list="newData.list" sign="miaosha"></app-goods-list>
        </view>
    </view>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import routeJump from '../../../core/routeJump.js';
    import appGoodsList from "../app-goods-list/app-goods-list.vue";

    export default {
        name: "app-index-miaosha",
        props: {
            value: {
                type: Object,
                default() {
                    return {
                        open_date: null,
                        list: []
                    };
                }
            },
            pageHide: Boolean,
            theme: Object,
            index: Number,
            page_id: Number,
            is_required: Boolean
        },
        components: {
            appGoodsList
        },
        data() {
            return {
                newData: {
                    str: ''
                },
                style: '1',
                goods_num: 20,
                timer: null,
                time: null,
                is_vip: true,
            };
        },
        computed: {
            ...mapState({
                mall: state => state.mallConfig.mall,
                appSetting: state => state.mallConfig.mall.setting,
                appImg: state => state.mallConfig.__wxapp_img.mall,
            }),
            ...mapGetters('mallConfig', {
                getVideo: 'getVideo'
            }),
            ...mapGetters('mallConfig', {
                getTheme: 'getTheme',
            }),
        },
        beforeDestroy() {
            clearInterval(this.time);
        },
        watch: {
            pageHide: {
                handler(v) {
                    if (v) {
                        clearInterval(this.time);
                        return ;
                    }

                },
                immediate: true
            },
        },
        methods: {
            jump(url) {
                routeJump({
                    open_type: 'navigate',
                    page_url: url,
                    params: []
                })
            },
            router_jump(data) {
                // #ifndef MP-BAIDU
                if (data.video_url && this.getVideo == 1) {
                    uni.navigateTo({
                        url: `/pages/goods/video?goods_id=${data.id}&sign=miaosha`
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
                    key: 'miaosha',
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
                    if (e.code === 0 && e.data) {
                        this.newData = e.data;
                        this.newData.str = '00:00:00 点场';
                        let timenow = new Date();//获取当前时间
                        if ((new Date(this.newData.open_date)).getDate() != timenow.getDate()) {
                            this.newData.str = '预告 ' + this.newData.open_date + ' ' + this.newData.open_time + '点场';
                        } else if (this.newData.open_time != timenow.getHours()) {
                            this.newData.str = '预告 ' + this.newData.open_time + '点场';
                        } else {
                            let timelog = this.newData.date_time * 1000 - timenow.getTime();//时间差的所有毫秒数
                            this.time = setInterval(() => {
                                timelog -= 1000;
                                this.newData.str = this.newData.open_time + '点场';
                                if (timelog <= 0) {
                                    clearInterval(this.time);
                                    return;
                                }
                                let hour = parseInt((timelog / 1000 / 60 / 60));
                                let min = parseInt((timelog / 1000 / 60) % 60);
                                let sec = parseInt((timelog / 1000) % 60);
                                this.timer = {
                                    hour: hour < 10 ? "0" + hour : hour,
                                    min: min < 10 ? "0" + min : min,
                                    sec: sec < 10 ? "0" + sec : sec
                                };
                            }, 1000);
                        }
                    }
                })
            }
        },

        mounted() {
            let storage = this.$storage.getStorageSync('INDEX_MALL');
            this.style = storage.home_pages[this.index].style;
            this.goods_num = storage.home_pages[this.index].goods_num;
            this.loadData();
        }
    }
</script>

<style scoped lang="scss">
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

    .app-index-miaosha {
        background-color: $uni-weak-color-two;

        .top {
            height: #{80rpx};
            padding: 0 #{24rpx};
            background-color: #ffffff;
            font-size: $uni-font-size-weak-one;

            .img {
                width: #{46rpx};
                height: #{46rpx};
                display: block;
                margin-right: #{16rpx};
            }

            .text1 {
                color: #ff8831;
                font-size: $uni-font-size-general-one;
                margin-right: #{20rpx};
            }

            .time-box {
                margin-left: #{23rpx};

                .time {
                    width: #{32rpx};
                    height: #{34rpx};
                    background-color: #4c4c4c;
                    color: #ffffff;
                    font-size: #{20rpx};
                    border-radius: #{4rpx};
                }

                .maohao {
                    width: #{20rpx};
                    height: #{34rpx};
                }
            }
        }

        .list {
            margin-top: #{8rpx};
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;

            .item {
                background-color: #ffffff;
                margin-right: #{8rpx};
                font-size: $uni-font-size-general-one;
                padding: #{20rpx} #{20rpx} #{24rpx} #{20rpx};
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

                .goods-name {
                    width: #{220rpx};
                    font-size: $uni-font-size-general-two;
                }

                .price {
                    text-decoration: line-through;
                    color: $uni-general-color-two;
                    margin-bottom: #{15rpx};
                    font-size: $uni-font-size-weak-one;

                    &:before {
                        content: '￥';
                    }
                }
            }
        }
    }
</style>