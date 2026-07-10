<template>
	<view class="content bg">
		<image class="avatar" :src="fixAvatar" mode="widthFix"></image>
		<view class="right-parent ">
			<view class="text-box-view">
				<text class="text ">{{userInfo.userName}}
				</text>
			</view>
			<view class="text-box-view ">
				<text class="text ">{{computeText}}</text>
			</view>
		</view>
		<!-- <button class="button" type="primary" @click="$emit('clickSayHello', props.userInfo.nickName);">Say Hello</button> -->
		<button class="button" type="primary" @click="clickSayHello">Say Hello</button>
	</view>
</template>

<script setup>
	import {
		computed
	} from 'vue';

	const props = defineProps({
		userInfo: {
			type: Object,
			default () { // 对象、数组..需要定义函数传出去
				return {
					id: -1,
					avatar: '/static/logo.png',
					userName: '未设置',
					nickName: '未设置',
					age: 3,
					state: 0
				}
			}
		}
	})

	const emits = defineEmits(['clickSayHello'])

	const computeText = computed(() => `${props.userInfo.nickName} ${props.userInfo.state} ${props.userInfo.age}`)

	const fixAvatar = computed(() => (props.userInfo.avatar && String(props.userInfo.avatar).startsWith("/static")) ?
		`../../${props.userInfo.avatar}` : '../../static/logo.png')

	const clickSayHello = ()=> {
		emits('clickSayHello', props.userInfo)
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex; // 默认为 主轴 row
		align-items: stretch; // 默认就是 stretch，可以省略，让子项的宽高自动拉伸
		height: 200rpx;
		position: relative; // 锚点，限定子元素绝对定位范围
	}

	.avatar {
		width: 160rpx;
		margin: 0 20rpx;
		align-self: center; // 父项为 stretch，此处自己垂直居中(父项为 row,此处辅轴居中)
		border: 1rpx solid red;
		border-radius: 50%;
	}

	.right-parent {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		margin-right: 20rpx;
		flex: 1; // 自己占满剩下区域
		min-width: 0; // 避免子项被其内容撑开，挤压到外部图片
		display: flex; // 自身以 FlexBox 排列
		flex-direction: column; // 主轴 垂直
	}

	.text-box-view {
		flex: 1; // 每一项占满一半主轴区域
		display: flex; // 自身以 FlexBox 排列，便于子项居中
		align-items: center; // 垂直居中
	}

	.text {
		white-space: nowrap;
		overflow: hidden; // 防止溢出
		text-overflow: ellipsis; //省略号
	}

	.button {
		position: absolute;
		bottom: 20rpx;
		right: 20rpx;
		z-index: 2;
	}
</style>
