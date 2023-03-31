<template>
  <div id="root">
    <button @click="getStudents">获取学生信息</button>
    <button @click="getCars">获取汽车信息</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  methods: {
    getStudents() {
      axios.get('http://localhost:8080/api/students').then(
      (response) => {
        console.log('请求成功了', response.data);
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
    getCars(){
      axios({
        method: 'GET', 
        url: 'http://localhost:8080/czq/cars'
      }).then((response) => {
        console.log('请求成功了', response.data);
      })
    }
  },
};
</script>