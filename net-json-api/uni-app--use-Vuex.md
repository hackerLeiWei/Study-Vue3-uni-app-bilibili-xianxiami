1. 版本检查（关键第一步）
Vue 3 必须搭配 Vuex 4.x 版本。如果之前安装了旧版，请先升级：
bash:
```
npm install vuex@next --save
```
检查 package.json，确保 vuex 版本号为 ^4.0.0 或更高。



2. 在 main.js 中“引用”并注册（全局引入）
创建 ./store/store-index
由于 uni-app 使用 createSSRApp，引用方式与标准 Vue 3 略有不同。标准写法如下：

javascript
// main.js
import App from './App'
import { createSSRApp } from 'vue'   // 1. 导入创建方法
import store from './store/store-index' // 1. 引入 store           // 2. 导入 store 实例（默认指向 store/index.js）

// 3. uni-app 规范：必须导出 createApp 函数
export function createApp() {
  const app = createSSRApp(App)

  // 4. 引用并注册 Vuex（核心步骤）
  app.use(store)

  // 如果有路由、UI库等插件，也在这里 app.use(...)

  return {
    app
  }
}
特别注意：千万不要直接写 app.mount('#app')，一定要按上述格式 export function createApp() 并返回 { app }，否则小程序端会报错。



3. 在组件（页面）中“引用”和使用
这里分为两种写法，强烈推荐使用组合式 API 的方式，因为这是 Vue 3 的主流。

✅ 方式一：组合式 API（<script setup> 写法）
在 Vue 3 的 <script setup> 中，没有 this，需要从 vuex 中导入 useStore 来引用：

vue
<template>
  <view>{{ count }}</view>
  <button @click="add">+1</button>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'   // 从 vuex 中引用 useStore

// 引用 store 实例
const store = useStore()

// 读取 state（响应式）
const count = computed(() => store.state.count)

// 提交 mutation（同步修改）
const add = () => {
  store.commit('INCREMENT')
}

// 分发 action（异步）
const login = () => {
  store.dispatch('userLogin', { name: 'test' })
  // 执行后的流向：
  // 去往：store 中 actions 里的 userLogin 函数（执行 uni.request）。
  // 回到：组件中 await 或 .then 的地方（接收请求成功/失败的回调）。
  // 刷新：所有绑定了 state.token 的 computed 计算属性（接收数据变化，自动更新 UI）。
  // 特别注意：如果你执行 dispatch 后没有使用 await 或 .then，那么第 2 步（接收请求结果）就不会执行，但第 1 步逻辑依然会跑，第 3 步依然会自动刷新 UI。这在不需要关心请求结果（如仅记录日志）时是允许的。

}
</script>



✅ 方式二：选项式 API（this.$store 写法）
如果你习惯 Vue 2 的写法，Vuex 4 依然支持通过 this 访问：

vue
<script>
export default {
  computed: {
    count() {
      return this.$store.state.count
    }
  },
  methods: {
    add() {
      this.$store.commit('INCREMENT')
    }
  }
}
</script>




4. 进阶：模块化（Modules）中的引用方式
当项目变大，通常会按功能拆分模块（如 user.js、cart.js）。

创建：在 store/modules/user.js 中导出带有 namespaced: true 的对象。

注册：在 store/index.js 中引入模块。

引用：在组件中使用时，带上模块路径：

javascript
<script setup>
import { useStore } from 'vuex'
const store = useStore()

// 读取模块里的 state
const userName = computed(() => store.state.user.name)

// 触发模块里的 mutation（需传入模块名）
const update = () => store.commit('user/SET_NAME', 'Alice')

// 触发模块里的 action
const asyncUpdate = () => store.dispatch('user/updateName', 'Bob')
</script>




5. 辅助函数（mapState/mapMutations）在 Vue 3 中的引用
如果你偏爱 mapState，在 <script setup> 中不推荐直接使用（因为难以与 computed 结合）。但在选项式 API 中依然可以正常引用：

vue
<script>
import { mapState, mapMutations } from 'vuex' // 从 vuex 引用
export default {
  computed: {
    ...mapState(['count'])
  },
  methods: {
    ...mapMutations(['INCREMENT'])
  }
}
</script>
