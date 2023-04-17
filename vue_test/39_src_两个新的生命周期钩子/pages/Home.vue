<template>
  <div>
    <h2>我是Home的内容</h2>
    <ul class="nav nav-tabs">
      <li>
        <router-link replace class="list-group-item" active-class="active" to="/home/news">News</router-link>
      </li>
      <li>
        <router-link replace class="list-group-item" active-class="active" to="/home/message">Message</router-link>
      </li>
    </ul>
    <!-- 缓存一个路由组件 -->
    <keep-alive include="News"> <!-- include中写想要缓存的组件名，不写表示全部缓存 -->
      <router-view></router-view>
    </keep-alive>
    <!-- 缓存多个路由组件 -->
    <!-- <keep-alive :include="['News', 'Message']">
      <router-view></router-view>
    </keep-alive> -->
  </div>
</template>

<script>
export default {
  name: "Home",
  // mounted() {
  //   console.log(this);
  // },
};
</script>

<style>
</style>