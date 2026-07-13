<template>
	<view class="flex-column">
		<lw-user-info1></lw-user-info1>
		<lw-user-info2 user-name="你好" nick-name="Hello" age="33" state="2"></lw-user-info2>
		<view v-for="item in userItems">
			<lw-user-info3 :userInfo="item" @clickSayHello="clickSayHello"></lw-user-info3>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	const userItems = ref([{
		id: 33,
		avatar: "/static/angry-bird-02.gif",
		userName: '张三',
		nickName: '三麻子',
		age: 33,
		state: 2
	}, {
		id: 44,
		avatar: "/static/angry-bird-02.gif",
		userName: '李四',
		nickName: '四麻子',
		age: 44,
		state: 3
	}, {
		id: 55,
		avatar: "/static/angry-bird-02.gif",
		userName: '王五',
		nickName: '王老五',
		age: 55,
		state: 4
	}])

	const clickSayHello = (event) => {
		console.log(event)
		uni.showModal({
			title: "私聊",
			content: `是否跟${event.userName} ${event.nickName} 的聊天`,
			cancelText: "取消",
			confirmText: "进入私聊",
			success: (res) => {
				if (res.confirm) {
					console.log("confirm")
				} else if (res.cancel) {
					console.log("cancel")
				} else if (res.content) {
					console.log("content")
				} else {
					console.log("Unknow")
				}

			}
		})
	}
</script>
<style lang="scss" scoped>
</style>
