// #ifndef VUE3
import Vue from "vue" //引入vue
import Vuex from "vuex" // 引入vuex
const store = new Vuex.Store({
// #endif

// #ifdef VUE3
import { createStore } from 'vuex' // 1. 只导入 createStore，不导入 Vue

const store = createStore({ // Vue 3 标准写法
	// #endif

	// 1. State: 存储数据的地方
	state: {
		items: null,
		userInfo: null,
		count: 0,
		token: null
	},
	// 2. Mutations: 唯一可以修改 State 的地方 (同步操作)
	mutations: {
		SET_USER_INFO(state, user) {
			state.userInfo = user
		},
		INCREMENT(state) {
			state.count++
		},
		SET_ITEMS(state, items) {
			state.items = items
		},
		SET_TOKEN(state, token) {
			state.token = token
		}
	},
	// 3. Actions: 处理异步操作，然后通过 commit 触发 Mutation
	actions: {
		/**
		 * dispatch('requestNews')
		 *
		 *
		 * https://jsonplaceholder.typicode.com/posts
		 *
		 * @param {*} params 不传参 则取 100条，传参则取对应字段的那一条。 如 params = {id:1}
		 */
		requestNews({
			commit
		}, params) {
			console.log("store.js call requestNews")
			return new Promise((resolve, reject) => {
				// API 测试地址 https://jsonplaceholder.typicode.com/
				uni.request({
					url: "https://jsonplaceholder.typicode.com/posts",
					data: params,
					success: (response) => {
						/*
						{
						"userId": 1,
						"id": 1,
						"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
						"body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
						}
						*/
						commit('SET_ITEMS', response.data)
						console.log('store.js request success:')
						console.log(response.data)
						resolve(response.data) // 解决 Promise
					},
					fail: (err) => {
						console.log(`store.js request fail: ${err}`)
						reject(err)
					}
				})
			})
		},
		/**
		 * dispatch('userLogin') 执行此处
		 * @param {*} payload  参数
		 */
		userLogin({
			commit
		}, payload) {
			console.log("store.js call requestNews")
			console.log('接收到的参数：', payload.name)

			// 2. 在这里执行异步请求（uni-app 的网络请求）
			return new Promise((resolve, reject) => {
				uni.request({
					url: '/api/login',
					data: payload,
					success: (response) => {
						commit('SET_TOKEN', response.data.token) // 修改 state
						resolve(response.data) // 解决 Promise
					},
					fail: (err) => reject(err)
				})
			})
		}
	},
	// 4. Getters: 相当于 Store 的计算属性，对 State 进行加工
	getters: {
		isLoggedIn: state => {
			return state.userInfo !== null
		}
	}
})

export default store //导出store对象
