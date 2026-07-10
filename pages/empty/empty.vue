<template>
	<view class="">
		<text @click="uni.navigateBack();cancelTimmer">empty, {{leftSecond}} 秒后自动返回</text>
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


	const leftSecond = ref(5)

	let timmer = null

	let count = 0


	onMounted(() => {
		count++;
		console.log(`empty----onMounted ${count}`)
		timmer = setInterval(() => {
			leftSecond.value--
			if (leftSecond.value == 0) {
				uni.navigateBack()
				cancelTimmer()
			}
		}, 1000)
	})

	onUnmounted(() => {
		count++;
		console.log(`empty----onUnmounted ${count}`)
		cancelTimmer()
	})

	onLoad((options) => {
		count++;
		console.log(`empty----onLoad ${count} options:${options.msg}`)
	})

	onUnload(() => {
		count++;
		console.log(`empty----onUnload ${count}`)
	})

	onShow(() => {
		count++;
		console.log(`empty----onShow ${count}`)
	})

	onHide(() => {
		count++;
		console.log(`empty----onHide ${count}`)
	})

	onReady(()=>{
		count++;
		console.log(`empty----onReady ${count}`)
	})

	const cancelTimmer = () => {
		if (timmer) {
			clearInterval(timmer)
			timmer = null
		}
	}
</script>


<style lang="scss" scoped>

</style>
