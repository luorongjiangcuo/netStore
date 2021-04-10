<template>
    <view style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;background-color: #fff">
        <app-layout>
            <view v-if="list.length == 0" class="title">暂无分类，请添加</view>
            <view class="dir-left-wrap cat-list">
                <view v-for="(item,index) in list" :key="item.value" class="cross-center dir-left-nowrap cat-item">
                    <view>{{item.label}}</view>
                    <view @click="delCat(index)" class="close cross-center main-center">
                        <image src="./../image/cat-close.png"></image>
                    </view>
                </view>
            </view>
            <view :class="['add main-between', `${iphone_x? 'iphone_x':''}`]">
                <view class="add-btn" @click="add">添加分类</view>
                <view class="save-btn" @click="save">保存</view>
            </view>
            <view class="dialog" v-if="dialog">
                <view class="picker-list">
                    <view class="main-between picker-header">
                        <view @click="cancel">取消</view>
                        <view @click="toAdd">新增</view>
                    </view>
                    <picker-view indicator-style="height: 36px;" @change="bindChange">
                        <picker-view-column>
                            <view
                                v-for="(item,idx) in cat" :key="item.value"
                                :class="[`picker-view`,{
                                    'sure-color': index_1 === idx,
                                    'cardinal-color': index_1 === idx + 1 || index_1 === idx - 1,
                                    'even-color': index_1 === idx + 2 || index_1 === idx - 2,
                                }]">
                                {{item.label}}
                            </view>
                        </picker-view-column>
                        <picker-view-column>
                            <view
                                v-for="(item,idx) in sec_list" :key="item.value"
                                :class="[`picker-view`,{
                                    'sure-color': index_2 === idx,
                                    'cardinal-color': index_2 === idx + 1 || index_2 === idx - 1,
                                    'even-color': index_2 === idx + 2 || index_2 === idx - 2,
                                }]">
                                {{item.label}}
                            </view>
                        </picker-view-column>
                        <picker-view-column>
                            <view
                                v-for="(item,idx) in third_list" :key="item.value"
                                :class="[`picker-view`,{
                                    'sure-color': index_3 === idx,
                                    'cardinal-color': index_3 === idx + 1 || index_3 === idx - 1,
                                    'even-color': index_3 === idx + 2 || index_3 === idx - 2,
                                }]">
                                {{item.label}}
                            </view>
                        </picker-view-column>
                    </picker-view>
                </view>
            </view>
        </app-layout>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                iphone_x: false,
                cat: [],
                sec_list: [],
                third_list: [],
                list: [],
                dialog: false,
                index_1: 0,
                index_2: 0,
                index_3: 0,
            }
        },
        methods: {
            cancel() {
                this.dialog = false;
                this.sec_list = [];
                this.third_list = [];
                this.index_1 = 0;
                this.index_2 = 0;
                this.index_3 = 0;
            },
            toAdd() {
                let that = this;
                let first = that.cat[that.index_1];
                let second = that.sec_list[that.index_2];
                let third = that.third_list[that.index_3];
                let para;
                if(second.label == '未选择' ) {
                    para = first;
                }else if(third.label == '未选择' ) {
                    para = second;
                }else {
                    para = third;
                }
                if(that.list.length > 0) {
                    for(let item of that.list) {
                        if(item.value == para.value) {
                            uni.showToast({
                                title: '请勿重复添加',
                                icon: 'none',
                                duration: 1000
                            });
                            return false
                        }
                    }
                }
                setTimeout(()=>{    
                    that.list.push(para)
                    that.dialog = false;
                    that.index_1 = 0;
                    that.index_2 = 0;
                    that.index_3 = 0;
                })
            },
            getCat() {
                let that = this;
                that.$request({
                    url: that.$api.app_admin.cat,
                }).then(response=>{
                    that.$hideLoading();
                    if(response.code == 0) {
                        that.cat = response.data.list;
                    }else {
                        uni.showToast({
                            title: response.msg,
                            icon: 'none',
                            duration: 1000
                        });
                    }
                }).catch(response => {
                    that.$hideLoading();
                });
            },
            delCat(index) {
                this.list.splice(index,1);
            },
            bindChange(res) {
                let that = this;
                if(res.detail.value[0] < 0) {
                    res.detail.value[0] = 0;
                }
                if(that.index_1 == res.detail.value[0]) {
                    if(that.index_2 == res.detail.value[1]) {
                        that.index_3 = res.detail.value[2];
                    }else {
                        that.index_2 = res.detail.value[1];
                        that.index_3 = 0;
                        that.third_list = [{label:'未选择',value:''}];
                        if(that.sec_list[that.index_2].children) {
                            that.third_list = that.third_list.concat(that.sec_list[that.index_2].children)
                        }
                    }
                }else {
                    that.index_1 = res.detail.value[0];
                    that.index_2 = 0;
                    that.index_3 = 0;
                    that.sec_list = [{label:'未选择',value:''}];
                    that.third_list = [{label:'未选择',value:''}];
                    if(that.cat[that.index_1].children) {
                        that.sec_list = that.sec_list.concat(that.cat[that.index_1].children);
                        if(that.sec_list[0].children) {
                            that.third_list = that.third_list.concat(that.sec_list[0].children)
                        }
                    }
                }
            },
            save() {
                uni.setStorage({
                    key: "goods_cat",
                    data: this.list
                })
                setTimeout(function() {
                    uni.navigateBack();
                }, 500)
            },
            add() {
                this.dialog = true;
                this.sec_list = [{label:'未选择',value:''}];
                this.third_list = [{label:'未选择',value:''}];
                if(this.cat[0].children) {
                    this.sec_list = this.sec_list.concat(this.cat[0].children);
                    if(this.sec_list[0].children) {
                        this.third_list = this.third_list.concat(this.sec_list[0].children)
                    }
                }
            }
        },

        onLoad(options) {
            let that = this;
            that.$showLoading({
                type: 'global',
                text: '加载中...'
            });
            uni.getStorage({
                key: 'goods_cat',
                success(res) {
                    that.list = res.data
                }
            })
            uni.getSystemInfo({
                success: function (res) {
                    if(res.model.indexOf('iPhone X') > -1 || res.model.indexOf('iPhone 11') > -1 || res.model.indexOf('iPhone11') > -1 || res.model.indexOf('iPhone12') > -1 || res.model.indexOf('Unknown Device') > -1) {
                        that.iphone_x = true;
                    }
                }
            })
            that.getCat();
        }
    }
</script>

<style scoped lang="scss">
    .cat-list {
        background-color: #fff;
        padding: #{30rpx};
        padding-left: 0;
    }
    .cat-item {
        width: auto;
        border-radius: #{33rpx};
        background-color: #ECF0FF;
        padding-left: #{30rpx};
        height: #{66rpx};
        line-height: #{66rpx};
        color: #446DFD;
        margin-left: #{30rpx};
        margin-bottom: #{30rpx};
        .close {
            width: #{60rpx};
            height: #{66rpx};
            image {
                width: #{16rpx};
                height: #{16rpx};
                display: block;
            } 
        }
    }
    .title {
        font-size: #{32rpx};
        color: #999999;
        padding-top: #{36rpx};
        background-color: #fff;
        text-align: center;
    }

    .add.iphone_x {
        height: #{170rpx};
        padding-bottom: #{50rpx};
    }

    .add {
        height: #{120rpx};
        padding: 0 #{24rpx};
        margin: 0 auto;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        border-top: #{2rpx} solid #e2e2e2;
        background-color: #fff;
        .add-btn {
            background-color: #fff;
            color: #446dfd;
            border: #{2rpx} solid #446dfd;
        }
    }

    .add>view {
        height: #{80rpx};
        width: #{300rpx};
        margin-top: #{20rpx};
        border-radius: #{40rpx};
        background-color: #446dfd;
        color: #fff;
        font-size: #{28rpx};
        text-align: center;
        line-height: #{80rpx};
    }
    
    .dialog {
        position: fixed;
        height: 100%;
        width: 100%;
        bottom: 0;
        left: 0;
        z-index: 9999;
        background-color: rgba(0, 0, 0, .3);
    }

    .dialog.iphone_x .picker-list{
        padding-bottom: #{50rpx};
    }

    .picker {
        width: 100%;
        height: #{440rpx};
        color:#999999;
    }


    .dialog.iphone_x .picker{
        height:#{490rpx};
    }

    .picker-list {
        background-color: #fff;
        padding-top: #{20rpx};
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 9999;
        height: #{520rpx};
        border-top-left-radius: #{10rpx};
        border-top-right-radius: #{10rpx};
    }

    .picker-header {
        padding: 0 #{24rpx};
        color: #446dfd;
        font-size: #{32rpx};
    }

    .dialog {
        position: fixed;
        height: 100%;
        width: 100%;
        bottom: 0;
        left: 0;
        z-index: 9999;
        background-color: rgba(0, 0, 0, .3);
    }

    .picker-view {
        line-height: #{72rpx};
        text-align:center;
        font-size: #{32rpx};
    }

    .picker-view.sure-color {
        color: #446dfd;
    }
    .picker-view.cardinal-color {
        color: #999999;
    }
    .picker-view.even-color {
        color: #cdcdcd;
    }
    picker-view {
        width: 100%;
        height: #{440rpx};
    }
</style>