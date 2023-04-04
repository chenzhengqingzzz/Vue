<template>
  <div class="category">
    <h3>{{ title }}分类</h3>
    <slot :animals="animals" msg="hello">我是默认的一些内容</slot>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: ["title"],
  data() {
    return {
      animals: ["泥杆马", "梅狸猫", "蒸德湿泥鸭", "灰勒塔德钱兔", "醉嚎狮"],
    };
  },
};
</script>

<style>
.category {
  background-color: skyblue;
  width: 200px;
  height: 300px;
}
h3 {
  text-align: center;
  background-color: orange;
}
img {
  width: 100%;
}
</style>