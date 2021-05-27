<template>
  <div class="calendar">
    <div class="calendar-section">
      <CalendarBoard
        @changeDate="currentDate"
        :monthPunchMap="monthPunchMap"
        :monthTodoWorkMap="monthTodoWorkMap"
        :haveGetWorkData="haveGetWorkData"
      ></CalendarBoard>
    </div>
    <div class="today-todo">
      <div
        class="today-todo-container"
        v-if="
          selectDateObj &&
          selectDateStr !== '' &&
          haveGetPunchData &&
          haveGetWorkData
        "
      >
        <OneDayFinish
          :selectDateObj="selectDateObj"
          :selectDateStr="selectDateStr"
          :monthPunchMap="monthPunchMap"
          :monthTodoWorkMap="monthTodoWorkMap"
          :totalCommonWorkList="totalCommonWorkList"
          @updatePunchData="initPunchData"
          @updateWorkData="initWorkData"
        ></OneDayFinish>
      </div>
    </div>
  </div>
</template>

<script>
import OneDayFinish from "@/components/todo/OneDayFinish.vue";
import CalendarBoard from "@/components/todo/CalendarBoard.vue";
import { getTime } from "@/helpers/until.js";
import * as dayjs from "dayjs";
import { dailyList, workDeadlineTodoList, workTodoList } from "@/api/todo.js";

export default {
  name: "Calendar",
  components: { CalendarBoard, OneDayFinish },
  data() {
    return {
      selectDateObj: null, //选择时间的Date时间对象
      selectDateStr: "", //选择时间的时间戳
      selectMonth: -1,
      haveGetPunchData: false,
      monthPunchMap: {},
      haveGetWorkData: false,
      monthTodoWorkMap: {},
      totalCommonWorkList: [],
    };
  },
  computed: {
    range() {
      //取到月头月尾
      const day = dayjs(this.selectDateStr);
      return [
        day.startOf("month").format("YYYY-MM-DD"),
        day.startOf("month").add(1, "month").format("YYYY-MM-DD"),
      ];
    },
  },
  created() {
    this.getMonthDailyData();
    this.getMonthDeadlineWorkData();
  },
  watch: {
    selectMonth: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          // console.log("切换月份了");
          this.initPunchData();
          this.initWorkData();
        }
      },
    },
  },
  methods: {
    currentDate: function (date) {
      this.selectDateObj = getTime(date);
      this.selectMonth = this.selectDateObj.month;
      this.selectDateStr = date;
    },
    getMonthDailyData() {
      const [start, end] = this.range;
      dailyList({ start, end }).then(
        (res) => {
          const dayMap = {};
          if (!res.err) {
            if (res.data && res.data.list) {
              res.data.list.forEach((item) => {
                // const date=item.date
                const { date } = item;
                const day = dayjs(date).format("YYYY-MM-DD");
                //将同一天的打卡数据集合到一个key对应的值里，这个值是个数组
                if (!dayMap[day]) {
                  dayMap[day] = [];
                }
                if (item["label_type"] === "check") {
                  dayMap[day].unshift(item);
                } else if (item["label_type"] === "count") {
                  dayMap[day].push(item);
                }
              });
            }
          }
          this.monthPunchMap = dayMap;
          this.haveGetPunchData = true;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getMonthDeadlineWorkData() {
      const [start, end] = this.range;
      workDeadlineTodoList({ start, end }).then(
        (res) => {
          const dayMap = {};
          if (!res.err) {
            res.data.list.forEach((item) => {
              const date = item["deadline_date"];
              const day = dayjs(date).format("YYYY-MM-DD");
              //将同一天的打卡数据集合到一个key对应的值里，这个值是个数组
              if (!dayMap[day]) {
                dayMap[day] = [];
              }
              dayMap[day].push(item);
            });
          }
          this.monthTodoWorkMap = dayMap;
          this.getMonthWorkCommonData();
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getMonthWorkCommonData() {
      workTodoList().then(
        (res) => {
          if (!res.err) {
            this.totalCommonWorkList = res.data.list;
            res.data.list.forEach((item) => {
              const date = new Date().getTime();
              const day = dayjs(date).format("YYYY-MM-DD");
              console.day;
              //将同一天的打卡数据集合到一个key对应的值里，这个值是个数组
              if (!this.monthTodoWorkMap[day]) {
                this.monthTodoWorkMap[day] = [];
              }
              this.monthTodoWorkMap[day].push(item);
            });
          }
          this.haveGetWorkData = true;
        },
        (err) => {
          console.log(err);
        }
      );
    },

    initPunchStatus() {
      this.haveGetPunchData = false;
      this.monthPunchMap = {};
    },
    initWorkStatus() {
      this.haveGetWorkData = false;
      this.monthTodoWorkMap = {};
      this.totalCommonWorkList = [];
    },
    initPunchData() {
      this.initPunchStatus();
      this.getMonthDailyData();
    },
    initWorkData() {
      this.initWorkStatus();
      this.getMonthDeadlineWorkData();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../CSS/base.scss";
.calendar {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  .calendar-section {
    //width: calc(100% / 3 * 2 - 15px);
    width: calc(100% / 5 * 3 - 15px);
    //border: $color-4 1px solid;
    border-radius: 5px;
    padding-top: 10px;
    background-color: #fafafa50;
    //background-color: rgb(148, 175, 191);
    //background-color: rgb(177, 211, 231);
  }
  .today-todo {
    //width: calc(100% / 3);
    width: calc(100% / 5 * 2);
    background-color: #fafafa80;
    //border: #f8a5c2 1px solid;
    //background-color: rgb(177, 211, 231);
    padding-bottom: 10px;
    border-radius: 5px;
    .today-todo-container {
      height: 100%;
      width: 100%;
      //border: #f8a5c2 1px solid;
    }
  }
}
</style>
