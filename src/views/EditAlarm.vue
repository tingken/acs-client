<template>
  <div>
    <showHead msg="编辑告警预案"></showHead>
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
          <!-- <input class="input-block" v-model="alarm.password" type="password" placeholder="请输入密码"> -->
        </div>
        <input type="button" onclick="alert('Hello World!')" value="保存">
        <input type="button" onclick="alert('Hello World!')" value="取消">
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import Head from "@/components/Head.vue";

export default {
  name: "EditUser",
  components: {
    showHead: Head
  },
  data: function() {
    return {
      alarmPlan: {},
      type: ""
    };
  },
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate");
    if (to.path.includes("editUser")) {
      let index = parseInt(to.path.substring(to.path.lastIndexOf("/") + 1));
      this.alarmPlan = this.alarmPlans._embedded.alarm_plan[index];
      console.log(this.alarmPlan);
    }
  },
  computed: {
    ...mapGetters(["alarmPlans"])
    // role: function(authorities) {
    // //   console.log("this.user:");
    // //   console.log(this.user);
    // console.log('authorities:')
    // console.log(authorities)
    //   if (authorities) {
    //     // for (authority in this.user.authorities) {
    //     //   console.log(authority);
    //     //   if (authority.role === "ROLE_ADMIN") {
    //     //     return 1;
    //     //   }
    //     // }
    //     if (
    //       authorities.findIndex((authority, index) => {
    //         if (authority.role === "ROLE_ADMIN") {
    //           return true;
    //         }
    //         return false;
    //       }) >= 0
    //     ) {
    //       return 1;
    //     }
    //     return 0;
    //   }
    // }
  },
  mounted: function() {
    let index = this.$route.params.index;
    console.log("mounted index: " + index);
    if (index) {
      this.alarmPlan = this.alarmPlans._embedded.alarm_plan[index];
      console.log(this.alarmPlan);
    }
  },
  watch: {
    alarmPlan: function(val) {
      console.log("val.authorities.type:" + typeof val.authorities);
      this.type = val.threshold ? "ANEMO_ALARM" : "OTHER_ALARM";
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
  /* width: 608px;
  height: 60px;
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
</style>
