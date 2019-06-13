<template>
  <div>
    <showHead msg="编辑告警预案" v-if="alarmPlan._links"></showHead>
    <showHead msg="添加告警预案" v-else></showHead>
    <div id="form_container">
      <form>
        <div class="note">类型</div>
        <div class="input_area">
          <select name="type" v-model="type">
            <option disabled value>选择告警类型</option>
            <option value="ANEMO_ALARM">大风告警</option>
            <option value="OTHER_ALARM">其它告警</option>
          </select>
        </div>
        <div class="note" v-show="type==='OTHER_ALARM'">告警名称</div>
        <div class="input_area" v-show="type==='OTHER_ALARM'">
          <input v-model="alarmPlan.name" type="text" placeholder="输入告警名称">
        </div>
        <div class="note">告警内容</div>
        <div class="input_area">
          <input v-model="alarmPlan.alarmContent" type="text" placeholder="输入告警内容">
        </div>
        <div class="note" v-show="type==='ANEMO_ALARM'">告警阈值</div>
        <div class="input_area" v-show="type==='ANEMO_ALARM'">
          <input v-model="alarmPlan.threshold" type="text" placeholder="输入告警阈值">
        </div>
        <div class="note">音量</div>
        <div class="input_area">
          <input
            v-model.number="alarmPlan.volume"
            type="number"
            min="1"
            max="56"
            placeholder="输入告警音量"
          >
        </div>
        <div class="note">播报范围</div>
        <div class="input_area">
          <span v-for="(device, index) in deviceList" :key="index">
            <span class="device_name">
              <input type="checkbox" v-bind:value="index" v-model="choosedDeviceIndices">
              <font>{{device.name}}</font>
            </span>
          </span>
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
  name: "EditPlan",
  components: {
    showHead: Head
  },
  data: function() {
    return {
      api: new AcsApi(),
      alarmPlan: {},
      type: "",
      deviceList: null,
      choosedDeviceIndices: []
    };
  },
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate");
    if (to.path.includes("editUser")) {
      let index = parseInt(to.path.substring(to.path.lastIndexOf("/") + 1));
      this.alarmPlan = this.alarmPlans._embedded.alarm_plan[index];
      console.log(this.alarmPlan);
    }
    next();
  },
  computed: {
    ...mapGetters(["alarmPlans", "alarmDevices"])
  },
  mounted: function() {
    let index = this.$route.params.index;
    console.log("mounted index: " + index);
    if (index) {
      this.alarmPlan = this.alarmPlans._embedded.alarm_plan[index];
      console.log(this.alarmPlan);
      this.type = this.alarmPlan.threshold ? "ANEMO_ALARM" : "OTHER_ALARM";
    }
    this.updateAlarmDevices()
      .then(() => {
        this.deviceList = this.alarmDevices._embedded.alarm_device;
        console.log("data AlarmDevices updated");
        // let api = new AcsApi();
        this.api.get(this.alarmPlan._links.alarmDevices.href).then(res => {
          let linkedDevices = res.data._embedded.alarm_device;
          for (let i in this.deviceList) {
            if (
              linkedDevices.find(device => {
                return (
                  device._links.self.href ===
                  this.deviceList[i]._links.self.href
                );
              })
            ) {
              this.choosedDeviceIndices.push(i);
            }
          }
        });
      })
      .catch(error => {
        console.error(error);
        console.log(typeof error);
        if (
          error.status === 401 ||
          (error.response && error.response.status === 401)
        ) {
          this.$router.push("/logout");
        }
      });
  },
  watch: {
    // alarmPlan: function(val) {
    //   this.type = val.threshold ? "ANEMO_ALARM" : "OTHER_ALARM";
    // }
  },
  methods: {
    ...mapActions(["updateAlarmDevices"]),
    save: function() {
      if (!this.type) {
        alert("请选择类型");
        return;
      }
      if (this.type === "OTHER_ALARM") {
        this.alarmPlan.threshold = null;
      } else if (this.alarmPlan.name.trim().length === 0) {
        alert("请输入告警名称");
        return;
      }
      let api = new AcsApi();
      if (this.alarmPlan._links) {
        this.alarmPlan.alarmDevices = null;
        if (this.alarmPlan.status === "DISABLED") {
          this.alarmPlan.status = "NORMAL";
        }
        // update
        api
          .updateResource(this.alarmPlan._links.self.href, this.alarmPlan)
          .then(() => {
            let links = "";
            for (let i in this.choosedDeviceIndices) {
              links +=
                this.deviceList[this.choosedDeviceIndices[i]]._links.self.href +
                "\n";
            }
            api
              .updateLinks(this.alarmPlan._links.alarmDevices.href, links)
              .then(() => {
                alert("更新成功");
                this.$router.go(-1);
              });
          })
          .catch(error => {
            alert("更新失败");
          });
      } else {
        // add
        console.log(this.alarmPlan);
        api
          .addAlarmPlan(this.alarmPlan)
          .then(res => {
            console.log(
              "res.data._links.self.href: " + res.data._links.self.href
            );
            let links = "";
            for (let i in this.choosedDeviceIndices) {
              links +=
                this.deviceList[this.choosedDeviceIndices[i]]._links.self.href +
                "\n";
            }
            console.log(links);
            api.addLinks(res.data._links.alarmDevices.href, links).then(() => {
              alert("添加成功");
            });
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
