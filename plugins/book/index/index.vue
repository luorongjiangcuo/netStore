<template>
    <app-layout>
        <view class="book-index">
            <view class="page-width quick-navigation">
                <app-quick-navigation></app-quick-navigation>
            </view>

            <view class="page-width head-nav-list" v-if="is_show_cat === 1">
                <app-head-nav-list
                    v-bind:catList="catList"
                    @click="changeStatus"
                    v-bind:cat_id="cat_id"
                    :theme="getTheme"
                ></app-head-nav-list>
            </view>

            <view class="page-width" :class="is_show_cat === 1 ? 'product-list' : ''" v-if="goods_list.length > 0">
                <app-product-list :theme="themeObject" v-bind:goodsList="goods_list"
                                  @route_go="route_go"></app-product-list>
            </view>

            <view class="page-width no-goods" v-else>
                <app-no-goods background="#f7f7f7"></app-no-goods>
            </view>
        </view>
    </app-layout>
</template>

<script>
import appHeadNavList from '../components/app-head-nav-list.vue';
import appProductList from '../components/app-product-list.vue';
import appQuickNavigation from "../../../components/page-component/app-quick-navigation/app-quick-navigation.vue";
import appNoGoods from '../../../components/page-component/app-no-goods/app-no-goods.vue';
import {mapGetters, mapState} from "vuex";

export default {
    name: "index",

    data() {
        return {
            catList: [],
            cat_id: 0,
            page: 1,
            goods_list: [],
            page_count: 1,
            is_show_cat: 0
        }
    },
    onLoad(option) {
        this.requestCats().then(() => {
            if (option.cat_id) {
                this.cat_id = option.cat_id;
            } else {
                this.cat_id = this.catList[0].id;
            }
            this.requestList();
        });
        // #ifdef MP-WEIXIN
        wx.showShareMenu({
            menus: ['shareAppMessage', 'shareTimeline']
        })
        // #endif
    },
    methods: {
        async requestCats() {
            this.$showLoading();
            const e = await this.$request({
                url: this.$api.book.cats,
                method: 'get'
            });
            this.$hideLoading();
            if (e.code === 0) {
                this.catList = e.data.cat;
                this.is_show_cat = e.data.is_show_cat;
            }
        },

        async requestList(status) {
            const res = await this.$request({
                url: this.$api.book.list,
                data: {
                    page: this.page,
                    cat_id: this.cat_id,
                }
            });

            if (res.code === 0) {
                if (status) this.goods_list = [];
                this.dataProcessing(res.data);
            }
        },

        changeStatus(status) {
            this.page = 1;
            this.cat_id = status;
            this.requestList(true);
        },

        dataProcessing(data) {
            for (let i = 0; i < data.list.length; i += 2) {
                if (i + 1 !== data.list.length) {
                    this.goods_list.push([data.list[i], data.list[i + 1]]);
                } else {
                    this.goods_list.push([data.list[i]]);
                }
            }
            this.page_count = data.pagination.page_count;
        },

        route_go(data) {
            // #ifndef MP-BAIDU
            if (data.video_url && this.getVideo == 1) {
                uni.navigateTo({
                    url: `/pages/goods/video?goods_id=${data.goods_id}&sign=booking`
                });
            } else {
                uni.getLocation({
                    type: 'wgs84',
                    success: function (res) {
                        uni.navigateTo({
                            url: `/plugins/book/goods/goods?goods_id=${data.goods_id}`,
                        });
                    },
                    fail: function (res) {
                        uni.showToast({
                            title: '请开启位置权限',
                            icon: 'none',
                            duration: 1000,
                            success: function () {

                            }
                        });
                    },
                });
            }
            // #endif

            // #ifdef MP-BAIDU
            uni.getLocation({
                type: 'wgs84',
                success: function (res) {
                    uni.navigateTo({
                        url: `/plugins/book/goods/goods?goods_id=${data.goods_id}`,
                    });
                },
                fail: function (res) {
                    uni.showToast({
                        title: '请开启位置权限',
                        icon: 'none',
                        duration: 1000,
                        success: function () {

                        }
                    });
                },
            });
            // #endif

        }
    },
    onReachBottom() {
        if (this.page < this.page_count) {
            this.page++;
            this.requestList();
        }
    },
    computed: {
        ...mapGetters('mallConfig', {
            getTheme: 'getTheme',
        }),
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
    },
    onShareAppMessage() {
        return this.$shareAppMessage({
            path: '/plugins/book/index/index',
            title: this.$children[0].navigationBarTitle,
        });
    },
    // #ifdef MP-WEIXIN
    onShareTimeline() {
        // 分享朋友圈beta
        return this.$shareTimeline({
            title: this.$children[0].navigationBarTitle,
            query: {} // 此处填写页面的参数
        });
    },
    // #endif
    components: {
        'app-head-nav-list': appHeadNavList,
        'app-product-list': appProductList,
        'app-quick-navigation': appQuickNavigation,
        'app-no-goods': appNoGoods,
    },
}
</script>

<style scoped lang="scss">

.head-nav-list {
    position: fixed;
    top: var(--window-top);
    left: 0;
    z-index: 1500;
}

.product-list {
    margin-top: #{100rpx};
}

.no-goods {
    margin-top: #{150rpx};
}
</style>
