export default {
    install(Vue){
        // 全局过滤器
        // 过滤出索引为0~4的字符
        Vue.filter('mySlice', function(value) {
            return value.slice(0, 4)
        })

        // 全局指令
        // 实现v-bind并默认获取焦点
        Vue.directive('fbind', {
            // 当指令与元素成功绑定时（一上来）
            bind(element, binding){
                element.value = binding.value
            },
            // 指令所在的元素被插入页面时
            inserted(element, binding){
                element.focus()
            },
            // 指令所在的模板被重新解析时
            update(element, binding){
               element.value = binding.value
            }
        })

        // 混入
        Vue.mixin({
            data(){
                return {
                    x: 100,
                    y: 200
                }
            }
        })

        // 给Vue原型上添加一个方法（vm和vc就都能用了）
        Vue.prototype.hello = () => {
            alert('你好啊')
        }

        // 给Vue原型上添加一个属性（vm和vc就都能用了）
        Vue.prototype.x = 100
    }
}