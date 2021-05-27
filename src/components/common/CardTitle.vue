<template>
  <div class="cart-title">
    <span>{{ title }}</span>
    <div class="up-title-underline">
      <div
        class="underline"
        :style="{
          'background-image': `linear-gradient(to right,#00416a40,${color})`,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartTitle",
  props: ["title", "color"],
  components: {},
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.cart-title {
  width: 100%;
  padding: 0 0 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  span {
    padding-bottom: 5px;
    font-size: 16px;
  }
  .up-title-underline {
    width: 100%;
    height: 2px;
    border-radius: 1px;
    background-color: #467c9190;
    position: relative;
    .underline {
      width: 80%;
      height: 2px;
      border-radius: 1px;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
