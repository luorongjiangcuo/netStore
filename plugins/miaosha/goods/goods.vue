<template>
    <app-layout>
        <view v-if="!detail" class="u-goods-detail"></view>
        <template v-if="detail">
            <!--商品轮播图-->
            <app-banner
                :videoUrl="detail.video_url"
                :share="detail.share"
                :picList="detail.pic_url"
                :goods_id="goods_id"
                sign="miaosha"
            ></app-banner>
            <!-- 秒杀时间 -->
            <app-goods-time
                :day="day"
                :second="second"
                :minute="minute"
                :hour="hour"
                :theme="getTheme"
                :miaosha_status="miaosha_status"
            ></app-goods-time>
            <bd-info
                :theme="themeObject"
                :name="detail.name"
                :is-negotiable="detail.is_negotiable"
                :subtitle="detail.subtitle"
                :level-show="detail.level_show"
                :price="detail.price"
                :original-price="detail.original_price"
                :price-max="detail.price_max"
                :price-min="detail.price_min"
                :price-member-max="detail.price_member_max"
                :price-member-min="detail.price_member_min"
                :discount='discount'
                :is-vip-card-user="is_vip_card_user"
                :sales="detail.sales"
                :unit="detail.unit"
                :is-sales="detail.is_sales"
                :is-vip="is_vip"
                :flash-sale="flash_sale"
                :goods-id="detail.id"
                :extra-quick-share="detail.extra_quick_share"
                :app-share-pic="detail.app_share_pic"
                :app-share-title="detail.app_share_title"
                :poster-config="poster_config"
                :poster-generate="poster_generate"
                :has-poster-nav="true"
                v-bind:goods="detail"
                :share-url="url"
            >
            </bd-info>
            <bd-coupon @change="setCoupon" :theme="themeObject" :coupons="detail.goods_coupon_center"></bd-coupon>
            <bd-xbc
                :coAttr="is_open"
                :attr-list="selectAttr.attr_list"
                :type="detail.type"
                :guarantee-title="detail.guarantee_title"
                :guarantee-pic="detail.guarantee_pic"
                :param_content="detail.param_content"
                :param_name="detail.param_name"
                :services="detail.services"
                :attr-groups="detail.attr_groups"
                @openAttr="takeCart"
            ></bd-xbc>
            <bd-hc
                :integral="detail.goods_marketing_award.integral"
                :coupon="detail.goods_marketing_award.coupon"
                :card="detail.goods_marketing_award.card"
                :balance="detail.goods_marketing_award.balance"
                :theme="themeObject"
            ></bd-hc>
            <bd-kb
                :limit="detail.goods_marketing.limit"
                :express="detail.express"
                :shipping="detail.goods_marketing.shipping"
                :pickup="detail.goods_marketing.pickup"
            ></bd-kb>
            <bd-comments :goods-id="detail.id"></bd-comments>
            <bd-detail :detail="detail.detail"></bd-detail>
            <!-- 相关推荐 -->
            <app-related-suggestion-product :theme="getTheme" :list="list"></app-related-suggestion-product>
            <!-- 底部空格 -->
            <view class="safe-area-inset-bottom">
                <view class="u-bottom-height" :class="full_reduce ? 'u-bottom-height-1' : 'u-bottom-height-0'"></view>
            </view>
            <!-- 底部按钮 -->
            <view v-if="is_open == 1" class="safe-area-inset-bottom u-bottom-fixed">
                <view v-if="full_reduce">
                    <app-goods-full-reduce
                        :theme="getTheme"
                        :full_reduce="full_reduce"
                    >
                    </app-goods-full-reduce>
                </view>
                <view class="buttons dir-left-nowrap">
                    <view class="app-home dir-top-nowrap main-center cross-center" @click="router('/pages/index/index')">
                        <image src="../../../static/image/icon/index.png"></image>
                        <text>首页</text>
                    </view>
                    <view v-if="detail.goods_stock > 0" class="app-button dir-left-nowrap">
                        <template v-if="miaosha_status === 1">
                            <view class="app-join-cart box-grow-1"
                                  @click="takeCart"
                                  :class="getTheme === 'a' || getTheme === 'b' || getTheme === 'f' ? getTheme + '-s-back '+ 'text ' + getTheme : getTheme + '-s-back '+ getTheme + '-m-text ' + getTheme" >
                                加入购物车
                            </view>
                            <view @click="takeCart" :class="[getTheme + '-m-back', getTheme, 'box-grow-1', 'app-buy']" >
                                立即购买
                            </view>
                        </template>
                        <view class="notStart box-grow-1" v-else-if="miaosha_status === 2">
                            活动未开始
                        </view>
                        <view class="app-over box-grow-1" v-else-if="miaosha_status === 0">
                            活动已结束
                        </view>
                    </view>
                    <view class="app-button dir-left-nowrap" v-else>
                        <view class="app-over box-grow-1" style="background-color: #CDCDCD;">
                            已售罄
                        </view>
                    </view>
                </view>
            </view>
            <!--商品规格-->
            <u-attr
                v-if="miaosha_status === 1"
                v-model="show"
                :themeObject="themeObject"
                :goods="detail"
                :checked="selectAttr"
                @check="attrtap"
                :leftFunc="true"
                @leftFunc="leftFunc"
                :rightFunc="true"
                @rightFunc="rightFunc"
            >
            </u-attr>
        </template>
        <app-close v-if="showClose" :modal="false" @update="getMall"></app-close>
    </app-layout>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import appBanner from '../../../components/page-component/goods/app-goods-banner.vue';
import appGoodsTime from '../components/app-goods-time.vue';
import appRelatedSuggestionProduct from '../../../components/page-component/app-related-suggestion-product/app-related-suggestion-product.vue';
import appGoodsFullReduce from "../../../components/page-component/goods/app-goods-full-reduce";
import uAttr from '../../../components/page-component/goods/u-attr.vue';
import bdInfo from '@/components/page-component/goods/bd-info';
import bdCoupon from '@/components/page-component/goods/bd-coupon.vue';
import bdXbc from '@/components/page-component/goods/bd-xbc.vue';
import bdKb from '@/components/page-component/goods/bd-kb.vue';
import bdHc from '@/components/page-component/goods/bd-hc.vue';
import bdDetail from '@/components/page-component/goods/bd-detail.vue';
import bdComments from '@/components/page-component/goods/bd-comments.vue';
import appClose from '@/components/basic-component/app-close/app-close.vue';

export default {
    name: 'goods',
    data() {
        return {
            showClose: false,
            is_open: 0,
            detail: null,
            full_reduce: null,
            cartShow: false,
            miaosha_status: -1,
            miaosha_time: 0,
            selectAttr: null,
            url: '',
            show: false,
            list: [],
            miaosha_buy_count: 0,
            goods_id: -1,
            is_activity: 0,
            hour: 0,
            minute: 0,
            second: 0,
            day: 0,
            time: -1,
            is_vip_card_user: 0,
            discount: null,
            is_vip: false,
            loading: false,
            flash_sale: null,
            poster_config: this.$api.miaosha.poster_config,
            poster_generate: this.$api.miaosha.poster_generate,
        }
    },
    onLoad(options) {
        this.goods_id = options.id;
        if (options.is_activity) {
            this.is_activity = options.is_activity
        }
        // #ifdef MP-WEIXIN
        wx.showShareMenu({
            menus: ['shareAppMessage', 'shareTimeline']
        })
        // #endif
    },
    onShow() {
        this.showClose = false;
        setTimeout(()=>{
            this.showClose = true;
        })
        this.$showLoading();
        this.$nextTick(() => {
            let that = this;
            this.$request({
                url: this.$api.miaosha.goods_detail,
                data: {
                    id: this.goods_id,
                    is_activity: this.is_activity
                }
            }).then(response => {
                this.$hideLoading();
                if (response.code === 0) {
                   let { detail, miaosha_status, miaosha_time, miaosha_buy_count } = response.data;
                   this.detail = detail;
                   if (detail.goods_activity) {
                       this.full_reduce = detail.goods_activity.full_reduce;
                   }
                    this.flash_sale = detail.plugin_extra.flash_sale;
                   this.miaosha_status = miaosha_status;
                   this.miaosha_buy_count = miaosha_buy_count;
                   this.loading = true;
                   this.url = `${this.$api.miaosha.poster}&goods_id=${this.detail.id}`;
                   this.poster_config = `${this.poster_config}&goods_id=${this.detail.id}`;
                   this.poster_generate = `${this.poster_generate}&goods_id=${this.detail.id}`;
                   this.getTime(miaosha_time);
               } else {
                    uni.showToast({
                        title: response.msg,
                        icon: 'none'
                    })
                }
                this.$request({
                    url: this.$api.goods.new_recommend,
                    data: {
                        goods_id: this.detail.id,
                    }
                }).then(response => {
                    if (response.code === 0) {
                        this.list = response.data.list;
                        if (that.detail.vip_card_appoint.discount) {
                            that.is_vip = true;
                            that.discount = that.detail.vip_card_appoint.discount
                        }
                        that.is_vip_card_user = that.detail.vip_card_appoint.is_vip_card_user
                    }
                })
            });
        })
    },
    onHide() {
        clearInterval(this.time);
    },
    onUnload() {
        clearInterval(this.time);
    },
    computed: {
        ...mapGetters('mallConfig', {
            getTheme: 'getTheme',
        }),
        ...mapState({
            mall: state => state.mallConfig.mall
        }),
        themeObject:function() {
            return {
                back: this.getTheme + '-m-back ' + this.getTheme,
                theme: this.getTheme,
                color: this.getTheme + '-m-text ' + this.getTheme,
                sBack: this.getTheme + '-s-back ' + this.getTheme
            }
        },
    },
    onShareAppMessage() {
        return this.$shareAppMessage({
            path: '/plugins/miaosha/goods/goods',
            title: this.detail.app_share_title ? this.detail.app_share_title : this.detail.name,
            imageUrl: this.detail.app_share_pic ? this.detail.app_share_pic : '',
            params: {
                id: this.detail.id
            }
        });
    },
    // #ifdef MP-WEIXIN
    onShareTimeline() {
        return this.$shareTimeline({
            title: this.detail.app_share_title ? this.detail.app_share_title : this.detail.name,
            query: {
                id: this.detail.id
            }
        });
    },
    // #endif
    methods: {
        getMall(e) {
            this.is_open = e.is_open;
        },
        async request({ url, data }) {
            const response = await this.$request({
                url: url,
                data: data,
            });
            if (response.code === 0) {
                return response.data;
            }
        },
        attrtap(data) {
            this.selectAttr = data;
        },
        takeCart() {
            this.show  = true;
        },
        leftFunc(number) {
            this.$request({
                url: this.$api.miaosha.add_cart,
                method: 'post',
                data: {
                    miaosha_goods_id: this.selectAttr.goods_id,
                    attr_id: this.selectAttr.id,
                    num: number
                }
            }).then(response => {
                uni.showToast({
                    title: response.msg,
                    icon: 'none'
                })
            });
        },
        rightFunc(data) {
            uni.navigateTo({
                url: `/pages/order-submit/order-submit?mch_list=${JSON.stringify([data])}&preview_url=${encodeURIComponent(this.$api.miaosha.order_preview)}&submit_url=${encodeURIComponent(this.$api.miaosha.order_submit)}`
            });
        },
        getTime(newValue) {
            newValue = newValue - 1;
            this.day = parseInt(newValue / 3600 / 24);
            this.hour = parseInt(newValue / 3600 % 24);
            this.minute = parseInt(newValue / 60 % 60);
            this.second = parseInt(newValue % 60);
            clearInterval(this.time);
            this.time = setInterval(() => {
                newValue = newValue - 1;
                if (newValue < 0) {
                    clearInterval(this.time);
                }
                this.day = parseInt(newValue / 3600 / 24);
                this.hour = parseInt(newValue / 3600 % 24);
                this.minute = parseInt(newValue / 60 % 60);
                this.second = parseInt(newValue % 60);
            }, 1000);
        },
        setCoupon(index) {
            this.$set(this.detail.goods_coupon_center[index], 'is_receive', 1);
        },

        router(url) {
            uni.navigateTo({
                url: url
            })
        }
    },
    components: {
        'app-banner': appBanner,
        'app-goods-time': appGoodsTime,
        'app-related-suggestion-product': appRelatedSuggestionProduct,
        uAttr,
        appGoodsFullReduce,
        bdInfo,
        bdCoupon,
        bdXbc,
        bdKb,
        bdHc,
        bdDetail,
        bdComments,
        appClose
    }
}
</script>
<style scoped lang="scss">

.app-goods {
    background-color: #f7f7f7;
}

.buttons {
    width: #{750rpx};
    height: #{110rpx};

    .app-home {
        width: 14%;
        height: #{110rpx};
        background-color: white;



            image {
                width: #{40rpx};
                height: #{40rpx};
            }

            text {
                font-size: #{18rpx};
                color: #707070;

            }
    }

    .app-button {
        width: 86%;
        height: #{110rpx};
        text-align: center;
        line-height: #{110rpx};

        .app-join-cart {
            height: #{110rpx};
        }

        .app-buy {
            height: #{110rpx};
            color: white;
        }

        .notStart {
            height: #{110rpx};
            background-color: #cccccc;
            color: #FFFFFF;
        }

        .app-over {
            height: #{110rpx};
            background: #666;
            color: #FFFFFF;
        }
    }
}

.text {
    color: #ffffff;
}
.u-bottom-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1602;
    background-color: #ffffff;
}
.u-bottom-height-0 {
    height: 110upx;
}
.u-bottom-height-1 {
    height: 190upx;
}

.goods-margin {
    margin-top: 20upx;
}
</style>
