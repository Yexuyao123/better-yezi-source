<template>
  <div class="todo">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Todo",
  components: {},
};
</script>

<style lang="scss" scoped>
@import "../CSS/base.scss";
.todo {
  width: 100%;
}
</style>
