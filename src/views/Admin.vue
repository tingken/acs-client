<template>
  <div id="admin">
    <div id="admin_menu_page" class="menu_page">
      <div id="portrait" class="hor_center">
        <img src="../assets/portrait-default.png">
      </div>
      <div id="welcome_note" class="hor_center">你好，管理员{{username}}</div>
      <control_menu id="admin_menu" v-bind="menu"/>
    </div>
    <router-view id="content"></router-view>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import router from "../router";
import AcsApi from "../modules/api";
import Menu from "@/components/Menu.vue";

export default {
  components: {
    control_menu: Menu
  },
  data: function() {
    return {
      menu: {
        initIndex: 0,
        menuItems: [
          {
            img: require("../assets/menu_item_alarm_history.png"),
            selectedImg: require("../assets/menu_item_alarm_history_selected.png"),
            title: "告警历史"
          },
          {
            img: require("../assets/menu_item_alarm_manage.png"),
            selectedImg: require("../assets/menu_item_alarm_manage_selected.png"),
            title: "告警设置"
          },
          {
            img: require("../assets/menu_item_device_manage.png"),
            selectedImg: require("../assets/menu_item_device_manage_selected.png"),
            title: "设备管理"
          },
          {
            img: require("../assets/menu_item_user_manage.png"),
            selectedImg: require("../assets/menu_item_user_manage_selected.png"),
            title: "用户管理"
          },
          {
            img: require("../assets/menu_item_login_history.png"),
            selectedImg: require("../assets/menu_item_login_history_selected.png"),
            title: "登录历史"
          },
          {
            img: require("../assets/menu_item_logout.png"),
            selectedImg: require("../assets/menu_item_logout.png"),
            title: "退出账号"
          }
        ],
        childRoutes: [
          "/admin/alarmHistory",
          "/admin/alarmManage",
          "/admin/deviceManage",
          "/admin/userManage",
          "/admin/loginHistory"
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["inLogged", "username", "roles"]),
  },
  // the following method works to update the menu focus while browser back or next
  beforeRouteUpdate(to, from, next) {
    let index = this.menu.childRoutes.indexOf(to.fullPath);
    if (index >= 0 && this.menu.initIndex !== index) {
      this.menu.initIndex = index;
    }
    next();
  },
  // the following method works to update the menu focus while browser refresh
  mounted: function() {
    console.log("this.$route.fullPath: " + this.$route.fullPath);
    let index = this.menu.childRoutes.indexOf(this.$route.fullPath);
    if (index >= 0 && this.menu.initIndex !== index) {
      this.menu.initIndex = index;
    }
  }
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
  background: rgba(241, 241, 241, 1);
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
</style>
