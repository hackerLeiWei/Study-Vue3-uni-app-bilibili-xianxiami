<!--



	 方式一：1.:scroll-top="scrollTop" 2.const scrollTop = ref(0) scrollTop.value = 0
	 方式二 使用 scroll-into-view（H5 兼容性更好） 1.:scroll-into-view="scrollIntoView" 2.内部添加组件 3.  顶部锚点元素 id="top-anchor" style="height: 1rpx;" 4.const scrollIntoView = ref('')   5. 设置为顶部元素的 id， scrollIntoView.value = 'top-anchor'
	 方式三：滚动页面到顶部（不适用于 scroll-view） uni.pageScrollTo({scrollTop: 0,duration: 300})
	 方案四：使用 scroll-view 的 scroll-top 属性 + 动画。1.:scroll-top="scrollTop" :scroll-with-animation="true" 2.const scrollTop = ref(0) 3.scrollTop.value = 0 或者 scrollTop.value = position
	 方案五：强制触发滚动更新（处理已为 0 的情况）
	 // 先设置为 -1
	 scrollTop.value = -1
	 // 下一帧再设置为 0
	 nextTick(() => {
	 	scrollTop.value = 0
	 })
	 -->
<template>

	<view class="flex-column relative">
		<text id="header">
			滑动距离监听
		</text>
		<scroll-view class="scroll-view" ref="scrollView" scroll-y :style="{height:scrollViewHeight+'px'}"
			:scroll-top="scrollTop" scroll-with-animation @scroll="onScroll">
			<view v-for="item in 200" :key="item">
				<text> Item {{item}}</text>
			</view>
		</scroll-view>

		<view class="up" v-if="showUp" @click="scroollToTop">UP</view>


	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		nextTick,
		getCurrentInstance
	} from 'vue'

	import {
		onPullDownRefresh
	} from '@dcloudio/uni-app'

	const scrollViewHeight = ref(0)
	const initedHeight = ref(false)
	const instance = getCurrentInstance()
	const showUp = ref(false)
	const scrollView = ref(null)
	const scrollTop = ref(0)

	onMounted(() => {

		setTimeout(() => {
			calculateHeight()
		}, 50) // 延时执行，确保DOM完全被渲染

		window.addEventListener('resize', () => {
			if (initedHeight.value) {
				calculateHeight()
			}
		})
	})

	onPullDownRefresh(() => {
		setTimeout(() => {
			uni.stopPullDownRefresh()
		}, 2000)
	})

	const calculateHeight = () => {
		nextTick(() => {
			const systemInfo = uni.getSystemInfoSync()
			try {
				const query = uni.createSelectorQuery().in(instance.proxy)
				query.select("#header").boundingClientRect((rect) => {
					if (rect && rect.height > 0) {
						scrollViewHeight.value = systemInfo.windowHeight - rect.height
						console.log('✅ 高度计算成功:', scrollViewHeight.value)
					} else {
						console.warn('⚠️ 未获取到 header 高度，使用默认值')
						scrollViewHeight.value = systemInfo.windowHeight - 200
					}
					initedHeight.value = true
				}).exec((result) => {
					console.log("查询 header 结束", result)
				})
			} catch (error) {
				console.error('❌ 计算高度失败:', error)
				// 极端情况降级
				scrollViewHeight.value = systemInfo.windowHeight - 200
				initedHeight.value = true
			}
		})
	}

	const onScroll = (event) => {
		console.log("onScroll", event)
		showUp.value = event.detail.scrollTop > 200
	}

	const scroollToTop = () => {
		console.log("scroollToTop")
		if (scrollTop.value === 0) {
			scrollTop.value = -1
			nextTick(() => {
				scrollTop.value = 0
			})
		} else {
			scrollTop.value = 0
		}
	}
</script>

<style lang="scss" scoped>
	@import url("@/common/common-css.css"); // 所有的 text 文本固定

	.relative {
		position: relative;
	}

	.scroll-view {}

	.up {
		width: 120rpx;
		height: 120rpx;
		display: flex;
		flex-direction: row;
		align-self: center;
		position: absolute;
		z-index: 2;
		justify-content: center;
		background: $uni-text-color;
		border: 1rpx green;
		border-radius: 50%;
		align-items: center;
		right: 100rpx;
		bottom: 100rpx;
	}
</style>






<!--
<template>
	<view class="page">
		<view class="header" id="header">
			<text>滚动列表</text>
			<text style="font-size: 24rpx;">共 100 条数据</text>
		</view>

		<scroll-view scroll-y="true" class="scroll-view" :scroll-top="scrollTop" :scroll-with-animation="true"
			@scroll="onScroll" :style="{ height: scrollViewHeight + 'px' }">
			<view v-for="item in 100" :key="item" class="item">
				第 {{ item }} 条内容
			</view>
		</scroll-view>

		<view v-show="showBackTop" class="back-top-btn" @click="scrollToTop">
			↑
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		nextTick,
		getCurrentInstance
	} from 'vue'

	const scrollTop = ref(0)
	const scrollViewHeight = ref(0)
	const showBackTop = ref(false)
	const instance = getCurrentInstance()

	const scrollToTop = () => {
		// 方案1：直接设置
		// scrollTop.value = 0
		//scroll-top 属性在 H5 端存在兼容性问题，当值没有发生变化时不会触发滚动
		// 方案2：如果 scrollTop 已经是 0，强制触发
		if (scrollTop.value === 0) {
			scrollTop.value = -1
			nextTick(() => {
				scrollTop.value = 0
			})
		} else {
			scrollTop.value = 0
		}
	}

	const onScroll = (e) => {
		const scrollTopValue = e.detail.scrollTop
		console.log('滚动距离:', scrollTopValue)

		// 滚动超过 500px 显示回到顶部按钮
		showBackTop.value = scrollTopValue > 500
	}

	const calculateHeight = () => {
		nextTick(() => {
			const query = uni.createSelectorQuery().in(instance.proxy)
			query.select('#header').boundingClientRect((rect) => {
				if (rect) {
					const systemInfo = uni.getSystemInfoSync()
					scrollViewHeight.value = systemInfo.windowHeight - rect.height
				}
			}).exec()
		})
	}

	onMounted(() => {
		calculateHeight()
	})
</script>

<style>
	.page {
		height: 100vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.header {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 40rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-shrink: 0;
	}

	.scroll-view {
		background-color: #f5f5f5;
	}

	.item {
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 30rpx;
		border-bottom: 1px solid #eee;
		background-color: white;
		margin: 4rpx 20rpx;
		border-radius: 8rpx;
	}

	/* 回到顶部按钮 */
	.back-top-btn {
		/* 固定位置 */
		position: fixed;
		bottom: 100rpx;
		right: 40rpx;
		width: 80rpx;
		height: 80rpx;
		background: #667eea;
		color: white;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 40rpx;
		box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
		cursor: pointer;
		transition: all 0.3s ease;
		z-index: 999;
	}

	.back-top-btn:active {
		/* transform: scale(0.9); */
	}
</style >
-->
