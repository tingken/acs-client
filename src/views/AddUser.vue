<template>
  <div>
    <showHead msg="添加账号">
    </showHead>
    <form>
    <span>类型</span>
    <select name="type">
        <option value="0">操作员</option>
        <option value="1">管理员</option>
    </select>
    <span>账号ID</span>
    <input v-model="account" type="text" placeholder="输入账号ID" />
    <span>密码</span>
    <input class="input-block" v-model="pwd" type="password" placeholder="请输入密码"/>
    </form>
  </div>
</template>

<script>
import Head from '@/components/Head.vue'

export default {
    name: 'AddUser',
    components: {
        showHead: Head
    }
}
</script>

<style scoped>

</style>
