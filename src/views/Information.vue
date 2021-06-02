<template>
  <div class="information">
    <div class="main flex-center">
      <div class="information-container">
        <Info></Info>
      </div>
    </div>
    <div class="information-download">
      <div class="download-button" @click="downloadPdf">
        <a
          href="http://static.linzhihui.online/pdf/%E5%8F%B6%E6%97%AD%E7%91%B6%E7%AE%80%E5%8E%86.pdf
"
          target="_blank"
          download
          >下载 PDF</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import Info from "@/components/Info.vue";

export default {
  name: "Information",
  components: { Info },
  methods: {
    downloadPdf() {},
  },
};
</script>

<style lang="scss" scoped>
@import "../CSS/base.scss";
.information {
  width: 100%;
  height: 100vh;
  padding: 0 150px;
  display: grid;
  grid-template: ". main download" 100%/1fr auto 1fr;
  .main {
    grid-area: main;
    .information-container {
      width: designFontSize(668.25);
      height: designFontSize(925);
      background-color: white;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
      padding: 15px;
    }
  }
  .information-download {
    grid-area: download;
    padding-left: 30px;
    //border: #f8a5c2 1px solid;
    .download-button {
      width: 120px;
      padding: 6px;
      border-radius: 6px;
      text-align: center;
      margin-top: 93vh;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
      background-color: $gray-1;
      color: $gray-8;
      transition: all 1s;
      font-size: 14px;
      &:hover {
        background-color: $color-primary3;
        color: white;
        cursor: pointer;
      }
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
