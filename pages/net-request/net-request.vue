<template>
	<view class="root">
		<text>API 接口免费网址 https://jsonplaceholder.typicode.com/</text>
		<view class="item" v-for="item in data" :key=item.id>
			<text class="title">{{item.title}}</text>
			<text class="body">{{item.body}}</text>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	/**
	[{
		"userId": 1,
		"id": 1,
		"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
		"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
	}]
	*/
	const data = ref([])

	//方式一

	function request() {
		uni.showLoading()
		uni.request({
			url: "https://jsonplaceholder.typicode.com/posts",
			data: {
				// id=1 跟 url 拼接一样
			},
			method: 'GET',
			header: {
				// token:"AAA",
				// "content-type":"application/json"//默人类型
			},
			success: (response) => {
				data.value = response.data
				console.log(data.value)
			},
			fail: (error) => {
				console.log(error)
			},
			complete: () => {
				uni.hideLoading()
			}
		})
	}
	request()

	// 方式二
	// function request() {
	// 	uni.request({
	// 		url: "https://jsonplaceholder.typicode.com/posts"
	// 	}).then(response => {
	// 		console.log(response)
	// 	})
	// }
	// request()

	/**
	 * 异步同步化
	 */
	// async function request() {
	// 	const response = await uni.request({
	// 		url: "https://jsonplaceholder.typicode.com/posts",
	// 	})
	// 	data.value = response.data
	// 	console.log(response)
	// }
	// request()
</script>

<style lang="scss" scoped>
	.root {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.item {
		display: flex;
		width: 100%;
		flex-direction: column;
		justify-content: center;
		box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.3); // X 轴不偏移，Y 轴偏移 10rpx，模糊值也为 30 rpx，颜色0.1黑色

	}

	.title {
		margin: 10rpx;
		display: flex;
		font-size: 40rpx;
		color: #333;
		border-bottom: 1rpx rgba(0, 0, 0, 0.1);
	}

	.body {
		margin: 10rpx;
		display: flex;
		font-size: 30rpx;
		margin: 10rpx;
		color: #999;
	}
</style>
