<template>
	<view class="flex-column">
		<text>发现</text>
		<navigator class="menu" hover-class="cover" url="/pages/tabbar/tab-home" open-type="switchTab"><text>To
				Home</text>
		</navigator>

		<text class="menu" hover-class="cover" @click="hideShowToast(false, false, true)">{{showText}}</text>
		<text class="menu" hover-class="cover" @click="hideShowToast(true, false, false)">{{showText2}}</text>
		<text class="menu" hover-class="cover" @click="showLoading(false)">{{showLoadingText}}</text>
		<text class="menu" hover-class="cover" @click="showLoading(true)">{{showLoadingText2}}</text>
		<text class="menu" hover-class="cover" @click="showCancelConfirmModal">确定、取消 弹窗</text>
		<text class="menu" hover-class="cover" @click="showEditConfirmModal">Input、确定弹窗</text>
		<text class="menu" hover-class="cover" @click="showActionSheet">ActionShett</text>
		<text class="menu" hover-class="cover" @click="autoSetTitle">Start auto set title</text>
		<text class="menu" hover-class="cover" @click="showNavigationLoading">Show Navigation Loading</text>
		<text class="menu" hover-class="cover" @click="changeTab">修改 tab 属性</text>
		<text class="menu" hover-class="cover" @click="showHideBadgeRedDot">{{badgeRedDotText}}</text>

	</view>
</template>

<script setup>
	import {
		computed,
		onUnmounted,
		ref
	} from 'vue';

	import {
		onPullDownRefresh
	} from '@dcloudio/uni-app'

	const isShowingToast = ref(false)
	const isShowingLoading = ref(false)

	const showText = computed(() => isShowingToast.value ? "hide Toast" : "show Toast without mask")
	const showText2 = computed(() => isShowingToast.value ? "hide Toast" : "show Toas with maskt")

	const showLoadingText = computed(() => isShowingLoading.value ? "hide Loading" : "show Loading without mask")
	const showLoadingText2 = computed(() => isShowingLoading.value ? "hide Loading" : "show Loading with maskt")

	const hideShowToast = (withMask, withIcon, withImage) => {
		if (hideToast()) {
			return
		}
		uni.showToast({
			title: "哈1哈2哈3哈4哈5哈6哈7哈8",
			image: withImage ? "/static/icon-ok-120.png" : '',
			mask: withMask,
			icon: withIcon ? "success" : "none",
			duration: 5000
		})
		isShowingToast.value = true
		setTimeout(() => {
			hideToast()
		}, 5000)
	}

	const hideToast = () => {
		if (isShowingToast.value) {
			uni.hideToast()
			isShowingToast.value = false
			return true
		}
		return false
	}

	const showLoading = (withMask) => {
		if (hideLoading()) {
			return
		}
		isShowingLoading.value = true
		uni.showLoading({
			title: "哈1哈2哈3哈4哈5哈6哈7哈8",
			mask: withMask
		})
		setTimeout(() => {
			hideLoading()
		}, 5000)
	}

	const hideLoading = () => {
		if (isShowingLoading.value) {
			isShowingLoading.value = false
			uni.hideLoading()
			return true
		}
		return false
	}

	const showCancelConfirmModal = () => {
		uni.showModal({
			title: "Notice",
			content: "Are you sure agreen the Privacy Policy",
			cancelText: "Cancel",
			confirmText: "Sure",
			confirmColor: "#4cd964",
			cancelColor: "#dd524d",
			success: (result) => {
				if (result.cancel) {
					console.log("Cancel")
				} else if (result.confirm) {
					console.log("Confirm")
				}
			}
		})
	}

	const showEditConfirmModal = () => {
		uni.showModal({
			title: "Notice",
			editable: true,
			placeholderText: "Input the sms code",
			showCancel: false,
			confirmColor: "#4cd964",
			confirmText: "Sure",
			success: (result) => {
				if (result.confirm) {
					console.log(result)
					console.log(result.content)
				}
			}
		})
	}


	const languages = ["Java", "C++", "Kotlin", "Objective-C", "Swift", "Go", "Scala", "JavaScript"]
	const showActionSheet = () => {
		uni.showActionSheet({
			title: "请选择语言",
			itemList: languages,
			itemColor: "#f0ad4e",
			success: (result) => {
				console.log(`选择了下标:${result.tapIndex}：${languages[result.tapIndex]}`)
			},
		})
	}

	let titleIdx = 0
	let isSetTitle = false
	let timmer = null
	const colors = ["#fff", "#f00", "#ff0", "#f0f", "#0ff", "#00f",
		"#0f0", "#000"
	]

	const autoSetTitle = () => {
		console.log("开始动态设置颜色")
		if (isSetTitle) {
			return
		}
		isSetTitle = true
		timmer = setInterval(() => {
			uni.setNavigationBarTitle({
				title: languages[titleIdx % languages.length]
			})
			uni.setNavigationBarColor({
				backgroundColor: colors[titleIdx % colors.length],
				frontColor: titleIdx % 2 === 0 ? "#000000" : "#ffffff",
				success: (result) => {
					console.log(result)
				}
			})
			titleIdx++
		}, 3000)
	}

	function showNavigationLoading() {
		uni.showNavigationBarLoading()
		setTimeout(() => {
			uni.hideNavigationBarLoading()
		}, 3000)
	}

	function changeTab() {
		console.log("setTabBarItem 0->App.vue")
		uni.setTabBarItem({
			index: 0,
			text: "App.vue",
			iconPath: "/static/icons/tab-msg-0.png",
			selectedIconPath: "/static/icons/tab-find-1.png"
		})
		console.log("setTabBarStyle")
		uni.setTabBarStyle({
			color: "#f00",
			backgroundColor: "#ddd",
			borderStyle: "black",
			selectedColor: "#ff0"
		})
	}

	const showBadge = ref(false)

	const badgeRedDotText = computed(() => showBadge.value ? "移除角标、红点" : "显示角标、红点")

	function showHideBadgeRedDot() {
		if (removeBadgeRedDot()) {
			return
		}
		showBadge.value = true
		uni.setTabBarBadge({
			index: 0,
			text: "99+"
		})
		uni.showTabBarRedDot({
			index: 1,
		})
	}

	function removeBadgeRedDot() {
		if (showBadge.value) {
			showBadge.value = false
			uni.removeTabBarBadge({
				index: 0,
				success: (result) => {
					console.log(result)
				}
			})
			uni.hideTabBarRedDot({
				index: 1,
				success: (result) => {
					console.log(result)
				}
			})
			return true
		}
		return false
	}

	onUnmounted(() => {
		if (timmer) {
			clearInterval(timmer)
			timmer = null
		}
	})

	onPullDownRefresh(() => {
		console.log("onPullDownRefresh")
		setTimeout(() => {
			uni.stopPullDownRefresh()
		}, 5000)
	})
</script>

<style lang="scss" scoped>
	@import url("@/common/common-css.css");

	.cover {
		background-color: orange;
	}
</style>
