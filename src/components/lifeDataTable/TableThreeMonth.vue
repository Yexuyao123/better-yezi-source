<template>
  <div class="three-month-block">我是3个月</div>
</template>

<script>
export default {
  name: "ThreeMonthBlock",
  components: {},
  props: ["startDate", "endDate", "dayCount"],
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.three-month-block {
  width: 100%;
  height: 100%;
  border: #f8a5c2 1px solid;
}
</style>
