<template>
  <div class="container">
    <Category title="动物">
      <template scope="test">
        <!-- {{test.animals}} -->
        <ul>
          <li v-for="(item, index) in test.animals" :key="index">{{ item }}</li>
        </ul>
        <!-- 可以传多个参数 -->
        <h4>{{test.meg}}</h4>
      </template>
    </Category>

    <Category title="动物">
      <!-- es6解构赋值 -->
      <template scope="{animals}">
        <ol>
          <li style="color: red" v-for="(item, index) in animals" :key="index">{{ item }}</li>
        </ol>
      </template>
    </Category>

    <Category title="动物">
      <template slot-scope="test">
        <h4 v-for="(item, index) in test.animals" :key="index">{{ item }}</h4>
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