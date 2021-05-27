<template>
  <div class="text-box">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BCount",
  props: {
    text: {
      type: String,
      requited: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";

.text-box {
  //display: inline-block;
  width: 100%;
  height: 100%;
  border-left: 2px solid $color-6;
  border-right: 2px solid $color-6;
  border-image: linear-gradient(
      to top,
      $color-primary7,
      $gray-7,
      $color-primary7
    )
    5 5 5 5;
  vertical-align: center;

  > div {
    width: 100%;
    height: 100%;
    //display: inline-block;
    box-sizing: border-box;
    //text-align: center;
    border-top: 2px solid $color-6;
    border-bottom: 2px solid $color-6;
    border-image: linear-gradient(
        to right,
        $color-primary7,
        $gray-7,
        $color-primary7
      )
      5 5 5 5;
  }
}
</style>
