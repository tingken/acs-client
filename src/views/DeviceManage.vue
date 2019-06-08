<template>
  <div>
    <showHead msg="设备管理">
      <span id="clear_button" class="ver_center extend_button" v-on:click="clear">
        <img class="button_img_size" src="../assets/clear.png">清空
      </span>
      <span id="refresh_button" class="ver_center extend_button" v-on:click="refresh">
        <img class="button_img_size" src="../assets/refresh.png">
        刷新
      </span>
      <span id="add_button" class="ver_center extend_button" v-on:click="addDevice">
        <img class="button_img_size" src="../assets/add.png">添加新设备
      </span>
    </showHead>
    <showPanel v-bind="panelProp"/>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import Head from "@/components/Head.vue";
import ShowPanel from "@/components/ShowPanel.vue";
import store from "@/store";
import AcsApi from "@/modules/api";
import router from "@/router";

export default {
  name: "DeviceManage",
  components: {
    showHead: Head,
    showPanel: ShowPanel
  },
  data: function() {
    return {
      panelProp: {
        headers: ["name", "address", "ip", "status"],
        headerMap: {
          name: "名称",
          address: "设备位置",
          ip: "IP",
          status: "状态"
        },
        resultList: [] //this.alarmDevices._embedded.alarm_device
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    // do something before mounted(no this here)
    next();
  },
  computed: {
    ...mapGetters(["alarmDevices"])
  },
  mounted: function() {
    this.updateAlarmDevices()
      .then(() => {
        this.panelProp.resultList = this.alarmDevices._embedded.alarm_device;
        console.log("data AlarmDevices updated");
      })
      .catch(error => {
        console.error(error);
        router.push("/logout");
      });
  },
  methods: {
    ...mapActions(["updateAlarmDevices"]),
    clear: function() {
      let api = new AcsApi();
      api.clearDevices().then(() => {
        alert("清除成功");
        this.updateAlarmDevices()
          .then(() => {
            this.panelProp.resultList = this.alarmDevices._embedded.alarm_device;
            console.log("data AlarmDevices updated");
          })
          .catch(error => {
            console.error(error);
            router.push("/logout");
          });
      });
    },
    refresh: function() {
      let api = new AcsApi();
      api.refreshDevices().then(() => {
        alert("刷新成功");
        this.updateAlarmDevices()
          .then(() => {
            this.panelProp.resultList = this.alarmDevices._embedded.alarm_device;
            console.log("data AlarmDevices updated");
          })
          .catch(error => {
            console.error(error);
            router.push("/logout");
          });
      });
    },
    addDevice: function() {
      this.$router.push("deviceManage/addDevice");
    }
  }
};
</script>

<style scoped>
.extend_button {
  font-size: 16px;
  font-family: MicrosoftYaHeiUILight;
  font-weight: 300;
  color: rgba(58, 58, 58, 1);
}
#clear_button {
  right: 265px;
}
#refresh_button {
  right: 172px;
  /* background: url("../assets/refresh.png"); */
}
#add_button {
  right: 30px;
}
.ver_center {
  top: 50%;
  position: absolute;
  transform: translate(0, -50%);
}
.button_img_size {
  width: 24px;
  height: 24px;
}
</style>
