<template>
	<app-layout>
		<view class="app-order-details">
			<app-write-off-code :hidden="hidden" :itemId="item.id" @hiden="hidden = false"></app-write-off-code>
			<view v-if="refundBoolean">
				<app-prompt-box @click="close" text="是否确认申请退款该订单"></app-prompt-box>
			</view>
			<view v-if="payBoolean">
				<app-prompt-box @click="goPay" text="是否确认支付该订单"></app-prompt-box>
			</view>
			<view v-if="cancelBoolean"></view>
			<view class="app-image-title dir-left-nowrap">
				<image class="app-image" :src="item.store.cover_url"></image>
				<view class="app-content dir-top-nowrap">
					<text class="app-content-title">{{item.store.name}}</text>
					<view class="app-prices dir-left-nowrap main-right cross-center">
						<text class="app-old-price">{{item.total_goods_original_price}}</text>
						<text class="app-new-price">{{item.total_pay_price}}</text>
					</view>
				</view>
			</view>
			<text class="app-title">门店信息</text>
			<view class="app-store">
				<app-store :address="item.store.address" :business_hours="item.store.business_hours" :storeNum="item.store_list.length" :goods_id="item.id" :store_id="item.store.id"  :name="item.store.name" :sotreNum="item.store.length" :title="title" :borderStyle="borderStyle" :icon="icon"></app-store>
			</view>
			<text class="app-title">订单信息</text>
			<view class="app-order-information dir-top-nowrap main-left">
				<text>姓名: {{item.name}}</text>
				<text>手机号: {{item.mobile}}</text>
				<text>订单号: {{item.order_no}}</text>
				<text>下单时间: {{item.created_at}}</text>
			</view>
			<text class="app-title" v-if="item.order_form.length > 0">其他信息</text>
			<view class="app-other" v-if="item.order_form.length > 0">
				<block v-for="(it, index) in item.order_form" :key="index" v-if="it.value && [`,`,``].indexOf(it.value.toString()) === -1">
					<template v-if="it.key === 'img_upload'">
						<view class="app-in dir-top-nowrap">
							<text class="app-top">{{it.label}}</text>
                            <view v-if="Array.isArray(it.value)">
                                <block v-for="(img,key) in it.value" :key="key">
                                    <image class="app-image" :src="img"></image>
                                </block>
                            </view>
                            <image v-else class="app-image" :src="it.value"></image>
						</view>
					</template>
					<template v-else>
						<view class="app-in dir-top-nowrap" :class="{'app-border': item.order_form.length-1 !== index}" >
							<text class="app-top" >{{it.label}}</text>
							<text class="app-bottom" >{{it.value}}</text>
						</view>
					</template>
				</block>
			</view>
			<view class="empty" v-if="item.cancel_status == 0  && item.is_sale == 0"></view>
			<view class="app-buttons dir-left-nowrap main-right cross-center" v-if="item.cancel_status == 0  && item.is_sale == 0">
				<view class="app-button" v-if="item.is_pay == 0">
					<app-form-id >
						<button class="app-button app-red" @click="payBoolean = true">去支付</button>
					</app-form-id>
				</view>
				<view class="app-button" v-if="item.is_pay == 0">
					<app-form-id >
						<button class="app-button app-white">申请取消</button>
					</app-form-id>
				</view>
				<view class="app-button" v-if="item.is_confirm == 1" @click="evaluation">
					<app-form-id>
						<button class="app-button  app-red" >去评价</button>
					</app-form-id>
				</view>
				<view class="app-button" v-if="item.cancel_status != 2 && item.is_pay == 1 && item.is_confirm == 0">
					<app-form-id>
						<view class="app-button app-red" @click="useImmediately">立即使用</view>
					</app-form-id>
				</view>
				<view class="app-button" v-if="item.cancel_status != 2 && item.is_pay == 1 && item.is_confirm == 0">
					<app-form-id >
						<view class="app-button app-white" @click="refundBoolean = true">申请退款</view>
					</app-form-id>
				</view>
			</view>
		</view>
	</app-layout>
</template>

<script>
    import appStore from '../components/app-store.vue';
    import appPromptBox from '../../../components/basic-component/app-prompt-box/app-prompt-box.vue';
    import appWriteOffCode from '../components/app-write-off-code.vue';
    
	let borderStyle = false;
	let icon = false;
	let title = false;
    export default {
        name: 'orderDetails',
	    components: {
            'app-store': appStore,
		    'app-prompt-box': appPromptBox,
            'app-write-off-code': appWriteOffCode,
	    },
	    data() {
            return {
                item: null,
                file_path: '',
	            hidden: false,
                refundBoolean: false,
	            payBoolean: false,
                cancelBoolean: false,
            }
	    },
        onLoad(options) {
            this.request(options);
        },
	    methods: {
            request(options) {
                this.$request({
                    url: this.$api.book.order_detail,
                    data: {
                        id: options.id,
                    }
                }).then(response => {
                    this.item = response.data.detail;
                })
            },
            useImmediately() {
                this.hidden = true;
            },
            close(boolean) {
                if (boolean) {
                    this.$request({
	                    url: this.$api.order.cancel,
	                    data: {
	                        id: this.item.id
	                    }
                    }).then(response => {
                        if (response.code === 0) {
                            this.refundBoolean = false;
                            this.request({
	                            id: this.item.id
                            });
                        }
                    });
                } else {
                    this.refundBoolean = false;
                }
            },
            goPay(boolean) {
                this.payBoolean = false;
                if (boolean) {
                   this.$request({
	                   url: this.$api.order.list_pay_data,
	                   data: {
	                       id: this.item.id
	                   }
                   }).then(response => {
                       if (response.code === 0) {
                           this.$payment.pay(response.data.id).then(msg => {
                               // 支付成功
	                           this.item.is_pay = 1;
                           }).catch(msg => {
                               // 支付失败
                           });
                       } else {
                       
                       }
                   })
                } else {
                    this.payBoolean = false;
                }
            },
            evaluation() {
				uni.navigateTo({
					url: `/pages/order/appraise/appraise?id=${this.item.id}`
				});
            }
	    }
    }
</script>

<style scoped lang="scss">
	.app-order-details {
		background-color: #f7f7f7;
		width: #{750rpx};
		padding: #{20rpx} #{24rpx};
		
		.app-title {
			display: inline-block;
			margin-top: #{32rpx};
			margin-bottom: #{24rpx};
			color: #999999;
			font-size: #{26rpx};
		}
		>view {
			width: #{750-48rpx};
			border-radius: #{16rpx};
			background-color: white;
		}
		.app-image-title {
			padding: #{24rpx};
			.app-image {
				width: #{208rpx};
				height: #{160rpx};
			}
			.app-content {
				width: #{750-48-48-24-208rpx};
				margin-left: #{24rpx};
				height: #{160rpx};
				.app-content-title {
					display: inline-block;
					margin-top: #{10rpx};
					font-size: #{28rpx};
					color: #353535;
					word-break: break-all;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					height: #{64rpx};
					width: 100%;
				}
				.app-prices {
					padding-top: #{50rpx};
					>text:before {
						content: '￥';
					}
					.app-old-price {
						color: #a4a4a4;
						font-size: #{24rpx};
						text-decoration:line-through;
					}
					.app-new-price {
						margin-left: #{24rpx};
						font-size: #{32rpx};
						color: #ff4544;
					}
				}
			}
		}
		.app-order-information {
			padding: #{28rpx} #{24rpx} #{12rpx} #{24rpx};
			>text {
				font-size: #{28rpx};
				color: #353535;
				margin-bottom: #{16rpx};
			}
		}
		.app-other {
			padding: 0 #{24rpx};
			.app-in {
				padding: #{28rpx} 0;
				font-size: #{28rpx};
				.app-top {
					margin-bottom: #{24rpx};
					color: #999999;
				}
				.app-bottom {
					color: #353535;
				}
			}
			.app-border {
				border-bottom: #{1rpx} solid #e2e2e2;
			}
			.app-image {
				width: #{150rpx};
				height: #{150rpx};
                margin: #{5rpx};
				border-radius: #{8rpx};
			}
		}
		.app-buttons {
			height: #{102rpx};
			width: #{750rpx};
			background-color: white;
			border-top: #{1rpx} solid #e2e2e2;
			position: fixed;
			left: 0;
			bottom: 0;
			>view {
				margin-right: #{15rpx};
			}
			.app-button {
				height: #{60rpx};
				line-height: #{60rpx};
				font-size: #{28rpx};
				border-radius: #{25rpx};
				display: inline-block;
			}
			.app-red {
				border: #{1rpx} solid #ff4544;
				background-color: #fff5f5;
				color: #ff4544;
				padding: 0 #{30rpx};
			}
			.app-white {
				background-color: white;
				border: #{1rpx} solid #d4d4d4;
				color: #565656;
				padding: 0 #{30rpx};
			}
		}
	}

	.empty {
		height: #{102rpx};
		width: #{750rpx};
		background-color: #f7f7f7 !important;
	}
</style>