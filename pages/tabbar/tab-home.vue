<template>
	<view class="flex-column">
		<text>首页</text>

		<text @click="navigateToIndex">navigateToIndex</text>
		<text @click="reLaunchIndex">reLaunchIndex</text>
	</view>
</template>

<script setup>
	import {
		onMounted
	} from 'vue';


	onMounted(() => {
		const pages = getCurrentPages();
		console.log(`AAAAA--->${pages.length}`)
		console.log(pages)
	})

	function navigateToIndex() {
		uni.navigateTo({
			url: "/pages/index/index?from=home-navigateTo-index"
		})
	}

	function reLaunchIndex() {
		uni.reLaunch({
			url: "/pages/index/index?from=home-reLaunch-index"
		})
	}
</script>

<style lang="scss" scoped>
	@import url("@/common/common-css.css");
</style>
