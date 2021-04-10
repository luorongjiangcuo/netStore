<template>
	<app-layout>
        <view v-if="!loading" class="u-goods-detail"></view>
		<template v-else>
            <!--商品轮播图-->
            <app-goods-banner
                :picList="picUrl"
                :isCart="false"
                :share="item.share"
                :goods_id="goodsId"
                :video-url="item.video_url"
                sign="booking"
            ></app-goods-banner>
            <bd-info
                :theme="themeObject"
                :name="item.name"
                :is-negotiable="item.is_negotiable"
                :subtitle="item.subtitle"
                :level-show="item.level_show"
                :price="item.price"
                :original-price="item.original_price"
                :price-max="item.price_max"
                :price-min="item.price_min"
                :price-member-max="item.price_member_max"
                :price-member-min="item.price_member_min"
                :discount='discount'
                :is-vip-card-user="is_vip_card_user"
                :sales="item.sales"
                :unit="item.unit"
                :is-sales="item.is_sales"
                :is-vip="is_vip"
                :goods-id="item.id"
                :extra-quick-share="item.extra_quick_share"
                :app-share-pic="item.app_share_pic"
                :app-share-title="item.app_share_title"
                :poster-config="poster_config"
                :poster-generate="poster_generate"
                :has-poster-nav="true"
                v-bind:goods="item"
            ></bd-info>
            <bd-coupon @change="setCoupon" :theme="themeObject" :coupons="item.goods_coupon_center"></bd-coupon>
            <bd-xbc
                :coAttr="is_open"
                :attr-list="checked.attr_list"
                :type="item.type"
                :guarantee-title="item.guarantee_title"
                :guarantee-pic="item.guarantee_pic"
                :param_content="item.param_content"
                :param_name="item.param_name"
                :services="item.services"
                :attr-groups="item.attr_groups"
                :goods-stock="item.goods_num"
                @openAttr="open"
            ></bd-xbc>
            <bd-hc
                :integral="item.goods_marketing_award.integral"
                :coupon="item.goods_marketing_award.coupon"
                :card="item.goods_marketing_award.card"
                :balance="item.goods_marketing_award.balance"
                :theme="themeObject"
            ></bd-hc>
            <bd-kb
                :limit="item.goods_marketing.limit"
                :express="item.express"
                :shipping="item.goods_marketing.shipping"
                :pickup="item.goods_marketing.pickup"
            ></bd-kb>
			<view class="bd-store" v-if="store">
				<app-store
					:store_id="store[0].id"
					:address="store[0].address"
					:name="store[0].name"
					:business_hours="store[0].business_hours"
					:storeNum="storeNum"
					:goods_id="goodsId"
				></app-store>
			</view>
            <bd-comments :goods-id="item.id"></bd-comments>
            <bd-detail :detail="item.detail"></bd-detail>
            <!--相关推荐-->
            <app-related-suggestion-product :theme="themeObject.theme" sign="booking" :list="list" ></app-related-suggestion-product>
            <!-- 底部空格 -->
            <view class="safe-area-inset-bottom">
                <view class="u-bottom-height" :class="full_reduce ? 'u-bottom-height-1' : 'u-bottom-height-0'"></view>
            </view>
            <!-- 底部按钮 -->
            <view v-if="is_open == 1" class="safe-area-inset-bottom u-bottom-fixed">
                <view v-if="full_reduce">
                    <app-goods-full-reduce
                        :theme="themeObject.theme"
                        sign="book"
                        :full_reduce="full_reduce"
                    >
                    </app-goods-full-reduce>
                </view>
                <view class="u-bottom dir-left-nowrap" >
                    <view class="u-back dir-top-nowrap main-center cross-center" @click="router('/pages/index/index')">
                        <image class="u-icon" src="../../../static/image/icon/index.png"></image>
                        <text class="u-text">首页</text>
                    </view>
                    <view v-if="item.goods_num > 0" :class="[themeObject.back, 'u-btn']"  @click="open">
                        立即预约
                    </view>
                    <view v-else class="u-btn u-oversell-btn" >已售罄</view>
                </view>
            </view>
            <u-attr
                :goods="item"
                v-model="show"
                :theme-object="themeObject"
                :checked="checked"
                @check="check"
                :is_show_left="false"
                right-text="立即预约"
                :right-func="true"
                @rightFunc="rightFunc"
            >
            </u-attr>
            <!-- 快捷导航 -->
            <app-quick-navigation></app-quick-navigation>
		</template>
        <app-close v-if="showClose" :modal="false" @update="getMall"></app-close>
	</app-layout>
</template>

<script>
    import { mapState } from 'vuex';
    import appGoodsBanner from '../../../components/page-component/goods/app-goods-banner.vue';
    import appStore from '../components/app-store.vue';
    import appRelatedSuggestionProduct from '../../../components/page-component/app-related-suggestion-product/app-related-suggestion-product.vue';
    import appQuickNavigation from "../../../components/page-component/app-quick-navigation/app-quick-navigation.vue";
    import appGoodsService from '../../../components/page-component/goods/app-goods-service.vue';
    import AppVipCard from '../../../components/page-component/app-vip-card/app-vip-card';
	import appGoodsFullReduce from '../../../components/page-component/goods/app-goods-full-reduce.vue';
	import appGoodsCoupon from "../../../components/page-component/goods/app-goods-coupon";
	import appGoodsMarketing from "../../../components/page-component/goods/app-goods-marketing";
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
        name: 'details',
        components: {
            'app-goods-banner': appGoodsBanner,
            'app-store': appStore,
            'app-related-suggestion-product': appRelatedSuggestionProduct,
            'app-quick-navigation': appQuickNavigation,
            'app-goods-service': appGoodsService,
            'app-vip-card': AppVipCard,
            appGoodsCoupon,
            'app-goods-marketing': appGoodsMarketing,
            uAttr,
            appClose,
			appGoodsFullReduce,
            bdInfo,
            bdCoupon,
            bdXbc,
            bdKb,
            bdHc,
            bdDetail,
            bdComments
        },
        data() {
            return {
                showClose: false,
                is_open: 0,
                item: {
					goods_activity: {
						full_reduce: {}
					}
				},
                full_reduce: null,
                selectAttr: {},
                activeIndex: 0,
                list: [],
                url: '',
                cartShow: false,
                is_vip: false,
                is_vip_card_user: 0,
                discount: null,
                goods_id: 0,
                poster_config: this.$api.book.poster_config,
                poster_generate: this.$api.book.poster_generate,
                // 规格选中
                checked: null,
                // 规格显示
                show: false,
                // 详情loading
                loading: false,
                // 门店列表
                store: null,
                storeNum: null,
                // 商品服务
                services: null,
                // 商品标题
                name: null,
                // 商品ID
                goodsId: null,
                // 商品轮播图
                picUrl: null
            }
        },
        onShow() {
            this.showClose = false;
            setTimeout(()=>{
                this.showClose = true;
            })
        },
        onShareAppMessage() {
            let { app_share_title, app_share_pic, goods_id, name} = this.item;
            return this.$shareAppMessage({
                path: '/plugins/book/goods/goods',
                title: app_share_title ? app_share_title : name,
                imageUrl: app_share_pic ? app_share_pic : '',
                params: {
                    goods_id: goods_id
                }
            });
        },
        // #ifdef MP-WEIXIN
        onShareTimeline() {
            let { app_share_title, goods_id, name} = this.item;
            return this.$shareTimeline({
                title: app_share_title ? app_share_title : name,
                query: {
                    goods_id: goods_id
                }
            });
        },
        // #endif
        onLoad(options) {
            this.goods_id = options.goods_id;
            this.request(options.goods_id);
            this.newRecommend(options.goods_id);
            // #ifdef MP-WEIXIN
            wx.showShareMenu({
                menus: ['shareAppMessage', 'shareTimeline']
            })
            // #endif
        },
        methods: {
            getMall(e) {
                this.is_open = e.is_open;
            },
            check(data) {
                this.checked = data;
            },
            rightFunc(data) {
                uni.navigateTo({
                    url: `/pages/order-submit/order-submit?mch_list=${JSON.stringify([data])}&preview_url=${encodeURIComponent(this.$api.book.order_preview)}&submit_url=${encodeURIComponent(this.$api.book.order_submit)}&plugin=booking`
                });
            },
            newRecommend(id) {
                this.$request({
                    url: this.$api.goods.new_recommend,
                    data: {
                        goods_id: id
                    }
                }).then(response => {
                    if (response.code === 0) {
                        this.list = response.data.list;
                    }
                })
            },
            open() {
                this.show = true;
            },
            setCoupon(index) {
                this.$set(this.item.goods_coupon_center[index], 'is_receive', 1);
            },
            router: function(url) {
                uni.navigateTo({
                    url: url
                });
            },
            async request(goods_id) {
                const [e, s] = await uni.getLocation({
                    type: 'wgs84'
                });
                if (e) {
                    uni.showToast({
                        title: '请开启位置权限',
                        icon: 'none',
                        duration: 2000,
                        success: function() {
                            setTimeout(() => {
                                uni.navigateBack();
                            }, 2000);
                        }
                    });
                }
                if (s) {
                    this.$showLoading();
                    const r = await this.$request({
                        url: this.$api.book.detail,
                        data: {
                            goods_id: goods_id,
                            latitude: s.latitude,
                            longitude: s.longitude,
                        }
                    });
                    if (r.code === 0) {
                        let list = r.data.list;
                        let { store, services, name, id, pic_url } = r.data.list;
                        this.item = list;
                        if (list.goods_activity) {
                            this.full_reduce = list.goods_activity.full_reduce;
                        }
                        this.store = store.slice(0, 1);
                        this.storeNum = store.length;
                        this.services = services;
                        this.name = name;
                        this.goodsId = id;
                        this.picUrl = pic_url;

                        this.url = `${this.$api.book.poster}&goods_id=${id}`;
                        this.poster_config = `${this.poster_config}&goods_id=${id}`;
                        this.poster_generate = `${this.poster_generate}&goods_id=${id}`;
                        this.loading = true;
                        if (list.vip_card_appoint.discount > 0) {
                            this.is_vip = true;
                            this.discount = list.vip_card_appoint.discount;
                        }
                        this.is_vip_card_user = list.vip_card_appoint.is_vip_card_user;
                    }
                    this.$hideLoading();
                }
            }
        },
        computed: {
            ...mapState({
                themeObject: function (state) {
                    let theme = state.mallConfig.mall.setting.theme_color;
                    return {
                        back: theme + '-m-back ' + theme,
                        backO: theme + '-m-back-o ' + theme,
                        theme: theme,
                        color: theme + '-m-text ' + theme,
                        sBack: theme + '-s-back ' + theme
                    }
                }
            })
        }
    }
</script>

<style scoped lang="scss">

    .goods-subtitle {
        padding: #{24rpx};
        padding-top: 0;
        font-size: 24rpx;
        background-color: #ffffff;
        color: #999999;
    }
    .goods-margin {
        margin-top: 20upx;
    }
    .vip-card {
        padding: 20upx 20upx;
        background-color: #fff;
    }
    .u-bottom-height-0 {
        height: 110upx;
    }
    .u-bottom-height-1 {
        height: 190upx;
    }
    .u-bottom-fixed {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 1602;
        background-color: #ffffff;
    }
    .u-bottom {
        width: 750upx;
        height: 110upx;
        background-color: #ffffff;
        border-top: 1upx solid #e9e9e9;
    }
    .u-btn {
        width: calc(100% - 110upx);
        height: #{110rpx};
        line-height: #{110rpx};
        color: #ffffff;
        font-size: #{32rpx};
        text-align: center;
    }
    .u-oversell-btn {
        background-color: #CDCDCD;
        color: #fff;
    }
    .u-back {
        width: #{110rpx};
        height: 100%;
    }
    .u-icon {
        width: #{40rpx};
        height: #{40rpx};
    }
    .u-text {
        font-size: #{18rpx};
        color: #888888;
    }
    .bd-store {
        width: 702upx;
        border-radius: 15upx;
        margin: 24upx 24upx 0 24upx;
        overflow: hidden;
    }
</style>
