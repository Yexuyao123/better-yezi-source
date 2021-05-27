<template>
  <div class="navigation">
    <div class="header">
      <NavigationHeader @changeView="currentIndex"></NavigationHeader>
    </div>
    <div class="section flex-center" v-if="currentView === 0">
      <CommonWebsite></CommonWebsite>
    </div>
    <div class="section" v-if="currentView === 1">
      <StudyWebsite></StudyWebsite>
    </div>
    <div class="section waiting" v-if="currentView === 2">喜爱~ 正在开发中</div>
    <div class="section waiting" v-if="currentView === 3">
      娱乐社区~ 正在开发中
    </div>
    <div class="section waiting" v-if="currentView === 4">其他~ 正在开发中</div>
  </div>
</template>

<script>
import NavigationHeader from "@/components/Header/NavigationHeader.vue";
import CommonWebsite from "@/components/Website/CommonWebsite.vue";
import StudyWebsite from "@/components/Website/StudyWebsite.vue";

export default {
  name: "Navigation",
  components: { NavigationHeader, CommonWebsite, StudyWebsite },
  data() {
    return {
      currentView: 0,
    };
  },
  methods: {
    currentIndex(index) {
      this.currentView = index;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../CSS/base.scss";
.navigation {
  width: 100%;
  //min-height: 100vh;
  color: $color-primary2;
  .header {
    width: 100%;
    height: 80px;
  }
  .section {
    width: 100%;
    min-height: calc(100vh - 80px);
    padding-left: 10px;
    //border: #f8a5c2 1px solid;
  }
  .waiting {
    font-size: 20px;
    padding: 100px;
    text-align: center;
  }
}
</style>
