<template>
  <div>
    <showHead msg="编辑设备" v-if="alarmDevice._links"></showHead>
    <showHead msg="添加设备" v-else></showHead>
    <div id="form_container">
      <form>
        <div class="note">设备名称</div>
        <div class="input_area">
          <input v-model="alarmDevice.name" type="text" placeholder="输入设备名称">
        </div>
        <div class="note">设备位置</div>
        <div class="input_area">
          <input v-model="alarmDevice.address" type="text" placeholder="输入设备位置">
        </div>
        <div class="note">设备IP</div>
        <div class="input_area">
          <input v-model="alarmDevice.ip" type="text" placeholder="输入设备IP">
        </div>
        <div class="note">设备ID</div>
        <div class="input_area">
          <input
            v-model.number="alarmDevice.termId"
            type="number"
            min="0"
            placeholder="输入设备ID"
          >
        </div>
        <div class="note">设备状态</div>
        <div class="input_area">
          <select name="type" v-model="alarmDevice.status">
            <option disabled value>选择设备状态</option>
            <option value="NORMAL">正常</option>
            <option value="PENDING">维护</option>
          </select>
        </div>
        <span style="float:left">
          <input type="button" v-on:click="save" value="保存">
          <input type="button" class="cancel" v-on:click="$router.go(-1)" value="取消">
        </span>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import Head from "@/components/Head.vue";
import AcsApi from "@/modules/api";

export default {
  name: "EditDevice",
  components: {
    showHead: Head
  },
  data: function() {
    return {
      alarmDevice: {}
    };
  },
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate");
    if (to.path.includes("editUser")) {
      let index = parseInt(to.path.substring(to.path.lastIndexOf("/") + 1));
      this.alarmDevice = this.alarmPlans._embedded.alarm_plan[index];
      console.log(this.alarmDevice);
    }
    next()
  },
  computed: {
    ...mapGetters(["alarmPlans", "alarmDevices"])
  },
  mounted: function() {
    let index = this.$route.params.index;
    console.log("mounted index: " + index);
    if (index) {
      this.alarmDevice = this.alarmDevices._embedded.alarm_device[index];
      console.log(this.alarmDevice);
    }
  },
  watch: {
  },
  methods: {
    ...mapActions(["updateAlarmDevices"]),
    save: function() {
      let api = new AcsApi();
      if (this.alarmDevice._links) {
        this.alarmDevice.alarmDevices = null;
        // this.alarmDevice._links = {};
        // update
        api
          .updateResource(this.alarmDevice._links.self.href, this.alarmDevice)
          .then(() => {
            alert("更新成功");
            this.$router.go(-1);
          })
          .catch(error => {
            alert("更新失败");
          });
      } else {
        // add
        console.log(this.alarmDevice);
        api
          .addAlarmDevice(this.alarmDevice)
          .then(() => {
            alert("添加成功");
          })
          .catch(error => {
            alert("添加失败");
          });
      }
    }
  }
};
</script>

<style scoped>
#form_container {
  left: 45px;
  top: 125px;
  position: absolute;
  text-align: left;
}
.note {
  font-size: 16px;
  font-family: MicrosoftYaHeiUILight;
  font-weight: 300;
  color: rgba(58, 58, 58, 1);
  /* padding: 0 0 0 23px; */
  margin-bottom: 23px;
}
.input_area {
  /* padding: 0 0 0 23px; */
  margin-bottom: 50px;
  width: 680px;
  /* height: 60px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(226, 226, 226, 1);
  border-radius: 6px; */
}
input[type="text"],
input[type="password"],
input[type="number"],
select,
textarea {
  /* width: 100%; */
  font-size: 16px;
  font-family: MicrosoftYaHeiUILight;
  font-weight: 300;
  color: rgba(153, 153, 153, 1);
  padding-left: 30px;
  width: 608px;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(226, 226, 226, 1);
  border-radius: 6px;
  resize: vertical;
}
input[type="button"] {
  width: 120px;
  height: 60px;
  background: rgba(67, 115, 255, 1);
  border-radius: 6px;
  margin-right: 25px;
}
input[type="button"].cancel {
  width: 120px;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(226, 226, 226, 1);
  border-radius: 6px;
}
.device_name {
  min-width: 108px;
  margin-right: 50px;
  display: block;
  float: left;
}
</style>
