<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <!-- 通过props传给子组件一个函数 -->
        <Header :addTodo="addTodo" />
        <List :todos="todos" />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import List from "./components/List.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    List,
    Footer,
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
  methods: {
    // 当初传给子组件的函数
    addTodo(todoObj){
      this.todos.unshift(todoObj)
    }
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>

