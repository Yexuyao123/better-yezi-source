<template>
  <div class="information">
    <div class="information-container">
      <div class="info-sidebar"></div>
      <div class="info-main"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Information",
  components: {},
};
</script>

<style lang="scss" scoped>
@import "../CSS/base.scss";
.information {
  width: 100%;
  height: 100vh;
  padding: 0 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  .information-container {
    width: designFontSize(668.25);
    height: designFontSize(925);
    background-color: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
    display: flex;
    .info-sidebar {
    }
  }
}
</style>
