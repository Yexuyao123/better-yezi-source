<template>
  <div class="circle-border-container">
    <div class="circle-border">
      <slot></slot>
      <ul class="dialog-circle">
        <li v-for="i in 4" :key="i"></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "BorderCircle",
  components: {},
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.circle-border-container {
  //width: 100%;
  //height: 100%;
  position: relative;
  border: $middleBorder 1px solid;
  border-radius: 50%;
  &:hover {
    .circle-border {
      .dialog-circle {
        li {
        }
        :nth-child(4) {
          border-left: 5px rgba(250, 172, 6, 0.8) solid;
          border-right: 5px rgba(218, 73, 78, 0.8) solid;
          transform: rotate(90deg);
        }
      }
    }
  }
  .circle-border {
    width: 100%;
    height: 100%;
    .dialog-circle {
      width: 100%;
      height: 100%;
      display: block;
      li {
        position: absolute;
      }
      :nth-child(4) {
        //border: #f8a5c2 1px solid;
        box-sizing: border-box;
        width: 94%;
        height: 94%;
        border-radius: 50%;
        top: 3%;
        left: 3%;
        border-top: 5px rgba(6, 41, 112, 0.1) solid;
        border-bottom: 5px rgba(6, 41, 112, 0.1) solid;
        border-left: 5px $border solid;
        border-right: 5px $border solid;
        transform: rotate(45deg);
        transition: all 1s;
      }
      :nth-child(2) {
        width: 106%;
        height: 106%;
        border: $shallowBorder 1px solid;
        border-radius: 50%;
        position: absolute;
        top: -3%;
        left: -3%;
      }
      :nth-child(3) {
        width: 90%;
        height: 90%;
        border: $middleBorder 1px solid;
        border-radius: 50%;
        position: absolute;
        top: 5%;
        left: 5%;
      }
      :nth-child(1) {
        width: 88%;
        height: 88%;
        border: $activeBGColor 1px solid;
        border-radius: 50%;
        position: absolute;
        top: 6%;
        left: 6%;
      }
    }
  }
}
</style>
