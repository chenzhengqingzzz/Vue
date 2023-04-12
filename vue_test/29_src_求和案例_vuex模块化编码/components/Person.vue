<template>
  <div>
    <h1>人员列表</h1>
    <h3 style="color: red">Count组件求和为：{{sum}}</h3>
    <h3>列表中第一个人的名字是：{{firstPersonName}}</h3>
    <input type="text" placeholder="请输入名字" v-model="name">
    <button @click="add">添加</button>
    <button @click="addPersonWang">添加一个姓王的人</button>
    <button @click="sendAjaxToAddName">添加一个人，名字随机</button>
    <ul>
        <li v-for="person in personList" :key="person.id">{{person.name}}</li>
    </ul>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
    name: 'Person',
    data() {
        return {
            name: '',
        }
    },
    computed: {
        // personList(){
        //     return this.$store.state.personAbout.personList
        // },
        // sum(){
        //     return this.$store.state.countAbout.sum
        // }
        // firstPersonName(){
        //     读取对象里面的属性除了点，也可以用中括号
        //     return this.$store.getters[personAbout/firstPersonName]
        // },
        ...mapState('personAbout', ['personList']),
        ...mapState('countAbout', ['sum']),
        ...mapGetters('personAbout', ['firstPersonName'])
    },
    methods: {
        add(){
            const personObj = {id: nanoid(), name: this.name}
            this.$store.commit('personAbout/ADD_PERSON', personObj)
            this.name = ''
        },
        addPersonWang(){
            const personObj = {id: nanoid(), name: this.name}
            this.$store.dispatch('personAbout/addPersonWang', personObj)
            this.name = ''
        },
        // 如果要在这里触发简写方式，则必须要在模板里提前传值，则最好是我们在data中就配置好数据，前面在Count中就已经配置好了selectedNumber
        // ...mapActions('personAbout', ['addPersonWang'])
        sendAjaxToAddName(){
            this.$store.dispatch('personAbout/addPersonServer')
        }
    },
    mounted() {
        console.log(this);
    },
}
</script>

<style>

</style>