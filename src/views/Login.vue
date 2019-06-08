<template>
  <div class="login">
    <div id="welcome-chinese-note">
      <div>欢迎使用</div>
      <div style="font-size:84px">风速预警智能系统</div>
    </div>
    <div id="welcome-english-note">
      <div>WELCOME TO USE</div>
      <div>WIND SPEED EARLY WARNING INTELLIGENT SYSTEM</div>
    </div>
    <div id="input-area">
      <p id="input-note">登录/LOGIN</p>
      <div id="account">
        <div class="input-hint-block"><img class="center" src="../assets/account.png"></div>
        <input class="input-block" v-model="account" type="text" placeholder="请输入账号"/>
      </div>
      <div id="pwd">
        <div class="input-hint-block"><img class="center" src="../assets/pwd.png"/></div>
        <input class="input-block" v-model="pwd" type="password" placeholder="请输入密码"/>
      </div>
      <div id="submit" v-on:click="login">
        <div class="center">
          <font id="submit-text">立即登录</font><img id="submit-img" src="../assets/next.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import router from '../router'
import AcsApi from '../modules/api'

export default {
  data: function () {
    return {
      account: '',
      pwd: ''
    }
  },
  methods: {
    ...mapMutations(['updateInLogged', 'updateUsername', 'updateRoles', 'afterLogin']),
    login: function(){
      console.log('account:' + this.account + '; pwd:' + this.pwd);
      let api = new AcsApi();
      // access login api
      api.formLogin(this.account, this.pwd).then((res) => {
        // save user information
        this.afterLogin({username: res.data.username, roles: res.data.roles})
        // this.updateInLogged(true)
        // this.updateUsername(res.data.username)
        // this.updateRoles(res.data.roles)
        // redirect
        router.push('admin/alarmHistory');
      }).catch((error) => {
        alert('账号和密码不匹配')
      });
    }
  }
}
</script>

<style scoped>
.login{
  width: 100%;
  height: 100%;
  position: absolute;
  background: url('../assets/login-bg.png') center;
  background-size:100% 100%;
}
#welcome-chinese-note{
  left: 162px;
  top: 406px;
  position: absolute;
  text-align: left;
  width:687px;
  height:158px;
  font-size:57px;
  font-family:MicrosoftYaHeiUI-Bold;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:72px;
}
#welcome-english-note{
  left: 161px;
  top: 628px;
  position: absolute;
  text-align: left;
  width:655px;
  height:54px;
  font-size:23px;
  font-family:MicrosoftYaHeiUILight;
  font-weight:300;
  color:rgba(255,255,255,1);
  line-height:35px;
}
#input-area{
  top: 20%;
  left: 60%;
  position: relative;
  width:600px;
  height:596px;
  background:rgba(255,255,255,1);
  border-radius:10px;
}
#input-note{
  left: 80px;
  top: 75px;
  position: relative;
  width:236px;
  height:39px;
  font-size:40px;
  font-family:MicrosoftYaHeiUILight;
  font-weight:300;
  color:rgba(58,58,58,1);
  line-height:50px;
}
#account{
  left: 80px;
  top: 179px;
  position: absolute;
  width:440px;
  height:80px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(226,226,226,1);
  border-radius:10px;
}
.input-hint-block{
  margin: -1px 0 0 0;
  position: absolute;
  width:80px;
  height:80px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(226,226,226,1);
  border-radius:10px 0px 0px 10px;
}
#pwd{
  left: 80px;
  top: 309px;
  position: absolute;
  width:440px;
  height:80px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(226,226,226,1);
  border-radius:10px;
}
#submit{
  left: 80px;
  top: 439px;
  position: absolute;
  width:440px;
  height:80px;
  background:rgba(67,115,255,1);
  border-radius:10px;
}
#submit:hover{
  left: 80px;
  top: 439px;
  position: absolute;
  width:440px;
  height:80px;
  background:rgb(59, 107, 250);
  border-radius:10px;
}
#submit:active{
  left: 80px;
  top: 439px;
  position: absolute;
  width:440px;
  height:80px;
  background:rgb(51, 102, 253);
  border-radius:10px;
}
#submit-text{
  width:80px;
  height:20px;
  font-size:20px;
  font-family:MicrosoftYaHeiUILight;
  font-weight:300;
  color:rgba(255,255,255,1);
}
#submit-img{
  left: 12px;
  top: 4px;
  position: relative;
  width: 24px;
  height: 24px;
}
.center{
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}
.input-block{
  left: 0px;
  top: 50%;
  position: relative;
  transform: translate(0, -50%);
  border: 0px;
}
</style>
