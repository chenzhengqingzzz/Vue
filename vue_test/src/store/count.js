// 求和功能相关的配置
export default {
    // 开启命名空间，好让对应的组件可以使用countOption
    namespaced: true,
    actions: {// 网络请求或其他业务逻辑一般在actions里面完成
        incrementOdd(context, value) {
            if (context.state.sum % 2) {
                console.log('actions中的incrementOdd被调用了', context, value);
                context.commit('INCREMENT', value)
            }
        },
        // 网络请求或其他业务逻辑一般在actions里面完成
        incrementAsync(context, value) {
            setTimeout(() => {
                console.log('actions中的incrementAsync被调用了', context, value);
                context.commit('INCREMENT', value)
            }, 500)
        }
    },
    mutations: {
        INCREMENT(state, value) {
            console.log('mutations中的INCREMENT被调用了', state, value);
            state.sum += value
        },
        DECREMENT(state, value) {
            console.log('mutations中的INCREMENT被调用了', state, value);
            state.sum -= value
        },
    },
    state: {
        sum: 0, // 当前的求和
        school: '尚硅谷',
        subject: '前端',
    },
    getters: {
        bigSum(state) {
            return state.sum * 10
        }
    }
}