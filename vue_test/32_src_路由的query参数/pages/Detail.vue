<template>
  <ul>
    <li>消息编号：{{this.$route.query.id}}</li>
    <li>消息标题：{{this.$route.query.title}}</li>
  </ul>
</template>

<script>
export default {
    name: 'Detail',
    // 在钩子里声明接收来自Message的query参数
    mounted() {
      console.log(this);
    },
}
</script>

<style>

</style>