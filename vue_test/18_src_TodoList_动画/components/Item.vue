<template>
  <transition
    name="animate__animated animate__bounce"
    enter-active-class="animate__rotateInDownLeft"
    leave-active-class="animate__rotateOutUpRight"
    :appear="true"
  >
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
          <span v-show="!todo.isEdit">{{ this.todo.title }}</span>
          <input
            type="text"
            v-show="todo.isEdit"
            :value="todo.title"
            @blur="handleBlur(todo, $event)"
            ref="inputTitle"
          />
        </label>
        <button class="btn btn-danger" @click="handleDelete(todo.id)">
          删除
        </button>
        <button
          class="btn btn-edit"
          v-show="!todo.isEdit"
          @click="handleEdit(todo)"
        >
          编辑
        </button>
      </li>
    </ul>
  </transition>
</template>

<script>
import "animate.css";
import pubsub from "pubsub-js";
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
  },
  methods: {
    // 勾选or取消勾选
    handleCheck(id) {
      // 通知App组件将对应的todo对象的idDone值取反
      // this.changeIsDone(id)
      this.$bus.$emit("changeIsDone", id);
    },
    // 删除
    handleDelete(id) {
      if (confirm("确定删除吗？")) {
        // 通知App删除对应id的todo项
        // this.deleteTodo(id)
        // this.$bus.$emit('deleteTodo', id)
        pubsub.publish("deleteTodo", id);
      }
    },
    // 编辑
    handleEdit(todo) {
      todo.isEdit = true;
      // nextTick所指定的回调函数会在DOM节点更新完毕之后再执行
      this.$nextTick(function () {
        this.$refs.inputTitle.focus();
      });
      // 这样不指定延迟时间也可以实现立即获取焦点，上面是官方的写法
      // setTimeout(() => {
      //   this.$refs.inputTitle.focus()
      // })
    },
    // 失去焦点回调（真正执行修改逻辑）
    handleBlur(todo, e) {
      todo.isEdit = false;
      console.log(e);
      if (!e.target.value.trim()) return alert("输入不能为空！");
      this.$bus.$emit("updateTodo", todo.id, e.target.value);
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

li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}
</style>