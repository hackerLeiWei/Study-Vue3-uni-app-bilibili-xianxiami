<template>
	<view class="flex-column">
		<navigator url="/pages/user-info/user-info">
			<text class="menu">用户信息页面</text>
		</navigator>
	</view>
	<view class="flex-column">
		<navigator url="/pages/slot-header-content-footer/slot-header-content-footer">
			<text class="menu">插槽 slot</text>
		</navigator>
	</view>
	<view class="flex-column">
		<navigator url="/pages/search/search">
			<text class="menu">search 组件</text>
		</navigator>
	</view>
	<view class="flex-column">
		<navigator url="/pages/lifecycle/lifecycle?msg=hello">
			<text class="menu">页面生命周期</text>
		</navigator>
	</view>
	<view class="flex-column">
		<navigator url="/pages/scroll-y-v-if/scroll-y-v-if">
			<text class="menu">scroll-y v-id</text>
		</navigator>
	</view>
	<view class="flex-column">
		<text class="menu" @click="switchTab">tabs 页面</text>
	</view>
</template>

<script setup>
	const switchTab = () => {
		uni.switchTab({
			url: "/pages/tabbar/tab-home"
		})
	}
</script>

<style lang="scss" scoped>
	.menu {
		display: flex;
		height: 80rpx;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 40rpx;
		border-top: 1rpx solid gray;
		border-top-color: aqua;
		border-radius: 10rpx;
		border-bottom: 0.5rpx solid rgba(0, 0, 0, 0.2);
	}
</style>
