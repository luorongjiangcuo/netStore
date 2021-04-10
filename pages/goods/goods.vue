<template>
    <app-layout>
        <view v-if="!goods" class="u-goods-detail"></view>
        <template v-if="goods">
            <!--商品轮播图-->
            <app-goods-banner
                v-bind:pic-list="goods.pic_url"
                v-bind:share="goods.share"
                v-bind:video-url="goods.video_url"
                v-bind:goods_id="goodsId"
            ></app-goods-banner>
            <bd-info
                :theme="themeObject"
                :name="name"
                :is-negotiable="is_negotiable"
                :subtitle="subtitle"
                :flash-sale="flash_sale"
                :level-show="level_show"
                :price="price"
                :original-price="original_price"
                :price-max="price_max"
                :price-min="price_min"
                :price-member-max="price_member_max"
                :price-member-min="price_member_min"
                :discount='discount'
                :is-vip-card-user="is_vip_card_user"
                :sales="sales"
                :is-vip="is_vip"
                :unit="unit"
                :is-sales="is_sales"
                :goods-id="goodsId"
                :extra-quick-share="extra_quick_share"
                :app-share-pic="app_share_pic"
                :app-share-title="app_share_title"
                :poster-config="poster_config + `&goods_id=` + goodsId"
                :poster-generate="poster_generate + `&goods_id=` + goodsId"
                :has-poster-nav="true"
                v-bind:goods="goods"
            ></bd-info>
            <!--商品优惠券-->
            <bd-coupon @change="setCoupon" :theme="themeObject" :coupons="goods_coupon_center"></bd-coupon>
            <!--商品规格-->
            <bd-xbc
                :coAttr="is_open && exchangeStatus ==null"
                :attr-list="checked.attr_list"
                :type="goodsType"
                :guarantee-title="guarantee_title"
                :guarantee-pic="guarantee_pic"
                :param_content="param_content"
                :param_name="param_name"
                :services="services"
                :attr-groups="attr_groups"
                :goods-stock="goods_num"
                @openAttr="clickAttr"
            ></bd-xbc>
            <!--商品信息-->
            <bd-hc
                :integral="goods_marketing_award.integral"
                :coupon="goods_marketing_award.coupon"
                :card="goods_marketing_award.card"
                :balance="goods_marketing_award.balance"
                :theme="themeObject"
            ></bd-hc>
            <bd-kb
                :limit="goods_marketing.limit"
                :express="express"
                :shipping="goods_marketing.shipping"
                :pickup="goods_marketing.pickup"
            ></bd-kb>
            <!--套餐组合-->
            <view @click="toComposition" class="goods-composition" v-if="composition && composition.list.length > 0">
                <view class="goods-composition-title">套餐组合</view>
                <uni-swiper-dot :current="current" :theme="getTheme" :info="composition.list" mode="customize">
                    <swiper @change="change" class="goods-composition-swiper" :current="current" :autoplay="true">
                        <swiper-item v-for="item in composition.list" :key="item.id">
                            <app-composition :theme="getTheme"  @click="toComposition(item)" @look="toComposition(item)" :item="item"></app-composition>
                        </swiper-item>
                    </swiper>
                </uni-swiper-dot>
                <view class="goods-composition-more main-between cross-center">
                    <view>更多套餐组合</view>
                    <image src="/static/image/icon/arrow-right.png"></image>
                </view>
            </view>
            <bd-comments :goods-id="goodsId"></bd-comments>
            <!--商品详情-->
            <bd-detail :detail="detail"></bd-detail>
            <!--相关推荐-->
            <app-goods-recommend :sureCart="true" :theme="getTheme" :goods-list="recommend_list"></app-goods-recommend>
            <!--空格区域-->
            <view class="safe-area-inset-bottom u-bottom">
                <view class="u-bottom-height" :class="full_reduce ? 'u-bottom-height-1' : 'u-bottom-height-0'"></view>
            </view>
            <!--底部按钮-->
            <view v-if="is_open == 1" class="safe-area-inset-bottom u-bottom-fixed">
                <view v-if="full_reduce && exchangeStatus == null">
                    <app-goods-full-reduce
                        :theme="getTheme"
                        :full_reduce="full_reduce"
                        :sign="goodsType === 'goods' ? '' : 1"
                    >
                    </app-goods-full-reduce>
                </view>
                <view v-if="exchangeStatus == null" class="app-bottom u-bottom-height-0 dir-left-nowrap" >
                    <view class="dir-top-nowrap main-center cross-center little box-grow-0" @click="back">
                        <image src="../../static/image/icon/index.png"></image>
                        <view>首页</view>
                    </view>
                    <view class="dir-top-nowrap main-center cross-center little box-grow-0" @click="setFavorite">
                        <image :src="favorite ? '../../static/image/icon/icon-favorite-active.png' : '../../static/image/icon/icon-favorite.png'"></image>
                        <view>收藏</view>
                    </view>
                    <template v-if="is_negotiable !== 1">
                        <view class="box-grow-1 dir-left-nowrap" style="height: 100%;" v-if="goods_num == 0">
                            <view style="width: 100%;background-color: #CDCDCD;color: #fff;" class="main-center cross-center button">已售罄</view>
                        </view>
                        <view class="box-grow-1 dir-left-nowrap" style="height: 100%;" v-else >

                            <view v-if="goods.type === 'goods'" class="main-center cross-center button"
                                  @click="clickAttr(0)"
                                  :class="getTheme === 'b' || getTheme === 'a' || getTheme === 'f' ? getTheme + '-s-back ' + 'text ' + getTheme : getTheme + '-s-back ' + getTheme + '-m-text ' + getTheme"
                            >
                                加入购物车
                            </view>
                            <view v-else  class="main-center cross-center button"
                                  @click="clickAttr(0)"
                                  :class="getTheme === 'b' || getTheme === 'a' || getTheme === 'f' ? getTheme + '-s-back ' + 'ecard-text ' + getTheme : getTheme + '-s-back ecard-text ' + getTheme"
                            >
                                加入购物车
                            </view>
                            <view class="main-center cross-center button"
                                  style="color: #ffffff;"
                                  @click="clickAttr(1)"
                                  :class="getTheme + '-m-back ' + getTheme"
                            >立即购买
                            </view>
                        </view>
                    </template>
                    <view class="box-grow-1 dir-left-nowrap btn" v-else>
                        <block v-for="(item, index) in good_negotiable" :key="index">
                            <template v-if="item === 'contact_tel'">
                                <view class="box-grow-1 "id=82643
                                      :class="good_negotiable.length === 1 ? getTheme + '-m-back ' + getTheme + '-s-text ' + getTheme : getTheme + '-s-back ' + 'text ' + getTheme"
                                >
                                    <app-jump-button
                                        :number="mall.setting.contact_tel"
                                        open_type="tel"
                                    >
                                        <view>联系电话</view>
                                    </app-jump-button>
                                </view>
                            </template>
                            <!-- #ifndef MP-TOUTIAO -->
                            <template v-else-if="item === 'contact'">
                                <view class="box-grow-1 contact" :class="contactBtn">
                                    <app-jump-button open_type="contact">
                                        <view>客服</view>
                                    </app-jump-button>
                                </view>
                            </template>
                            <!-- #endif -->
                            <template v-else-if="item === 'contact_web'">
                                <view class="box-grow-1 service" :class="good_negotiable.length === 3 ? 'default-bakground' : good_negotiable.length === 2 ? getTheme + '-m-back ' + getTheme + '-s-text ' + getTheme : getTheme + '-m-back ' + getTheme + '-s-text ' + getTheme" >
                                    <app-jump-button
                                        :url="'/pages/web/web?url=' + mall.setting.web_service_url"
                                        open_type="web"
                                    >
                                        <view>客服</view>
                                    </app-jump-button>
                                </view>
                            </template>
                        </block>
                    </view>
                </view>
                <view v-else class="app-bottom u-bottom-height-0 main-center cross-center">
                    <view @click="toExchange" class="app-exchange" :class="getTheme + '-m-gradient-o ' + getTheme" v-if="exchangeStatus == 0">
                        立即领取
                    </view>
                    <view class="app-exchange app-over" v-if="exchangeStatus == 1">
                        已领取
                    </view>
                </view>
            </view>
            <!--快捷导航-->
            <app-quick-navigation></app-quick-navigation>
            <u-attr
                v-if="is_negotiable === 0 && exchangeStatus ==null"
                v-model="attrShow"
                :goods="goods"
                :themeObject="themeObject"
                :checked="checked"
                @check="check"
            >
            </u-attr>
        </template>
        <app-close v-if="showClose" :modal="false" @update="getMall"></app-close>
    </app-layout>
</template>

<script>
	import {mapGetters, mapState} from "vuex";
    import appGoodsBanner from "../../components/page-component/goods/app-goods-banner.vue";
    import appGoodsRecommend from "../../components/page-component/app-goods-recommend/app-goods-recommend.vue";
    import appQuickNavigation from "../../components/page-component/app-quick-navigation/app-quick-navigation.vue";
    import appComposition from'../../components/basic-component/app-composition/app-composition.vue';
    import AppVipCard from '../../components/page-component/app-vip-card/app-vip-card';
    import uniSwiperDot from '../../components/basic-component/uni-swiper-dot/uni-swiper-dot';
    import appGoodsFlashSale from '../../components/page-component/goods/app-goods-flash-sale.vue';
    import uAttr from '../../components/page-component/goods/u-attr.vue';
	import appGoodsFullReduce from '../../components/page-component/goods/app-goods-full-reduce.vue';
	import bdInfo from '@/components/page-component/goods/bd-info';
    import bdCoupon from '@/components/page-component/goods/bd-coupon.vue';
    import bdXbc from '@/components/page-component/goods/bd-xbc.vue';
    import bdKb from '@/components/page-component/goods/bd-kb.vue';
    import bdHc from '@/components/page-component/goods/bd-hc.vue';
    import bdDetail from '@/components/page-component/goods/bd-detail.vue';
    import bdComments from '@/components/page-component/goods/bd-comments.vue';
    import appClose from '@/components/basic-component/app-close/app-close.vue';

    export default {
        name: "goods",
        components: {
            appGoodsBanner,
            'app-goods-recommend': appGoodsRecommend,
            'app-quick-navigation': appQuickNavigation,
            'app-composition': appComposition,
            appClose,
            uniSwiperDot,
            AppVipCard,
			appGoodsFlashSale,
			appGoodsFullReduce,
            uAttr,
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
                goods: null,
                selectAttr: null,
                recommend_list: null,
                is_vip: false,
                is_vip_card_user: 0,
                current: 0,
                discount: null,
                attrShow: false,
                shareData: null,
				contact_tel:'',
				contact: '',
				contact_web:'',
                poster_config: this.$api.goods.poster,
                poster_generate: this.$api.poster.goods_new,
                // 限时抢购
				flash_sale: null,
                checked: null,
                // 商品服务
                services: null,
                // 商品详情
                detail: null,
                // 商品ID
                goodsId: null,
                // 套餐组合
                composition: null,
                autoplay: true,
                full_reduce: null,
                goods_marketing_award: null,
                express: null,
                goods_marketing: null,
                exchangeStatus: null,
                exchange: null,

                price: null,
                level_show: null,
                sales: null,
                unit: null,
                is_sales: null,
                extra_quick_share: null,
                price_max: null,
                price_min: null,
                price_member_max: null,
                price_member_min: null,
                original_price: null,
                subtitle: null,
                is_negotiable: null,
                name: null,
                app_share_pic: null,
                app_share_title: null,
                goodsType: null,
                favorite: null,
                goods_coupon_center: null,
                guarantee_title: null,
                guarantee_pic: null,
                param_content: null,
                param_name: null,
                attr_groups: null,
                goods_num: null,
                good_stock: null
            };
        },
        computed: {
            themeObject:function() {
                return {
                    back: this.getTheme + '-m-back ' + this.getTheme,
                    backP: this.getTheme + '-m-back-p ' + this.getTheme,
                    backO: this.getTheme + '-m-back-o ' + this.getTheme,
                    theme: this.getTheme,
                    color: this.getTheme + '-m-text ' + this.getTheme,
                    sBack: this.getTheme + '-s-back ' + this.getTheme,
                    border: this.getTheme + '-m-border ' + this.getTheme,
                }
            },
            ...mapState({
                mall: state => state.mallConfig.mall,
                gConfig: state => state.gConfig,
            }),
			...mapGetters('mallConfig', {
				getTheme: 'getTheme',
			}),
			good_negotiable: function() {
            	let good_negotiable = this.mall.setting.good_negotiable;
            	this.contact_tel = '';
				this.contact = '';
				this.contact_web = '';
            	let arr = [];
            	for (let i = 0; i < good_negotiable.length; i++) {
            		if (good_negotiable[i] === 'contact_tel') {
						this.contact_tel = 'contact_tel';
					}
					if (good_negotiable[i] === 'contact') {
						this.contact = 'contact';
					}
					if (good_negotiable[i] === 'contact_web') {
						this.contact_web = 'contact_web';
					}
				}
            	if (this.contact_tel) {
					arr.push(this.contact_tel);
				}
				if (this.contact) {
					arr.push(this.contact);
				}
				if (this.contact_web) {
					arr.push(this.contact_web);
				}
				return arr;
			},
            contactBtn: function() {
                const len = this.good_negotiable.length;
                const theme = this.getTheme;
                if (len === 3 && (theme === 'a' || theme === 'b' || theme === 'f')) {
                    return `${theme}-m-back ${theme}-s-text ${theme}`;
                } else if (len === 3 && !(theme === 'a' ||  theme === 'b' || theme === 'f')) {
                    return `${theme}-m-back ${theme}-s-text ${theme}`;
                } if (len === 2 && (theme === 'a' || theme === 'b' || theme === 'f') && !this.contact_tel) {
                    return `${theme}-s-back text ${theme}`;
                } else if (len === 2 && (theme === 'a' || theme === 'b' || theme === 'f') && this.contact_tel) {
                    return `${theme}-m-back ${theme}-s-text ${theme}`;
                } else if (len === 2 && !(theme === 'a' || theme === 'b' || theme === 'f') && !this.contact_tel) {
                    return `${theme}-s-back text ${theme}`;
                } else if (len === 2 && !(theme === 'a' || theme === 'b' || theme === 'f') && this.contact_tel) {
                    return `${theme}-m-back ${theme}-s-text ${theme}`;
                } else {
                    return `${theme}-m-back ${theme}-s-text ${theme}`;
                }
            }
        },
        onLoad(options) {
            // #ifdef MP-WEIXIN
            wx.showShareMenu({
                menus: ['shareAppMessage', 'shareTimeline']
            })
            // #endif
            if (this.isLogin) {
                this.$store.dispatch('user/info');
            } else {
            }
            if(options.exchange) {
                this.exchangeStatus = options.exchange;
                this.exchange = options;
            }
            this.loadData(options.id);
        },
        onShareAppMessage(object) {
            if (object.from === 'button' && this.shareData) {
                return this.$shareAppMessage(this.shareData);
            }
            return this.$shareAppMessage({
                title: this.app_share_title ? this.app_share_title : this.name,
                imageUrl: this.app_share_pic ? this.app_share_pic : '',
                path: '/pages/goods/goods',
                params: {
                    id: this.goodsId
                }
            });
        },
        // #ifdef MP-WEIXIN
        onShareTimeline() {
            // 分享朋友圈beta
            return this.$shareTimeline({
                title: this.app_share_title ? this.app_share_title : this.name,
                query: {
                    id: this.goodsId
                }
            });
        },
        // #endif
        methods: {
            getMall(e) {
                this.is_open = e.is_open;
            },
            toExchange() {
                let mch_list = [{
                    mch_id: 0,
                    goods_list: [{
                        id: this.exchange.id,
                        attr: this.exchange.attr,
                        num: this.exchange.goods_num,
                        cat_id: 0,
                        goods_attr_id: this.exchange.attr_id
                    }],
                    code: this.exchange.code,
                    token: this.exchange.token,
                }];
                let url = `/pages/order-submit/order-submit?mch_list=${JSON.stringify(mch_list)}`;
                url += `&preview_url=${encodeURIComponent(this.$api.exchange.exchange_preview)}&submit_url=${encodeURIComponent(this.$api.exchange.exchange_submit)}&plugin=exchange`;
                uni.navigateTo({
                    url: url
                })
            },
            // 规格选择
            check(obj) {
                this.checked = obj;
            },
            change(e) {
                if(e.detail.source === 'touch') {
                    this.current = e.detail.current;
                }
                if(e.detail.source === 'autoplay') {
                    this.current = e.detail.current;
                }
            },
            quickShare(info) {
                this.shareData = info;
            },
            toComposition(item) {
                let id = item.id > 0 ? item.id : this.composition.list[0].id
                uni.navigateTo({
                    url: this.composition.url + '?goods_id=' + this.goodsId + '&composition_id=' + id
                })
            },
            loadData(id) {
                this.$showLoading();
                this.$request({
                    url: this.$api.goods.detail,
                    data: {
                        id: id
                    }
                }).then(response => {
                    this.$hideLoading();
                    if (response.code === 0) {
                        let { services,
                            detail, name,
                            vip_card_appoint, plugin_extra, id,
                            goods_activity, goods_marketing_award,
                            goods_marketing, express,
                            price, sales,
                            level_show, is_sales, unit, extra_quick_share,
                            price_max, price_min, price_member_max,
                            price_member_min, original_price, subtitle,
                            is_negotiable, app_share_title,
                            app_share_pic, type, favorite, goods_coupon_center,
                            guarantee_title, guarantee_pic, param_content,
                            param_name, attr_groups, goods_num, good_stock
                        } = response.data.goods;
                        uni.setNavigationBarTitle({
                            title: name
                        });
                        this.name = name;
                        this.app_share_pic = app_share_pic;
                        this.app_share_title = app_share_title;
                        this.goods = response.data.goods;
                        this.services = services;
                        this.detail = detail;
                        this.goodsId = id;
                        this.flash_sale = plugin_extra.flash_sale;
                        this.composition = plugin_extra.composition;
                        this.goods_marketing_award = goods_marketing_award;
                        this.goods_marketing = goods_marketing;
                        this.express = express;
                        this.price = price;
                        this.level_show = level_show;
                        this.sales = sales;
                        this.unit = unit;
                        this.is_sales = is_sales;
                        this.price_max = price_max;
                        this.price_min = price_min;
                        this.price_member_max = price_member_max;
                        this.price_member_min = price_member_min;
                        this.original_price = original_price;
                        this.subtitle = subtitle;
                        this.is_negotiable = is_negotiable;
                        this.extra_quick_share = extra_quick_share;
                        this.goodsType = type;
                        this.favorite = favorite;
                        this.goods_coupon_center = goods_coupon_center;
                        this.guarantee_title = guarantee_title;
                        this.param_content = param_content;
                        this.guarantee_pic = guarantee_pic;
                        this.attr_groups = attr_groups;
                        this.param_name = param_name;
                        this.goods_num = goods_num;
                        this.good_stock = good_stock;
                        if (goods_activity) {
                            this.full_reduce = goods_activity.full_reduce;
                        }
                        if(vip_card_appoint.discount || vip_card_appoint.discount === '0.00') {
                            this.is_vip = true;
                            this.discount = vip_card_appoint.discount
                        }
                        this.is_vip_card_user = vip_card_appoint.is_vip_card_user;
                        this.loadRecommend();
                    } else {
                        uni.showToast({
                            title: response.msg,
                            icon: 'none'
                        });
                    }
                }).catch(() => {
                    this.$hideLoading();
                });
            },
            onAttr(data) {
                this.selectAttr = data;
            },
            loadRecommend() {
                this.$request({
                    url: this.$api.goods.new_recommend,
                    data: {
                        goods_id: this.goodsId,
                        type: 'goods'
                    }
                }).then(response => {
                    if (response.code === 0) {
                        this.recommend_list = response.data.list;
                    }
                });
            },
            back() {
                uni.reLaunch({
                    url: '/pages/index/index'
                });
            },
            setFavorite() {
                let url = this.$api.user.favorite_add;
                let favorite = true;
                if (this.favorite) {
                    url = this.$api.user.favorite_remove;
                    favorite = false;
                }
                this.favorite = favorite;
                this.$request({
                    url: url,
                    data: {
                        goods_id: this.goodsId
                    }
                }).then(response => {
                    if (response.code === 0) {
                    } else {
                        uni.showModal({
                            title: '提示',
                            content: response.msg,
                            showCancel: false
                        });
                    }
                });
            },
            clickAttr(data) {
                if (this.goods.type === 'ecard' && data === 0) {
                    uni.showToast({
                        title: '虚拟商品不允许加入购物车',
                        icon: 'none'
                    });
                    return;
                }
                this.attrShow = true;
            },
			setCoupon(index) {
				this.$set(this.goods_coupon_center[index], 'is_receive', 1);
			}
        },
        onShow() {
            this.autoplay = true;
            this.showClose = false;
            setTimeout(()=>{
                this.showClose = true;
            })
        },
        onHidden() {
            this.autoplay = false;
        }
    }
</script>

<style scoped lang="scss">
    .goods-composition {
        width: 702upx;
        margin: 20upx 20upx 0 20upx;
        padding: 20rpx;
        background-color: #fff;
        border-radius: 15upx;
        .goods-composition-title {
            font-size: 28rpx;
            color: #353535;
            margin-bottom: 20rpx;
        }
        .goods-composition-swiper {
            height: 194rpx;
        }
        .goods-composition-more {
            margin: 20rpx  auto 4rpx auto;
            width: 226rpx;
            padding: 0 24rpx;
            height: 56rpx;
            line-height: 54rpx;
            border-radius: 28rpx;
            border: 2rpx solid #bbbbbb;
            font-size: 24rpx;
            color: #999999;
            image {
                width: #{12rpx};
                height: #{22rpx};
            }
        }
    }
    .goods-name {
        padding: 24upx 24upx 0 24upx;
        background-color: #ffffff;
        color: #353535;
        font-size: 32upx;
        line-height: 42upx;
    }

    .goods-subtitle {
        padding: #{24rpx 24rpx 0 24rpx};
        font-size: 24rpx;
        background-color: #ffffff;
        color: #999999;
    }
    
	.price {
		padding-top: #{24rpx};
		background-color: #ffffff;
	}
    .vip-card {
        padding-bottom: #{20rpx};
        background-color: #fff;
    }
    .attr {
        background-color: #f7f7f7;
    }
    .bottom {
        width: 100%;
        height: #{110rpx};
    }
    .app-bottom {
        width: 100%;
        font-size: $uni-font-size-general-one;
        background-color: #ffffff;
        .little {
            width: #{110rpx};
            height: 100%;
            background-color: #ffffff;
            font-size: #{20rpx};
            color: $uni-general-color-two;
            &:first-child {
                border-right: #{1rpx} solid #e2e2e2;
            }
            image {
                width: #{40rpx};
                height: #{40rpx};
                display: block;
                margin-bottom: #{10rpx};
            }
        }
		.btn {
			height: 100%;
		}
        .button {
            width: 50%;
            height: 100%;
        }
        .service {
            color: #ffffff;
        }
        .app-exchange {
            width: #{702rpx};
            border-radius: #{41rpx};
            height: #{82rpx};
            line-height: #{82rpx};
            font-size: #{28rpx};
            text-align: center;
            color: #fff;
            &.app-over {
                background: #e9e9e9;
                color: #999999;
            }
        }
    }
	.text {
		color: #ffffff;
	}
	.default-bakground {
		background-color: #446dfd;
	}
    .u-bottom-fixed {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 1500;
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
    .bd-goods {
        margin: 24 upx 24 upx 24 upx 24 upx;
    }
    .ecard-text {
        color: #999999;
    }
</style>
