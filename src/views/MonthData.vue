<template>
  <div class="month-data">
    <div class="data-table-header">
      <div class="data-title-section">
        <span>阶 段 生 活 综 合 成 果</span>
      </div>
      <div class="data-time-section">
        <span class="date-selection">
          <span class="date-selection-title">时间范围</span>
          <span>
            <DatePickerBlock @change="selectTime"></DatePickerBlock>
          </span>
        </span>
        <span class="current-date">
          <DateBlock></DateBlock>
        </span>
      </div>
    </div>
    <div class="data-table-main">
      <HalfMonthBlock
        v-if="Number(dayCount) >= 7 && Number(dayCount) <= 14"
        :startDate="startDate"
        :endDate="endDate"
        :dayCount="dayCount"
      ></HalfMonthBlock>
      <OneMonthBlock
        v-if="Number(dayCount) >= 15 && Number(dayCount) <= 30"
        :startDate="startDate"
        :endDate="endDate"
        :dayCount="dayCount"
        :yearData="yearData"
      ></OneMonthBlock>
      <ThreeMonthBlock
        v-if="Number(dayCount) >= 31 && Number(dayCount) <= 90"
        :startDate="startDate"
        :endDate="endDate"
        :dayCount="dayCount"
      ></ThreeMonthBlock>
    </div>
  </div>
</template>

<script>
import DateBlock from "@/components/Header/Date.vue";
import DatePickerBlock from "@/components/lifeDataTable/DatePicker.vue";
import HalfMonthBlock from "@/components/lifeDataTable/TableHalfMonth.vue";
import OneMonthBlock from "@/components/lifeDataTable/TableMonth.vue";
import ThreeMonthBlock from "@/components/lifeDataTable/TableThreeMonth.vue";
import * as dayjs from "dayjs";

export default {
  name: "MonthData",
  components: {
    DateBlock,
    DatePickerBlock,
    HalfMonthBlock,
    OneMonthBlock,
    ThreeMonthBlock,
  },
  data() {
    return {
      startDate: "",
      endDate: "",
      dayCount: "",
      yearData: {},
    };
  },
  created() {
    const day = dayjs(new Date().getTime());
    this.startDate = day.subtract(29, "day").format("YYYY-MM-DD");
    this.endDate = day.add(1, "day").format("YYYY-MM-DD");
    this.dayCount = 30 + "";
    // console.log(this.startDate);
    // console.log(this.endDate);
    // console.log(this.dayCount);
    this.yearData = {
      year: day.startOf("year").format("YYYY"),
      startDate: day.startOf("year").format("YYYY-MM-DD"),
      endDate: day.add(1, "day").format("YYYY-MM-DD"),
    };
  },
  methods: {
    selectTime: function (val) {
      this.startDate = dayjs(val[0]).format("YYYY-MM-DD");
      this.endDate = dayjs(val[1]).add(1, "day").format("YYYY-MM-DD");
      this.dayCount = "" - dayjs(val[0]).diff(dayjs(val[1]), "day", false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../CSS/base.scss";
.month-data {
  width: 100%;
  height: 100vh;
  color: $color-primary2;
  display: flex;
  flex-direction: column;
  .data-table-header {
    //border: #f8a5c2 1px solid;
    width: 100%;
    display: flex;
    .data-title-section {
      width: 55%;
      text-align: end;
      //border: #f8a5c2 1px solid;
      span {
        display: inline-block;
        padding: 8px 0;
        font-size: 24px;
      }
    }
    .data-time-section {
      flex: 1;
      //border: #f8a5c2 1px solid;
      display: flex;
      justify-content: space-between;
      span {
        //border: #f8a5c2 1px solid;
        display: inline-block;
      }
      span.date-selection {
        flex: 1;
        //border: #f8a5c2 1px solid;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .date-selection-title {
          padding-right: 10px;
          font-size: 14px;
        }
      }
      span.current-date {
      }
    }
  }
  .data-table-main {
    width: 100%;
    padding: 10px 15px 15px;
    flex: 1;
    //border: #f8a5c2 1px solid;
  }
}
</style>
