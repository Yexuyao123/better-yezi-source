<template>
  <div class="study-common-block">
    <div class="study-website-container">
      <CartTitle :title="listObj.name" :color="underLineColor"></CartTitle>
      <div class="website-list-container">
        <div class="study-website-list">
          <div
            class="study-website-item"
            v-for="(url, name) in listObj.websiteObj"
            :key="name"
            @click="gotoUrl(url)"
          >
            <div class="flex-center">
              <span>{{ name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartTitle from "@/components/common/CardTitle.vue";

export default {
  name: "StudyCommonWebsiteList",
  components: { CartTitle },
  props: {
    listObj: { type: Object },
    underLineColor: { type: String },
  },
  data() {
    return {};
  },
  methods: {
    gotoUrl(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.study-common-block {
  width: 100%;
  height: 100%;
  padding: 15px;
  .study-website-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .website-list-container {
      flex: 1;
      overflow-y: auto;
      margin-top: 10px;
      .study-website-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        .study-website-item {
          padding: 0 10px;
          margin-bottom: 20px;
          //border: #f8a5c2 1px solid;
          width: calc(100% / 3);
          div {
            box-sizing: border-box;
            font-size: 16px;
            padding: 16px 10px;
            line-height: 1;
            transition: all 0.4s;
            background-color: #e4e5e690;
            border-radius: 2px;
            color: $gray-9;
            &:hover {
              cursor: pointer;
              background-image: linear-gradient(
                to top,
                rgba(236, 243, 233, 0.2),
                rgba(236, 243, 233, 0)
              );
              box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            }
          }
        }
      }
    }

    .website-list-container::-webkit-scrollbar {
      //隐藏滚动条
      display: none;
    }
  }
}
</style>
