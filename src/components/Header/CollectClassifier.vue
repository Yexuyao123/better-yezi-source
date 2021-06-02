<template>
  <div class="collect-classifier">
    <div
      class="class-item"
      v-for="(title, index) in classTitles"
      :key="title"
      @click="changeActive(index)"
    >
      <Card>
        <div
          class="item-container flex-center"
          :class="{ 'active-class-item': index === activeTitle }"
        >
          <span class="item-title">{{ title }}</span>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from "@/components/common/BackgroundCardNav.vue";

export default {
  name: "CollectClassifier",
  components: { Card },
  data() {
    return {
      classTitles: ["常用", "知识区", "喜爱", "社区娱乐", "其他"],
      activeTitle: 0,
    };
  },
  created() {
    this.activeTitle = +this.$route.query.index || 0;
    this.$emit("changeView", this.activeTitle);
  },
  mounted() {
    // console.log(this.activeTitle);
  },
  methods: {
    changeActive(index) {
      this.activeTitle = index;
      const query = this.$route.query || {};
      this.$router.replace({ query: { ...query, index } });
      this.$emit("changeView", index);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.collect-classifier {
  //background-color: transparent;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .class-item {
    min-width: 70px;
    height: 100%;
    flex: 1;
    margin: 0 10px;
    .item-container {
      padding: 5px 0;
      width: 100%;
      height: 100%;
      background-color: $color-primary6;
      transition: all 0.5s;
      .item-title {
        padding: 5px 0;
        font-size: $largeSize;
      }
      &:hover {
        cursor: pointer;
        color: $color-10;
        background-color: $color-primary7;
      }
    }

    .active-class-item {
      background-color: $color-primary2;
      color: $gray-9;
    }
  }
}
</style>
