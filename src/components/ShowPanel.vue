<template>
  <div>
    <div id="table_container" ref="tableContainer">
      <!-- <div>下拉刷新</div> -->
      <table ref="table">
        <tr class="header">
          <th v-for="header in headers" :key="header">{{headerMap[header]}}</th>
        </tr>
        <tr class="data" v-for="(result, index) in innerResultList" :key="result">
          <td v-for="it in headers" :key="it">{{result[it]}}</td>
          <td v-if="editPath" class="control">
            <!-- <div class="control"> -->
            <span class="edit">
              <router-link :to="editPath+'/'+index" class="edit_link">编辑</router-link>
            </span>
          </td>
          <td v-if="editPath" class="control">
            <span class="delete">
              <a class="remove_link" v-on:click="remove(index)">删除</a>
            </span>
            <!-- </div> -->
          </td>
        </tr>
      </table>
    </div>
    <span v-if="isMultiPage" class="pagination">
      <button v-on:click="goToPrevPage" v-bind:disabled="!hasPrevPage" v-bind:class="{active: hasPrevPage}">上一页</button>
      <button v-on:click="goToNextPage" v-bind:class="{active: hasNextPage}">下一页</button>
    </span>
  </div>
</template>

<script>
import router from "../router";
import { mapGetters, mapActions } from "vuex";
import AcsApi from "@/modules/api";

export default {
  name: "ShowPanel",
  props: {
    headers: Array,
    headerMap: Object,
    resultList: Array,
    editPath: String,
    resourceName: String
  },
  data: function() {
    return {
      innerResultList: this.resultList,
      isMultiPage: false,
      hasNextPage: false,
      hasPrevPage: false
    };
  },
  mounted: function() {
    let tableHeight = this.$refs.table.offsetHeight;
    console.log("table height: " + tableHeight);
    if (tableHeight > 900) {
      tableHeight = 900;
      document.getElementById("table_container").style.height =
        tableHeight + "px";
    }
    this.isMultiPage = this._isMultiPage();
    this.hasNextPage = this._hasNextPage();
    this.hasPrevPage = this._hasPrevPage();
  },
  updated: function() {
    let tableHeight = this.$refs.table.offsetHeight;
    console.log("table height: " + tableHeight);
    if (tableHeight > 900) {
      tableHeight = 900;
      document.getElementById("table_container").style.height =
        tableHeight + "px";
    }
    this.isMultiPage = this._isMultiPage();
    this.hasNextPage = this._hasNextPage();
    this.hasPrevPage = this._hasPrevPage();
  },
  methods: {
    ...mapActions(["nextPage", "prevPage"]),
    edit: function(index) {
      router.push(this.editPath + "/" + index);
    },
    remove: function(index) {
      let api = new AcsApi();
      api
        .deleteResource(this.innerResultList[index]._links.self.href)
        .then(res => {
          alert("删除成功");
          this.innerResultList.splice(index, 1);
        });
    },
    onScroll: function() {
      console.log(
        "this.$refs.tableContainer.scrollTop + this.$refs.tableContainer.offsetHeight: " +
          (this.$refs.tableContainer.scrollTop +
            this.$refs.tableContainer.offsetHeight)
      );
      console.log(
        "this.$refs.tableContainer.scrollHeight: " +
          this.$refs.tableContainer.scrollHeight
      );
      if (
        this.$refs.tableContainer.scrollTop +
          this.$refs.tableContainer.offsetHeight >=
        this.$refs.tableContainer.scrollHeight
      ) {
        goToNextPage();
      }
    },
    goToNextPage: function() {
      this.nextPage(this.resourceName).then(() => {
        console.log(this.partOfAcsData(this.resourceName));
        console.log(this.$refs.tableContainer);
        this.$refs.tableContainer.scrollTop = 0;
        window.scrollTo(0, 0);
        this.innerResultList = this.partOfAcsData(this.resourceName);
        this.isMultiPage = this._isMultiPage();
        this.hasNextPage = this._hasNextPage();
        this.hasPrevPage = this._hasPrevPage();
      });
    },
    goToPrevPage: function() {
      this.prevPage(this.resourceName).then(() => {
        console.log(this.partOfAcsData(this.resourceName));
        console.log(this.$refs.tableContainer);
        this.$refs.tableContainer.scrollTop = 0;
        window.scrollY = 0;
        this.innerResultList = this.partOfAcsData(this.resourceName);
        this.isMultiPage = this._isMultiPage();
        this.hasNextPage = this._hasNextPage();
        this.hasPrevPage = this._hasPrevPage();
      });
    },
    _isMultiPage: function() {
      if (this.pageOfAcsData(this.resourceName)) {
        return this.pageOfAcsData(this.resourceName).totalPages > 1;
      }
      return false;
    },
    _hasNextPage: function() {
      if (this.pageOfAcsData(this.resourceName)) {
        console.log(
          "this.partOfAcsData(this.resourceName).number: " +
            this.pageOfAcsData(this.resourceName).number
        );
        return (
          this.pageOfAcsData(this.resourceName).number <
          this.pageOfAcsData(this.resourceName).totalPages - 1
        );
      }
      return false;
    },
    _hasPrevPage: function() {
      if (this.pageOfAcsData(this.resourceName)) {
        return this.pageOfAcsData(this.resourceName).number > 0;
      }
      return false;
    }
  },
  watch: {
    resultList: function(val) {
      console.log("innerResultList updated");
      this.innerResultList = val;
    }
  },
  computed: {
    ...mapGetters(["partOfAcsData", "pageOfAcsData"])
  }
};
</script>

<style scoped>
#table_container {
  left: 30px;
  top: 110px;
  width: 100%;
  height: 100%;
  position: absolute;
  transform: translate(0, 0, -30px, -110px);
  overflow-x: auto;
}
#table_container table {
  /* top: 0px;
  left: 0px; */
  min-width: 1500px;
  /* position: absolute; */
  border-collapse: collapse;
  background: rgba(255, 255, 255, 1);
}
.header {
  /* width: 1500px; */
  height: 50px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(226, 226, 226, 1);
}
.header th {
  min-width: 100px;
}
th,
td {
  border-bottom: 1px solid #ddd;
  padding: 8px;
}
tr.data:nth-child(odd) {
  background-color: #f2f2f2;
}
.data {
  top: 0px;
  /* width: 100%; */
  height: 80px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(226, 226, 226, 1);
}
td.control {
  top: 0px;
  width: 100px;
  height: 80px;
}
div.control {
  top: 0px;
  height: 100%;
  /* position: absolute; */
  background: rgba(226, 226, 226, 0.5);
}
.edit {
  /* top: 33px;
  right: 89px; */
  /* position: absolute;
  width: 29px;
  height: 15px;
  transform: translate(0, -50%); */
  font-size: 14px;
  font-family: MicrosoftYaHeiUILight;
  font-weight: 300;
  text-decoration: underline;
  color: rgba(46, 100, 255, 1);
}
.delete {
  /* top: 33px;
  right: 23px; */
  /* position: absolute;
  width: 29px;
  height: 15px;
  transform: translate(0, -50%); */
  font-size: 14px;
  font-family: MicrosoftYaHeiUILight;
  font-weight: 300;
  text-decoration: underline;
  color: rgba(228, 54, 54, 1);
}
.edit_link {
  background-image: url("../assets/edit.png");
  /* background-attachment: fixed; */
  background-position: 0px 0px;
  background-repeat: no-repeat;
  padding-left: 27px;
  padding-top: 3px;
  padding-bottom: 3px;
}
.remove_link {
  background-image: url("../assets/remove.png");
  /* background-attachment: fixed; */
  background-position: 0px 0px;
  background-repeat: no-repeat;
  padding-left: 27px;
  padding-top: 3px;
  padding-bottom: 3px;
}
.pagination {
  bottom: 30px;
  right: 200px;
  position: absolute;
}
button.active {
  margin: 0 5px;
  background-color: #4099ff;
  color: #fff;
  min-width: 30px;
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
}
button {
  margin: 0 5px;
  background-color: #f4f4f5;
  color: #606266;
  min-width: 30px;
  cursor: default;
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  border-radius: 4px;
  padding: 5px 5px;
  font-size: 14px;
  font-family: MicrosoftYaHeiUILight;
  font-weight: 300;
}
</style>
