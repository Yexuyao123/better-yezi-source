<template>
  <div class="one-month-block">
    <div class="punch-table">
      <CommonCard class="table-card">
        <div class="table-container">
          <CartTitle
            title="年打卡记录"
            :color="titleUnderlineColor[1]"
          ></CartTitle>
          <div
            class="table-content"
            v-if="yearObject.haveGetPunchData && yearData !== {}"
          >
            <div class="title">
              <div
                v-for="(value, index) in nameArr"
                :key="value[0] + index"
                class="common-title"
                :style="{
                  'background-color': `${
                    index === activePunchBlock
                      ? titleColorActive[index]
                      : titleColorBox[index]
                  }`,
                }"
                :class="{
                  'active-title': index === activePunchBlock,
                }"
                @click="activePunchBlock = index"
              >
                {{ value[0] }}
              </div>
            </div>
            <div
              v-for="(value, index) in nameArr"
              :key="index + value[0]"
              class="table"
              v-show="index === activePunchBlock"
            >
              <MonthPunchChart
                v-if="index === activePunchBlock && yearObject.haveGetPunchData"
                :yearData="yearData"
                :totalPunchObject="yearObject.punchObject[value[0]]"
                :type="'' + value[0]"
              ></MonthPunchChart>
            </div>
          </div>
        </div>
      </CommonCard>
    </div>
    <div class="count-table">
      <CommonCard class="table-card">
        <div class="table-container">
          <CartTitle
            :title="`${dayCount}天 生活数据 （${startDate} 至 ${endTime}）`"
            :color="titleUnderlineColor[2]"
          ></CartTitle>
          <div
            class="table-content"
            v-if="
              monthObject.haveGetPunchData &&
              monthObject.countObject[nameArr[0][1]].dataList
            "
          >
            <MonthCountChart
              v-if="monthObject.haveGetPunchData"
              :monthData="monthData"
              :totalCountObject="
                JSON.parse(JSON.stringify(monthObject.countObject))
              "
            ></MonthCountChart>
          </div>
        </div>
      </CommonCard>
    </div>
    <div class="punch-total-table">
      <CommonCard class="table-card">
        <div class="table-container">
          <CartTitle
            title="年打卡完成率"
            :color="titleUnderlineColor[3]"
          ></CartTitle>
          <div class="table-content" v-if="yearObject.haveGetPunchData">
            <YearPunchPercentChart
              :yearData="yearData"
              :yearPunchObject="yearObject.punchObject"
            ></YearPunchPercentChart>
          </div>
        </div>
      </CommonCard>
    </div>
    <div class="count-total-table">
      <CommonCard class="table-card">
        <div class="table-container">
          <CartTitle
            title="年生活数据统计"
            :color="titleUnderlineColor[4]"
          ></CartTitle>
          <div class="table-content" v-if="yearObject.haveGetPunchData">
            <YearPunchCountChart
              :yearData="yearData"
              :yearPunchObject="yearObject.countObject"
            ></YearPunchCountChart>
          </div>
        </div>
      </CommonCard>
    </div>
  </div>
</template>

<script>
import CommonCard from "@/components/common/BackgroundCardCommon.vue";
import CartTitle from "@/components/common/CardTitle.vue";
import { dailyList, getLabelList, getTabList } from "@/api/todo.js";
import * as dayjs from "dayjs";
import MonthPunchChart from "@/components/dataChart/YearPunchChart.vue";
import MonthCountChart from "@/components/dataChart/MonthCountChart.vue";
import YearPunchPercentChart from "@/components/dataChart/YearPunchPercentChart.vue";
import YearPunchCountChart from "@/components/dataChart/YearPunchCountChart.vue";
export default {
  name: "OneMonthBlock",
  components: {
    CommonCard,
    CartTitle,
    MonthPunchChart,
    MonthCountChart,
    YearPunchPercentChart,
    YearPunchCountChart,
  },
  props: {
    //30天的数据
    startDate: { type: String },
    endDate: { type: String },
    dayCount: { type: String },
    yearData: { type: Object },
  },
  data() {
    return {
      titleColorBox: [
        "#ffc53d70",
        "#40a9ff70",
        "#36cfc970",
        "#9254de70",
        "#ff4d4f70",
        "#ffa94070",
        "#73d13d70",
        "#597ef770",
        "#ff7a4570",
        "#bae63770",
        "#f759ab70",
        "#ffec3d70",
      ],
      titleColorActive: [
        "#ffc53d",
        "#40a9ff",
        "#36cfc9",
        "#9254de",
        "#ff4d4f",
        "#ffa940",
        "#73d13d",
        "#597ef7",
        "#ff7a45",
        "#bae637",
        "#f759ab",
        "#ffec3d",
      ],
      activePunchBlock: 0,
      titleUnderlineColor: [
        "#f759ab",
        "#597ef7",
        "#ffc53d",
        "#ff4d4f",
        "#bae637",
        "#9254de",
      ],
      nameMap: {
        写代码: ["写代码", "写代码"],
        算法: ["算法", "算法"],
        电影: ["观影", "观影"],
        "5个单词": ["背单词", "背单词"],
        饮食不规范: ["健康餐食", "不健康饮食"],
        奶茶: ["不喝奶茶", "奶茶"],
        护肤: ["护肤", "护肤"],
        早睡: ["早睡", "早睡"],
        早起: ["早起", "早起"],
        健身: ["健身", "健身"],
      },
      nameArr: [
        ["写代码", "写代码"],
        ["算法", "算法"],
        ["观影", "观影"],
        ["背单词", "背单词"],
        ["健康餐食", "不健康饮食"],
        ["不喝奶茶", "奶茶"],
        ["护肤", "护肤"],
        ["早睡", "早睡"],
        ["早起", "早起"],
        ["健身", "健身"],
      ],
      haveGetLabelList: false,
      tabList: null, //pid=0健康学习
      tabLabelObj: {}, //健康学习的id为key,对应label项list数组为value
      //月数据
      monthData: {
        startDate: this.startDate,
        endDate: this.endDate,
        dayCount: this.dayCount,
      },
      monthObject: {
        countObject: {}, //30天处理好的数据
        punchObject: {}, //30天处理好的数据
        haveGetPunchData: false,
      },
      yearObject: {
        countObject: {}, //年处理好的数据
        punchObject: {}, //年处理好的数据
        haveGetPunchData: false,
      },
    };
  },
  computed: {
    endTime() {
      return dayjs(this.endDate).subtract(1, "day").format("YYYY-MM-DD");
    },
  },
  created() {
    this.getTabArr();
  },
  methods: {
    getUnit(name) {
      if (
        name === "健康餐食" ||
        name === "不喝奶茶" ||
        name === "护肤" ||
        name === "早睡" ||
        name === "早起"
      ) {
        return "未完成";
      } else if (name === "背单词") {
        return "个";
      } else {
        return "";
      }
    },
    getTabArr() {
      //获取标签大类：健康、学习等
      getTabList().then(
        (res) => {
          //请求Tab也就是pid=0的label
          this.tabList = res.data;
          this.tabList.forEach((item, index) => {
            if (item.id !== 0) {
              this.getTabSonLabel(item.id, item.name, index);
            }
          });
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getTabSonLabel(pid, name, index) {
      getLabelList({ pid }).then(
        (res) => {
          // console.log(res.data);
          this.tabLabelObj[pid] = { name, labelList: {} };
          res.data.forEach((item, step) => {
            this.tabLabelObj[pid].labelList[item.id] = item;
            const fn = (obj) => {
              obj.punchObject[this.nameMap[item.name][0]] = {
                name: item.name,
                id: item.id,
                unit:
                  this.getUnit(this.nameMap[item.name][0]) === ""
                    ? item.unit
                    : this.getUnit(this.nameMap[item.name][0]),
                dataList: [],
              };
              obj.countObject[this.nameMap[item.name][1]] = {
                name: item.name,
                id: item.id,
                unit: item.unit,
                dataList: [],
              };
            };
            fn(this.monthObject);
            fn(this.yearObject);
            if (
              index + 1 === this.tabList.length &&
              step + 1 === res.data.length
            ) {
              this.haveGetLabelList = true;
              this.getMonthDailyData(this.yearData, this.yearObject);
              this.getMonthDailyData(this.monthData, this.monthObject);
            }
          });
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getMonthDailyData(dateObj, rangeObj) {
      const [start, end] = [dateObj.startDate, dateObj.endDate];
      dailyList({ start, end }).then(
        (res) => {
          if (!res.err) {
            if (res.data && res.data.list) {
              res.data.list.forEach((item, index) => {
                const { date } = item;
                const dayStr = dayjs(date).format("YYYY-MM-DD");
                if (
                  item.label_type === "check" ||
                  item.label_type === "count"
                ) {
                  if (
                    rangeObj.punchObject[this.nameMap[item.label_name][0]]
                      .dataList.length === 0
                  ) {
                    rangeObj.punchObject[
                      this.nameMap[item.label_name][0]
                    ].dataList.push([
                      dayStr,
                      item.label_name === "5个单词"
                        ? item.content * 5
                        : item.content,
                    ]);
                  } else {
                    let ifSavePunch = false;
                    rangeObj.punchObject[
                      this.nameMap[item.label_name][0]
                    ].dataList.forEach((arr) => {
                      if (arr[0] === dayStr) {
                        ifSavePunch = !ifSavePunch;
                        arr[1] =
                          item.label_name === "5个单词"
                            ? arr[1] + item.content * 5
                            : arr[1] + item.content;
                      }
                    });
                    if (!ifSavePunch) {
                      rangeObj.punchObject[
                        this.nameMap[item.label_name][0]
                      ].dataList.push([
                        dayStr,
                        item.label_name === "5个单词"
                          ? item.content * 5
                          : item.content,
                      ]);
                    }
                  }
                  if (
                    rangeObj.countObject[this.nameMap[item.label_name][1]]
                      .dataList.length === 0
                  ) {
                    rangeObj.countObject[
                      this.nameMap[item.label_name][1]
                    ].dataList.push([
                      dayStr,
                      item.label_name === "5个单词"
                        ? item.content * 5
                        : item.content,
                    ]);
                  } else {
                    let ifSaveCount = false;
                    rangeObj.countObject[
                      this.nameMap[item.label_name][1]
                    ].dataList.forEach((arr) => {
                      if (arr[0] === dayStr) {
                        ifSaveCount = !ifSaveCount;
                        arr[1] =
                          item.label_name === "5个单词"
                            ? arr[1] + item.content * 5
                            : arr[1] + item.content;
                      }
                    });
                    if (!ifSaveCount) {
                      rangeObj.countObject[
                        this.nameMap[item.label_name][1]
                      ].dataList.push([
                        dayStr,
                        item.label_name === "5个单词"
                          ? item.content * 5
                          : item.content,
                      ]);
                    }
                  }
                }
                if (index + 1 === res.data.list.length) {
                  this.nameArr.forEach((label, step) => {
                    this.filterTotalObject(
                      label,
                      rangeObj.punchObject[label[0]],
                      step,
                      this.nameArr.length,
                      dateObj,
                      rangeObj
                    );
                  });
                }
              });
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    filterTotalObject: function (label, obj, step, length, dateObj, rangeObj) {
      const list = [];
      const needSolve = { 健康餐食: null, 不喝奶茶: null };
      for (
        let date = dateObj.startDate;
        date !== dateObj.endDate;
        date = dayjs(date).add(1, "day").format("YYYY-MM-DD")
      ) {
        list.push(label[0] in needSolve ? [date, 1] : [date, 0]);
        if (
          date ===
          dayjs(dateObj.endDate).subtract(1, "day").format("YYYY-MM-DD")
        ) {
          obj.dataList.forEach((item, index) => {
            list.forEach((dataArr) => {
              if (dataArr[0] === item[0]) {
                //有记录
                if (label[0] in needSolve) {
                  // console.log(item[1]);
                  dataArr[1] = item[1] ? 0 : 1;
                } else {
                  dataArr[1] = item[1];
                }
              }
            });
            if (index + 1 === obj.dataList.length) {
              obj.dataList = list;
              if (step + 1 === length) {
                rangeObj.haveGetPunchData = true;
              }
            }
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.one-month-block {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template: calc(50% - 5px) calc(50% - 5px) / calc(75% - 5px) calc(
      25% - 5px
    );
  grid-gap: 10px;
  grid-template-areas: "punch punch-total" "count count-total";
  .punch-table {
    grid-area: punch;
    .table-card {
      .table-container {
        .table-content {
        }
      }
    }
  }
  .count-table {
    grid-area: count;
    .table-card {
      .table-container {
      }
    }
  }
  .punch-total-table {
    grid-area: punch-total;
    .table-card {
      .table-container {
      }
    }
  }
  .count-total-table {
    grid-area: count-total;
    .table-card {
      .table-container {
      }
    }
  }
  .table-card {
    width: 100%;
    height: 100%;
    .table-container {
      padding: 15px 20px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .table-content {
        margin-top: 5px;
        flex: 1;
        .title {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          .common-title {
            width: 80px;
            text-align: center;
            margin: 0 10px;
            padding: 3px 0;
            border-radius: 4px;
            font-size: 14px;
            color: $color-primary8;
            transition: all 1s;
            &:hover {
              color: $color-primary2;
              cursor: pointer;
            }
          }
          .active-title {
            color: $gray-1;
          }
        }
        .table {
          height: calc(100% - 50px);
        }
      }
    }
  }
}
</style>
