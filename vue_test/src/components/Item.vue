<template>
  <ul class="todo-main">
    <li>
      <label>
        <input type="checkbox" :checked="this.todo.isDone" />
        <span>{{ this.todo.title }}</span>
      </label>
      <button class="btn btn-danger" style="display: none">删除</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Item",
  props: {
    // 声明接收todo对象
    todo: {
      type: Object,
      required: true,
    },
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
</style>