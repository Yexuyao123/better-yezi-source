<template>
  <div class="half-month-block">我是半个月</div>
</template>

<script>
export default {
  name: "HalfMonthBlock",
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
.half-month-block {
  width: 100%;
  height: 100%;
  border: #f8a5c2 1px solid;
}
</style>
