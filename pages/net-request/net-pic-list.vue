<template>
	<view class="root">
		<text>随机毛呢API接口 https://api.thecatapi.com/v1/images/search?limit=10</text>
		<view class="item" v-for="item in  pets" :key="item.id">
			<image class="pic" :src="item.url" mode="widthFix"></image>
			<text class="info">图片信息 {{item.width}}x{{item.height}}</text>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	/*
	[
		 {
		        "id": "-d7GY-cPZ",
		        "url": "https://cdn2.thecatapi.com/images/-d7GY-cPZ.jpg",
		        "width": 1024,
		        "height": 768
		    }
	]
	*/
	const pets = ref([])

	//https://tea.qingnian8.com/tools/petShow?size=10 也可测试
	uni.request({
		url: "https://api.thecatapi.com/v1/images/search",
		data: {
			limit: 10
		}
	}).then(response => {
		pets.value = response.data
		console.log(pets.value)
	})
</script>

<style lang="scss" scoped>
	.root {
		display: flex;
		flex-direction: column;

		.item {
			margin: 30rpx;
			box-shadow: 0rpx 10rpx 40rpx rgba(0, 0, 0, 0.1);
			border-radius: 20rpx;
			overflow: hidden;

			.pic {
				width: 100%;
			}

			.info {
				font-size: 30rpx;
				padding: 30rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
</style>
