// 该文件用于创建Vuex中最为核心的store

// // 引入Vue
import Vue from 'vue'
// // 引入Vuex
import Vuex from 'vuex'

// 使用vuex插件
Vue.use(Vuex)

import countOptions from './count'
import personOptions from './person'

// 创建并暴露Store
export default new Vuex.Store({
    modules: {
        countAbout: countOptions,
        personAbout: personOptions
    }
})
