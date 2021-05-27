<template>
  <div class="check-input">
    <span v-if="inputContent">✔️</span>
    <span v-if="!inputContent">❌</span>
    <el-switch
      v-model="inputContent"
      :width="35"
      active-color="#bae637"
      inactive-color="#bfbfbf"
    >
    </el-switch>
    <span v-if="notInputChange" class="change-icon">*</span>
    <el-button
      size="mini"
      @click="commitLabel"
      :disabled="disabledCommit"
      title="修改"
      circle
      type="warning"
      ><i class="el-icon-finished el-icon--right"></i
    ></el-button>
    <el-button size="mini" @click="deleteLabel" title="删除" circle type="info"
      ><i class="el-icon-delete el-icon--right"></i
    ></el-button>
  </div>
</template>

<script>
//todo:电影mark问题
export default {
  name: "CheckInput",
  props: {
    content: { type: Number },
  },
  components: {},
  data() {
    return {
      inputContent: null,
      notInputChange: false,
      disabledCommit: true,
      firstContent: null,
    };
  },
  created() {
    this.firstContent = !!this.content;
    this.inputContent = !!this.content;
  },
  methods: {
    commitLabel() {
      this.notInputChange = false;
      this.$emit("commitCheck");
    },
    deleteLabel() {
      this.$emit("deleteCheck");
    },
  },
  watch: {
    content: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.inputContent = !!val;
        }
      },
    },
    inputContent: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          if (this.inputContent !== this.firstContent) {
            this.disabledCommit = false;
            this.notInputChange = true;
            this.$emit("check", +this.inputContent);
          } else {
            this.disabledCommit = true;
            this.notInputChange = false;
            this.$emit("check", +this.inputContent);
          }
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../CSS/base.scss";
.check-input {
  display: flex;
  align-items: center;
  .el-switch {
    margin-right: 8px;
  }
  span {
    font-size: 15px;
    line-height: 16px;
    margin: 0 4px;
    //border: #f8a5c2 1px solid;
  }
  .change-icon {
    color: $beauty-red;
    padding-right: 5px;
  }
  .el-button {
    .el-icon--right {
      margin-left: 0;
    }
  }
}
</style>
