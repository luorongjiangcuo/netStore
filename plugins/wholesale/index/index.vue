<template>
    <view class="bg">
        <app-layout :haveBackground="false">
            <view class="nav-area">
                <view class="search-view main-center cross-center" v-if="search" @click="search = false">
                    <view v-if="keyword" style="width: 90%">{{keyword}}</view>
                    <image v-if="keyword == ''" class="icon" src="/static/image/icon/search.png"></image>
                    <text v-if="keyword == ''" class="text">搜索</text>
                </view>
                <view class="search-view" v-else style="position: relative">
                    <input placeholder="请输入商品名称搜索" type="text" v-model="keyword" @focus="getFocus=true" focus
                           @blur="inputBlur"/>
                    <image v-if="getFocus && keyword.length" @click.stop="keyword = ''" class="search-clear"
                           src="/static/image/icon/delete-yuan.png"></image>
                </view>
                <view class="banner">
                    <image :src="banner"></image>
                </view>
            </view>
            <view class="nav-placeholder"></view>
            <view class="goods-style-one">
                <u-ordinary-list :theme="themeObject.theme" :themeObject="themeObject" :pagination="true" :isUnderLinePrice="false" v-if="list.length > 0 || first" buyBtn="text" :borderShow="1" :buyBtnStyle="3" buyBtnText="立即抢购" :list="list" :list-style="-1" :isBuy="false"></u-ordinary-list>
            </view>
            <view class="no-list" v-if="!loading && list.length === 0">
                <app-no-goods background="#f7f7f7"></app-no-goods>
            </view>
        </app-layout>
    </view>
</template>

<script>
    import { mapState,mapGetters } from "vuex";
    import uOrdinaryList from '../../../components/page-component/u-goods-list/u-ordinary-list.vue';
    import appNoGoods from '../../../components/page-component/app-no-goods/app-no-goods.vue';

    export default {
        data() {
            return {
                list: [],
                more: false,
                loading: false,
                getFocus: false,
                search: true,
                first: false,
                activeItem: 1,
                page: 1,
                activityBg: '',
                keyword: '',
                banner: '',
                style: -1
            }
        },
        components: {uOrdinaryList,appNoGoods},
        computed: {
            ...mapState({
                userInfo: state => state.user.info,
                compositionImg: state => state.mallConfig.__wxapp_img.composition
            }),
            ...mapGetters('mallConfig', {
                getTheme: 'getTheme',
            }),
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
        onReachBottom() {
            if(this.more) {
                this.getMore();
            }
        },
        methods: {
            inputBlur() {
                let that = this;
                setTimeout(v => {
                    that.getFocus = false;
                    that.getList();
                }, 300)
            },
            tabShow() {
                this.style = this.style == 1 ? 4 : 1
            },
            jump(data) {
                uni.navigateTo({
                    url: data.page_url
                });
            },
            getMore() {
                this.more = false;
                this.loading = true;
                this.$request({
                    url: this.$api.wholesale.index,
                    data: {
                        keyword: this.keyword,
                        page: this.page
                    }
                }).then(response=>{
                    this.$hideLoading();
                    if(response.code === 0) {
                        this.search = true;
                        this.list = this.list.concat(response.data.list);
                        this.loading = false;
                        if(response.data.list.length == response.data.pagination.pageSize) {
                            this.more = true;
                            this.page++;
                        }
                    }else {
                        uni.showToast({
                            title: response.msg,
                            icon: 'none',
                            duration: 1000
                        });
                    }
                }).catch(() => {
                    this.$hideLoading();
                });
            },
            getList() {
                this.more = false;
                this.loading = true;
                this.list = [];
                this.$request({
                    url: this.$api.wholesale.index,
                    data: {
                        keyword: this.keyword
                    }
                }).then(response=>{
                    this.first = false;
                    this.$hideLoading();
                    if(response.code === 0) {
                        this.search = true;
                        this.list = response.data.list;
                        this.banner = response.data.banner;
                        this.loading = false;
                        this.$forceUpdate();
                        if(this.list.length == response.data.pagination.pageSize) {
                            this.more = true;
                            this.page++;
                        }
                    }else {
                        uni.showToast({
                            title: response.msg,
                            icon: 'none',
                            duration: 1000
                        });
                    }
                }).catch(() => {
                    this.$hideLoading();
                });
            },
        },

        onLoad() {
            let that = this;
            that.$showLoading({
                type: 'global',
                text: '加载中...'
            });
            that.first = true;
            that.getList();
        }
    }
</script>

<style scoped lang="scss">
    .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100%;
        background-color: #fff;
    }
    .nav-area {
        height: 386rpx;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 22;
        background-color: #fff;
        font-size: #{26rpx};
        .search-view {
            margin: 20rpx auto;
            width: #{702rpx};
            height: #{66rpx};
            background-color: #F7F7F7;
            border-radius: #{33rpx};
            .icon {
                width: #{20rpx};
                height: #{20rpx};
                margin-right: #{11rpx};
            }
            .text {
                color: #999999;
            }
            input {
                width: #{702rpx};
                height: #{66rpx};
                border-radius: #{28rpx};
                padding: #{0 70rpx 0 30rpx};
                box-sizing: border-box;
                font-size: #{26rpx};
            }

            .search-clear {
                position: absolute;
                right: #{15rpx};
                top: #{19rpx};
                width: #{30rpx};
                height: #{30rpx};
                z-index: 300;
            }
        }
        .banner {
            height: #{280rpx};
            width: 100%;
            image {
                width: 100%;
                height: #{280rpx};
            }
        }
    }
    .nav-placeholder {
        height: 386rpx;
        width: 100%;
    }
    .no-list {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin-top: #{100rpx};
        z-index: 50;
        background-color: #f7f7f7;
    }
</style>