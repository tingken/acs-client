<template>
  <div>
    <div id="admin_menu_page" class="menu_page">
      <div id="portrait" class="hor_center">
        <img src="../assets/portrait-default.png">
      </div>
      <div id="welcome_note" class="hor_center">你好，操作员{{username}}</div>
      <control_menu id="operator_menu" v-bind="menu"/>
    </div>
    <router-view id="content"></router-view>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Menu from "@/components/Menu.vue";

export default {
  components: {
    control_menu: Menu
  },
  data: function() {
    return {
      menu: {
        menuItems: [
          {
            img: require("../assets/menu_item_alarm_manage.png"),
            title: "告警控制",
            selectedImg: require("../assets/menu_item_alarm_manage_selected.png")
          },
          {
            img: require("../assets/menu_item_alarm_history.png"),
            title: "告警历史",
            selectedImg: require("../assets/menu_item_alarm_history_selected.png")
          },
          {
            img: require("../assets/menu_item_user_manage.png"),
            title: "修改密码",
            selectedImg: require("../assets/menu_item_user_manage_selected.png")
          },
          {
            img: require("../assets/menu_item_logout.png"),
            title: "退出账号",
            selectedImg: require("../assets/menu_item_logout.png")
          }
        ],
        childRoutes: [
          "/operator/alarmControl",
          "/operator/alarmHistory",
          "/operator/changePassword"
        ],
        initIndex: 0
      }
    };
  },
  computed: {
    ...mapGetters(["username"])
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
#operator_menu {
  top: 421px;
  position: absolute;
}
</style>
