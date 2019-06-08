<template>
  <div>
    <showHead msg="修改密码"></showHead>
    <div id="form_container">
      <form>
        <div class="note">当前密码</div>
        <div class="input_area">
          <input class="input-block" v-model="oldPwd" type="password" placeholder="输入当前密码">
        </div>
        <div class="note">新密码</div>
        <div class="input_area">
          <input class="input-block" v-model="newPwd" type="password" placeholder="输入新密码">
        </div>
        <div class="note">确认密码</div>
        <div class="input_area">
          <input class="input-block" v-model="newPwdRepeat" type="password" placeholder="再输入一次">
        </div>
        <span style="float:left">
          <input type="button" v-on:click="save" value="确认修改">
          <input type="button" class="cancel" onclick="alert('Hello World!')" value="取消">
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
  name: "ChangePassword",
  components: {
    showHead: Head
  },
  data: function() {
    return {
      oldPwd: "",
      newPwd: "",
      newPwdRepeat: ""
    };
  },
  computed: {},
  mounted: function() {},
  watch: {},
  methods: {
    save: function() {
      // check parameters
      let oldPwd = this.oldPwd.trim();
      let newPwd = this.newPwd.trim();
      let newPwdRepeat = this.newPwdRepeat.trim();
      if (this.newPwd !== this.newPwdRepeat) {
        alert("两次输入不一致");
        return;
      }
      if (oldPwd.length === 0) {
        alert("密码不能为空");
        return;
      }
      if (newPwd.length === 0) {
        alert("新密码不能为空");
        return;
      }
      let api = new AcsApi();
      // add
      console.log(this.user);
      api
        .changePwd(newPwd, oldPwd)
        .then(() => {
          alert("修改成功");
        })
        .catch(error => {
          alert("修改失败");
        });
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
</style>
