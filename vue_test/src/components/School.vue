<template>
  <div class="school">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
    <button @click="sendSchoolName">点我给App传学校名</button>
  </div>
</template>

<script>
export default {
    name: 'School',
    data() {
        return {
            name: 'x大学芜湖芜湖',
            address: 'HuBei'
        }
    },
    props: ['getSchoolName'],
    methods: {
      sendSchoolName(){
        this.getSchoolName(this.name)
      }
    },
}
</script>

<style scoped>
.school {
  background-color: skyblue;
  padding: 5px;
}
</style>