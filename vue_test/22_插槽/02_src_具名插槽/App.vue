<template>
  <div class="container">
    <Category title="美食" :listData="foods">
      <img
        slot="center"
        src="https://n.sinaimg.cn/sinakd20200530ac/320/w640h480/20200530/3d3e-iufmpmp2778569.jpg"
        alt=""
      />
      <a slot="footer" href="http://www.baidu.com">更多美食</a>
    </Category>

    <Category title="动物">
      <ul slot="center">
        <li v-for="(item, index) in animals" :key="index">{{ item }}</li>
      </ul>
      <div class="foot" slot="footer">
        <a href="http://www.baidu.com">单机游戏</a>
        <a href="http://www.baidu.com">网络游戏</a>
      </div>
    </Category>

    <Category title="游戏">
      <video
        slot="center"
        controls
        src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
      ></video>
      <template v-slot:footer>
        <div class="foot">
          <a href="http://www.baidu.com">经典</a>
          <a href="http://www.baidu.com">热门</a>
          <a href="http://www.baidu.com">推荐</a>
        </div>
        <h4>欢迎试玩</h4>
      </template>
    </Category>
  </div>
</template>

<script>
import Category from "./components/Category.vue";
export default {
  name: "App",
  components: {
    Category,
  },
  data() {
    return {
      foods: ["香精煎鱼", "香翅捞饭", "鸽鸽烩虾蛋", "油饼", "蒸虾头"],
      animals: ["泥杆马", "梅狸猫", "蒸德湿泥鸭", "灰勒塔德钱兔", "醉嚎狮"],
      games: ["鸡坤传奇", "鸽鸽大冒险", "超电磁坤", "永劫无坤", "守望只因"],
    };
  },
};
</script>

<style>
.container,
.foot {
  display: flex;
  justify-content: space-around;
}
video {
  width: 100%;
}
h4 {
  text-align: center;
}
</style>