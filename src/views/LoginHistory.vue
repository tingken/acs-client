<template>
  <div>
    <showHead msg="登录历史">
    </showHead>
    <showPanel v-bind="panelProp"/>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import Head from "@/components/Head.vue";
import ShowPanel from "@/components/ShowPanel.vue";
import store from '@/store'
import AcsApi from '@/modules/api'
import router from '@/router'

export default {
  name: "LoginHistory",
  components: {
    showHead: Head,
    showPanel: ShowPanel
  },
  data: function() {
    return {
      panelProp: {
        headers: ['username', 'logDate'],
        headerMap: {username: '登录账号', logDate: '登录时间'},
        resultList: []//this.alarmNotices._embedded.alarm_notice
      }
    };
  },
  beforeRouteEnter (to, from, next) {
    // do something before mounted(no this here)
    next()
  },
  computed: {
    ...mapGetters(['userLoginInfo']),
  },
  mounted: function(){
      this.updateUserLoginInfo().then(() => {
          this.panelProp.resultList = this.userLoginInfo._embedded.user_login_info
          console.log('data userLoginInfo updated')
      }).catch((error) => {
          console.error(error)
          router.push('/logout')
      })
  },
  methods: {
      ...mapActions(['updateUserLoginInfo'])
  }
};
</script>

<style scoped>
</style>
