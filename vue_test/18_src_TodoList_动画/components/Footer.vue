<template>
  <div class="todo-footer">
    <label>
      <!-- <input type="checkbox" :checked="isAll" :checkAll="checkAll"> -->
      <input type="checkbox" v-model="isAll" />
    </label>
    <span>
      <span>已完成{{ doneTotal }}</span> / 全部{{ total }}</span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    todos: {
      type: Array,
      required: true,
    },
    checkAllTodo: {
      type: Function,
      required: true
    },
    clearAllDoneTodo: {
      type: Function,
      required: true
    }
  },
  computed: {
    doneTotal() {
      return this.todos.filter((todo) => {
        return todo.isDone == true;
      }).length;
      // const doneTodos = this.todos.filter((todo) => {
      //   return todo.isDone == true
      // })
      // return doneTodos.length

      // doneTotal(){
      //此处使用reduce方法做条件统计
      /* const x = this.todos.reduce((pre,current)=>{
					console.log('@',pre,current)
					return pre + (current.done ? 1 : 0)
				},0) */
      //简写
      // return this.todos.reduce((pre,todo)=> pre + (todo.done ? 1 : 0) ,0)
      // },
    },
    total(){
      return this.todos.length
    },
    // 全选按钮相关
    isAll: {
      get(){
        return this.doneTotal === this.total && this.total > 0
      },
      set(value){
        this.checkAllTodo(value)
      }
    }
  },
  methods: {
    // 全选按钮相关
    // checkAll(e){
    //   console.log(e.target.checked);
    // },
    // 清除所有已完成任务相关
    clearAll(){
      if (confirm('确定删除所有已完成的任务吗？')) {
        this.clearAllDoneTodo()
      }
    }
  },
};
</script>

<style>
/*Footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>