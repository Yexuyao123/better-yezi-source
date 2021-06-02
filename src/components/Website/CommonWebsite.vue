<template>
  <div class="common-website">
    <div class="guide-class" v-for="(item, index) in guideArr" :key="item.name">
      <CommonCard>
        <div class="guide-class-list">
          <CartTitle
            :title="item.name"
            :color="titleUnderlineColor[index]"
          ></CartTitle>
          <div class="guide-list-container">
            <WebsiteList :websiteObj="item.websiteObj"></WebsiteList>
          </div>
        </div>
      </CommonCard>
    </div>
  </div>
</template>

<script>
import WebsiteList from "@/components/Website/CommonWebsiteList.vue";
import CommonCard from "@/components/common/BackgroundCardCommon.vue";
import CartTitle from "@/components/common/CardTitle.vue";

import {
  STUDT_OBJ,
  FAVORITE_OBJ,
  MEDIA_OBJ,
  COMMUNITY_OBJ,
  TOOLS_OBJ,
  OTHER_OBJ,
} from "@/helpers/websiteList.js";

export default {
  name: "CommonWebsite",
  components: { WebsiteList, CommonCard, CartTitle },
  data() {
    return {
      titleUnderlineColor: [
        "#f759ab",
        "#597ef7",
        "#ffc53d",
        "#ff4d4f",
        "#bae637",
        "#9254de",
      ],
      guideArr: [
        STUDT_OBJ,
        FAVORITE_OBJ,
        MEDIA_OBJ,
        COMMUNITY_OBJ,
        TOOLS_OBJ,
        OTHER_OBJ,
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.common-website {
  width: 100%;
  height: calc(100vh - 60px);
  padding: 15px 15px 15px 0;
  display: grid;
  grid-template: auto/1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
  .guide-class {
    width: 100%;
    .guide-class-list {
      padding: 15px 20px;
      width: 100%;
      .guide-list-container {
        width: 100%;
        height: calc(100vh - 165px);
        overflow-y: auto;
      }
      .guide-list-container::-webkit-scrollbar {
        //隐藏滚动条
        display: none;
      }
    }
  }
}
</style>
