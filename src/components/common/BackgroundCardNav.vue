<template>
  <div class="card-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Card",
  components: {},
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.card-container {
  position: relative;
  //border: #f8a5c2 1px solid;
  border-radius: 6px 6px 0 0;
  overflow: hidden;
  background-color: $color-primary4;
}
</style>
