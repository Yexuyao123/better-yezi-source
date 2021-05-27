<template>
  <div class="card-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CommonCard",
  components: {},
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.card-container {
  position: relative;
  //border: #f8a5c2 1px solid;
  border-radius: 6px;
  overflow: hidden;
  background-color: #ffffff30;
}
</style>
