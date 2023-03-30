// 引入Vue
import Vue from 'vue';
// 引入App
import App from './App'
// 关闭Vue的生产提示
Vue.config.productionTip = false


// 创建vm
new Vue({
    el: '#app',
    render(h) {
        return h(App)
    },
    // 安装全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this
    },
})