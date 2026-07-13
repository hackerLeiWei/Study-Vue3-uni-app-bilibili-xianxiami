<template>
	<view class="flex-column">

		<text class="bg-red-alpha margin-bottom" @click="increament">点击自增，当前 count: {{count}}</text>

		<view class="margin-bottom">
			<text @click="requestNews">请求数据:</text>
			<view class="item" v-for="item in items" :key=item.id>
				<text class="title">{{item.title}}</text>
				<text class="content">{{item.body}}</text>
			</view>
		</view>

	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue'
	import {
		useStore
	} from 'vuex' // 从 vuex 中引用 useStore

	// 引用 store 实例
	const store = useStore()

	// 读取 state（响应式）
	const count = computed(() => store.getters["count"])
	const items = computed(() => store.state.items)

	// 提交 mutation（同步修改）
	const increament = () => store.commit("INCREMENT")

	const requestNews = async () => {
		try {
			// {
			// 	id: 1
			// }
			const response = await store.dispatch("requestNews", '')
			console.log(items.value)

		} catch (err) {
			uni.showToast({
				title: '请求 news 失败',
				icon: 'none'
			})
		}
	}

	const handleLogin = async () => {
		try {
			// ✅ 在这里接收 action 中 resolve 返回的结果
			const response = await store.dispatch('userLogin', {
				name: 'test'
			})
			console.log('登录成功，服务器返回的数据：', response)

			// 例如：跳转到首页
			uni.switchTab({
				url: '/pages/index/index'
			})

		} catch (error) {
			// ✅ 在这里接收 action 中 reject 返回的错误
			console.log('登录失败：', error)
			uni.showToast({
				title: '登录失败',
				icon: 'none'
			})
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		display: flex;
		flex-direction: column;
		border-radius: 16rpx;
		margin: 10rpx 20rpx;
		background: "#f0f0f0";
		box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.3);

		.title {
			font-size: 36rpx;
			margin: 10rpx;
		}

		.content {
			font-size: 30rpx;
			margin: 10rpx;
		}
	}
</style>
