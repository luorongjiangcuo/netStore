<template>
	<view class="app-button-button dir-left-nowrap">
		<view class="app-home dir-top-nowrap main-center cross-center" @click="router">
            <image class="app-icon" src="../../../static/image/icon/index.png"></image>
            <text class="app-text">首页</text>
		</view>
		<view v-if="item.goods_stock > 0 && start_time" class="app-button dir-left-nowrap">
			<view v-if="is_alone_buy === 1" @click.stop="turnOn(false)" class="app-but but dir-top-nowrap box-grow-1" :class="theme === 'b' || theme === 'f' ? theme + '-s-back ' + theme + ' ' + 'text' : theme === 'a' ? 'app-single-button' : theme + '-s-back ' + theme + ' ' + theme + '-m-text'" >
                <text class="price">
                    {{singlePrice}}
                </text>
                <text class="app-text">单独购买</text>
			</view>
			<view class="app-but but dir-top-nowrap box-grow-1" style="color: #ffffff;" :class="theme === 'a' ? 'app-pt-button' : theme+ '-m-back ' + theme"  @click="turnOn(true)">
                <text class="price">{{group_price}}</text>
                <text class="app-text">{{groups[set_group_num].groups.people_num}}人拼团</text>
			</view>
		</view>
        <view class="app-button dir-left-nowrap" v-else>
            <view class="app-but app-but-width" style="background-color: #CDCDCD;color: #fff;">
                <view class="but dir-top-nowrap">
                    <text class="out-text" v-if="item.goods_stock === 0">已售罄</text>
                    <text class="out-text" v-else-if="!start_time">活动未开始</text>
                </view>
            </view>
        </view>
	</view>
</template>

<script>

    export default {
        name: 'app-bottom-button',
	    
	    props: {
            selectAttr: Object,
            selectGroupAttrId: {
                type: [String, Number]
            },
            is_alone_buy: {
                type: Number,
            },
			groups: {
                type: Array,
	            default() {
                    return [];
	            }
            },
            level_show: {
                type: Number,
	            default() {
                    return 0;
                }
            },
			member_price_min: {
                type: String,
                default() {
                    return '0.00';
                }
            },

            price: {
                type: String,
	            default() {
                    return '0.00';
	            }
            },
            price_member_min: {
                type: Number,
	            default() {
                    return 0;
                }
            },
		    pt: {
                type: Boolean,
		    },
            item: Object,
			start_time: Boolean,
			end_time: Boolean,
			theme: String,
	    },
	    
	    data() {
            return {
                group_price: ''
            }
	    },
	    mounted() {
			this.get_group();
	    },
	    methods: {
            turnOn(bool) {
                this.$emit('click', bool);
            },
		    get_group() {
                if (this.$validation.isEmpty(this.selectAttr)) {
                    if (this.level_show === 1) {
                        if (Number(this.member_price_min) === 0) {
                            this.group_price = '免费';
                        } else {
                            this.group_price = `￥${this.member_price_min}`;
                        }
                    } else {
                        if (Number(this.groups[0].price_min) ===  0) {
                            this.group_price =  '免费';
                        } else {
                            this.group_price = `￥${this.groups[0].price_min}`;
                        }
                    }
                } else {
                    if (this.level_show === 1) {
                        if (Number(this.selectAttr.price_member) === 0) {
                            this.group_price = '免费';
                        } else {
                            this.group_price = `￥${this.selectAttr.price_member}`;
                        }
                    } else {
                        if (Number(this.selectAttr.price) ===  0) {
                            this.group_price = '免费';
                        } else {
                            this.group_price = `￥${this.selectAttr.price}`;
                        }
                    }
                }
		    },
            router() {
                uni.reLaunch({
                    url: `/pages/index/index`
                });
            }
	    },
	    computed: {
            // 单价
            singlePrice() {
                if (this.pt) return;
                if (this.$validation.isEmpty(this.selectAttr)) {
                    if (this.level_show === 1) {
                        if (this.price_member_min === 0) {
                            return '免费';
                        } else {
                            let price = this.price_member_min;
                            return `￥${price.toFixed(2)}`
                        }
                    } else {
                        if (Number(this.price) ===  0) {
                            return '免费';
                        } else {
                            return `￥${this.price}`
                        }
                    }
                } else {
                    if (this.level_show === 1) {
                        if (Number(this.selectAttr.price_member) === 0) {
                            return '免费';
                        } else {
                            return `￥${this.selectAttr.price_member}`;
                        }
                    } else {
                        if (Number(this.price) ===  0) {
                            return '免费';
                        } else {
                            return `￥${this.selectAttr.price}`
                        }
                    }
                }
            },
		    
		    set_group_num() {
                for (let i = 0; i < this.groups.length; i++) {
                    if (this.groups[i].groups.id == this.selectGroupAttrId) {
                        return i;
                    }
                }
		    }
	    },
	    
	    watch: {
            selectAttr: {
                handler() {
                    if (this.pt) {
                        if (this.$validation.isEmpty(this.selectAttr)) {
                            if (this.level_show === 1) {
                                if (Number(this.member_price_min) === 0) {
                                    this.group_price = '免费';
                                } else {
                                    this.group_price =  `￥${this.member_price_min}`;
                                }
                                
                            } else {
                                if (Number(this.groups[0].price_min) ===  0) {
                                    this.group_price =  '免费';
                                } else {
                                    this.group_price =  `￥${this.groups[0].price_min}`;
                                }
                            }
                            
                        } else {
                            if (this.level_show === 1) {
                                if (Number(this.selectAttr.price_member) === 0) {
                                    this.group_price =  '免费';
                                } else {
                                    this.group_price =  `￥${this.selectAttr.price_member}`;
                                }
                            } else {
                                if (Number(this.selectAttr.price) ===  0) {
                                    this.group_price =  '免费';
                                } else {
                                    this.group_price =  `￥${this.selectAttr.price}`;
                                }
                            }
                        }
                    }
                },
	            immediate: true,
	            deep: true,
            },

			groups: {
            	handler(data) {
            		if (data.length > 0) {
						this.$nextTick(() => {
							this.get_group();
						})
					}
				},
				immediate: true
			}
	    }
    }
</script>

<style scoped lang="scss">
    .app-pt-button {
        background: linear-gradient(140deg, #ff9460, #ff5c5c);
        text {
            color: white;
        }
    }
	.app-button-button {
		height: #{110rpx};
		width: #{750rpx};
		.app-home {
			width: 13%;
			height: #{110rpx};
			background-color: white;
			.app-icon {
				width: #{40rpx};
				height: #{40rpx};
			}
			.app-text {
				font-size: #{19rpx};
				color: #707070;
			}
		}
		.app-button {
			width: 87%;
			height: #{110rpx};
			
			.app-but-width {
				width: 100% !important;
			}
			
			.app-but {
				height: #{110rpx};
				width: 50%;
			}
	
			.price {
				font-size: #{28rpx};
				margin-top: #{18rpx};
			}
			.app-text {
				font-size: #{24rpx};
				margin-top: #{8rpx};
			}
			.out-text {
                line-height: #{110rpx};
            }
			.app-single-button {
				background-color: #feeeee;
				text {
					color: #ff5c5c;
				}
			}

			.but {
				text-align: center;
			}
		}
	}
	.text {
		color: #ffffff;
	}
</style>