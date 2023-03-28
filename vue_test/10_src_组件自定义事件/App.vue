<template>
  <div class="app">
    <h1>{{msg}}，{{studentName}}</h1>
    <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
    <School :getSchoolName="getSchoolName"/>
    <hr/>
    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第一种写法：使用@或v-on） -->
    <Student @atguigu="getStudentName" @demo="m1" @click.native="show"/>
    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第二种写法：使用ref 比直接在标签写更灵活） -->
    <!-- <Student ref="student"/> -->
  </div>
</template>

<script>
import Student from './components/Student.vue'
import School from './components/School.vue'

export default {
    name: 'App',
    components: {
        Student,
        School
    },
    data() {
      return {
        msg: '你好啊',
        studentName: ''

      }
    },
    methods: {
      getSchoolName(name){
        console.log('App收到了学校名：', name);
      },
      // 接收多个参数，1、可以用ES6的新语法，将其他的参数自动包装成一个params数组 2、对个参数包装成对象
      getStudentName(name, ...args){
        console.log('App收到了学生名：', name, args)
        this.studentName = name
      },
      m1(){
        console.log('demo事件被触发了');
      },
      show(){
        alert(123)
      }
    },
    mounted() {
      // Student的组件实例对象中的操作
      // this.$refs.student.$on('atguigu', this.getStudentName) //绑定自定义事件
      // this.$refs.student.$once('atguigu', this.getStudentName) //绑定自定义事件（一次性）
      // this.$refs.student.$on('atguigu', () => {
      //   console.log('App收到了学生名：', name, args)
      //   this.studentName = name
      // })
    },
}
</script>

<style scoped>
  .app {
    background-color: gray;
    padding: 5px;
  }
</style>