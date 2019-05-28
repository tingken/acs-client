<template>
  <div>
    <div id="head">
      <h1>{{msg}}</h1>
      <slot></slot>
    </div>
    <div id="head_bottom"></div>
  </div>
</template>

<script>
export default {
  name: "Head",
  props: {
    msg: String
  }
};
</script>

<style scoped>
#head {
  top: 0px;
  width: 100%;
  height: 80px;
  position: absolute;
  background: rgba(255, 255, 255, 1);
}
#head h1 {
  left: 31px;
  width: 96px;
  height: 25px;
  position: absolute;
  font-size: 24px;
  font-family: MicrosoftYaHeiUI;
  font-weight: 400;
  color: rgba(58, 58, 58, 1);
}
#head_bottom {
  left: 0px;
  top: 78px;
  width: 100%;
  height: 2px;
  position: absolute;
  background: rgba(67, 115, 255, 1);
}
</style>
