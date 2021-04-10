<template>
    <app-layout>
        <scroll-view class="auto-tab" scroll-x 
                     :scroll-into-view="'type' + (tabCurrentIndex >= 2 ? tabCurrentIndex - 2 : 0)">
            <view class="auto-item" v-for="(item, index) in typeList" :key="index">
                <view class="auto-tab-item cross-center" :id="'type' + index"
                      :key="index"
                      :class="tabCurrentIndex == index ? getTheme + '-m-text ' + getTheme + ' current-type' : ''"
                      @click="tabClick(index)">{{item.name}}
                </view>
            </view>
        </scroll-view>
        <view class="empty"></view>
        <view>
            <app-special-topic-list :cat-show="false" :topic-list="list"></app-special-topic-list>
        </view>
    </app-layout>
</template>

<script>
    import {mapGetters, mapState} from "vuex";
    import appSpecialTopicList from "../../components/page-component/app-special-topic/app-special-topic-list.vue";

    let page = 1;
    let search = {};
    let is_no_more = false;
    let is_loading = false;
    export default {
        name: "list",
        components: {
            appSpecialTopicList,
        },
        data() {
            return {
                list: [],
                typeList: [],
                tabCurrentIndex: 0,
            };
        },
        computed: {
            ...mapState({
                bar_title: state => state.mallConfig.bar_title,
            }),
            ...mapGetters('mallConfig', {
                getTheme: 'getTheme',
            }),
        },
        onLoad(options) {
            page = 1;
            is_no_more = false;
            is_loading = false;
            if (typeof options.type != 'undefined') {
                search.type = options.type;
            }
            this.loadData();
            this.loadType();
        },
        onReachBottom() {
            if (is_no_more) {
                return;
            }
            this.loadData();
        },
        onShareAppMessage(object) {
            let route = this.$platDiff.route();
            let title = '专题列表';
            for (let i in this.bar_title) {
                if (this.bar_title[i].value == route) {
                    title = this.bar_title[i].new_name;
                    break;
                }
            }
            return this.$shareAppMessage({
                title: title,
                path: '/pages/topic/list',
            });
        },
        methods: {
            loadData() {
                if (is_loading) {
                    return;
                }
                this.$showLoading();
                is_loading = true;
                search.page = page;
                this.$request({
                    url: this.$api.topic.list,
                    data: search
                }).then(response => {
                    is_loading = false;
                    this.$hideLoading();
                    if (response.code === 0) {
                        if (page === 1) {
                            this.list = [];
                        }
                        if (response.data.list.length > 0) {
                            this.list = this.list.concat(response.data.list);
                            page++;
                        } else {
                            is_no_more = true;
                        }
                    } else {

                    }
                }).catch(e => {
                    this.$hideLoading();
                    is_loading = false;
                });
            },
            loadType() {
                this.$request({
                    url: this.$api.topic.type,
                }).then(response => {
                    if (response.code === 0) {
                        if (response.data.list.length > 0) {
                            let list = [
                                {
                                    id: 0,
                                    name: '全部'
                                },
                                {
                                    id: -1,
                                    name: '精选'
                                }
                            ];
                            this.typeList = list.concat(response.data.list);
                            for (let i in this.typeList) {
                                if (this.typeList[i].id == search.type) {
                                    this.tabCurrentIndex = i;
                                    break;
                                }
                            }
                        }
                    } else {

                    }
                }).catch(e => {
                    is_loading = false;
                });
            },
            tabClick(index) {
                page = 1;
                is_no_more = false;
                let type = this.typeList[index].id;
                this.tabCurrentIndex = index;
                search = {
                    page: page,
                    type: type
                };
                this.loadData();
            }
        }
    }
</script>

<style scoped lang="scss">
    .auto-tab {
        position: fixed;
        top: 0;
        left: 0;
        background-color: #ffffff;
        z-index: 1500;
        height: #{88rpx};
        width: 100%;
        white-space: nowrap;
        padding: 0 #{32rpx};
        border-bottom: #{1rpx} solid #e2e2e2;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
    }

    .auto-item {
        display: inline-block;
        height: #{calc(100% - 4rpx)};
    }

    .auto-tab-item {
        margin-right: #{60rpx};
        background-color: #ffffff;
        height: 100%;
    }

    .auto-tab-item.current-type {
        border-bottom: #{4rpx} solid;
    }

    .empty {
        height: #{88+16rpx};
        width: 100%;
        background-color: #f7f7f7;
    }
</style>