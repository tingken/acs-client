<template>
  <div>
    <showHead msg="告警设置">
      <div id="add">添加告警预案</div>
    </showHead>
    <showPanel v-bind:headers="headers" v-bind:headerMap="headerMap" v-bind:resultList="planList"/>
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
import ShowPanel from "@/components/ShowPanel.vue";

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
      planList: [
        {
          name: "大风预警",
          threshold: "15",
          volume: "25",
          alarmDevices: "设备1,设备2,设备3,设备4,设备5,设备6,设备7",
          alarmContent: "请注意！B区风速过高！",
          status: "正常"
        },
        {
          name: "大风预警",
          threshold: "20.0",
          volume: "50",
          alarmDevices: "设备3,设备4,设备5,设备6,设备7",
          alarmContent: "大风预警，请尽速撤离",
          status: "维护"
        },
        {
          name: "大风预警",
          threshold: "25.5",
          volume: "50",
          alarmDevices: "设备1,设备2,设备3,设备4,设备5",
          alarmContent: "大风预警，请尽速撤离",
          status: "正常"
        },
        {
          name: "大风预警",
          threshold: "30",
          volume: "80",
          alarmDevices: "设备1,设备2,设备5,设备6,设备7",
          alarmContent: "大风预警，请尽速撤离",
          status: "正常"
        },
        {
          name: "雷电预警",
          threshold: "",
          volume: "",
          alarmDevices: "设备1,设备2,设备3,设备4,设备5,设备6,设备7",
          alarmContent: "雷电预警，请尽速撤离",
          status: "正常"
        },
        {
          name: "冰雹预警",
          threshold: "",
          volume: "",
          alarmDevices: "设备1,设备2,设备3,设备4,设备5,设备6,设备7",
          alarmContent: "冰雹预警，请尽速撤离",
          status: "正常"
        }
      ]
    };
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
