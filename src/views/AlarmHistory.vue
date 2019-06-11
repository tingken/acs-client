<template>
  <div>
    <showHead msg="告警历史">
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
  name: "AlarmHistory",
  components: {
    showHead: Head,
    showPanel: ShowPanel
  },
  data: function() {
    return {
      panelProp: {
        headers: ['value', 'threshold', 'range', 'noticeContent', 'noticeTime'],
        headerMap: {value: '检测值', threshold: '阈值', range: '范围', noticeContent: '内容', noticeTime: '时间'},
        resultList: [],//this.alarmNotices._embedded.alarm_notice
        resourceName: 'alarmNotices'
      }
    };
  },
  beforeRouteEnter (to, from, next) {
    // do something before mounted(no this here)
    next()
  },
  computed: {
    ...mapGetters(['alarmNotices']),
  },
  mounted: function(){
      this.updateAlarmNotices().then(() => {
          this.panelProp.resultList = this.alarmNotices._embedded.alarm_notice
          console.log('data AlarmNotices updated')
      }).catch((error) => {
          console.error(error)
          router.push('/logout')
      })
  },
  methods: {
      ...mapActions(['updateAlarmNotices'])
  },
  watch: {
    // alarmNotices: function(val){
    //   console.log('panelProp.resultList updated')
    //   this.panelProp.resultList = val._embedded.alarm_notice
    // }
  }
};
</script>

<style scoped>
</style>
