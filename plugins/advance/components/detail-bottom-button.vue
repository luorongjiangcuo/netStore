<template>
	<view class="detail-bottom-button">
		<view class="dir-left-nowrap" v-if="active">
			<view class="but" @click="route_jump">
				<app-form-id>
					<view  class="but dir-top-nowrap main-left cross-center border-left">
						<image class="icon" src="/static/image/icon/index.png"></image>
						<text class="text">首页</text>
					</view>
				</app-form-id>
			</view>
			<view class="but" @click="set_favorite(favorite)">
				<app-form-id>
					<view  class="but dir-top-nowrap main-left cross-center" >
						<image class="icon" :src="favorite ? '/static/image/icon/icon-favorite-active.png' : '/static/image/icon/icon-favorite.png'"></image>
						<text  class="text">收藏</text>
					</view>
				</app-form-id>
			</view>
            <view class="buttons dir-left-nowrap" v-if="detail.goods_num == 0">
                <view class="dir-top-nowrap main-center cross-center" style="background-color: #CDCDCD;color: #fff;width: 100%;">
                    <text>已售罄</text>
                </view>
            </view>
			<view v-else class="buttons dir-left-nowrap">
				<view class="advance-title dir-top-nowrap main-center cross-center" :class="theme === 'b' || theme === 'a' || theme === 'f' ? theme+ '-s-back ' + 'text ' + theme : theme+ '-s-back ' + theme+ '-m-text ' + theme">
					<text>预售截止</text>
					<text>{{getDate(end_prepayment_at)}}</text>
				</view>
				<view class="pay" :class="theme+ '-m-back ' + theme" @click="set_active">
					<app-form-id>
						<text>
							支付定金
						</text>
					</app-form-id>
				</view>
			</view>
		</view>
		<view  v-if="!active" class="dir-left-nowrap">
			<view class="title dir-top-nowrap main-center cross-center" :class="theme === 'b' || theme === 'a' || theme === 'f' ? theme+ '-s-back ' + 'text ' + theme : theme+ '-s-back ' + theme+ '-m-text ' + theme">
				<text>预售截止</text>
				<text>{{getDate(end_prepayment_at)}}</text>
			</view>
			<view class="pay" :class="[theme+ '-m-back ' + theme, buttonDisabled ? 'dis-button' : '']" @click="pay">
				<text>
					支付定金
				</text>
			</view>
		</view>
	</view>
</template>

<script>
    export default {
        name: "detail-bottom-button",
	    data() {
            return {
                request_time: false,
	            once_pay: false,
            }
	    },
	    props: {
            end_prepayment_at: String,
            active: Boolean,
            favorite: Boolean,
            goods_id: Number,
            detail: Object,
            num: Number,
			theme: String,
			buttonDisabled: Boolean
	    },
	    methods: {
            set_active() {
                if (this.$user.isLogin() && !this.once_pay) {
                    this.$emit('close_attr', false);
                } else if (!this.$user.isLogin()) {
                    this.$user.getInfo().then(() => {
                    }).catch(() => {
                    });
                }
            },
            set_favorite(data) {
                if (data) {
                    this.$request({
	                    url: this.$api.user.favorite_remove,
	                    data: {
                            goods_id: this.goods_id,
	                    }
                    }).then(res => {
                        if (res.code === 0) {
                            this.$emit('favorite', !this.favorite);
                        } else {
                            uni.showModal({
                                title: '提示',
                                content: res.msg
                            })
                        }
                    })
                } else {
                    this.$request({
                        url: this.$api.user.favorite_add,
                        data: {
                            goods_id: this.goods_id,
                        }
                    }).then(res => {
                        if (res.code === 0) {
                            this.$emit('favorite', !this.favorite);
                        } else {
                            uni.showModal({
                                title: '提示',
                                content: res.msg
                            })
                        }
                    })
                }
            },
            route_jump() {
                uni.navigateTo({
	                url: `/pages/index/index`,
                });
            },
			submit(body) {
				this.once_pay = true;
				uni.showLoading({
					title: '生成订单中...',
					mask: true,
				});
				this.$emit('close_attr', true);
				this.get_submit(body).then(response => {
					this.get_token(response.data);
				});
			},
            pay() {
            	if (this.buttonDisabled) return;
				let body = {
					goods_id: this.detail.id,
					goods_attr_id: 0,
					goods_num: `${this.num}`,
					advance_goods_id: this.detail.advanceGoods.id,
				};
				let attr = ``;
				let attr_groups = this.detail.attr_groups;
				for (let i = 0; i < attr_groups.length; i++) {
					let attr_list = attr_groups[i];
					for (let j = 0; j < attr_list.attr_list.length; j++) {
						if (attr_list.attr_list[j].active) {
							attr += `:${attr_list.attr_list[j].attr_id}`
						}
					}
				}
				for (let i = 0; i < this.detail.attr.length; i++) {
					if (this.detail.attr[i].sign_id === attr.substring(1)) {
						if (this.num > this.detail.attr[i].stock) {
							uni.showToast({
								title: '库存不足',
								icon: 'none'
							});
							return;
						}
						body.goods_attr_id = this.detail.attr[i].id;
					}
				}
				this.$subscribe(this.detail.template_message).then(() => {
					this.submit(body);
				}).catch(() => {
					this.submit(body);
				});
            },
		    get_token(data) {
                this.$request({
	                url: this.$api.advance.pay_data,
	                method: 'post',
	                data: {
	                    ...data
	                },
                }).then(response => {
                    if (response.code === 0) {
                        if (response.data.hasOwnProperty('id')) {
                            uni.hideLoading();
                            this.$payment.pay(response.data.id).then(() => {
                                this.once_pay = false;
                                // 支付成功
                                uni.navigateTo({
                                    url: `/plugins/advance/order/order`
                                })
                            }).catch(() => {
                                // 支付失败
                                this.once_pay = false;
                                uni.navigateTo({
                                    url: `/plugins/advance/order/order`
                                })
                            });
                        } else {
                             setTimeout(() => {
                                this.get_token(data);
                            }, 1000);
                        }
                    } else {
                        uni.hideLoading();
                        uni.showModal({
	                        title: '提示',
	                        content: response.msg,
                        })
                    }
                });
		    },
		    async get_submit(body) {
                const response = await this.$request({
                    url: this.$api.advance.order_submit,
                    method: 'post',
                    data: {
                        ...body,
                    }
                });
                if (response.code === 0) {
                    return response;
                } else if (response.code === 1) {
                    uni.showModal({
	                    title: '提示',
	                    content: response.msg,
                        success(res){
                            if(res.cancel){
                                this.$emit('request', this.goods_id);
                            }else if(res.confirm){
                               uni.navigateBack();
                            }
                        }
                    });
                }
		    },
            getDate(end_prepayment_at) {
                let newDate = new Date(end_prepayment_at.replace(/-/g, '/'));
                newDate.setDate(newDate.getDate());
                let month = newDate.getMonth() + 1;
                let day = newDate.getDate();
                let mm = "'" + month + "'";
                let dd = "'" + day + "'";
                if(mm.length == 3) {
                    month = "0" + month;
                }
                if(dd.length == 3) {
                    day = "0" + day;
                }
                let hour = newDate.getHours();//得到小时
                let minu = newDate.getMinutes();//得到分钟
                let sec = newDate.getSeconds();//得到秒
                sec = `${sec}`;
                minu = `${minu}`;
                hour = `${hour}`;
                if (hour.length === 1) {
                    hour = `0${hour}`
                }
                if (minu.length === 1) {
                    minu = `0${minu}`
                }
                if (sec.length === 1) {
                    sec = `0${sec}`
                }
                return newDate.getFullYear() + "." + month + "." + day + ' ' + hour +':' + minu + ':' + sec;
            },
	    },
    }
</script>

<style scoped lang="scss">
	.detail-bottom-button {
		height: #{110rpx};
		width: #{750rpx};
		border-top: #{1rpx} solid #e3e3e3;
		.dir-left-nowrap {
			view {
				height: #{110rpx};
			}
			.but {
				width: #{105rpx};
				.text {
					font-size: #{20rpx};
					color: #707070;
					margin-top: #{9rpx};
				}
			}
			.border-left {
				border-right: #{1rpx} solid #e3e3e3;
			}
			.buttons {
				width: #{272+272rpx};
			}
			.title {
				width: 50%;
				height: #{110rpx};
				font-size: #{24rpx};
				margin: 0;
			}
			.pay {
				width: 50%;
				height: #{110rpx};
				line-height: #{110rpx};
				text-align: center;
				color: #ffffff;
				font-size: #{28rpx};
			}
		}
		.icon {
			width: #{40rpx};
			height: #{40rpx};
			margin-top: #{21rpx};
		}
		.text {
			color: #ffffff;
		}
	}
	.advance-title {
		width: 50%;
		height: #{110rpx};
		font-size: #{24rpx};
		margin: 0;
	}
	.dis-button {
		background-color: #dddddd;
	}
</style>