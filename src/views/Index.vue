<template>
  <div class="index">
    <div class="sidebar">
      <SideNav></SideNav>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideNav from "@/components/SideNav.vue";

export default {
  name: "Index",
  components: { SideNav },
};
</script>

<style lang="scss" scoped>
@import "../CSS/base.scss";
.index {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .sidebar {
    width: 100px;
    height: 100vh;
    //border: #f8a5c2 1px solid;
  }
  .main {
    flex: 1;
    min-height: 100vh;
  }
}
</style>
