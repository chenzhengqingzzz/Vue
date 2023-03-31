<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition-group name="transform" :appear="true">
      <h1 v-show="isShow" key="1">你好啊</h1>
      <h1 v-show="!isShow" key="2">睡大觉</h1>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "Test2",
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

/* 进入的起点、离开的终点 */
.transform-enter, .transform-leave-to  {
  transform: translateX(-100%);
}

/* 转换的方式 */
.transform-enter-active, .transform-leave-active {
  transition: 0.5s;
}

/* 进入的终点、离开的起点  */
.transform-enter-to, .transform-leave {
  transform: translateX(0);
}

</style>
