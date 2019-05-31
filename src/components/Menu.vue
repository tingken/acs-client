<template>
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
        <img class="left" v-bind:src="menuItem.img" v-show="index!==currentIndex">
        <img class="left" v-bind:src="menuItem.selectedImg" v-show="index===currentIndex">
        {{menuItem.title}}
      </td>
    </tr>
  </table>
</template>

<script>
import router from "../router";
import AcsApi from "../modules/api";

export default {
  name: "Menu",
  props: {
    menuItems: Array,
    childRoutes: Array,
    initIndex: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {
      currentIndex: this.initIndex
    };
  },
  methods: {
    selectMenuItem: function(index) {
      console.log("username:" + this.username);
      if (index !== this.currentIndex) {
        this.currentIndex = index;
        this.menuItemChanged(index);
      }
    },
    choose: function(index) {
      console.log("index=" + index);
    },
    menuItemChanged(index) {
      if (index >= 0 && index < this.childRoutes.length) {
        router.push(this.childRoutes[index]);
      } else {
        let api = new AcsApi();
        api.logout();
        router.push("/logout");
      }
    }
  },
  watch: {
    initIndex: function(val) {
      this.currentIndex = val;
    }
  }
};
</script>

<style scoped>
/* #admin_menu {
  top: 421px;
  position: absolute;
} */
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
