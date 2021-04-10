<template>
    <view class="app-goods-banner" v-if="picList.length > 0">

        <!-- #ifdef MP-WEIXIN -->
        <view class='account-box' v-if='mallConfig.mall.setting.is_official_account == 1'>
            <official-account></official-account>
        </view>
        <!-- #endif -->

        <swiper
            class="swiper"
            v-bind:autoplay="autoplay"
            v-bind:indicator-dots="picList.length>1"
            circular
            @change='bannerChange'
            indicator-color="rgba(255,255,255,.3)"
            indicator-active-color="#30353c"
        >
            <!-- #ifndef MP-BAIDU -->
                <swiper-item v-if="videoUrl && getVideo == 1 && sign !== 'lottery' && sign !== 'bargain' && sign !== 'community' && sign !== 'wholesale'">
                    <view class="swiper-img" @click="routeJumpT" v-bind:style="{backgroundImage: 'url(' + picList[0].pic_url + ')'}">
                        <image class="video-play" src="/static/image/video-play.png"></image>
                    </view>
                </swiper-item>
            <!-- #endif-->

            <swiper-item v-for="(item, index) in picList" v-bind:key="index">
                <view class="swiper-img" v-bind:style="{backgroundImage: 'url(' + item.pic_url + ')'}"
                      @click="clickImage(index)">

                    <!-- #ifndef MP-BAIDU -->
                    <app-video
                        v-if="index === 0 && videoUrl && getVideo == 0"
                        height="750rpx"
                        v-bind:pic-url="item.pic_url"
                        v-bind:url="videoUrl"
                        v-on:video-start="videoStart"
                        v-on:tap.native.stop="preventD"
                    ></app-video>
                    <app-video
                        v-if="index === 0 && videoUrl && getVideo == 1 && (sign === 'lottery' || sign === 'bargain' || sign === 'community' || sign === 'wholesale')"
                        height="750rpx"
                        v-bind:pic-url="item.pic_url"
                        v-bind:url="videoUrl"
                        v-on:video-start="videoStart"
                        v-on:tap.native.stop="preventD"
                    ></app-video>
                    <!-- #endif -->

                    <!-- #ifdef MP-BAIDU-->
                    <app-video
                        v-if="index === 0 && videoUrl"
                        height="750rpx"
                        v-bind:pic-url="item.pic_url"
                        v-bind:url="videoUrl"
                        v-on:video-start="videoStart"
                        v-on:tap.native.stop="preventD"
                    ></app-video>
                    <!-- #endif -->

                </view>
            </swiper-item>
        </swiper>

        <view>
            <app-jump-button url="/pages/cart/cart" v-if="isCart">
                <view class="cart" v-bind:style="{'top': isScanQrCode ? '250rpx' : '60rpx'}">
                    <image load-lazy src="../../../static/image/icon/nav-icon-cart.png"></image>
                </view>
            </app-jump-button>
        </view>
        <view class="share-commission dir-left-nowrap cross-center" v-if="share > 0">
            <image load-lazy src="../../../static/image/icon/share/share_commission.png"></image>
            <view class="text">
                <view>分销最高可赚</view>
                <view>￥{{share}}</view>
            </view>
        </view>
    </view>
</template>

<script>

    import appVideo from "../../page-component/app-video/app-video.vue";
    import { mapState, mapGetters } from 'vuex';

    export default {
        components: {
            'app-video': appVideo
        },
        props: {
            picList: {
                type: Array,
                default() {
                    return []
                }
            },
            share: {
                type: Number
            },
            isCart: {
                type: Boolean,
                default() {
                    return true;
                }
            },
            videoUrl: {
                type: String
            },
            goods_id: {
                type: Number
            },
            sign: {
                type: String
            }
        },
        data() {
            return {
                autoplay: true
            };
        },
        methods: {
            bannerChange() {
                this.$event.trigger(this.$const.EVENT_VIDEO_END);
            },
            videoStart(videoStatus) {
                videoStatus ? this.autoplay = false : this.autoplay = true;
            },
            preventD() {},
            clickImage(index) {
                let urls = [];
                this.picList.forEach(item => {
                    urls.push(item.pic_url);
                });
                uni.previewImage({
                    current: index,
                    urls: urls
                });
            },
            // #ifndef MP-BAIDU
            routeJumpT() {
                uni.navigateTo({
                    url: `/pages/goods/video?goods_id=${this.goods_id}&sign=${this.sign}`
                })
            }
            // #endif
        },
        computed: {
            ...mapState({
                // #ifdef MP-WEIXIN
                mallConfig: state => state.mallConfig,
                // #endif
                isScanQrCode: state => state.page.isScanQrCode
            }),
            // #ifndef MP-BAIDU
            ...mapGetters('mallConfig',{
                getVideo: 'getVideo'
            }),
            // #endif
        },

    }
</script>

<style scoped lang="scss">
    .app-goods-banner {
        position: relative;
        width: 750upx;
    }

    .cart {
        position: fixed;
        right: #{24rpx};
        top: #{60rpx};
        background: rgba(255, 255, 255, 0.5);
        font-size: 0;
        padding: #{20rpx};
        border-radius: #{999rpx};
        box-shadow: 0 #{1rpx} #{3rpx} rgba(0, 0, 0, 0.2);
        z-index: 100;

        image {
            width: #{42rpx};
            height: #{42rpx};
        }
    }

    .share-commission {
        height: #{80rpx};
        width: #{220rpx};
        position: absolute;
        right: 0;
        bottom: #{80rpx};
        border-top-left-radius: #{40rpx};
        border-bottom-left-radius: #{40rpx};
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 100;

        image {
            width: #{44rpx};
            height: #{44rpx};
            margin-right: #{14rpx};
            margin-left: #{20rpx};
        }

        .text {
            color: #ffffff;
            font-size: $uni-font-size-weak-two;
        }
    }

    .swiper {
        height: #{750rpx};

        .swiper-img {
            width: 100%;
            height: #{750rpx};
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            position: relative;
        }
    }
    .video-play {
        width: #{128upx};
        height: #{128upx};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>