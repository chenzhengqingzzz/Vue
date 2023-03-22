<template>
  <div>
    <h1 class="title">你好啊</h1>
    <Student/>
    <hr/>
    <School/>
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
    }
}
</script>

<style scoped>
  .title {
    color: red
  }
</style>