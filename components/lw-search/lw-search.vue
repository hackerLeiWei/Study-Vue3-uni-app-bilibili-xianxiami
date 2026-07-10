<template>
	<view class="box">
		<!-- @confirm="event=>onConfirm(event) <==>  @confirm="onConfirm"-->
		<input ref="input" class="input" type="text" v-model="inputValue" :placeholder="props.placeHolder"
			:placeholder-style="props.placeHolderColor" confirm-type="search" @confirm="event=>onConfirm(event)" />
		<icon class="clear " type="clear" size="30rpx" v-if="props.showClear && inputValue" v-on:click="inputValue=''">
		</icon>
		<text class="cancel" v-if="!inputValue" v-on:click="onCancel">{{props.cancelText}}</text>
	</view>
</template>

<script setup>
	import {
		ref,
		computed,
		onMounted
	} from 'vue'

	//暴露回调事件
	const emits = defineEmits(['onConfirm', 'onCancel'])
	/**
	 * 暴露属性，接接收外部参数
	 */
	const props = defineProps({
		fontSize: {
			type: String,
			default: '30rpx'
		},
		color: {
			type: String,
			default: '#333333'
		},
		cancelColor: {
			type: String,
			default: "#555555"
		},
		cancelText: {
			type: String,
			default: "取消"
		},
		showClear: {
			type: Boolean,
			default: true
		},
		placeHolder: {
			type: String,
			default: "请输入内容:"
		},
		placeHolderColor: {
			type: String,
			default: 'color:#999999'
		},
		borderRadius: {
			type: Number,
			default: 16
		}
	})

	const inputValue = ref("")

	const input = ref(null)


	onMounted(() => {
		console.log("onMounted")
		console.log(input.value)
	})

	const onConfirm = (event) => {
		console.log(`${event.detail.value}  ${inputValue.value}`)
		emits('onConfirm', inputValue.value)
		console.log(input.value)
		input.value.blur()
	}

	const onCancel = () => {
		console.log("onCancel")
		emits('onCancel')
	}

	//----------------------------------------expose---start
	const resetSearch = function() {
		console.log("resetSearch")
		inputValue.value = "resetSearch"
	}
	//----------------------------------------expose---end

	// 对外暴露方法，外部组件可以直接通过调用当前对象的方法变量
	defineExpose({
		str:"测试数据",
		inputValue,//属性跟名字一样可省略。 <==>inputValue:inputValue
		resetSearch //属性跟名字一样可省略。 <==>resetSearch:resetSearch
	})
</script>

<style lang="scss">
	.box {
		display: flex;
		width: 100%;
		flex-direction: row;
		height: 80rpx;
		position: relative;
	}

	.input {
		line-height: 60rpx;
		width: 100%;
		margin: 20rpx;
		height: 60rpx;
		padding-right: 60rpx;
		padding-left: 10rpx;
		align-self: center;
		font-size: v-bind(fontSize);
		color: v-bind(color);
		border-radius: v-bind(borderRadius)+"rpx";
		border: 1px solid darkgray;
	}

	.clear {
		position: absolute;
		z-index: 2;
		right: 35rpx;
		bottom: 25rpx;
	}

	.cancel {
		position: absolute;
		display: flex;
		z-index: 2;
		align-self: center;
		font-size: v-bind(fontSize);
		right: 30rpx;
		color: v-bind(cancelColor);
	}
</style>
