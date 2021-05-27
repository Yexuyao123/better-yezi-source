<template>
  <div class="show-class-selection">
    <el-form ref="form" :model="form" label-width="10px">
      <el-form-item label="">
        <el-radio-group v-model="form.tab">
          <el-radio
            v-for="(item, index) in tabArr"
            :label="item"
            name="type"
            :key="item + index"
            @change="$emit('selectPid', index)"
          ></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ShowClassSelection",
  components: {},
  props: {
    tabArr: { type: Array },
  },
  data() {
    return {
      form: {
        name: "",
        tab: "全部",
      },
    };
  },
  created() {},
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../../../CSS/base.scss";
.show-class-selection {
  width: 100%;
  height: 100%;
  .el-radio {
    color: $gray-10;
  }
}
</style>
