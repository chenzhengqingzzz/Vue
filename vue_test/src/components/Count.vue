<template>
  <div>
    <h1>当前求和为：{{this.$store.state.sum}}</h1>
    <h3>当前求和被放大10倍后为：{{$store.getters.bigSum}}</h3>
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
      selectedNumber: 1, // 用户选择的数字
    };
  },
  methods: {
    // 没有网络请求或其他业务逻辑的动作可以不需要经过actions，直接和mutations对话
    increment() {
      this.$store.commit('INCREMENT', this.selectedNumber)
    },
    // 没有网络请求或其他业务逻辑的动作可以不需要经过actions，直接和mutations对话
    decrement() {
      this.$store.commit('DECREMENT', this.selectedNumber)
    },
    incrementOdd() {
      this.$store.dispatch('incrementOdd', this.selectedNumber)
    },
    incrementAsync(){
      this.$store.dispatch('incrementAsync', this.selectedNumber)
    }
  },
  mounted() {
    console.log(this);
  },
};
</script>

<style>
button {
  margin-left: 5px;
}
</style>