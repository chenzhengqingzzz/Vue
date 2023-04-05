// 该文件用于创建Vuex中最为核心的store

// // 引入Vue
import Vue from 'vue'
// // 引入Vuex
import Vuex from 'vuex'

// 使用vuex插件
Vue.use(Vuex)

// Actions——用于响应组件里面的动作
const actions = {

}
// 准备Mutations——用于操作数据(state)
const mutations = {

}
// 准备State——用于存储数据
const state = {

}

// 创建并暴露Store
export default new Vuex.Store({
    actions,
    mutations,
    state
})
