<template>
  <div class="container">
    <Category title="美食" :listData="foods">
      <img src="https://n.sinaimg.cn/sinakd20200530ac/320/w640h480/20200530/3d3e-iufmpmp2778569.jpg" alt="">
    </Category>

    <Category title="动物">
      <ul>
        <li v-for="(item, index) in animals" :key="index">{{item}}</li>
      </ul>
    </Category>

    <Category title="游戏">
      <video controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
    </Category>
  </div>
</template>

<script>
import Category from "./components/Category.vue";
export default {
  name: "App",
  components: {
    Category
  },
  data() {
    return {
      foods: ['香精煎鱼', '香翅捞饭', '鸽鸽烩虾蛋', '油饼', '蒸虾头'],
      animals: ['泥杆马', '梅狸猫', '蒸德湿泥鸭', '灰勒塔德钱兔', '醉嚎狮'],
      games: ['鸡坤传奇', '鸽鸽大冒险', '超电磁坤', '永劫无坤', '守望只因'],
    }
  },
};
</script>

<style>
  .container {
    display: flex;
    justify-content: space-around;
  }
  video {
    width: 100%;
  }
</style>