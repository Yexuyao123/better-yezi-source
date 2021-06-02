<template>
  <div class="count-input">
    <el-input-number
      v-model="inputContent"
      @change="handleChange"
      size="mini"
      :min="0"
      :max="1000"
      :label="label"
    ></el-input-number>
    <span class="count-unit">{{ unit }}</span>
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
export default {
  name: "CountInput",
  props: {
    content: { type: Number },
    label: { type: String },
    unit: { type: String },
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
    this.firstContent = this.content;
    this.inputContent = this.content;
  },
  methods: {
    handleChange() {
      if (this.inputContent !== this.firstContent) {
        this.disabledCommit = false;
        this.notInputChange = true;
        this.$emit("change", this.inputContent);
      } else {
        this.disabledCommit = true;
        this.notInputChange = false;
        this.$emit("change", this.inputContent);
      }
    },
    commitLabel() {
      this.notInputChange = false;
      this.$emit("commitLabel");
    },
    deleteLabel() {
      this.$emit("deleteLabel");
    },
  },
  watch: {
    content: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.inputContent = val;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../CSS/base.scss";
.count-input {
  display: flex;
  align-items: center;
  div.el-input-number.el-input-number--mini {
    //border: #f8a5c2 1px solid;
    margin-right: 8px;
  }
  span {
    font-size: 15px;
    line-height: 16px;
    margin: 0 4px;
    //border: #f8a5c2 1px solid;
  }
  span.count-unit {
    margin-right: 10px;
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
