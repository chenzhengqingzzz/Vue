<template>
  <ul class="todo-main">
    <li>
      <label>
        <input
          type="checkbox"
          :checked="this.todo.isDone"
          @change="handleCheck(todo.id)"
        />
        <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，修改了props -->
        <!-- <input type="checkbox" v-model="this.todo.isDone" > -->
        <span>{{ this.todo.title }}</span>
      </label>
      <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Item",
  mounted() {
    console.log(this);
  },
  props: {
    // 声明接收todo对象
    todo: {
      type: Object,
      required: true,
    },
    changeIsDone: {
      type: Function,
      required: true
    },
    deleteTodo: {
      type: Function,
      required: true
    }
  },
  methods: {
    // 勾选or取消勾选
    handleCheck(id) {
      // 通知App组件将对应的todo对象的idDone值取反
      this.changeIsDone(id)
    },
    // 删除
    handleDelete(id){
      if (confirm('确定删除吗？')) {
        // 通知App删除对应id的todo项
        this.deleteTodo(id)
      }
    }
  },
};
</script>

<style scoped>
/*Item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}
</style>