<template>
  <div>
    <button>原生的按钮</button>
    <input type="text" />
    <br/>
    <czq-row>
      <czq-button>默认按钮</czq-button>
      <czq-button type="primary">主要按钮</czq-button>
      <czq-button type="success">成功按钮</czq-button>
      <czq-button type="info">信息按钮</czq-button>
      <czq-button type="warning">警告按钮</czq-button>
      <czq-button type="danger">危险按钮</czq-button>
    </czq-row>
    <br/>
    <czq-date-picker
      type="date"
      placeholder="选择日期">
    </czq-date-picker>
    <br/>
    <czq-row>
      <czq-button icon="el-icon-search" circle></czq-button>
      <czq-button type="primary" icon="el-icon-edit" circle></czq-button>
      <czq-button type="success" icon="el-icon-check" circle></czq-button>
      <czq-button type="info" icon="el-icon-message" circle></czq-button>
      <czq-button type="warning" icon="el-icon-star-off" circle></czq-button>
      <czq-button type="danger" icon="el-icon-delete" circle></czq-button>
</czq-row>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
</style>