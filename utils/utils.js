import {
	computed
} from 'vue'

export const fixAvatar(avatar) = computed(() => (avatar && String(avatar).startsWith("/static")) ?
	`../../${avatar}` : '../../static/logo.png')
