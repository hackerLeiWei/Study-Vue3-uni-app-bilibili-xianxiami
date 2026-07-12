<template>
	<view class="flex-column">
		<button type="warn" @click="clearStorageData">删除所有存储数据</button>
		<input class="input" placeholder="请输入 name，回车存储" type="text" maxlength="20" confirm-type="done"
			@confirm="event=>setStorageData('name',event.detail.value)" />
		<input class="input" placeholder="请输入 age，回车存储" type="number" maxlength="3" confirm-type="done"
			@confirm="event=>setStorageData('age',event.detail.value)" />
		<text class="input" @click="getStorageNameAge">读取 name、age</text>
		<text style="min-height: 140rpx;">{{storageNameAge}}</text>

		<text class="input" @click="setStorageData('other',{'from':'中国-湖北-咸宁'})">存储其他数据</text>
		<text class="input" @click="getStorageOther()">获取其他数据</text>
		<text class="input" @click="()=>{removeStorageSync('other');getStorageOther()}">删除其他数据</text>
		<text style="min-height: 140rpx;">{{storageOther}}</text>

		<text class="input" @click="getStorageInfo()">获取所有存储数据Key</text>
		<text style="min-height: 140rpx;">{{storageInfo}}</text>


	</view>
</template>

<script setup>
	import {
		computed,
		ref
	} from 'vue';

	const storageNameAge = ref('')
	const storageOther = ref('')
	const storageInfo = ref('')

	function getStorageNameAge() {
		const name = uni.getStorageSync("name")
		const age = uni.getStorageSync('age')
		storageNameAge.value = {
			"name": name,
			"age": age
		}
	}

	function setStorageData(key, value) {
		console.log(key)
		console.log(value)
		uni.setStorageSync(key, value)

		const saved = uni.getStorageSync(key)
		console.log(saved)
	}

	function getStorageOther() {
		const saved = uni.getStorageSync('other')
		storageOther.value = saved
		console.log(saved)
	}

	function getStorageInfo() {
		const result = uni.getStorageInfoSync()
		storageInfo.value = result
		console.log(result)
	}

	function clearStorageData() {
		uni.clearStorageSync()
		getStorageInfo()
		getStorageOther()
		getStorageNameAge()
	}

	function removeStorageSync(key) {
		uni.removeStorageSync(key)
	}
</script>

<style lang="scss">
	@import url("@/common/common-css.css");

	.input {
		height: 80rpx;
		border: 1rpx solid darkgray;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		margin: 20rpx;
		padding: 0 10rpx;
		font-size: 40rpx;
	}
</style>
