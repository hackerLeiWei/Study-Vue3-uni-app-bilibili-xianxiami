<template>
	<view class="content">
		<image v-bind:src="fixAvatar" mode="widthFix"></image>
		<view>
			<text>{{userName}}</text>
			<text>{{computeText}}</text>
		</view>
	</view>
</template>

<script setup>
	import {
		computed
	} from 'vue'
	// import {fixAvatar} from '../../utils/utils.js'

	const props = defineProps(['avatar', 'userName', 'nickName', 'state', 'age'])

	const computeText = computed(() => `${props.nickName} ${props.state} ${props.age}`)

	const fixAvatar = computed(() => (props.avatar && String(props.avatar).startsWith("/static")) ?
		`../../${props.avatar}` : '../../static/logo.png')
</script>

<style lang="scss" scoped>
	.content {
		display: flex; //启用 Flexbox 布局
		flex-direction: row; // 主轴
		align-items: stretch; //辅轴居中
		// justify-content: center; //主轴居中
		height: 200rpx;
	}

	.content>image {
		width: 160rpx;
		align-self: center;
		margin: 0 20rpx;
		border-radius: 50%;
	}

	//包裹两个 text 的父级 view
	.content>view {
		flex: 1;
		min-width: 0;// 防止子项内容撑爆，挤压外部
		display: flex;
		flex-direction: column;
		min-width: 0; //关键：防止 flex 子项被内容撑开
		margin: 20rpx 0;
	}

	.content>view>text {
		flex: 1; // 每一项占满一半主轴区域
		display: flex; // 自身以 FlexBox 排列，便于子项居中
		align-items: center;
		margin-right: 20rpx;
		display: block; //  text 是行内元素，需要转为块级
		line-height: 80rpx; // 行高设置
		// align-self: center;
		white-space: nowrap;
		overflow: hidden; // 防止溢出
		text-overflow: ellipsis;
	}
</style>
