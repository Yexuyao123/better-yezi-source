<template>
  <div class="search-input">
    <div class="placeholder flex-center">
      <el-dropdown @command="changeItem">
        <span class="el-dropdown-link">
          {{ dropdownItem[currentItem]
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in dropdownItem"
            :key="item"
            :command="index"
            >{{ item }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <input
      type="text"
      v-model="searchWord"
      class="input-bg"
      name="userInput"
      @keyup.enter="gotoSearchResult"
      @focus="changeUnderline"
      @blur="closeUnderline"
      autocomplete="off"
    />
    <span class="search-icon flex-center" @click="gotoSearchResult">
      <span>搜索</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  data() {
    return {
      dropdownItem: ["百度一下", "谷歌搜索"],
      currentItem: 0,
      searchWord: "",
    };
  },
  methods: {
    changeItem(command) {
      this.currentItem = command;
    },
    gotoSearchResult() {
      if (this.searchWord !== "") {
        if (this.currentItem === 0) {
          window.open(
            `https://www.baidu.com/s?wd=${this.searchWord}`,
            "_blank"
          );
        } else if (this.currentItem === 1) {
          window.open(
            `https://www.google.com.hk/search?q=${this.searchWord}`,
            "_blank"
          );
        }
      }
    },
    changeUnderline() {
      this.$emit("open");
    },
    closeUnderline() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";

.search-input {
  display: flex;
  flex-direction: row;
  border: $color-primary1 1px solid;
  border-radius: 6px;
  overflow: hidden;
  width: 95%;
  .placeholder {
    border: $base-geek 1px solid;
    background-color: $base-geek;
    padding: 10px 15px;
    width: 180px;
    .el-dropdown {
      span {
        font-size: $largeSize;
        color: $color-primary2;
        i {
          margin-left: 6px;
        }
      }
    }
    &:hover {
      cursor: pointer;
    }
  }
  .input-bg {
    border: #2a688530 1px solid;
    //background-color: #e4e5e680;
    outline: -webkit-focus-ring-color auto 0;
    color: $gray-9;
    font-size: $largeSize;
    flex: 1;
    padding: 0 15px;
  }
  .input-bg:focus {
    border: $gray-1 1px solid;
    //background-image: $d-color0;
  }
  .input-bg:focus-visible {
    outline: -webkit-focus-ring-color auto 0;
  }

  .search-icon {
    width: 80px;
    transition: all 0.4s;
    background-color: $base-geek;
    border: $base-geek 1px solid;
    span {
      font-size: $largeSize;
      line-height: 1;
      color: $color-primary2;
    }
    &:hover {
      background-color: #5476e7;
      border: #5476e7 1px solid;
      span {
        color: $gray-2;
      }
    }
  }
}
.el-dropdown-menu {
  background-color: #f4f4f480;
  padding: 0;
  .el-dropdown-menu__item {
    font-size: $largeSize !important;
    padding: 10px 20px;
    color: $color-primary2;
    border: $color-primary2 1px solid;
    &:hover {
      color: $gray-9;
      background-color: $color-primary2;
    }
  }
}
</style>
