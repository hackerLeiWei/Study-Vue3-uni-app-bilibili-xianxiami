import { computed } from 'vue'

export const fixAvatar = computed(() => (props.userInfo.avatar && String(props.userInfo.avatar).startsWith("/static")) ?
	`../../${props.userInfo.avatar}` : '../../static/logo.png')


export const previewImage = (urls, index) => {
	uni.previewImage({
		urls: urls,
		current: urls[index],
		indicator: 'number',
		loop: true
	})
	// uni.closePreviewImage({})
}
