<template>
  <div>
    <Student name="李四" sex="female" :age="18"/>
    <Student name="王老五" sex="male" :age="19"/>
  </div>
</template>

<script>
import Student from './components/Student.vue'

export default {
    name: 'App',
    components: {
        Student,
    }
}
</script>