<template>
  <div>
    <showHead msg="恶劣天气播报">
      <div id="add" v-on:click="addNotice">
        <img class="button_img_size" src="../assets/add.png">人工播报
      </div>
    </showHead>
    <controlPanel
      v-bind:headers="headers"
      v-bind:headerMap="headerMap"
      v-bind:resultList="planList"
      v-bind:controlFunc="play"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Head from "@/components/Head.vue";
import ControlPanel from "@/components/ControlPanel.vue";
import store from "@/store";
import router from "@/router";
import AcsApi from "../modules/api";

export default {
  name: "AlarmControl",
  components: {
    showHead: Head,
    controlPanel: ControlPanel
  },
  data: function() {
    return {
      headers: ["name", "volume", "deviceNames", "alarmContent", "status"],
      headerMap: {
        name: "名称",
        volume: "音量",
        deviceNames: "范围",
        alarmContent: "内容",
        status: "状态"
      },
      planList: [],
      play: function(alarmPlan) {
        let api = new AcsApi();
        api.playPlan(alarmPlan).then(res => {
          if (res.data.error === 0) {
            alarmPlan.status = "BUSY";
            setTimeout(() => {
              api.getPlanStatus(alarmPlan).then(res => {
                if (res.data.status === 0) {
                  alarmPlan.status = "NORMAL";
                }
              });
            }, 2000);
          }
        });
      }
    };
  },
  computed: {
    ...mapGetters(["alarmPlansOfOtherType"])
  },
  mounted: function() {
    this.updateAlarmPlansOfOtherType()
      .then(() => {
        console.log("data alarmPlansOfOtherType will be updated");
        this.planList = this.alarmPlansOfOtherType._embedded.alarm_plan;
        console.log("data alarmPlansOfOtherType updated");
      })
      .catch(error => {
        console.error(error);
        router.push("/logout");
      });
  },
  methods: {
    ...mapActions(["updateAlarmPlansOfOtherType"]),
    addNotice: function() {
      // popup page
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
