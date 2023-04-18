// 引入Vue
import Vue from 'vue';
// 引入App
import App from './App'
// 完整引入
// 引入ElementUI组件库
// import ElementUI from 'element-ui';
// 引入ElementUI的全部样式
// import 'element-ui/lib/theme-chalk/index.css';

// 按需引入
import { Button, Row, DatePicker } from 'element-ui'


// 关闭Vue的生产提示
Vue.config.productionTip = false

// 应用ElementUI
// Vue.use(ElementUI)
Vue.component('czq-button', Button)
Vue.component('czq-row', Row)
Vue.component('czq-date-picker', DatePicker)

// 创建vm
new Vue({
    el: '#app',
    render(h) {
        return h(App)
    },
    // mounted() {
    //     console.log(this);
    // },
})