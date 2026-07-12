<template>
	<view class="flex-column">
		<lw-search ref="search" @onConfirm="onConfirm" @onCancel="onCancel"></lw-search>
		<button type="primary" @click="changeSearch">设置输入框内容："关键字"</button>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	const search = ref(null)

	const onConfirm = (input) => {
		console.log(`onConfirm ${input}`)
	}
	const onCancel = (input) => {
		console.log("onCancel")
		//uni.hideKeyboard()
	}

	const changeSearch = () => {
		search.value.inputValue = "关键字"
		console.log(search.value)
		console.log(search.value.inputValue)
		console.log(search.value.str)
		uni.showToast({
			title: "3秒之后改为重置",
			icon:'success',
			position:'center',
			duration: 2000
		})
		setTimeout(() => {
			search.value.resetSearch()
		}, 3000)

	}
</script>

<style lang="scss" scoped>

</style>
