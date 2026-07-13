1、自定义组件 如 user-infoX.vue

安装 vuex 插件 4.x:
	如果用户执行 npm install vuex 而没有指定 @next，他们默认得到 vuex@3（用于 Vue 2）
	提供解决方案：检查 package.json 中的 vuex 版本。如果是 ^3.x.x，就是问题所在。
	运行 npm install vuex@next --save 或 yarn add vuex@next 来安装 Vuex 4。
	提供安装后的额外验证步骤：清除缓存（node_modules 和 vite 缓存），以防旧版本被缓存。
	提示：删除 node_modules/.vite 文件夹或重启 HBuilderX/开发服务器。
