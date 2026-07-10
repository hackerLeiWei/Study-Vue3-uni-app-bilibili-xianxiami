<template>
	<view class="header bg-blue-alpha">
		<slot name="header"></slot>
	</view>
	<view class="content bg-green-alpha">
		<!-- 无名插槽可以直接接收到引用处标签 -->
		<slot name="content"></slot>
	</view>
	<view class="footer bg-red-alpha">
		<slot name="footer"></slot>
	</view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
	.header {
		height: 200rpx;
	}

	.content {
		min-height: 200rpx;
	}

	.footer {
		height: 200rpx;
	}
</style>
