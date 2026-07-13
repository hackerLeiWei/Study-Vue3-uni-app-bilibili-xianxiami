<template>
	<view class="flex-column">
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
		<view class="flex-column" v-if="showBack">
			<text class="menu" @click="back">{{backText}}</text>
		</view>
		<view class="flex-column">
			<navigator url="/pages/storage/storage">
				<text class="menu">本地数据存储</text>
			</navigator>
		</view>
		<view class="flex-column">
			<navigator url="/pages/net-request/net-request">
				<text class="menu">网络数据请求 TEXT list</text>
			</navigator>
		</view>
		<view class="flex-column">
			<navigator url="/pages/net-request/net-pic-list">
				<text class="menu">网络数据请求 PIC list</text>
			</navigator>
		</view>
		<view class="flex-column">
			<navigator url="/pages/net-request/net-pic-list2">
				<text class="menu">网络数据请求 PIC list2</text>
			</navigator>
		</view>
		<view class="flex-column">
			<navigator url="/pages/vuex-plugin--store/vuex-plugin--store">
				<text class="menu">vuex-plugin 数据共享</text>
			</navigator>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app';


	const showBack = ref(false);
	const backText = ref('');

	function back() {
		uni.navigateBack()
	}

	onLoad((options) => {
		console.log('onLoad')
		console.log(options)
		if (!options) {
			showBack.value = false
			return
		}

		if (options.from === "home-navigateTo-index") {
			showBack.value = true
			backText.value = "Back to Home "
		} else /* if (options.from === "home-reLaunch-index") */ {
			showBack.value = false
		}
	})

	onMounted(() => {
		const pages = getCurrentPages();
		console.log(`Index---->${pages.length}`)
		console.log(pages)
	})
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
		margin-bottom: 20rpx;
	}
</style>
