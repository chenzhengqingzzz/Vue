<template>
  <div class="school">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
export default {
    name: 'School',
    data() {
        return {
            name: 'xx大学',
            address: 'HuBei'
        }
    },
}
</script>

<style>
    .school {
        background-color: gray;
    }
</style>