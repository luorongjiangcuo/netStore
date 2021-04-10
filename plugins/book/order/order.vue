<template>
	<app-layout>
		<view class="order">
			<view class="header dir-left-nowrap">
				<view class="header-item box-grow-1" @click="setActiveHeader(0)">
					<app-form-id>
						<text :class="status === 0 ? getTheme + '-m-text ' + getTheme : 'no-active'">
							全部
						</text>
					</app-form-id>
				</view>
				<view class="header-item box-grow-1" @click="setActiveHeader(1)">
					<app-form-id>
						<text :class="status === 1 ? getTheme + '-m-text ' + getTheme : 'no-active'">
							待支付
						</text>
					</app-form-id>
				</view>
				<view class="header-item box-grow-1" @click="setActiveHeader(2)">
					<app-form-id>
						<text :class="status === 2 ? getTheme + '-m-text ' + getTheme : 'no-active'">
							待使用
						</text>
					</app-form-id>
				</view>
				<view class="header-item box-grow-1" @click="setActiveHeader(4)">
					<app-form-id>
						<text :class="status === 4 ? getTheme + '-m-text ' + getTheme : 'no-active'">
							待评价
						</text>
					</app-form-id>
				</view>
			</view>
			<view class="product-list" v-if="list.length > 0">
				<view class="product" v-for="(item, index) in list" :key="index">
					<view class="top dir-left-nowrap main-between" @click.stop="jump(item)">
						<view class="image-content">
							<image :src="item.detail[0].goods_info.pic_url"></image>
							<view class="tip-angle" v-if="item.cancel_status == 2">
								退款中
							</view>
							<view class="tip-angle" v-else-if="item.cancel_status == 1 && item.is_pay == 0">
								已取消
							</view>
							<view class="tip-angle" v-else-if="item.cancel_status == 1">
								已退款
							</view>
							<view class='tip-angle' v-else-if="item.is_comment == 1">
								已评价
							</view>
							<view class="tip-angle" v-else-if="item.is_pay == 0">
								待付款
							</view>
							<view class="tip-angle" v-else-if="item.is_confirm == 0">
								待使用
							</view>
							<view class="tip-angle" v-else-if="item.is_confirm == 1">
								已使用
							</view>
						</view>
						<view class="text-content dir-top-nowrap main-between">
							<view class="text-top">
								<view class="name">
									{{item.detail[0].goods_info.name}}
								</view>
								<view class="attr dir-left-nowrap">
									<view :key="n" v-for="(attr, n) in item.detail[0].goods_info.attr_list">
										{{attr.attr_group_name}}: {{attr.attr_name}}
									</view>
								</view>
							</view>
							<view class="text-bottom dir-left-nowrap main-right cross-center">
								<view class="original-price">￥{{item.detail[0].total_original_price}}</view>
								<view class="current-price" :class="getTheme + '-m-text ' + getTheme">￥{{item.detail[0].total_price}}</view>
							</view>
						</view>
					</view>
					<view class="bottom dir-left-nowrap main-right cross-center"
					      v-if="item.cancel_status === '0' && item.is_sale === '0' && item.sale_status === '0' && item.is_comment == 0"
					>
						<view class="but no" @click.stop="operationOrder(1, item)" v-if="item.cancel_status != 2 && item.is_pay == 1 && item.is_confirm == 0">
							<app-form-id>
								申请退款
							</app-form-id>
						</view>
						<view class="but " :class="getTheme + '-m-text ' + getTheme + '-m-back-o ' + getTheme"  @click.stop="operationOrder(2, item)" v-if="item.cancel_status != 2 && item.is_pay == 1 && item.is_confirm == 0">
							<app-form-id>
								立即使用
							</app-form-id>
						</view>
						<view class="but " :class="getTheme + '-m-text ' + getTheme + '-m-back-o ' + getTheme"  v-if="item.sale_status == 0 && item.is_sale == 0 && item.is_confirm == 1 && item.is_comment == 0">
							<app-jump-button form :url="`/pages/order/appraise/appraise?id=${item.id}`">
								去评价
							</app-jump-button>
						</view>
						<view class="but no" @click.stop="operationOrder(3, item)" v-if="item.is_pay == 0">
							<app-form-id>
								申请取消
							</app-form-id>
						</view>
						<view class="but " :class="getTheme + '-m-text ' + getTheme + '-m-back-o' + getTheme"  v-if="item.is_pay == 0" @click.stop="operationOrder(4, item)">
							<app-form-id>
								去支付
							</app-form-id>
						</view>
					</view>
				</view>
			</view>
			<view class="model" v-if="model" @click.stop="model = false">
				<view class="model-content" v-if="modelType !== 2">
					<view class="model-title-top">提示</view>
					<view class="model-header" v-if="modelType === 1">是否申请退款</view>
					<view class="model-header" v-else-if="modelType === 3">是否申请取消订单</view>
					<view class="model-header" v-else-if="modelType === 4">申请支付</view>
					<view class="model-bottom dir-left-nowrap cross-center" v-if="modelType !== 2">
						<view class="model-but" @click.stop="cancle">
							<app-form-id>
								取消
							</app-form-id>
						</view>
						<view class="model-line"></view>
						<view class="model-but" @click.stop="determine">
							<app-form-id>
								确定
							</app-form-id>
						</view>
					</view>
				</view>
				<view class="model-use" v-if="modelType === 2">
					<view class="image" @click.stop="model = false"></view>
					<view class="model-title">核销码</view>
					<image class="model-image" :src="writeOffChart" mode="aspectFill"></image>
				</view>
			</view>
		</view>
	</app-layout>
</template>

<script>
    import {mapGetters} from "vuex";

	export default {
        name: "order",
	    data() {
            return {
                status: 0,
	            list: [],
	            page: 1,
                over: false,
                model: false,
	            modelType: 0,
	            setItem: {},
                writeOffChart: '',
            }
	    },
	    onLoad() {
            this.request({
                status: this.status,
                page: this.page,
            }).then(res => {
                if (res) {
                    this.list = res.list;
                }
            });
	    },
		computed: {
			...mapGetters('mallConfig', {
				getTheme: 'getTheme',
			}),
		},
	    onReachBottom() {
	        if (!this.over) {
	            this.page+=1;
	            this.pagingRequest({
		            status: this.status,
		            page: this.page,
	            });
	        }
	    },
	    methods: {
            setActiveHeader(data) {
                this.page = 1;
                this.status = data;
                this.over = false;
                this.list = [];
                this.request({
	                status: this.status,
	                page: this.page,
                }).then(res => {
                    if (res) {
						this.list = res.list;
                    }
                })
            },
		    async request({status, page}) {
                const res = await this.$request({
	                url: this.$api.book.order_list,
	                data: {
                        status,
                        page,
	                }
                });
                if (res.code === 0) {
                    return res.data;
                } else {
                    return false;
                }
		    },
            operationOrder(number, data) {
                this.model = true;
                this.setItem = data;
                switch (number) {
	                case 1:
                        this.modelType = 1;
	                    break;
	                case 2:
                        uni.showLoading({
                            mask: true,
                            title: '加载中',
                        });
                        this.modelType = 2;
                        this.$request({
	                        url: this.$api.book.clerk_code,
	                        data: {
	                            id: data.id,
	                        }
                        }).then(res => {
                            uni.hideLoading();
                            if (res.code === 0) {
                                this.writeOffChart = res.data.file_path;
                            } else if (res.code === 1) {
                                this.model = false;
                                uni.showModal({
	                                title: '提示',
	                                content: res.msg,
                                });
                            }
                        });
	                    break;
	                case 3:
                        this.modelType = 3;
	                    break;
	                case 4:
                        this.modelType = 4;
	                    break;
                }
            },
            pagingRequest({status, page}) {
                this.request({
	                status,
	                page,
                }).then(response => {
                    if (response) {
                        if (response.list.length > 0) {
                            this.list = [...this.list, ...response.list];
                        } else {
                            this.over = true;
                        }
                    }
                })
            },
            cancle() {
                this.modelType = 0;
                this.model = false;
            },
            determine() {
                uni.showLoading({
                    mask: true,
                    title: '加载中',
                });
                switch (this.modelType) {
                    case 1:
                        this.$request({
	                        url: this.$api.order.cancel,
	                        data: {
	                            id: this.setItem.id,
	                        }
                        }).then(res => {
                            if (res.code === 0) {
                                uni.hideLoading();
                                this.model = false;
                                for (let i = 0; i < this.list.length; i++) {
                                    if (this.setItem.id === this.list[i].id) {
                                        this.list[i].cancel_status = '2';
                                        if (this.status === 2) {
                                            this.$delete(this.list, i);
                                        }
                                    }
                                }
                            }
                        });
                        break;
                    case 3:
                        this.$request({
                            url: this.$api.order.cancel,
                            data: {
                                id: this.setItem.id,
                            }
                        }).then(res => {
                            if (res.code === 0) {
                                uni.hideLoading();
                                this.model = false;
                                for (let i = 0; i < this.list.length; i++) {
                                    if (this.setItem.id === this.list[i].id) {
                                        this.list[i].cancel_status = '1';
                                        this.list[i].is_pay = '0';
                                        if (this.status === 1) {
                                            this.$delete(this.list, i);
                                        }
                                    }
                                }
                            }
                        });
                        break;
                    case 4:
                        this.$request({
	                        url: this.$api.order.list_pay_data,
	                        data: {
	                            id: this.setItem.id,
	                        }
                        }).then(res => {
                            if (res.code === 0) {
                                uni.hideLoading();
                                this.model = false;
                                this.$payment.pay(res.data.id).then(() => {
                                    for (let i = 0; i < this.list.length; i++) {
                                        if (this.setItem.id === this.list[i].id) {
                                            this.list[i].is_pay = '1';
                                            if (this.status === 1) {
                                                this.$delete(this.list, i);
                                            }
                                        }
                                    }
                                }).catch(() => {
                                })
                            }
                        });
                        break;
                }
            },
            jump(data) {
                this.$jump({
                    open_type: 'navigate',
	                url: `/plugins/book/orderDetails/orderDetails?id=${data.id}`
                });
            }
	    }
    }
</script>

<style scoped lang="scss">
	@import './order.scss';
</style>