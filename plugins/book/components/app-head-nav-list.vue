<template>
	<scroll-view scroll-x class="app-head-nav-list">
		<text class="app-item" v-for="(item, index) in catList"
		      :key="index"
		      :class="cat_id == item.id && theme == 'a' ? 'app-active-item default-item' : cat_id == item.id && theme != 'a' ? 'app-active-item ' + theme + ' ' + theme + '-m-back' : ''"
		      @click="active(item.id)"
		>{{item.name}}</text>
	</scroll-view>
</template>

<script>
    export default {
        name: "app-head-nav-list",
	    
        props: [`catList`, `cat_id`, `theme`],
	    
        methods: {
            active(id) {
                this.$emit('click', id);
            },
        },
    }
</script>

<style scoped lang="scss">
	.app-head-nav-list {
		width: #{750rpx};
		height: #{88rpx};
		white-space: nowrap;
		background: #ffffff;
		.app-item {
			display: inline-block;
			height: #{56rpx};
			line-height: #{56rpx};
			font-size: #{28rpx};
			text-align: center;
			color: #666666;
			margin: #{16rpx} #{23rpx};
			border-radius: #{30rpx};
			padding: 0 #{24rpx};
		}
		.app-active-item {
			color: #ffffff;
		}
		.default-item {
			background: linear-gradient(140deg, #ffa360, #ff5c5c);
		}
	}
</style>