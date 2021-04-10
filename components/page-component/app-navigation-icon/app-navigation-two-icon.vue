<template>
    <view class="app-navigation-two-icon" :style="{backgroundColor: background}">
        <view v-if="navType === 'fixed'" class="dir-top-nowrap nav-fixed u-border-box"
              :class="{'nav-fixed-text' : modeType === 'text'}">
            <view v-for="(navs, index1) in newNavs" :key="index1" class="dir-left-nowrap">
                <view v-for="(nav, index2) in navs" :key="index2"
                      :style="{marginRight: index2 === navs.length - 1 ? 'auto' : '0',marginLeft: 'auto'}">
                    <app-jump-button form :url="nav.link_url" :open_type="nav.open_type" arrangement="column"
                                     class="cross-top">
                        <view class="nav-list dir-top-nowrap main-center cross-center u-border-box"
                              :class="{'nav-list-text' : modeType === 'text'}">
                            <image v-if="modeType === 'img'" class="nav-image" :src="nav.icon_url" lazy-load></image>
                            <div v-if="nav.name" class="nav-name u-border-box" :style="{color: color}"
                                 :class="{'nav-name-text': modeType === 'text'}">
                                {{nav.name.substring(0,columns > 5 ? 4: 5)}}
                            </div>
                        </view>
                    </app-jump-button>
                </view>
            </view>
        </view>
        <block v-if="navType === 'alone'">
            <scroll-view scroll-x class="dir-left-nowrap" :style="{'max-height': modeType === 'img'? '192rpx': '100rpx'}">
                <view v-for="(nav, index) in navs" :key="index" :style="[formatB(index)]" class="box-list">
                    <app-jump-button style="height: 100%" form :url="nav.link_url" :open_type="nav.open_type"
                                     arrangement="column"
                                     class="cross-top">
                        <image v-if="modeType === 'img'" :src="nav.icon_url" :style="{height:'88rpx',width: '88rpx','margin-bottom': 'auto'}"
                               lazy-load></image>
                        <div v-if="nav.name" class="t-omit nav-name" :style="{color: color}"
                             :class="{'nav-name-alone': modeType === 'text'}">
                            {{nav.name.substring(0,aloneNum > 5 ? 4: 5)}}
                        </div>
                    </app-jump-button>
                </view>
            </scroll-view>
        </block>
        <block v-if="navType === 'multi'">
            <swiper @change="changeSwiper" :style="{height: multiswiper}">
                <swiper-item v-for="(navlist, index0) in muitiNavs" :key="index0" :item-id="index0">
                    <view class="dir-top-nowrap nav-fixed" :class="'nav-swiper-' + tempIndex">
                        <view v-for="(navs, index1) in navlist" :key="index1" class="dir-left-nowrap">
                            <view v-for="(nav, index2) in navs" :key="index2"
                                  :style="{marginRight: index2 === navs.length - 1 ? 'auto' : '0',marginLeft: 'auto'}">
                                <app-jump-button form :url="nav.link_url" :open_type="nav.open_type"
                                                 arrangement="column"
                                                 class="cross-top">
                                    <view class="nav-list dir-top-nowrap main-center cross-center"
                                          :class="{'nav-list-text' : modeType === 'text'}">
                                        <image v-if="modeType === 'img'" class="nav-image" :src="nav.icon_url"
                                               lazy-load></image>
                                        <div v-if="nav.name" class="nav-name" :style="{color: color}"
                                             :class="{'nav-name-text': modeType === 'text'}">
                                            {{nav.name.substring(0,columns > 5 ? 4: 5)}}
                                        </div>
                                    </view>
                                </app-jump-button>
                            </view>
                        </view>
                    </view>
                </swiper-item>
            </swiper>
            <!-- 指示点 -->
            <view class="main-center cross-center indicator u-border-box">
                <block v-if="swiperType === 'rectangle'">
                    <view class="dir-left-nowrap">
                        <view v-for="(i,index) in muitiNavs" :key="index" class="rectangletwo"
                              :style="{backgroundColor: current === index ? swiperColor : swiperNoColor}">
                        </view>
                    </view>
                    <!--<view :style="{width: `${muitiNavs.length * 44}rpx`}" class="rectangle">-->
                    <!--    <view class="rectangle active"-->
                    <!--      :style="{left: `${current * 44}rpx`,backgroundColor: swiperColor}"></view>-->
                    <!--</view>-->
                </block>
                <block v-if="swiperType === 'circle'">
                    <view class="dir-left-nowrap">
                        <view v-for="(i,index) in muitiNavs" :key="index" class="circle"
                              :style="{backgroundColor: current === index ? swiperColor : swiperNoColor}">
                        </view>
                    </view>
                </block>
            </view>
        </block>
    </view>
</template>

<script>
    export default {
        name: 'app-navigation-two-icon',
        props: {
            background: {
                type: String,
                default() {
                    return '#ffffff';
                }
            },
            modeType: {
                type: String,
                default() {
                    return 'img';
                }
            },
            color: {
                type: String,
                default() {
                    return '#333333';
                }
            },
            //每行个数
            columns: {
                type: Number,
                default() {
                    return 3;
                }
            },
            navs: {
                type: Array,
                default() {
                    return []
                }
            },
            navType: String,
            aloneNum: Number, //一屏显示
            lineNum: Number, //一屏行数
            swiperType: String,
            swiperColor: String,
            swiperNoColor: String,
            tempIndex: Number,
        },
        data() {
            return {
                current: 0,
                multiswiper: '80px',
                defaultInfo: {
                    imageHeight: 88,
                    left: 32,
                    limit: 30,
                }
            }
        },
        methods: {
            calcHeight: function () {
                setTimeout(() => {
                    // #ifdef MP-ALIPAY || MP-BAIDU
                    let query = uni.createSelectorQuery();
                    // #endif
                    // #ifndef MP-ALIPAY || MP-BAIDU
                    let query = uni.createSelectorQuery().in(this);
                    // #endif
                    query.select(`.nav-swiper-${this.tempIndex}`).boundingClientRect(item => {
                        if (item) {
                            this.multiswiper = item.height + 'px';
                        }
                    }).exec();
                });
            },
            changeSwiper: function (e) {
                this.current = e.detail.current;
            },
            group: function (array, subGroupLength) {
                subGroupLength = parseInt(subGroupLength);
                let index = 0;
                let newArray = [];
                while (index < array.length) {
                    newArray.push(array.slice(index, index += subGroupLength));
                }
                return newArray;
            },
            addNull: function () {
                let columns = this.columns;
                let length = this.navs.length;
                let addNum = length % columns === 0 ? 0 : columns - length % columns;

                return this.navs.concat(new Array(addNum).fill({
                    'url': '',
                    'openType': '',
                    'icon_url': '',
                    'name': '',
                }))
            }
        },
        created() {
            this.calcHeight();
        },
        beforeUpdate() {
            this.calcHeight();
        },
        computed: {
            newNavs() {
                let arr = this.addNull();
                return this.group(arr, this.columns)
            },
            muitiNavs() {
                let arr = this.addNull();
                arr = this.group(arr, this.columns);
                arr = this.group(arr, this.lineNum)
                return arr;
            },

            aloneWidth() {
                return `100rpx`;
                /*
                let aloneNum = Number(this.aloneNum);
                let width = 0;
                if (aloneNum < 5) {
                    width = this.defaultInfo.imageHeight;
                } else {
                    width = (750 - this.defaultInfo.left - (aloneNum - 1) * this.defaultInfo.limit) / (aloneNum * 2 - 1) * 2;
                }
                return `${uni.upx2px(width)}px`;
                */
            },
            formatB() {
                return (index) => {
                    let aloneNum = Number(this.aloneNum);
                    let extra = {width: this.aloneWidth};
                    if (aloneNum < 5) {
                        extra = Object.assign(extra, {
                            marginLeft : `${uni.upx2px(750 - parseFloat(this.aloneWidth) * aloneNum) / (aloneNum + 1)}px`,
                        })
                    } else {
                        extra = Object.assign(extra, {
                            marginLeft: `${uni.upx2px((750 - parseFloat(this.aloneWidth) * aloneNum + parseFloat(this.aloneWidth) / 2) / aloneNum)}px`,
                        })
                    }
                    if (index === this.navs.length - 1) extra = Object.assign(extra, {'margin-right': extra.marginLeft})
                    return extra;
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    .app-navigation-two-icon {
        ::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
            color: transparent;
        }
        .nav-fixed {
            padding: 0 0 #{24rpx};
        }

        .nav-fixed.nav-fixed-text {
            padding-bottom: #{32rpx - 36rpx + 32rpx};
        }

        .nav-list {
            padding-top: #{28rpx};
            width: #{100rpx};
        }

        .nav-list.nav-list-text {
            padding-top: 0;
        }

        .nav-image {
            height: #{88rpx};
            width: #{88rpx};
            display: block;
            margin-bottom: auto;
        }

        .nav-name {
            font-size: #{24rpx};
            color: #353535;
            padding-top: #{16rpx};
            padding-bottom: calc(#{32rpx} - #{28rpx});
            display: block;
            white-space: nowrap;
            line-height: 1;
            /*width: 100%;*/
            /*overflow: hidden;*/
            /*text-overflow: clip;*/
            text-align: center;
        }

        .nav-name.nav-name-text {
            padding-top: #{32rpx};
            padding-bottom: calc(#{36rpx} - #{32rpx});
        }

        .nav-name-alone {
            padding: calc(#{32rpx - 28rpx}) 0;
        }

        scroll-view {
            white-space: nowrap;
            padding: #{28rpx} 0;

            .box-list {
                display: inline-block;
            }

            image {
                width: 100%;
                display: block;
            }

            text {
                width: 100%;
                text-align: center;
                padding-top: #{12rpx};
                display: block;
                line-height: 1;
                padding-bottom: #{18rpx};
                font-size: #{12px};
                text-overflow: clip;
            }
        }


        .indicator {
            height: #{10rpx};
            margin-top: calc(#{16rpx - 24rpx});
            padding-bottom: #{12rpx};
            width: 100%;

            .rectangle {
                border-radius: #{6rpx};
                height: #{8rpx};
                background-color: #BCBCBC;
                position: relative;
            }

            .rectangle .active {
                position: absolute;
                top: 0;
                width: #{44rpx};
            }

            .rectangletwo {
                height: #{8rpx};
                margin: 0 #{2rpx};
                width: #{24rpx};
                border-radius: #{16rpx};
            }

            .circle {
                height: #{8rpx};
                margin: 0 #{5rpx};
                width: #{8rpx};
                border-radius: 50%;
            }
        }
    }
</style>