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
      resourceName="alarmPlansOfOtherType"
    />
    <!-- <stack-modal
      style="z-index:999"
      :show="dlgShown"
      title="添加人工播报"
      :saveButton="{ title: '确认添加', visible: true, btnClass: {'btn btn-primary': true}}"
      :cancelButton="{ title: '取消', visible: true, btnClass: {'btn btn-outline-secondary': true}}"
      @close="dlgShown=false"
    >
      <label>所属分组</label>
      <select></select>
      <label>播报内容</label>
      <textarea/>
      <button class="btn btn-info" @click="show_second=true">Open modal 2</button>
    </stack-modal>-->
    <div id="popup_back" v-show="dlgShown" class="disabled"></div>
    <div id="popup" v-show="dlgShown">
      <div id="form_title">添加人工播报</div>
      <div id="form_container">
        <div class="input_note">所属分组</div>
        <select v-model="noticeGroup">
          <option v-for="group in groupList" :key="group" v-bind="group.name">{{group.name}}</option>
        </select>
        <div class="input_note">播报内容</div>
        <div>
          <textarea v-model="noticeContent"/>
        </div>
        <span>
          <input type="button" value="确认添加" @click="saveNotice">
          <button @click="dlgShown=false">取消</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Head from "@/components/Head.vue";
import ControlPanel from "@/components/ControlPanel.vue";
import store from "@/store";
import router from "@/router";
import AcsApi from "../modules/api";
// import StackModal from "@innologica/vue-stackable-modal";

export default {
  name: "AlarmControl",
  components: {
    showHead: Head,
    controlPanel: ControlPanel
    // StackModal
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
      dlgShown: false,
      noticeContent: "",
      noticeGroup: "",
      groupList: [],
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
    ...mapGetters(["alarmPlansOfOtherType", "username"])
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
    let api = new AcsApi();
    api.getAlarmDeviceGroups().then(res => {
      this.groupList = res.data.groups;
    });
  },
  methods: {
    ...mapActions(["updateAlarmPlansOfOtherType"]),
    addNotice: function() {
      // popup page
      this.noticeContent = '';
      this.noticeGroup = '';
      this.dlgShown = true;
    },
    saveNotice: function() {
      let api = new AcsApi();
      api
        .addAlarmNotice({
          noticeContent: this.noticeContent,
          deviceNames: [this.noticeGroup],
          noticeTime: new Date(),
          senderName: this.username
        })
        .then(() => {
          alert("添加成功");
        });
      this.dlgShown = false;
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
#popup {
  z-index: 2;
  left: 50%;
  top: 50%;
  width: 709px;
  height: 590px;
  position: absolute;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 1);
}
.disabled {
  background: rgba(0, 0, 0, 1);
  opacity: 0.4;
}
#popup_back {
  width: 100%;
  height: 100%;
  position: absolute;
}
#form_title {
  left: 50px;
  top: 51px;
  position: absolute;
  margin-bottom: 47px;
  font-size: 24px;
  font-family: MicrosoftYaHeiUILight;
  font-weight: 300;
  color: rgba(58, 58, 58, 1);
}
#form_container {
  left: 50px;
  top: 120px;
  text-align: left;
  position: absolute;
}
.input_note {
  margin-bottom: 20px;
  font-size: 16px;
  font-family: MicrosoftYaHeiUILight;
  font-weight: 300;
  color: rgba(58, 58, 58, 1);
}
select,
textarea {
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 19px;
  padding-bottom: 19px;
  margin-bottom: 40px;
  font-size: 16px;
  font-family: MicrosoftYaHeiUILight;
  font-weight: 300;
  color: rgba(153, 153, 153, 1);
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(226, 226, 226, 1);
  border-radius: 6px;
}
select {
  width: 608px;
  height: 60px;
}
textarea {
  width: 543px;
  height: 110px;
}
input[type="button"] {
  width: 120px;
  height: 60px;
  margin-right: 25px;
  background: rgba(67, 115, 255, 1);
  border-radius: 6px;
}
button {
  width: 120px;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(226, 226, 226, 1);
  border-radius: 6px;
}
</style>
