<template>
  <div>
    <showHead msg="用户管理">
      <div id="add" v-on:click="addUser"><img class="button_img_size" src="../assets/add.png">添加新账号</div>
    </showHead>
    <showPanel v-bind:headers="headers" v-bind:headerMap="headerMap" v-bind:resultList="userList" editPath="editUser"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Head from '@/components/Head.vue'
import ShowPanel from '@/components/ShowPanel.vue'
import router from '../router';

export default {
  name: 'UserManage',
  components: {
    showHead: Head,
    showPanel: ShowPanel
  },
  data: function() {
    return {
      id: 'username',
      pathPrefix: '',
      headers: ["name", "userDesc"],
      headerMap: {
        name: "账号ID",
        userDesc: "账号描述"
      },
      userList: []
    };
  },
  mounted: function(){
    console.log('table height: ' + document.getElementById('table_container').childNodes[0].offsetHeight)
    document.getElementById('table_container').style.height = document.getElementById('table_container').childNodes[0].offsetHeight + 'px';
  },
  updated: function(){
    console.log('table height: ' + document.getElementById('table_container').childNodes[0].offsetHeight)
    document.getElementById('table_container').style.height = document.getElementById('table_container').childNodes[0].offsetHeight + 'px';
  },
  computed: {
    ...mapGetters(['users']),
  },
  mounted: function(){
      this.updateUsers().then(() => {
          this.userList = this.users._embedded.users
          console.log('data Users updated')
      }).catch((error) => {
          console.error(error)
          router.push('/logout')
      })
  },
  methods: {
      ...mapActions(['updateUsers']),
      addUser: function(){
        router.push('addUser')
      }
  }
};
</script>

<style scoped>
#add {
  top: 50%;
  right: 32px;
  position: absolute;
  transform: translate(0, -50%);
  width: 112px;
  height: 16px;
  font-size: 16px;
  font-family: MicrosoftYaHeiUILight;
  font-weight: 300;
  color: rgba(58, 58, 58, 1);
}
.button_img_size {
  width: 24px;
  height: 24px;
}
</style>
