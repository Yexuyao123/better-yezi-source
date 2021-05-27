<template>
  <div class="angle-border-container">
    <slot></slot>
    <ul class="dialog-angle">
      <li v-for="i in 4" :key="i"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BorderAngle",
  components: {},
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.angle-border-container {
  position: relative;

  .dialog-angle {
    display: block;
    li {
      position: absolute;
      width: 16px;
      height: 10px;
      border: 1px solid $border;
    }
    :nth-child(1),
    :nth-child(3) {
      left: -1px;
      border-right: 0;
    }
    :nth-child(2),
    :nth-child(4) {
      right: -1px;
      border-left: 0;
    }
    :nth-child(1),
    :nth-child(2) {
      top: -1px;
      border-bottom: 0;
    }
    :nth-child(3),
    :nth-child(4) {
      bottom: -1px;
      border-top: 0;
    }
  }
}
</style>
