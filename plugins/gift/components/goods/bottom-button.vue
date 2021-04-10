<template>
	<view class="page-width bottom-button dir-left-nowrap">
		<view
			v-if="!attr_bool"
			@click="routeGo()"
			class="home box-grow-0 dir-top-nowrap main-center cross-center"
		>
			<image src="/static/image/icon/index.png" class="icon"></image>
			<text>首页</text>
		</view>
		<button class="gift box-grow-0" v-if="goods_stock == 0" style="background-color: #CDCDCD;color: #fff;">已售罄</button>
		<button v-else :disabled="attr_bool && join_disabled" class="gift box-grow-0" :class="[`${theme}-background`]" @click="joinGift">加入礼包</button>
	</view>
</template>

<script>
	
    export default {
        name: 'bottom-button',
	    
	    props: [`theme`, `attr_bool`, `goods_stock`],
	    
	    methods: {
            joinGift() {
                this.$emit('attrSwitch', true);
            },

		    // 返回首页
            routeGo() {
                uni.reLaunch({
	                url: `/pages/index/index`
                })
            }
	    }
    }
</script>

<style scoped lang="scss">
	@import "../../css/gift.scss";
	
	.bottom-button {
		height: #{110upx};
		.home {
			width: 14%;
			height: 100%;
			background-color: #ffffff;
			.icon {
				width: #{40upx};
				height: #{40upx};
				margin-bottom: #{4upx};
			}
			text {
				font-size: #{19upx};
				line-height: 1;
				color: #707070;
				margin-top: #{4upx};
			}
		}
		.gift {
			width: 86%;
			height: #{110upx};
			line-height: #{110upx};
			text-align: center;
			font-size: #{30upx};
			margin: 0;
			padding: 0;
			border: none;
			border-radius: 0;
			color: #ffffff;
		}
		.gift-width {
			width: 100%;
		}
	}
</style>