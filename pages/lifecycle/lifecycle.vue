<template>

	<view class="flex-column">
		<navigator url="/pages/empty/empty">测试生命周期</navigator>
		<text>{{lifecycleText}}</text>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		onUnmounted
	} from 'vue'
	import {
		onLoad,
		onUnload,
		onShow,
		onHide,
		onReady
	} from '@dcloudio/uni-app'

	let count = 0

	const lifecycleText = ref("")

	onMounted(() => {
		count++;
		console.log(`onMounted ${count}`)
		lifecycleText.value = lifecycleText.value.concat(` ${count}. [onMounted]\n`)
	})

	onUnmounted(() => {
		count++;
		console.log(`onUnmounted ${count}`)
		lifecycleText.value = lifecycleText.value.concat(`${count}. [onUnmounted]\n`)
	})

	onLoad((options) => {
		count++;
		console.log(`onLoad ${count} options:${options.msg}`)
		lifecycleText.value = lifecycleText.value.concat(` ${count}. [onLoad]\n`)
	})

	onUnload(() => {
		count++;
		console.log(`onUnload ${count}`)
		lifecycleText.value = lifecycleText.value.concat(`${count}. [onUnload]\n`)
	})

	onShow(() => {
		count++;
		console.log(`onShow ${count}`)
		lifecycleText.value = lifecycleText.value.concat(`${count}. [onShow]\n`)
	})

	onHide(() => {
		count++;
		console.log(`onHide ${count}`)
		lifecycleText.value = lifecycleText.value.concat(`${count}. [onHide]\n`)
	})

	onReady(()=>{
		count++;
		console.log(`onReady ${count}`)
		lifecycleText.value = lifecycleText.value.concat(`${count}. [onReady]\n`)
	})
</script>

<style lang="scss" scoped>

</style>
