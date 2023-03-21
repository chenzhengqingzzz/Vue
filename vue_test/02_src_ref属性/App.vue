<template>
  <div>
    <h1 v-text="msg" ref="title"></h1>
    <button ref="btn" @click="showDOM">点我输出打上ref标识的标签</button>
    <School ref="sch"/>
  </div>
</template>

<script>
// 引入School组件
import School from './components/School.vue'

export default {
    name: 'App',
    components: {
        School,
    },
    data() {
      return {
        msg:'欢迎学习Vue！'
      }
    },
    methods: {
      showDOM(){
        console.log(this.$refs);
      }
    },
}
</script>