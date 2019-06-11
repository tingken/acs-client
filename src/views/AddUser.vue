<template>
  <div>
    <showHead msg="添加账号"></showHead>
    <div id="form_container">
      <form>
        <div class="note">类型</div>
        <div class="input_area">
          <select name="type" v-model="role">
            <option value="ROLE_USER">操作员</option>
            <option value="ROLE_ADMIN">管理员</option>
          </select>
        </div>
        <div class="note">账号ID</div>
        <div class="input_area">
          <input v-model="user.name" type="text" placeholder="输入账号ID">
        </div>
        <div class="note">密码</div>
        <div class="input_area">
          <input class="input-block" v-model="user.password" type="password" placeholder="请输入密码">
        </div>
        <span style="float:left">
          <input type="button" v-on:click="save" value="保存">
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
  name: "EditUser",
  components: {
    showHead: Head
  },
  data: function() {
    return {
      user: {},
      role: ""
    };
  },
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate");
    if (to.path.includes("editUser")) {
      let index = parseInt(to.path.substring(to.path.lastIndexOf("/") + 1));
      this.user = this.users._embedded.users[index];
      console.log(this.user);
    }
  },
  computed: {
    ...mapGetters(["users"])
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
      this.user = this.users._embedded.users[index];
      console.log(this.user);
    }
  },
  watch: {
    user: function(val) {
      console.log("val.authorities.type:" + typeof val.authorities);
      this.role =
        val.authorities.findIndex((authority, index) => {
          if (authority.role === "ROLE_ADMIN") {
            return true;
          }
          return false;
        }) >= 0
          ? "ROLE_ADMIN"
          : "ROLE_USER";
    }
  },
  methods: {
    save: function() {
      // check input
      if (this.user.name.trim().length === 0) {
        alert("用户名不能为空");
        return;
      }
      if (this.user.password.trim().length === 0) {
        alert("密码不能为空");
        return;
      }
      // access api
      let api = new AcsApi();
      console.log(this.user);
      api
        .addUser(this.user.name, this.user.name, this.user.password, this.role)
        .then(() => {
          alert("添加成功");
        })
        .catch(error => {
          alert("添加失败");
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
