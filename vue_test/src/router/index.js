// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

// 创建并暴露一个路由器
const router = new VueRouter({
    routes: [
        {
            name: 'guanyu',
            path: '/about',
            component: About,
            meta: {title: '关于'},
        },
        {
            name: 'zhuye',
            path: '/home',
            component: Home,
            meta: {title: '主页'},
            // 通过children配置嵌套（子级）路由
            children: [
                {
                    name: 'xinwen',
                    path: 'news', // 此处一定不要写：/news
                    component: News,
                    meta: { //路由元信息，用于塞我们自己的东西
                        isAuth: true, //是否授权 如果是false则配置项都可以不用写
                        title: '新闻'
                    },
                    // 独享路由守卫，注意它没有独享后置路由守卫，可以和全局后置守卫配合使用
                    beforeEnter: (to, from, next) => {
                        if (to.meta.isAuth) {
                            if (localStorage.getItem('school') === 'atguigu') {
                                next()
                            }else{
                                alert('学校名不对，无权限查看！')
                            }
                        }else{
                            next()
                        }
                    },
                },
                {
                    name: 'xiaoxi',
                    path: 'message',// 此处一定不要写：/message
                    component: Message,
                    meta: { //路由元信息，用于塞我们自己的东西
                        isAuth: true, //是否授权 如果是false则配置项都可以不用写
                        title: '消息'
                    },
                    children: [
                        {
                            name: 'xiangqing',
                            path: 'detail/:id/:title/:age?', //使用占位符声明接收params参数，问号代表参数可传可不传
                            component: Detail,
                            meta: {isAuth: true, title: '消息详情'},
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

// // 在每一次路由切换之前
// // 全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
// router.beforeEach((to, from, next) => {
//     //to是将要访问的路由的信息对象
//     //from是将要离开的路由的信息对象
//     //next是一个函数，调用next()表示放行，允许这次路由导航
//     console.log('前置路由守卫', to, from);
//     if (to.meta.isAuth) { //判断是否需要鉴权
//         if (localStorage.getItem('school') === 'atguigu') {
//             next()
//         } else {
//             alert('学校名不对，无权限查看！')
//         }
//     } else {
//         next()
//     }
// })

// 全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to, from) => {
    console.log('后置路由守卫', to, from);
    document.title = to.meta.title || 'Vue路由Demo'
})

//导出路由器
export default router