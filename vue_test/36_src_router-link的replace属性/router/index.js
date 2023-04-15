// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

// 创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            name: 'guanyu',
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
                    component: Message,
                    children: [
                        {
                            name: 'xiangqing',
                            path: 'detail/:id/:title/:age?', //使用占位符声明接收params参数，问号代表参数可传可不传
                            component: Detail,
                            // 路由中props的第一种写法，值为对象，该对象中的所有key-value都会以props的形式传给Detail组件
                            // props: {a: 1, b: 'hello'},

                            // 路由中props的第二种写法，值为布尔值，若布尔值为真，就会把该路由组件收到的所有的params参数，以props的形式传给Detail组件
                            // props: true,

                            // 路由中props的第二种写法，值为函数，它是一个回调函数，vue调用这个的时候会默认传入$route，所以query、params都可以读出，不像第二种那样只能读params
                            props($route) {
                                return {
                                    id: $route.params.id,
                                    title: $route.params.title
                                }
                            }
                        }
                    ]
                }
            ]
        },
    ]
})