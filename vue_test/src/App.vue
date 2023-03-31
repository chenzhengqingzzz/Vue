<template>
  <div id="root">
    <button @click="getStudents">获取学生信息</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  methods: {
    getStudents() {
      axios.get('http://localhost:3000/students').then(
      (response) => {
        console.log(' 请求成功了', response.data);
      },
      (error) => {
        console.log('请求失败了', error.message);
      })
      // axios({
      //   method: "GET",
      //   url: "http://localhost:8080/students",
      // }).then((response) => {
      //   console.log("请求成功了", response.data);
      // });
    },
  },
};
</script>