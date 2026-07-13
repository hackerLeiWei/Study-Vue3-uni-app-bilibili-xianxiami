<template>
	<view class="root">
		<text>随机毛呢API接口 https://api.thecatapi.com/v1/images/search?limit=10</text>
		<view class="item" v-for="(item, index) in  pets" :key="item._id">
			<image class="pic" :src="item.url" mode="widthFix" @click="utils.previewImage(pets.map(it => it.url), index)"></image>
			<text class="info"> 图片信息 [{{item.type}}] {{content}}</text>
			<text class="author"> —— {{item.author}}</text>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import * as utils from '@/utils/utils.js'

	/*
	[{
	            "_id": "659e9c62ea3d3874f6392846",
	            "author": "猫狗都是宠物",
	            "content": "让人心动的高颜值狗狗，一眼就心动",
	            "source": "知乎",
	            "type": "dog",
	            "url": "https://pic4.zhimg.com/80/v2-809a9d2b277848a7495c50c7d1bd931b_720w.webp"
	        }]
			*/
	const pets = ref([])

	// https://api.thecatapi.com/v1/images/search?limit=10 也可测试
	uni.request({
		url: "https://tea.qingnian8.com/tools/petShow",
		data: {
			size: 10
		}
	}).then(response => {
		pets.value = response.data.data
		console.log(response)
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
				font-size: 36rpx;
				padding: 30rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.author {
				padding: 0 30rpx 30rpx;
				text-align: right;
				color: #888;
				font-size: 28rpx;
			}
		}
	}
</style>
