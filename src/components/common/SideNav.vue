<template>
  <div class="side-nav">
    <el-row class="tac">
      <el-menu
        :default-active="currentActive"
        class="el-menu-vertical-demo"
        :collapse="elMenuSwitchIsClose"
        active-text-color="#fc8848"
      >
        <i
          class="my-el-icon"
          :class="switchIconClass"
          @click="changeSwitch"
        ></i>
        <el-menu-item
          v-for="(title, index) in sideBarTitle"
          :index="index + 1 + ''"
          @click="changeActive(index + 1)"
          :key="title"
        >
          <i
            class="white-el-icon"
            :class="iconClassName[index]"
            :style="{ color: `${activeColor(index + 1)}` }"
          ></i>
          <span :style="{ color: `${activeColor(index + 1)}` }">{{
            title
          }}</span>
        </el-menu-item>
      </el-menu>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SideNav",
  components: {},
  data() {
    return {
      currentActive: "1",
      sideBarTitle: ["导航", "计划", "成果", "简历", "博客"],
      iconClassName: [
        "el-icon-location",
        "el-icon-document",
        "el-icon-menu",
        "el-icon-user",
        "el-icon-notebook-1",
      ],
      elMenuSwitchIsClose: false,
      iconColor: { commonColor: "#fff", activeColor: "#bae637" },
      mainList: [
        {
          path: "/navigation",
          pathName: "Navigation",
        },
        {
          path: "/todo/calendar",
          pathName: "Calendar",
        },
        {
          path: "/todo/monthdata",
          pathName: "MonthData",
        },
        {
          path: "/information",
          pathName: "Information",
        },
        {
          path: "/notebook",
          pathName: "Notebook",
        },
      ],
    };
  },
  created() {
    this.currentActive = this.$route.query.activeIndex || "1";
  },
  computed: {
    switchIconClass() {
      return this.elMenuSwitchIsClose
        ? "el-icon-caret-right"
        : "el-icon-caret-left";
    },
  },
  methods: {
    changeActive(index) {
      this.currentActive = "" + index;
      if (this.$route.name !== this.mainList[index - 1].pathName) {
        const query = this.$route.query || {};
        this.$router.replace({
          name: this.mainList[index - 1].pathName,
          query: { ...query, activeIndex: this.currentActive },
        });
      }
    },
    changeSwitch() {
      this.elMenuSwitchIsClose = !this.elMenuSwitchIsClose;
    },
    activeColor(index) {
      return "" + index === this.currentActive
        ? this.iconColor.activeColor
        : this.iconColor.commonColor;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.side-nav {
  background: inherit;
  height: 100%;
  .el-row {
    height: 100%;
    //border: #f8a5c2 1px solid;
    .el-menu {
      height: 100%;
      border-right: solid 1px #e4e5e620;
      background: linear-gradient(to right, #e4e5e600, #e4e5e620);
      .el-menu-item {
        color: $gray-1;
        background: inherit;
        font-size: $mediumSize;
      }
    }
  }
  .my-el-icon {
    font-size: 26px;
    padding: 10px 5px;
    border-right: $color-primary3 1px solid;
    width: 100%;
    text-align: end;
    //background-color: $shallow;
    background-image: linear-gradient(
      to right,
      $color-primary1,
      $color-primary3
    );
    color: $gray-1;
  }
  .white-el-icon {
    color: $gray-1;
    margin-right: 8px;
  }
}
</style>
