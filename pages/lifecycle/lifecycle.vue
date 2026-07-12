<template>

	<view class="flex-vw-vh">
		<navigator class="text" url="/pages/empty/empty">测试生命周期</navigator>
		<view class="title-size">
			此界面还解决 flext 布局 中 scroll-view 在chrome 上运行无法滑动
		</view>
		<scroll-view :style="{height: scrollViewHeight}" scroll-y @scroll="onScrollViewScroll">
			<text class="text" v-for="item in lifecycleText">{{item}}</text>
		</scroll-view>
	</view>

</template>

<script setup>
	import {
		ref,
		onMounted,
		onUnmounted
	} from 'vue'
	import {
		onInit,
		onLoad,
		onUnload,
		onShow,
		onHide,
		onReady,
		onResize,
		onPullDownRefresh,
		onReachBottom,
		onTabItemTap,
		onPageScroll,
		onBackPress
	} from '@dcloudio/uni-app'

	let count = 0

	const lifecycleText = ref([])
	const scrollViewHeight = ref('0px')

	onMounted(() => {
		count++;
		console.log(`onMounted ${count}`)
		lifecycleText.value.push(`${count}. onMounted`)


		// 方案2：动态计算（更精确）
		const systemInfo = uni.getSystemInfoSync()
		const headerHeight = 200 // rpx 转 px 需要计算
		const headerHeightPx = uni.upx2px(headerHeight)
		scrollViewHeight.value = (systemInfo.windowHeight - headerHeightPx) + 'px'
	})

	onUnmounted(() => {
		count++;
		console.log(`onUnmounted ${count}`)
		lifecycleText.value.push(`${count}. onUnmounted`)
	})

	/**
	 * 监听页面初始化，其参数同 onLoad 参数，为上个页面传递的数据，参数类型为 Object（用于页面传参），触发时机早于 onLoad
	 */
	onInit((options) => {
		count++;
		console.log(options)
		console.log(`onInit ${count} options:${options.msg}`)
		lifecycleText.value.push(` ${count}. onInit`)
	})

	/**
	 * 监听页面加载，该钩子被调用时，响应式数据、计算属性、方法、侦听器、props、slots 已设置完成，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参），参考示例。
	 */
	onLoad((options) => {
		count++;
		console.log(options)
		console.log(`onLoad ${count} options:${options.msg}`)
		lifecycleText.value.push(`${count}. onLoad`)
	})

	/**
	 * 监听页面显示，页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
	 */
	onShow(() => {
		count++;
		console.log(`onShow ${count}`)
		lifecycleText.value.push(`${count}. onShow`)
	})

	/**
	 * 监听页面初次渲染完成，此时组件已挂载完成，DOM 树($el)已可用，注意如果渲染速度快，会在页面进入动画完成前触发
	 */
	onReady(() => {
		count++;
		console.log(`onReady ${count}`)
		lifecycleText.value.push(`${count}. onReady`)
	})

	/**
	 * 监听页面隐藏
	 */
	onHide(() => {
		count++;
		console.log(`onHide ${count}`)
		lifecycleText.value.push(`${count}. onHide`)
	})

	/**
	 * 监听页面卸载
	 */
	onUnload(() => {
		count++;
		console.log(`onUnload ${count}`)
		lifecycleText.value.push(`${count}. onUnload`)
	})

	/**
	 * 监听窗口尺寸变化
	 */
	onResize(() => {
		count++;
		console.log(`onResize ${count}`)
		lifecycleText.value.push('onResize')
	})

	/**
	 * 监听用户下拉动作，一般用于下拉刷新，参考示例:https://uniapp.dcloud.net.cn/api/ui/pulldown.html
	 *
	 * startPullDownRefresh、uni.stopPullDownRefresh()
	 *
	 * 需要在 pages.json 里，找到的当前页面的pages节点，并在 style 选项中开启 enablePullDownRefresh。
	 * 当处理完数据刷新后，uni.stopPullDownRefresh 可以停止当前页面的下拉刷新。
	 */
	onPullDownRefresh(() => {
		console.log(`onPullDownRefresh`)
		lifecycleText.value.push('onPullDownRefresh')
		setTimeout(() => {
			uni.stopPullDownRefresh()
		}, 3000)
	})

	/**
	 * 页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。具体见下方注意事项
	 */
	onReachBottom(() => {
		console.log(`onReachBottom`)
		lifecycleText.value.push('onReachBottom')
	})

	/**
	 * 点击 tab 时触发，参数为Object，具体见下方注意事项
	 */
	onTabItemTap(() => {
		console.log(`onTabItemTap`)
		lifecycleText.value.push('onTabItemTap')
	})

	/**
	 * 监听页面滚动，参数为Object,页面滚动回调，不是 scroll-view的 回调
	 */
	onPageScroll((e) => { // {scrollTop: 105}
		console.log("onPageScroll")
		console.log(e)
		const existArr = lifecycleText.value.filter(element => element.includes("onPageScroll"))
		if (existArr.length < 5) {
			lifecycleText.value.push(`onPageScroll ${existArr.length + 1}`)
		}
	})


	/**
	 * 监听页面返回，返回 event = {from:backbutton、 navigateBack} ，backbutton 表示来源是左上角返回按钮或 android 返回键；
	 * navigateBack表示来源是 uni.navigateBack；详见
	 */
	onBackPress(() => {
		console.log(`onBackPress`)
		lifecycleText.value.push('onBackPress')
	})

	const onScrollViewScroll = (e) => {
		console.log("onScrollViewScroll")
		console.log(e)
	}
</script>

<style lang="scss" scoped>
	.text {
		display: flex;
		flex-direction: row;
		background: #f0f0f0;
		margin-bottom: 20rpx;
		height: 200rpx;
		font-size: 80rpx;
		align-items: center; // 辅轴（此处为垂直方向）居中
		// align-self: center; // 自身居中
		white-space: break-spaces;
	}
</style>





<!--  解决 flext 布局 中 scroll-view 在chrome 上运行无法滑动
<template>
	<view class="page">
		<view class="header">
			<text>这是顶部固定区域</text>
		</view>

		<scroll-view :style="{height:scrollViewHeight}" scroll-y @scroll="onScroll" class="scroll-view">
			<view v-for="item in 100" :key="item" class="item">
				内容 {{ item }}
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'

	const onScroll = ((e) => {
		console.log(e)
	})

	const scrollViewHeight = ref('0px')

	onMounted(() => {
		// 方案1：使用 calc（如果顶部高度固定）
		scrollViewHeight.value = 'calc(100vh - 200rpx)'

		// 方案2：动态计算（更精确）
		// const systemInfo = uni.getSystemInfoSync()
		// const headerHeight = 200 // rpx 转 px 需要计算
		// const headerHeightPx = uni.upx2px(headerHeight)
		// scrollViewHeight.value = (systemInfo.windowHeight - headerHeightPx) + 'px'
	})
</script>

<style>
	.page {
		display: flex;
		flex-direction: column;
		height: 100vh;
		/* 禁用页面滚动 */
		overflow: hidden;
	}

	.header {
		/* 固定高度，可以是任意值 */
		height: 200rpx;
		background-color: #4CAF50;
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		/* 防止被压缩 */
	}

	.scroll-view {
		/* flex: 1 自动填充剩余高度 */
		flex: 1;
		background-color: #f5f5f5;
	}

	.item {
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 30rpx;
		border-bottom: 1px solid #ddd;
		background-color: white;
	}
</style>
-->
