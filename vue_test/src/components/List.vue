<template>
  <ul class="todo-main">
    <Item v-for="todoObj in todos" :key=todoObj.id :todo="todoObj" />
  </ul>
</template>

<script>
import Item from "./Item.vue";

export default {
  name: "List",
  components: {
    Item,
  },
  data() {
    return {
      todos: [
        { id: "001", title: "唱", isDone: true },
        { id: "002", title: "跳", isDone: true },
        { id: "003", title: "rap", isDone: true },
        { id: "004", title: "篮球", isDone: false },
      ],
    };
  },
};
</script>

<style scoped>
/*List*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>