<template>
  <div>
    <showHead msg="告警设置">
      <div id="add">添加告警预案</div>
    </showHead>
    <showPanel v-bind:headers="headers" v-bind:headerMap="headerMap" v-bind:resultList="planList" editPath="editPlan"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Head from "@/components/Head.vue";
import ShowPanel from "@/components/ShowPanel.vue";
import store from '@/store'
import router from '@/router'

export default {
  name: "AlarmManage",
  components: {
    showHead: Head,
    showPanel: ShowPanel
  },
  data: function() {
    return {
      headers: [
        "name",
        "threshold",
        "volume",
        "alarmDevices",
        "alarmContent",
        "status"
      ],
      headerMap: {
        name: "名称",
        threshold: "阈值",
        volume: "音量",
        alarmDevices: "范围",
        alarmContent: "内容",
        status: "状态"
      },
      planList: []
    };
  },
  computed: {
    ...mapGetters(['alarmPlans']),
  },
  mounted: function(){
      this.updateAlarmPlans().then(() => {
          this.planList = this.alarmPlans._embedded.alarm_plan
          console.log('data AlarmPlans updated')
      }).catch((error) => {
          console.error(error)
          router.push('/logout')
      })
  },
  methods: {
      ...mapActions(['updateAlarmPlans'])
  }
};
</script>

<style scoped>
#add {
  top: 50%;
  right: 32px;
  position: absolute;
  transform: translate(0, -50%);
  width: 96px;
  height: 16px;
  font-size: 16px;
  font-family: MicrosoftYaHeiUILight;
  font-weight: 300;
  color: rgba(58, 58, 58, 1);
}
</style>
