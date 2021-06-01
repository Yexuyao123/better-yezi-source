<template>
  <div class="study-website">
    <div class="Study-website-container">
      <div class="up-block">
        <CommonCard class="up-block-container">
          <StudyUpWebsite
            :underLineColor="titleUnderlineColor[0]"
          ></StudyUpWebsite>
        </CommonCard>
      </div>
      <div class="modal-block">
        <CommonCard class="modal-block-container">
          <StudyUpChart :underLineColor="titleUnderlineColor[1]"></StudyUpChart>
        </CommonCard>
      </div>
      <div class="css-block">
        <CommonCard class="css-block-container">
          <StudyCommonWebsiteList
            :listObj="aboutCSS"
            :underLineColor="titleUnderlineColor[2]"
          ></StudyCommonWebsiteList>
        </CommonCard>
        <CommonCard class="tool-block-container">
          <StudyCommonWebsiteList
            :listObj="aboutMorning"
            :underLineColor="titleUnderlineColor[3]"
          ></StudyCommonWebsiteList>
        </CommonCard>
      </div>
    </div>
  </div>
</template>

<script>
import CommonCard from "@/components/common/BackgroundCardCommon.vue";
import StudyUpWebsite from "@/components/Website/StudyUpWebsiteList.vue";
import StudyCommonWebsiteList from "@/components/Website/StudyCommonWebsiteList.vue";
import StudyUpChart from "@/components/dataChart/StudyUpChart.vue";

import { ABOUT_CSS, ABOUT_MORNING } from "@/helpers/websiteList.js";

export default {
  name: "StudyWebsite",
  components: {
    CommonCard,
    StudyUpWebsite,
    StudyUpChart,
    StudyCommonWebsiteList,
  },
  data() {
    return {
      aboutCSS: ABOUT_CSS,
      aboutMorning: ABOUT_MORNING,
      titleUnderlineColor: ["#ff4d4f", "#40a9ff", "#bae637", "#ffa940"],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.study-website {
  width: 100%;
  .Study-website-container {
    width: 100%;
    height: calc(100vh - 80px);
    padding: 16px 15px 16px 0;
    display: grid;
    grid-gap: 20px;
    grid-template:
      calc((100vh - 80px) / 3 * 2 - 30px) calc((100vh - 80px) / 3 - 30px)
      / calc(100% / 3 * 2 - 20px) calc(100% / 3);
    grid-template-areas:
      "main up"
      "css up";
    .up-block {
      grid-area: main;
      .up-block-container {
        width: 100%;
        height: 100%;
      }
    }
    .modal-block {
      grid-area: css;
      .modal-block-container {
        width: 100%;
        height: 100%;
      }
    }
    .css-block {
      grid-area: up;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .css-block-container {
        width: 100%;
        height: calc(50% - 8px);
      }
      .tool-block-container {
        width: 100%;
        height: calc(50% - 8px);
      }
    }
  }
}
</style>
