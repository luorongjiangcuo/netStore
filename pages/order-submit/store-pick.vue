<template>
    <app-layout>
        <view class="page">
            <template v-if="list !== null">
                <view v-if="!list.length" class="no-data">暂无门店</view>
                <view v-else class="main-center dir-top-nowrap list">
                    <view class="manual-location">
                        <app-button type="general" @click="selectLocation">手动定位</app-button>
                        <view v-if="locationAddress" class="location-address">
                            {{locationAddress}}
                        </view>
                    </view>
                    <view v-for="(item,index) in list"
                          :key="index"
                          @click="setData(item.id, index)"
                          class="dir-left-nowrap item">
                        <view class="box-grow-0">
                            <image :src="item.cover_url" class="avatar"></image>
                        </view>
                        <view class="box-grow-1">
                            <view class="name mb-8">{{item.name}}</view>
                            <view class="mobile mb-8">电话: {{item.mobile}}</view>
                            <view class="distance">距离: {{item.distance}}</view>
                        </view>
                    </view>
                </view>
            </template>
        </view>
    </app-layout>
</template>

<script>
    export default {
        name: 'store-pick',
        data() {
            return {
                mchIndex: null,
                list: null,
                firstGoodsId: null,
                plugin: null,
                manualLocation: false,
                longitude: '',
                latitude: '',
                locationAddress: null,
            };
        },
        onLoad(options) {
            this.mchIndex = options.mchIndex;
            this.firstGoodsId = options.firstGoodsId || null;
            this.plugin = options.plugin || null;
            
        },
        onShow() {
            if (!this.manualLocation) this.getLocation();
        },
        methods: {
            getLocation() {
                uni.showLoading({
                    mask: true,
                    title: '正在获取位置信息',
                });
                uni.getLocation({
                    success: (e) => {
                        uni.hideLoading();
                        this.longitude = e.longitude;
                        this.latitude = e.latitude;
                        this.loadData();
                    },
                    fail: () => {
                        uni.hideLoading();
                        uni.showModal({
                            title: '提示',
                            content: '获取位置信息失败，需要授权获取您的位置信息',
                            showCancel: false,
                            confirmText: '打开授权',
                            success(e) {
                                if (e.confirm) {
                                    uni.openSetting({});
                                }
                            }
                        });
                    },
                });
            },
            selectLocation() {
                this.manualLocation = true;
                uni.chooseLocation({
                    success: e => {
                        this.longitude = e.longitude;
                        this.latitude = e.latitude;
                        this.locationAddress = (e.address || '') + ' ' + e.name || '';
                        this.locationAddress = this.locationAddress.trim();
                        this.loadData();
                    }
                });
            },
            loadData() {
                uni.showLoading({
                    mask: true,
                    title: '加载中',
                });
                this.$request({
                    url: this.plugin === 'booking' ? this.$api.book.store_list : this.$api.order.store_list,
                    data: {
                        keyword: '',
                        longitude: this.longitude,
                        latitude: this.latitude,

                        goods_id: this.firstGoodsId,
                    }
                }).then(response => {
                    uni.hideLoading();
                    if (response.code === 0) {
                        this.list = response.data.list;
                    } else {
                    }
                }).catch(() => {
                    uni.hideLoading();
                });
            },
            setData(data) {
                if (this.plugin === 'gift') {
                    let store_id = this.$store.state.gift.store_id;
                    store_id = data;
                    this.$store.commit('gift/storeId', data);
                } else {
                    const formData = this.$store.state.orderSubmit.formData;
                    formData.list[this.mchIndex].store_id = data;
                    this.$store.commit('orderSubmit/mutSetFormData', formData);
                }
                uni.navigateBack();
            },
        }
    }
</script>

<style lang="scss">
    page {
        background: $uni-weak-color-two;
    }
</style>

<style scoped lang="scss">
    .mb-8 {
        margin-bottom: #{8rpx};
    }

    .page {
        border-top: #{1rpx} solid $uni-weak-color-one;
    }

    .manual-location {
        padding: #{24rpx};

        .location-address {
            padding: #{12rpx} 0 0;
            font-size: $uni-font-size-general-two;
            color: $uni-general-color-two;
        }
    }

    .list {
        .item {
            padding: #{24rpx};
            background: #fff;
            border-bottom: #{1rpx} solid $uni-weak-color-one;

            .avatar {
                width: #{140rpx};
                height: #{140rpx};
                margin-right: #{24rpx};
                border-radius: #{999rpx};
                box-shadow: 0 0 #{1rpx} rgba(0, 0, 0, .25);
            }

            .name {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .mobile, .distance {
                font-size: $uni-font-size-general-one;
                color: $uni-general-color-two;
            }
        }
    }
</style>
