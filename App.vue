<!--
<script> // vue2
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
-->
<script setup>
	import {
		onLaunch,
		onShow,
		onHide
	} from '@dcloudio/uni-app'

	onLaunch(() => {
		console.log('App Launch')
	})
	onShow(() => {
		console.log('App Show')
	})
	onHide(() => {
		console.log('App Hide')
	})

	defineExpose({
		onLaunch,
		onShow,
		onHide
	})
</script>

<style>
	/*每个页面公共css */

	.flex-vw-vh {
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100vw;
	}

	.flex-column {
		display: flex;
		flex-direction: column;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
	}

	.bg-f0f0f0 {
		background-color: #f0f0f0;
	}

	.bg-d0d0d0 {
		background-color: #d0d0d0;
	}

	.bg-c0c0c0 {
		background-color: #c0c0c0;
	}

	.bg-red-alpha {
		background-color: rgba(200, 0, 0, 0.4);
	}

	.bg-green-alpha {
		background-color: rgba(0, 200, 0, 0.4);
	}

	.bg-blue-alpha {
		background-color: rgba(0, 0, 200, 0.4);
	}

	.title-size {
		font-size: 50rpx;
	}

	.content-size {
		font-size: 40rpx;
	}
</style>
