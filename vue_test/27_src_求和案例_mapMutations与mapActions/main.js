// 引入Vue
import Vue from 'vue';
// 引入App
import App from './App'
// 引入vue-resource插件
import vueResource from 'vue-resource';
// 引入store
import store from './store';

// 关闭Vue的生产提示
Vue.config.productionTip = false
// 使用插件
Vue.use(vueResource)

// 创建vm
new Vue({
    el: '#app',
    render(h) {
        return h(App)
    },
    store,
    // 安装全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this
    },
    mounted(){
        // console.log(this);
    }
})