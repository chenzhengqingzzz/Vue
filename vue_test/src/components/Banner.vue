<template>
  <div class="col-xs-offset-2 col-xs-8">
    <div class="page-header">
      <h2>Vue Router Demo</h2>
      <button @click="back">后退</button>
      <button @click="forword">前进</button>
      <button @click="test">测试一下go</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  methods: {
    back(){
      this.$router.back()
    },
    forword(){
      this.$router.forword()
    },
    test(){
      this.$router.go(-2)
    }
  },
};
</script>

<style>
</style>