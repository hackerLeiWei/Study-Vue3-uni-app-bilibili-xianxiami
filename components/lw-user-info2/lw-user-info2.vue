<template>
	<view class="content">
		<image class="avatar" src="/static/logo.png" mode="widthFix"></image>
		<view class="grid ">
			<view class="text-box ">
				<text class="text ">{{userName}}</text>
			</view>
			<view class="text-box ">
				<text class="text ">{{computeText}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		computed
	} from 'vue'

	const props = defineProps({
		avatar: {
			type: String,
			default: "../../static/logo.png"
		},
		userName: {
			type: String,
			default: "默认值"
		},
		nickName: {
			type: String,
			default: "这个人很懒，什么都没留下"
		},
		age: {
			type: Number,
			default: 3
		},
		state: {
			type: Number,
			default: 0
		}
	})

	const computeText = computed(() => `${props.nickName} ${props.state} ${props.age}`)
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: row;
		align-items: stretch; // 让子项自动拉甚至父容器高度
		height: 200rpx;

		.avatar {
			align-self: center; // 图片单独垂直居中，不受父级 stretch 影响
			width: 160rpx;
			margin: 0 20rpx;
			max-width: 160rpx;
			border-radius: 40rpx;
			border: 4rpx solid blue;
		}

		.grid {
			flex: 1; // 占据剩余宽度
			min-width: 0; // 防止 flex 子项被内容撑开
			display: grid;
			margin-right: 20rpx;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			grid-template-rows: 1fr 1fr; //两行各占一半
		}

		.text-box {
			display: flex;
			flex-direction: row; // 横向展示
			// align-items: center;// 每行自己占一半高度
			align-self: center; // 自己的大小由子项控制
			overflow: hidden; // 防止溢出
		}

		.text {
			//flex: 1;// 父项为横向展示，自己占满全部区域
			display: block; // 将 text 转为 flex 容器，便于垂直居中文本
			flex-direction: row;
			align-self: center;
			white-space: nowrap;
			overflow: hidden; //防止移除
			text-overflow: ellipsis; // 省略号
		}
	}
</style>
