<template>
    <app-layout>
        <view class="app-goods" v-show="loading">
            <view class="banner">
                <app-banner
                    :videoUrl="goods.video_url"
                    :share="goods.share"
                    :picList="goods.pic_url"
                    :goods_id="goods_id"
                    :isCart="false"
                    sign="wholesale"
                ></app-banner>
            </view>

            <!-- 批发信息 -->
            <view v-if="goods.section.length > 1 && goods.is_negotiable == 0" class="wholesale main-center cross-center" :class="getTheme + '-m-back ' + getTheme">
                <view class="wholesale-item" v-for="(item,index) in goods.section" :key="index">
                    <view>
                        <view class="wholesale-price t-omit">￥<text>{{item.price}}</text></view>
                        <view>{{item.display_num}}{{goods.unit}}</view>
                    </view>
                </view>
            </view>
            <bd-info
                :theme="themeObject"
                :name="goods.name"
                :is-negotiable="goods.is_negotiable"
                :subtitle="goods.subtitle"
                :flash-sale="flash_sale"
                :level-show="goods.level_show"
                :price="goods.price"
                :original-price="goods.original_price"
                :price-max="goods.price_max"
                :price-min="goods.price_min"
                :price-member-max="goods.price_member_max"
                :price-member-min="goods.price_member_min"
                :discount='discount'
                :is-vip-card-user="is_vip_card_user"
                :sales="goods.sales"
                :unit="goods.unit"
                :is-sales="goods.is_sales"
                :is-vip="is_vip"
                :goods-id="goods.id"
                :extra-quick-share="goods.extra_quick_share"
                :app-share-pic="goods.app_share_pic"
                :app-share-title="goods.app_share_title"
                :poster-config="poster_config + `&goods_id=` + goods.id"
                :poster-generate="poster_generate + `&goods_id=` + goods.id"
                :has-poster-nav="true"
                v-bind:goods="goods"
            >
               <view>
                   <view :class="['wholesale-text',`${goods.level_show === 2 && goods.is_negotiable === 0 ? 'margin' : ''}`, themeObject.color,themeObject.backP]" v-if="goods.wholesaleGoods.rise_num > 0 && goods.is_negotiable == 0">起批量 {{goods.wholesaleGoods.rise_num}}{{goods.unit}}
                   </view>
               </view>
            </bd-info>
            <!--商品优惠券-->
            <bd-coupon @change="setCoupon" :theme="themeObject" :coupons="goods.goods_coupon_center"></bd-coupon>
            <bd-xbc
                :coAttr="is_open"
                :attr-list="selectAttr.attr_list"
                :type="goods.type"
                :guarantee-title="goods.guarantee_title"
                :guarantee-pic="goods.guarantee_pic"
                :param_content="goods.param_content"
                :param_name="goods.param_name"
                :services="goods.services"
                :attr-groups="goods.attr_groups"
                :goods-stock="goods.goods_num"
                @openAttr="clickAttr"
            ></bd-xbc>
            <!--商品信息-->
            <bd-hc
                :integral="goods.goods_marketing_award.integral"
                :coupon="goods.goods_marketing_award.coupon"
                :card="goods.goods_marketing_award.card"
                :balance="goods.goods_marketing_award.balance"
                :theme="themeObject"
            ></bd-hc>
            <bd-kb
                :limit="goods.goods_marketing.limit"
                :express="goods.express"
                :shipping="goods.goods_marketing.shipping"
                :pickup="goods.goods_marketing.pickup"
            ></bd-kb>
            <view class="attr">
                <app-attr v-if="goods.id > 0 && goods.is_negotiable == 0" :goods="goods"
                          :attrGroupList="goods.attr_groups"
                          @attrtap="attrtap"
                          ref="attr"
                          sign="wholesale"
                          :chooseNumber="false"
                          :show="show"
                          :selectAttr="selectAttr"
                          :previewUrl="previewUrl"
                          :submitUrl="submitUrl"
                          :totalNumber="totalNumber"
                          :totalPrice="totalPrice"
                          :discount="wholesaleDiscount"
                          :wholesaleType="goods.wholesaleGoods.type"
                          @attr="attr"
                          :theme="getTheme"
                >
                </app-attr>
            </view>
            <bd-comments v-if="goods.id" :goods-id="goods.id"></bd-comments>
            <!--商品详情-->
            <bd-detail :detail="goods.detail"></bd-detail>
            <!--空格区域-->
            <view class="safe-area-inset-bottom u-bottom">
                <view class="u-bottom-height" :class="full_reduce ? 'u-bottom-height-1' : 'u-bottom-height-0'"></view>
            </view>
            <!--底部按钮-->
            <view v-if="is_open == 1" class="safe-area-inset-bottom u-bottom-fixed">
                <view v-if="full_reduce">
                    <app-goods-full-reduce
                        :theme="getTheme"
                        :full_reduce="full_reduce"
                        :sign="goods.type === 'goods' ? '' : 1"
                    >
                    </app-goods-full-reduce>
                </view>
                <view class="app-bottom u-bottom-height-0 dir-left-nowrap" >
                    <view class="dir-top-nowrap main-center cross-center little box-grow-0" @click="back">
                        <image src="../../../static/image/icon/index.png"></image>
                        <view>首页</view>
                    </view>
                    <view class="dir-top-nowrap main-center cross-center little box-grow-0" @click="favorite">
                        <image :src="goods.favorite ? '../../../static/image/icon/icon-favorite-active.png' : '../../../static/image/icon/icon-favorite.png'"></image>
                        <view>收藏</view>
                    </view>
                    <template v-if="goods.is_negotiable !== 1">
                        <view class="box-grow-1 dir-left-nowrap" style="height: 100%;" v-if="goods.goods_num == 0">
                            <view style="width: 100%;background-color: #CDCDCD;color: #fff;" class="main-center cross-center button">已售罄</view>
                        </view>
                        <view class="box-grow-1 dir-left-nowrap" style="height: 100%;" v-else @click="clickAttr">
                            <view class="main-center cross-center button"
                                  :class="getTheme === 'b' || getTheme === 'a' || getTheme === 'f' ? getTheme + '-s-back ' + 'text ' + getTheme : getTheme + '-s-back ' + getTheme + '-m-text ' + getTheme"
                            >
                                加入购物车
                            </view>
                            <view class="main-center cross-center button"
                                  style="color: #ffffff;"
                                  :class="getTheme + '-m-back ' + getTheme"
                            >立即购买
                            </view>
                        </view>
                    </template>
                    <view class="box-grow-1 dir-left-nowrap btn" v-else>
                        <block v-for="(item, index) in good_negotiable" :key="index">
                            <template v-if="item === 'contact_tel'">
                                <view class="box-grow-1 "
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
            </view>
        </view>
        <app-close v-if="showClose" :modal="false" @update="getMall"></app-close>
    </app-layout>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';
    import appBanner from '../../../components/page-component/goods/app-goods-banner.vue';
    import appAttr from '../../../components/page-component/app-attr/app-attr.vue';
    import appGoodsFullReduce from "../../../components/page-component/goods/app-goods-full-reduce.vue";
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
                goods: {},
                selectAttr: null,
                previewUrl: this.$api.wholesale.order_preview,
                submitUrl: this.$api.wholesale.order_submit,
                show: 0,
                list: [],
                appAttr: {},
                totalNumber: 0,
                totalPrice: '0.00',
                poster_config: this.$api.wholesale.poster_config,
                poster_generate: this.$api.wholesale.poster_generate,
                url: this.$api.wholesale.poster,
                goods_id: -1,
                loading: false,
                first: true,
                is_vip: false,
                is_vip_card_user: 0,
                discount: null,
                full_reduce: null,
                flash_sale: null,
                wholesaleDiscount: 0
            }
        },
        onLoad(options) {
            let that = this;
            that.goods_id = options.id;
            // #ifdef MP-WEIXIN
            wx.showShareMenu({
                menus: ['shareAppMessage', 'shareTimeline']
            })
            // #endif
            that.$showLoading({
                type: 'global',
                text: '加载中...'
            });
            that.request({
                url: that.$api.wholesale.detail,
                data: {
                    id: that.goods_id,
                }
            }).then(response => {
                that.first = false;
                that.goods = response.detail;
                if (response.detail.goods_activity) {
                    this.full_reduce = response.detail.goods_activity.full_reduce;
                }
                if(that.goods.vip_card_appoint.discount > 0) {
                    that.is_vip = true;
                    that.discount = that.goods.vip_card_appoint.discount
                }
                that.is_vip_card_user = that.goods.vip_card_appoint.is_vip_card_user;
                for(let item of that.goods.attr) {
                    item.number = '0';
                }
                if(that.goods.attr_groups.length == 1) {
                    that.goods.attr[0].number = '0';
                }else {
                    for(let item of that.goods.attr_groups) {
                        item.scrollLeft = 0;
                        for(let i in item.attr_list) {
                            item.attr_list[i].active = i > 0 ? false : true;
                            item.attr_list[i].number = 0;
                        }
                    }
                }
                that.flash_sale = that.goods.plugin_extra.flash_sale;
                that.loading = true;
                that.$hideLoading();
            });
        },
        onShow() {
            this.showClose = false;
            setTimeout(()=>{
                this.showClose = true;
            })
            if(this.first) {
                return false
            }
            let attr = JSON.parse(JSON.stringify(this.goods.attr));
            let attr_groups = JSON.parse(JSON.stringify(this.goods.attr_groups));
            this.$showLoading();
            this.$nextTick(() => {
                let that = this;
                that.request({
                    url: that.$api.wholesale.detail,
                    data: {
                        id: that.goods_id,
                    }
                }).then(response => {
                    that.goods = response.detail;
                    that.goods.attr = attr;
                    that.goods.attr_groups = attr_groups;
                    this.$hideLoading();
                });
            })
        },
        computed: {
            ...mapState('gConfig',{
                mall: state => state.mallConfig.mall,
                iphone: (data) => {
                    return data.iphone;
                },
                iphoneHeight: (state) =>{
                    return  state.iphoneHeight;
                },
            }),
            ...mapGetters('mallConfig', {
                getTheme: 'getTheme',
            }),
            ...mapState({
                mall: state => state.mallConfig.mall
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
            },
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
        },
        onShareAppMessage() {
            return this.$shareAppMessage({
                path: '/plugins/wholesale/goods/goods',
                title: this.goods.app_share_title ? this.goods.app_share_title : this.goods.name,
                imageUrl: this.goods.app_share_pic ? this.goods.app_share_pic : '',
                params: {
                    id: this.goods.id
                }
            });
        },
        // #ifdef MP-WEIXIN
        onShareTimeline() {
            // 分享朋友圈beta
            return this.$shareTimeline({
                title: this.goods.app_share_title ? this.goods.app_share_title : this.goods.name,
                query: {
                    id: this.goods.id
                }
            });
        },
        // #endif
        methods: {
            getMall(e) {
                this.is_open = e.is_open;
            },
            setCoupon(index) {
                this.$set(this.goods.goods_coupon_center[index], 'is_receive', 1);
            },
            clickAttr() {
                this.show = Math.random();
            },
            attr(data) {
                this.appAttr = data;
            },

            favorite() {
                let url = this.$api.user.favorite_add;
                let favorite = true;
                if (this.goods.favorite) {
                    url = this.$api.user.favorite_remove;
                    favorite = false;
                }
                this.goods.favorite = favorite;
                this.$request({
                    url: url,
                    data: {
                        goods_id: this.goods.id,
                    }
                }).then(response => {
                    if (response.code === 0) {
                    } else {
                        uni.showModal({
                            title: '提示',
                            content: response.msg,
                            showCancel: false,
                        });
                    }
                }).catch(e => {
                });
            },
            async request({url, data}) {
                const response = await this.$request({
                    url: url,
                    data: data,
                });
                if (response.code === 0) {
                    return response.data;
                }else {
                    uni.showToast({
                        title: response.msg,
                        icon: 'none',
                        duration: 1000
                    });
                    setTimeout(()=>{
                        uni.navigateBack();
                    },1000)
                }
            },

            attrtap(data,goodsAttr) {
                let that = this;
                if (data !== null) {
                    that.goods = data;
                    for(let row of goodsAttr) {
                        for(let item of that.goods.attr) {
                            if(row.id == item.id) {
                                item.number = row.number
                            }
                        }
                    }
                    that.totalNumber = 0;
                    let totalPrice = 0;
                    for(let item of that.goods.attr) {
                        that.totalNumber += +item.number;
                        if(item.number > 0) {
                            let price = that.goods.level_show === 1 ? item.price_member : item.price;
                            totalPrice += item.number*price;
                        }
                    }
                    if(that.goods.attr_groups.length > 1) {
                        for(let row of that.goods.attr_groups[0].attr_list) {
                            row.number = 0;
                            for(let item of that.goods.attr) {
                                if(item.number > 0) {
                                    if(row.attr_id == item.attr_list[0].attr_id && row.attr_name == item.attr_list[0].attr_name) {
                                        row.number += +item.number
                                        row.length = -5 - (+(row.number.toString().length) * 10)
                                    }
                                }
                            }
                        }
                    }
                    setTimeout(()=>{
                        let get = 0;
                        for(let i of that.goods.wholesaleGoods.wholesale_rules) {
                            if(!(that.totalNumber < i.num)) {
                                this.wholesaleDiscount = i.discount
                                get++
                            }
                        }
                        if(get == 0) {
                            this.wholesaleDiscount = that.goods.wholesaleGoods.type == 0 ? 10 : 0
                        }
                        if(this.wholesaleDiscount > 0) {
                            if(that.goods.wholesaleGoods.type == 0) {
                                totalPrice = totalPrice*(this.wholesaleDiscount/10)
                            }else {
                                totalPrice = totalPrice - (this.wholesaleDiscount*that.totalNumber)
                            }
                        }
                        that.totalPrice = totalPrice.toFixed(2);
                    },0)
                }
            },
        },
        components: {
            'app-banner': appBanner,
            'app-attr': appAttr,
            'app-goods-full-reduce': appGoodsFullReduce,
            appClose,
            bdInfo,
            bdCoupon,
            bdXbc,
            bdKb,
            bdHc,
            bdDetail,
            bdComments
        }
    }
</script>

<style scoped lang="scss">
    .vip-card {
        padding-bottom: #{20rpx};
        background-color: #fff;
    }
    .wholesale {
        height: 88rpx;
        color: #fff;
        .wholesale-item {
            display: flex;
            margin: 0 12rpx;
            justify-content: center;
            align-items: center;
            font-size: 22rpx;
            width: 218rpx;
            .wholesale-price {
                font-size: 26rpx;
                margin-top: -5rpx;
                text {
                    font-size: 44rpx;
                }
            }
            >view {
                display: inline-block;
                >view {
                    margin-top: -10rpx;
                }
            }
            &:first-of-type {
                justify-content: flex-start;
            }
            &:last-of-type {
                justify-content: flex-end;
            }
        }
    }
    .goods-subtitle {
        padding: 0 #{24rpx};
        font-size: 24rpx;
        background-color: #ffffff;
        color: #999999;
    }

    .merchant-guarantee {
        margin-top: #{20rpx};
    }

    .app-goods {
        background-color: #f7f7f7;
    }
    .attr {
        margin: #{20rpx} 0;
    }
    .marketing {
        margin-top: #{20rpx};
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
    }
    .product-list {
        background-color: white;
    }

    .join-member {
        background-color: #ffffff;
        padding: 0 #{24rpx};
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
    .wholesale-text {
        height: 30rpx;
        line-height: 30rpx;
        padding: 0 15rpx;
        border-radius: 15rpx;
        font-size: $uni-font-size-weak-two;
        display: inline-block;
        margin-bottom: #{20rpx};
        &.margin {
            margin-bottom: 0;
        }
    }
</style>