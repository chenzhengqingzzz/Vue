<template>
  <div>
    <h1>当前求和为：{{ this.sum }}</h1>
    <select v-model="selectedNumber">
    <!-- 或者不用v-bind，直接在v-model使用类型转换 -->
    <!-- <select v-model.number="selectedNumber"> -->
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementOdd">当前求和为奇数再加</button>
    <button @click="incrementAsync">等一等再加</button>
  </div>
</template>

<script>
export default {
  name: "Count",
  data() {
    return {
      sum: 0, // 当前的求和
      selectedNumber: 1, // 用户选择的数字
    };
  },
  methods: {
    increment() {
      this.sum += this.selectedNumber;
    },
    decrement() {
      this.sum -= this.selectedNumber;
    },
    incrementOdd() {
      if (this.sum % 2) {
        this.sum += this.selectedNumber;
      }
    },
    incrementAsync(){
        setTimeout(() => {
            this.sum += this.selectedNumber
        }, 500);
    }
  },
};
</script>

<style>
button {
  margin-left: 5px;
}
</style>