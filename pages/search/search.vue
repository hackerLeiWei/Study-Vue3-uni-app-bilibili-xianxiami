<template>
	<view class="flex-column">
		<lw-search ref="search" @onConfirm="onConfirm" @onCancel="onCancel"></lw-search>
		<button type="primary" @click="changeSearch">changeSearch</button>
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
		search.value.inputValue = "changeSearch"
		console.log(search.value)
		console.log(search.value.inputValue)
		console.log(search.value.str)
		setTimeout(()=>{
			search.value.resetSearch()
		},2000)

	}
</script>

<style lang="scss" scoped>

</style>
