<template>
  <div>
    <h2 @click="showName">学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
  </div>
</template>

<script>
// 引入一个混合
// import {mixin, mixin2} from '../mixin'

export default {
    name: 'Student',
    data() {
      console.log(this);
        return {
            name: '张三',
            sex: '男',
            x:666
        }
    },
    // 通过mixins配置
    // mixins: [mixin, mixin2]
}
</script>
