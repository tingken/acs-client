<template>
  <div id="admin">
    <div id="admin_menu_page" class="menu_page">
      <div id="portrait" class="hor_center">
        <img src="../assets/portrait-default.png">
      </div>
      <div id="welcome_note" class="hor_center">你好，管理员{{username}}</div>
      <table id="admin_menu" class="menu">
        <!-- <tr>
          <td>
            <img class="left" src="../assets/menu_item_alarm_history_selected.png">告警历史
            <img class="right" src="../assets/next_selected.png">
          </td>
        </tr>
        <tr>
          <td>告警设置</td>
        </tr>-->
        <tr v-for="(menuItem, index) in menuItems" :key="menuItem.title" v-on:click="choose(index)">
          <td v-on:click="selectMenuItem(index)" v-bind:class="{selected: index===currentIndex}">
            <img class="left" v-bind:src="menuItem.img">
            {{menuItem.title}}
          </td>
        </tr>
      </table>
    </div>
    <router-view id="content"></router-view>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import router from "../router";
import AcsApi from "../modules/api";

export default {
  data: function() {
    return {
      currentIndex: 0,
      menuItemImgs: [
        {
          img: require("../assets/menu_item_alarm_history.png"),
          selectedImg: require("../assets/menu_item_alarm_history_selected.png")
        },
        {
          img: require("../assets/menu_item_alarm_manage.png"),
          selectedImg: require("../assets/menu_item_alarm_manage_selected.png")
        },
        {
          img: require("../assets/menu_item_device_manage.png"),
          selectedImg: require("../assets/menu_item_device_manage_selected.png")
        },
        {
          img: require("../assets/menu_item_user_manage.png"),
          selectedImg: require("../assets/menu_item_user_manage_selected.png")
        },
        {
          img: require("../assets/menu_item_login_history.png"),
          selectedImg: require("../assets/menu_item_login_history_selected.png")
        },
        {
          img: require("../assets/menu_item_logout.png"),
          selectedImg: require("../assets/menu_item_logout.png")
        }
      ],
      menuItems: [
        {
          img: require("../assets/menu_item_alarm_history_selected.png"),
          title: "告警历史"
        },
        {
          img: require("../assets/menu_item_alarm_manage.png"),
          title: "告警设置"
        },
        {
          img: require("../assets/menu_item_device_manage.png"),
          title: "设备管理"
        },
        {
          img: require("../assets/menu_item_user_manage.png"),
          title: "用户管理"
        },
        {
          img: require("../assets/menu_item_login_history.png"),
          title: "登录历史"
        },
        { img: require("../assets/menu_item_logout.png"), title: "退出账号" }
      ],
      childRoutes: [
        'alarmHistory', 'alarmManage', 'deviceManage', 'userManage', 'loginHistory'
      ]
    };
  },
  computed: {
    ...mapGetters(["inLogged", "username", "roles"]),
    selected: function(index) {
      return index === this.currentIndex;
    }
  },
  mounted: function() {
    console.log("username:" + this.username);
  },
  methods: {
    selectMenuItem: function(index) {
      console.log("username:" + this.username);
      if (index !== this.currentIndex) {
        this.menuItems[this.currentIndex].img = this.menuItemImgs[
          this.currentIndex
        ].img;
        this.currentIndex = index;
        this.menuItems[index].img = this.menuItemImgs[index].selectedImg;
        this.menuItemChanged(index);
      }
    },
    choose: function(index) {
      console.log("index=" + index);
    },
    menuItemChanged(index) {
      let api = new AcsApi();
      switch (index) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
          router.push(this.childRoutes[index]);
          break;
        case 5:
          api.logout();
          // remove status and token
          router.push('/logout')
          break;
      }
    }
  },
  // beforeRouteUpdate (to, from, next) {
  //   let index = this.childRoutes.indexOf(to.name);
  //   if(index >= 0 && this.currentIndex !== index){
  //     this.currentIndex = index;
  //   }
  // }
};
</script>

<style scoped>
#admin_menu_page {
  left: 0px;
  top: 0px;
  width: 360px;
  height: 1080px;
  position: absolute;
}
#content {
  left: 360px;
  top: 0px;
  right: 0px;
  height: 1080px;
  position: absolute;
  background:rgba(241,241,241,1);
}
.menu_page {
  background: rgba(34, 38, 55, 1);
}
#portrait {
  top: 110px;
  width: 128px;
  height: 128px;
}
#portrait img {
  width: 128px;
  height: 128px;
}
.hor_center {
  left: 50%;
  position: absolute;
  transform: translate(-50%, 0);
}
#welcome_note {
  top: 280px;
  position: absolute;
  font-size: 25px;
  font-family: MicrosoftYaHeiUI;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
#admin_menu {
  top: 421px;
  position: absolute;
}
.menu td {
  width: 360px;
  height: 70px;
  font-size: 16px;
  font-family: MicrosoftYaHeiUI;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.menu td.selected {
  background: rgba(23, 26, 39, 1);
  font-size: 16px;
  font-family: MicrosoftYaHeiUI;
  font-weight: 400;
  color: rgba(67, 115, 255, 1);
}
.menu td img.left {
  left: 43px;
  width: 24px;
  height: 24px;
  position: absolute;
}
.menu td img.right {
  left: 297px;
  width: 24px;
  height: 24px;
  position: absolute;
}
</style>
