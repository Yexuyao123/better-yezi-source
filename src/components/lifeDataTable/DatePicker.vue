<template>
  <div class="data-picker-block">
    <el-date-picker
      v-model="value"
      type="daterange"
      align="right"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      size="mini"
      @change="selectTime"
      :disabled="true"
      title="日期选择功能开发中"
    >
    </el-date-picker>
  </div>
</template>

<script>
import * as dayjs from "dayjs";

export default {
  name: "DatePickerBlock",
  components: {},
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
        disabledDate: (date) => {
          const ninety = dayjs(new Date()).subtract(90, "day");
          const six = dayjs(new Date());
          if (dayjs(date).isBefore(ninety) || dayjs(date).isAfter(six)) {
            return true;
          }
          if (this.dateTemp) {
            const minDate = dayjs(this.dateTemp);
            const maxDate = minDate.add(6, "day");
            return (
              !maxDate.isBefore(dayjs(date)) || !minDate.isBefore(dayjs(date))
            );
          }
        },
        onPick: (v) => {
          if (v.minDate && !v.maxDate) {
            this.dateTemp = v.minDate;
          } else {
            this.dateTemp = null;
          }
          // console.log(v);
        },
      },
      value: "",
      dateTemp: null,
    };
  },
  methods: {
    selectTime() {
      if (this.value !== null) this.$emit("change", this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.data-picker-block {
  width: 100%;
}
</style>
