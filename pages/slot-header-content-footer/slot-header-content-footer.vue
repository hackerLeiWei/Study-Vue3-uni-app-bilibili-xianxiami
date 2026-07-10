<template>
	<view class="flex-column">
		<text class="title-size">v-slot: 可简写成 #</text>
		<lw-header-content-footer>
			<template v-slot:header>
				<view>哈哈哈哈</view>
			</template>
			<template v-slot:content>
				<view>哈哈哈哈</view>
			</template>
			<template v-slot:footer>
				<view>哈哈哈哈</view>
			</template>
		</lw-header-content-footer>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
</script>

<style lang="scss" scoped>

</style>
