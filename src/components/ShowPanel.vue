<template>
  <div id="table_container">
    <table>
      <tr class="header">
        <th v-for="header in headers" :key="header">{{headerMap[header]}}</th>
      </tr>
      <tr class="data" v-for="(result, index) in resultList" :key="result">
        <td v-for="it in headers" :key="it">{{result[it]}}</td>
        <td v-if="editPath" class="control">
          <!-- <div class="control"> -->
          <span class="edit">
            <a v-on:click="edit(index)">编辑</a>
          </span>
        </td>
        <td v-if="editPath" class="control">
          <span class="delete">
            <a>删除</a>
          </span>
          <!-- </div> -->
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import router from '../router';

export default {
  name: "ShowPanel",
  props: {
    headers: Array,
    headerMap: Object,
    resultList: Array,
    editPath: String
  },
  mounted: function() {
    let tableHeight = document.getElementById("table_container").childNodes[0]
      .offsetHeight;
    console.log("table height: " + tableHeight);
    if (tableHeight > 900) {
      tableHeight = 900;
    }
    document.getElementById("table_container").style.height =
      tableHeight + "px";
  },
  updated: function() {
    let tableHeight = document.getElementById("table_container").childNodes[0]
      .offsetHeight;
    console.log("table height: " + tableHeight);
    if (tableHeight > 900) {
      tableHeight = 900;
    }
    document.getElementById("table_container").style.height =
      tableHeight + "px";
  },
  methods: {
    edit: function(index){
      router.push(this.editPath+'/'+index)
    }
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
  top: 0px;
  left: 0px;
  min-width: 1500px;
  position: absolute;
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
</style>
