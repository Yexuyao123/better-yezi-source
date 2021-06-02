<template>
  <div class="study-up-website">
    <CartTitle :title="aboutUp.name" :color="underLineColor"></CartTitle>
    <div class="up-list-container">
      <div class="up-list">
        <div
          class="up-list-item"
          v-for="upOby in aboutUp.websiteObj"
          :key="upOby.id"
          @click="gotoUpHome(upOby.url)"
        >
          <div class="item-container">
            <div class="item-img flex-center">
              <img
                :src="`http://static.linzhihui.online/image/up/${upOby.id}.jpg`"
                alt=""
              />
            </div>
            <div class="up-name ellipsis-1 flex-start">
              <span>{{ upOby.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ABOUT_B_UP } from "@/helpers/websiteList.js";
import CartTitle from "@/components/common/CardTitle.vue";

export default {
  name: "StudyUpWebsite",
  components: { CartTitle },
  props: {
    underLineColor: { type: String },
  },
  data() {
    return {
      aboutUp: ABOUT_B_UP,
    };
  },
  methods: {
    gotoUpHome(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.study-up-website {
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  .up-list-container {
    margin-top: 8px;
    flex: 1;
    overflow-y: auto;
    .up-list {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      @media screen and (max-width: 1920px) {
        grid-template-columns: repeat(4, 1fr);
      }
      //grid-template-columns: 202px 202px 202px 202px 202px 202px;
      grid-column-gap: 15px;
      grid-row-gap: 20px;
      .up-list-item {
        //border: #f8a5c2 1px solid;
        .item-container {
          padding: 0 5px;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          transition: all 0.5s;
          //background-color: #e4e5e690;
          background-color: #ffffff30;
          border-radius: 2px;
          .item-img {
            width: 70px;
            height: 70px;
            img {
              width: 75%;
              height: 75%;
              border-radius: 1px;
            }
          }
          .up-name {
            flex: 1;
            font-size: 16px;
            padding: 10px 5px;
            transition: all 0.8s;
            span {
              color: $gray-9;
            }
          }
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
  .up-list-container::-webkit-scrollbar {
    //隐藏滚动条
    display: none;
  }
}
</style>
