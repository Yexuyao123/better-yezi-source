<template>
  <div class="navigation-header">
    <div class="navigation-header-container">
      <div class="input-container">
        <SearchInput
          @open="changeUnderline"
          @close="closeUnderline"
        ></SearchInput>
      </div>
      <div class="left-tab-container">
        <CollectClassifier @changeView="currentIndex"></CollectClassifier>
      </div>
      <!--      <div class="weather-container">-->
      <!--        <DateBlock></DateBlock>-->
      <!--      </div>-->
      <div class="input-underline">
        <div
          class="input-underline-close"
          :class="{ 'input-underline-active': ifUnderline }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from "@/components/Header/SearchInput.vue";
// import DateBlock from "@/components/Header/Date.vue";
import CollectClassifier from "@/components/Header/CollectClassifier.vue";

export default {
  name: "NavigationHeader",
  components: { SearchInput, CollectClassifier },
  data() {
    return {
      ifUnderline: false,
    };
  },
  created() {},
  computed: {},
  methods: {
    currentIndex(index) {
      this.$emit("changeView", index);
    },
    changeUnderline() {
      this.ifUnderline = true;
    },
    closeUnderline() {
      this.ifUnderline = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.navigation-header {
  width: 100%;
  height: 100%;
  .navigation-header-container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template: 10px 49px 1px /3fr 4fr;
    grid-template-areas:
      ". ."
      "lefttab input"
      "underline underline";
    .input-container {
      grid-area: input;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
    }
    .left-tab-container {
      grid-area: lefttab;
    }
    //.weather-container {
    //  grid-area: weather;
    //}
    .input-underline {
      grid-area: underline;
      width: 99%;
      height: 1px;
      background-color: #e4e5e600;
      .input-underline-close {
        width: 0;
        height: 100%;
        background-image: linear-gradient(
          to right,
          $p-b-color-1,
          $p-b-color-2,
          $p-b-color-3,
          $p-b-color-4,
          $p-b-color-5,
          $p-b-color-6,
          $p-b-color-7
        );
        transition: all 1s;
      }
      .input-underline-active {
        width: 100%;
      }
    }
  }
}
</style>
