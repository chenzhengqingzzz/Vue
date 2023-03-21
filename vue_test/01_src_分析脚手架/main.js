/* 
 	该文件是整个项目的入口文件
 */
// //引入Vue
import Vue from 'vue'
// //引入App组件，它是所有组件的父组件
import App from './App.vue'
// //关闭vue的生产提示
Vue.config.productionTip = false

//创建Vue实例对象---vm
new Vue({
    el: '#app',
    // 如果我们引入的是一个残缺版的vue，则无法解析template配置项，得借助render函数
    // template: `<h1>你好啊</h1>`
    render: h => h(App)
    
    // render(createElement){
    //     return createElement('h1', '你好啊')
    // },
    // components: {App}
})
