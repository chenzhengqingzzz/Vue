// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'

// 创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home,
            // 通过children配置嵌套（子级）路由
            children: [
                {
                    path: 'news', // 此处一定不要写：/news
                    component: News
                },
                {
                    path: 'message',// 此处一定不要写：/message
                    component: Message
                }
            ]
        },
    ]
})