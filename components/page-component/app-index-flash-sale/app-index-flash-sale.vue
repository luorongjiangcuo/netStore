<template>
    <view class="index-advance">
        <view class="top dir-left-nowrap cross-center" @click="jump(`/plugins/flash_sale/index/index`)">
            <image class="box-grow-0" src="../../../static/image/icon/flash_sale.png"></image>
            <view class="box-grow-1 dir-left-nowrap">
                <view>限时抢购</view>
                <template v-if="timing && (newData.activity || newData.next_activity)">
                    <view class="dir-left-nowrap time-box">
                        <view class="main-center cross-center time">{{time_str.day}}</view>
                        <view class="main-center cross-center maohao">:</view>
                        <view class="main-center cross-center time">{{time_str.hou}}</view>
                        <view class="main-center cross-center maohao">:</view>
                        <view class="main-center cross-center time">{{time_str.min}}</view>
                        <view class="main-center cross-center maohao">:</view>
                        <view class="main-center cross-center time">{{time_str.sec}}</view>
                    </view>
                    <view :class="time_str ? 'box-grow-0' : 'box-grow-1'" style="color: #353535;margin-left: 10rpx;font-size: 22rpx;">{{newData.str}}</view>
                </template>
            </view>
            <view class="box-grow-0">
                <view class="dir-left-nowrap cross-center">
                    <view class="box-grow-0 more">更多</view>
                    <image class="box-grow-0 icon" src="../../../static/image/icon/arrow-right.png"></image>
                </view>
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
                        <view class="des-price" :class="theme+ '-m-back ' + theme">
                            {{item.discount_type == 1 ? item.min_discount + '折' : '减' + item.min_discount + '元'}}
                        </view>
                    </view>
                    <view class="content dir-top-nowrap main-right">
                        <view class="member-price" v-if="item.is_level == 1">
                            <app-member-price :price="item.level_price"></app-member-price>
                        </view>
                        <app-sup-vip :is_vip_card_user="item.vip_card_appoint.is_vip_card_user"
                                     margin="4rpx 0 8rpx"
                                     v-if="item.vip_card_appoint.discount"
                                     :discount="item.vip_card_appoint.discount"></app-sup-vip>
                        <view :class="theme+ '-m-text ' + theme"  class="price">
                            <text class="text">{{item.price_content}}</text>
                        </view>
                        <view class="old-price">
                            ￥{{item.goodsWarehouse.original_price}}
                        </view>
                    </view>
                </view>
            </block>
        </view>
        <view v-if="style === '2'">
            <app-goods-list :theme="theme" :list="newData" sign="flash_sale"></app-goods-list>
        </view>
    </view>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import appGoodsList from "../app-goods-list/app-goods-list.vue";

    export default {
        name: "app-index-flash-sale",
        props: {
            theme: String,
            index: Number,
            page_id: Number,
            is_required: Boolean,
            pageHide: Boolean,
        },
        components: {
            appGoodsList
        },
        data() {
            return {
                newData: {},
                style: '1',
                goods_num: 20,
                time_str:{
                    day: '00',
                    hou: '00',
                    min: '00',
                    sec: '00'
                },
                timing: null,
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
            })
        },
        methods: {
            jump(url) {
                uni.navigateTo({
                    url: url
                });
            },
            jump_router(data) {
                // #ifndef MP-BAIDU
                if (data.goodsWarehouse.video_url && this.getVideo == 1) {
                    uni.navigateTo({
                        url: `/pages/goods/video?goods_id=${data.id}&sign=flash_sale`
                    });
                } else {
                    uni.navigateTo({
                        url: `/plugins/flash_sale/goods/goods?id=${data.id}`
                    })
                }
                // #endif

                // #ifdef MP-BAIDU
                uni.navigateTo({
                    url: `/plugins/flash_sale/goods/goods?id=${data.id}`
                })
                // #endif
            },
            loadData() {
                let para = {
                    type: this.page_id === 0 ? 'mall' : 'diy',
                    key: 'flash_sale',
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
                    if (this.newData.activity) {
                        this.newData.str = '结束';
                        this.set_time(this.newData.activity.end_at);
                    } else {
                        this.newData.str = '开始';
                        this.set_time(this.newData.next_activity.start_at);
                    }
                });
            },
            set_time(time_at) {
                clearInterval(this.timing);
                let time_str = new Date(time_at.replace(/-/g, '/'));
                this.now_time(time_str);
                this.timing = setInterval(() => {
                    this.now_time(time_str);
                }, 1000);
            },
            now_time(time_str) {
                let time = time_str.getTime() - new Date().getTime();
                if (time < 0) {
                    clearInterval(this.timing);
                    this.timing = null;
                }
                let day = parseInt(time/1000/60/60/24);

                let hou = parseInt((time/1000/60/60)%24);
                let min = parseInt((time/1000/60)%60);
                let sec = parseInt((time/1000)%60);
                this.time_str.day = day < 10 ? '0' + day : day;
                this.time_str.hou = hou < 10 ? '0' + hou : hou;
                this.time_str.min = min < 10 ? '0' + min : min;
                this.time_str.sec = sec < 10 ? '0' + sec : sec;
            },
        },
        mounted() {
            let storage = this.$storage.getStorageSync('INDEX_MALL');
            this.style = storage.home_pages[this.index].style;
            this.goods_num = storage.home_pages[this.index].goods_num;
            this.loadData();
        },
        beforeDestroy() {
            clearInterval(this.timing);
        },
        watch: {
            pageHide: {
                handler(v) {
                    if (v) {
                        clearInterval(this.timing);
                        return ;
                    } else {
                        if (this.newData.activity) {
                            this.newData.str = '结束';
                            this.set_time(this.newData.activity.end_at);
                        } else if (this.newData.next_activity) {
                            this.newData.str = '开始';
                            this.set_time(this.newData.next_activity.start_at);
                        }
                    }
                },
                immediate: true
            },
>>>>>>> dev
        },
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
            >image {
                width: #{46rpx};
                height: #{46rpx};
                display: block;
                margin-right: #{8rpx};
                background-color: #ff4544;
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
                    height: calc(100% - #{355upx});
                }
                .member-price {
                    height: #{28upx};
                    margin-bottom: #{8upx};
                    margin-top: #{4upx};
                }
                .price {
                    font-size: 28upx;
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
                    margin: #{5upx 0 0upx 0};
                }
                .des-price {
                    display: inline-block;
                    font-size: #{19rpx};
                    color: #ffffff;
                    /*line-height: 1;*/
                    border-radius: #{7rpx};
                    padding: #{0rpx 5rpx};
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
            color: #353535;
        }
    }
</style>