<template>
  <div class="school">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
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
    mounted() {
      // console.log('School', this.x);
      this.$bus.$on('hello', (data) => {
        console.log('我是School组件，收到了数据', data);
      })
    },
    // 销毁组件之前解绑对应自定义事件，如果我们off里面什么都不写，就代表销毁所有事件，就会代表所有给中转站绑定的时间全部失效
    beforeDestroy() {
      this.$bus.$off('hello')
    },
}
</script>

<style scoped>
.school {
  background-color: skyblue;
  padding: 5px;
}
</style>