<template>
  <div>
    <h1>当前求和为：{{sum}}</h1>
    <h3>当前求和被放大10倍后为：{{bigSum}}</h3>
    <h3>我在{{school}}，学习{{subject}}</h3>
    <h3 style="color: red">Person组件的总人数是：{{personList.length}}</h3>
    <!-- <select v-model="selectedNumber"> -->
    <!-- 或者不用v-bind，直接在v-model使用类型转换 -->
    <select v-model.number="selectedNumber">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="increment(selectedNumber)">+</button>
    <button @click="decrement(selectedNumber)">-</button>
    <button @click="incrementOdd(selectedNumber)">当前求和为奇数再加</button>
    <button @click="incrementAsync(selectedNumber)">等一等再加</button>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
export default {
  name: "Count",
  data() {
    return {
      selectedNumber: 1, // 用户选择的数字
    };
  },
  computed: {
    // es6语法：把每一组keyvalue都展开放入这里
    // 借助mapState生成计算属性，从state中读取属性（对象写法）
    // ...mapState({sum: 'sum', school: 'school', subject: 'subject'}),
    // 借助mapState生成计算属性，从state中读取属性（数组写法）
    ...mapState('countAbout', ['sum', 'school', 'subject']),
    ...mapState('personAbout', ['personList']),
    
    // 借助mapState生成计算属性，从getters中读取属性（对象写法）
    // ...mapGetters({bigSum: 'bigSum'}),
    // 借助mapState生成计算属性，从getters中读取属性（数组写法）
    ...mapGetters('countAbout', ['bigSum'])
  },
  methods: {
    // // 没有网络请求或其他业务逻辑的动作可以不需要经过actions，直接和mutations对话
    // 程序员亲自写的方法
    // increment() {
    //   this.$store.commit('INCREMENT', this.selectedNumber)
    // },
    // // 没有网络请求或其他业务逻辑的动作可以不需要经过actions，直接和mutations对话
    // decrement() {
    //   this.$store.commit('DECREMENT', this.selectedNumber)
    // },

    // 借助mapMutataions生成对应的方法，方法中会调用commit去联系mutations（对象写法）
    ...mapMutations('countAbout', {increment: 'INCREMENT', decrement: 'DECREMENT'}),
    // 借助mapMutataions生成对应的方法，方法中会调用commit去联系mutations（数组写法）
    // ...mapMutations(['INCREMENT', 'DECREMENT']),

    // ----------------------------------------------------------
    // 程序员亲自写方法
    // incrementOdd() {
    //   this.$store.dispatch('incrementOdd', this.selectedNumber)
    // },
    // incrementAsync(){
    //   this.$store.dispatch('incrementAsync', this.selectedNumber)
    // }

    // 借助mapActions生成对应方法，方法中会调用dispatch去联系actions（对象写法）
    // ...mapActions({incrementOdd: 'incrementOdd', incrementAsync: 'incrementAsync'}),
    // 借助mapActions生成对应方法，方法中会调用dispatch去联系actions（数组写法）
    ...mapActions('countAbout', ['incrementOdd', 'incrementAsync']),
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