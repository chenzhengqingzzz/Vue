// 该文件用于创建Vuex中最为核心的store

// // 引入Vue
import Vue from 'vue'
// // 引入Vuex
import Vuex from 'vuex'

// 使用vuex插件
Vue.use(Vuex)

// Actions——用于响应组件里面的动作
const actions = {
    // 没有网络请求或其他业务逻辑的动作可以不需要经过actions，直接和mutations对话
    // increment(context, value) {
    //     console.log('actions中的increment被调用了', context, value);
    //     context.commit('INCREMENT', value)
    // },
    // decrement(context, value) {
    //     console.log('actions中的decrement被调用了', context, value);
    //     context.commit('DECREMENT', value)
    // },

    // 网络请求或其他业务逻辑一般在actions里面完成
    incrementOdd(context, value) {
        if (context.state.sum % 2) {
            console.log('actions中的incrementOdd被调用了', context, value);
            context.commit('INCREMENT', value)
        }
    },
    // 网络请求或其他业务逻辑一般在actions里面完成
    incrementAsync(context, value){
        setTimeout(() => {
            console.log('actions中的incrementAsync被调用了', context, value);
            context.commit('INCREMENT', value)
        }, 500)
    }
}
// 准备Mutations——用于操作数据(state)
const mutations = {
    INCREMENT(state, value) {
        console.log('mutations中的INCREMENT被调用了', state, value);
        state.sum += value
    },
    DECREMENT(state, value) {
        console.log('mutations中的INCREMENT被调用了', state, value);
        state.sum -= value
    },
    ADD_PERSON(state, value){
        console.log('mutations中的ADD_PERSON被调用了', state, value);
        state.personList.unshift(value)
    }
}
// 准备State——用于存储数据
const state = {
    sum: 0, // 当前的求和
    school: '尚硅谷',
    subject: '前端',
    personList: [
        {id:'001', name: '张三'}
    ]
}
// 准备getters——用于将state中的数据进行加工
const getters = {
    bigSum(state){
        return state.sum * 10
    }
}

// 创建并暴露Store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
