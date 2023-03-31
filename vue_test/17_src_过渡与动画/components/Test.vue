<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition name="transform" :appear="true">
      <h1 v-show="isShow">你好啊</h1>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Test",
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
.transform-enter-active {
  animation: hello 0.5s linear;
}

.transform-leave-active {
  animation: hello 0.5s linear reverse;
}
@keyframes hello {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0px);
  }
}
</style>
