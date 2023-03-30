// 引入Vue
import Vue from 'vue';
// 引入App
import App from './App'
// 关闭Vue的生产提示
Vue.config.productionTip = false

// 在vc身上追加一个能使用$on()的组件实例对象
// const Demo = Vue.extend({})
// const d = new Demo()
// Vue.prototype.x = d

// 创建vm
new Vue({
    el: '#app',
    render(h) {
        return h(App)
    },
})