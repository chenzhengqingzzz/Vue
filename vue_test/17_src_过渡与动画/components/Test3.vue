<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition-group
      :appear="true"
      name="animate__animated animate__bounce"
      enter-active-class="animate__swing"
      leave-active-class="animate__backOutUp"
    >
      <h1 v-show="isShow" key="1">你好啊</h1>
      <h1 v-show="!isShow" key="2">睡大觉</h1>
    </transition-group>
  </div>
</template>

<script>
// 引入样式库
import "animate.css";
export default {
  name: "Test3",
  data() {
    return {
      isShow: true,
    };
  },
};
</script>

<style scoped>
h1 {
  background-color: orange;
}
</style>
