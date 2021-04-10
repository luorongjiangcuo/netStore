<template>
	<scroll-view scroll-x class="app-head-navigation dir-left-nowrap cross-center">
		<text class="head-text" :class="item.active === true ? 'app-active ' + theme + '-m-back ' + theme : ''"
			  v-for="(item, index) in list"
			  :key="index"
			  @click="active(item)">
			{{item.name}}
		</text>
	</scroll-view>
</template>

<script>
    export default {
        name: 'app-head-navigation',
	    props: {
            list: {
                type: Array,
	            default: function() {
	                return [];
	            }
            },
			theme: String
	    },
	    methods: {
            active(item) {
                this.$emit('click', item);
            }
	    }
    }
</script>

<style scoped lang="scss">
	.app-head-navigation {
		width: #{750rpx};
		height: #{100rpx};
		line-height: #{100rpx};
		border-top: #{1rpx} solid #e2e2e2;
		border-bottom: #{1rpx} solid #e2e2e2;
		padding: #{0 24rpx};
		white-space:nowrap;
		background-color: #ffffff;
		.head-text {
			display: inline-block;
			height: #{56rpx};
			padding: 0 #{20rpx};
			font-size: #{28rpx};
			line-height: #{56rpx};
			border-radius: #{28rpx};
			margin-right: #{32rpx};
			white-space:nowrap;
		}

	}
	.app-active {
		color: white;
	}
</style>