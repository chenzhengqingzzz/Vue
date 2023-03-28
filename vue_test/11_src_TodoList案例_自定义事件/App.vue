<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <!-- 通过props传给子组件一个函数 -->
        <Header @addTodo="addTodo" />
        <List :todos="todos" :changeIsDone="changeIsDone" :deleteTodo="deleteTodo" />
        <Footer :todos="todos" @checkAllTodo="checkAllTodo" @clearAllDoneTodo="clearAllDoneTodo" />
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
      // 由于todos是Header组件和Footer组件都在使用，所以放在App中（状态提升）
      todos: JSON.parse(localStorage.getItem('todos')) || []
    };
  },
  methods: {
    // 添加一个todo
    // 当初传给子组件的函数
    addTodo(todoObj) {
      this.todos.unshift(todoObj);
    },
    // 勾选or取消勾选一个todo
    changeIsDone(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) {
          todo.isDone = !todo.isDone;
        }
      });
    },
    // 删除一个todo
    deleteTodo(id){
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id
      })
    },
    // 全选or取消全选
    checkAllTodo(isDone){
      this.todos.forEach((todo) => {
        todo.isDone = isDone
      })
    },
    // 删除所有已完成的todo
    clearAllDoneTodo(){
      this.todos = this.todos.filter((todo) => {
        return todo.isDone !== true
      })
    }
  },
  watch: {
    todos: {
      deep: true,
      handler(newValue){
        localStorage.setItem('todos', JSON.stringify(newValue))
      }
    }
  }
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

