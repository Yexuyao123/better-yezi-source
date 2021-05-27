<template>
  <div class="website-list">
    <div class="guide-list">
      <div
        class="guide-item"
        v-for="(url, urlName) in websiteObj"
        :key="urlName"
        @click="gotoURL(url)"
      >
        <div class="website-icon flex-center">
          <div class="img-container flex-center">
            <url-img :url="url" :urlName="urlName"></url-img>
          </div>
        </div>
        <div class="website-link flex-center">
          <div class="bg-container flex-center">
            <div class="ellipsis-1">{{ urlName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/helpers/icon-font-1.js";

export default {
  name: "WebsiteList",
  props: {
    websiteObj: {
      type: Object,
    },
  },
  components: {
    "url-img": {
      template: `
        <div class="url-img">
          <img
            v-if="!isError"
            :src="url+'/favicon.ico'"
            alt=""
            @error.once="noFind"
          />
          <svg
            v-if="isError"
            class="icon"
            aria-hidden="true"
            :key="urlName + 'svg'"
          >
            <use xlink:href="#icon-food-strawberry"></use>
          </svg>
        </div>
      `,
      props: {
        url: { type: String },
        urlName: { type: String },
      },
      data() {
        return {
          isError: false,
        };
      },
      created() {
        this.isError = false;
      },
      methods: {
        noFind: function () {
          this.isError = true;
        },
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    gotoURL(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style lang="scss">
@import "../../CSS/base.scss";
.url-img {
  width: 100%;
  height: 100%;
  position: relative;
  border: #9aa7ab40 1px solid;
  border-radius: 3px;
  img {
    width: 100%;
    height: 100%;
  }
  .icon {
    position: absolute;
    top: -4px;
    left: 2px;
    width: 120%;
    height: 120%;
    fill: currentColor;
    overflow: hidden;
    padding-right: 10px;
  }
}
</style>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.website-list {
  .guide-list {
    //border: #f8a5c2 1px solid;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 8px;
    .guide-item {
      //border: #f8a5c2 1px solid;
      background-color: #ffffff50;
      border-radius: 5px;
      margin-bottom: 10px;
      width: 100%;
      display: flex;
      transition: all 0.3s;
      &:hover {
        cursor: pointer;
      }
      .website-icon {
        //border: #f8a5c2 1px solid;
        width: 50px;
        height: 50px;
        margin-left: 5px;
        .img-container {
          width: 40px;
          height: 40px;
          border-radius: 3px;
          overflow: hidden;
        }
      }
      .website-link {
        flex: 1;
        //border: $shallowBorder 1px solid;
        .bg-container {
          width: 100%;
          height: 50px;
          border-radius: 3px;
          //border: #f8a5c2 1px solid;
          div {
            width: 100%;
            padding: 5px 10px;
            //border: #f8a5c2 1px solid;
            text-align: left;
            font-size: 18px;
            color: $gray-9;
          }
        }
      }
      &:hover {
        background-color: #e4e5e650;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>
