<template>
  <div class="one-week-todo">
    <div class="none-todo" v-if="selectDateStr">
      <NonePunch
        v-if="nonePunchTitle !== ''"
        :msg="nonePunchTitle"
        title=" 新增代办"
        :selectDateObj="selectDateObj"
        type="work"
        :dateStatus="dateStatus"
        @updateWorkData="$emit('updateWorkData')"
      ></NonePunch>
    </div>
    <div
      class="create-todo"
      v-if="
        dateStatus !== 'pass' && nonePunchTitle !== '本周暂时没有安排待办噢~'
      "
    >
      <CreateNewLabel
        title="添加待办"
        :selectDateObj="selectDateObj"
        type="work"
        @updateWorkData="$emit('updateWorkData')"
      ></CreateNewLabel>
    </div>
    <el-timeline :reverse="reverse" v-if="selectDateStr">
      <TimelineDeadline
        v-if="haveGetDeadline"
        :timeoutMap="timeoutMap"
        :dateStatus="dateStatus"
        :weekDeadlineMap="weekDeadlineMap"
        @deleteWork="deleteWorkItem"
        @finishWork="finishWorkItem"
        @updateWorkData="$emit('updateWorkData')"
      ></TimelineDeadline>
      <TimelineCommon
        v-if="dateStatus !== 'pass' && totalCommonWorkList[0]"
        :totalCommonWorkList="totalCommonWorkList"
        @deleteWork="deleteWorkItem"
        @finishWork="finishWorkItem"
        @updateWorkData="$emit('updateWorkData')"
      ></TimelineCommon>
      <TimelineFinish
        v-if="dayFinishMap[0]"
        :dayFinishMap="dayFinishMap"
      ></TimelineFinish>
    </el-timeline>
  </div>
</template>

<script>
import * as dayjs from "dayjs";
import TimelineDeadline from "@/components/todo/oneWeekTodo/TimelineDeadLineItem.vue";
import TimelineCommon from "@/components/todo/oneWeekTodo/TimelineCommonItem.vue";
import TimelineFinish from "@/components/todo/oneWeekTodo/TimelineFinishItem.vue";
import NonePunch from "@/components/todo/NonePunch.vue";
import CreateNewLabel from "@/components/addPunchAndTodo/CreateNewLabel.vue";

import {
  workDeadlineTodoList,
  workFinishList,
  workDelete,
  workEditFinish,
} from "@/api/todo.js";

export default {
  name: "OneWeekTodo",
  components: {
    TimelineDeadline,
    TimelineCommon,
    TimelineFinish,
    NonePunch,
    CreateNewLabel,
  },
  props: {
    totalCommonWorkList: {
      //非紧急待办
      type: Array,
    },
    dateStatus: {
      type: String,
    },
    selectDateStr: {
      //选择时间的时间戳
      type: Date,
    },
    selectDateObj: {
      //选择时间的Date时间对象
      type: Object,
    },
  },
  data() {
    return {
      //超时待办
      timeoutMap: [],
      //紧急待办
      weekDeadlineMap: [],
      haveGetDeadline: false,
      //完成事项
      dayFinishMap: [],
      haveGetFinish: false,
      reverse: false,
    };
  },
  created() {
    this.initRequestData();
  },
  watch: {
    selectDateStr: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.initRequestData();
        }
      },
    },
  },
  computed: {
    range() {
      const day = dayjs(this.selectDateStr);
      return {
        week: [
          day.subtract(7, "day").startOf("day").format(),
          day.add(7, "day").startOf("day").format(),
        ],
        day: [
          day.startOf("day").format(),
          day.add(1, "day").startOf("day").format(),
        ],
      };
    },
    nonePunchTitle() {
      if (this.dateStatus === "pass" && !this.dayFinishMap[0]) {
        return "没有完成待办事项记录";
      } else if (
        this.dateStatus !== "pass" &&
        !this.timeoutMap[0] &&
        !this.weekDeadlineMap[0] &&
        !this.totalCommonWorkList[0]
      ) {
        return "本周暂时没有安排待办噢~";
      } else {
        return "";
      }
    },
  },
  methods: {
    initRequestData() {
      this.getWeekTodoWorkData();
      this.getTodayFinishWorkData();
    },
    getWeekTodoWorkData() {
      //获取近一周的紧急代办+过去1周未完成待办
      const [start, end] = this.range.week;
      workDeadlineTodoList({ start, end }).then(
        (res) => {
          let deadlineMap = [];
          let timeoutTodo = [];
          if (!res.err) {
            res.data.list.forEach((item) => {
              if (item.deadline) {
                if (
                  new Date(item.deadline_date).getTime() < new Date().getTime()
                ) {
                  timeoutTodo.push(item);
                } else {
                  deadlineMap.push(item);
                }
              }
            });
          }
          this.timeoutMap =
            timeoutTodo.sort((a, b) => {
              const a1 = new Date(a.deadline_date).getTime();
              const b1 = new Date(b.deadline_date).getTime();
              return a1 - b1;
            }) || [];
          this.weekDeadlineMap =
            deadlineMap.sort((a, b) => {
              const a1 = new Date(a.deadline_date).getTime();
              const b1 = new Date(b.deadline_date).getTime();
              return a1 - b1;
            }) || [];
          console.log(this.timeoutMap);
          console.log(this.weekDeadlineMap);
          this.haveGetDeadline = true;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getTodayFinishWorkData() {
      const [start, end] = this.range.day;
      workFinishList({ start, end }).then(
        (res) => {
          const finishMap = [];
          if (!res.err) {
            if (res.data.list[0]) {
              res.data.list.forEach((item) => {
                finishMap.push(item);
              });
            }
          }
          this.dayFinishMap = finishMap.sort((a, b) => {
            const a1 = new Date(a["finish_date"]).getTime();
            const b1 = new Date(b["finish_date"]).getTime();
            return a1 - b1;
          });
          this.haveGetFinish = true;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    workCancelAndDelete(id) {
      workDelete({ id }).then(
        (res) => {
          if (!res.err) {
            this.$emit("updateWorkData");
            this.$notify({
              title: "成功",
              message: "已成功删除该待办事项",
              type: "success",
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    workFinish(id) {
      workEditFinish({ id }).then(
        (res) => {
          if (!res.err) {
            this.$emit("updateWorkData");
            console.log(1);
            this.$notify({
              title: "成功",
              message: "待办事项已完成啦~",
              type: "success",
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    deleteWorkItem: function (id) {
      this.workCancelAndDelete(id);
    },
    finishWorkItem: function (id) {
      this.workFinish(id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../CSS/base.scss";
.one-week-todo {
  width: 100%;
  //border: #f8a5c2 1px solid;
  padding: 15px 10px;
  .el-timeline {
    //border: #f8a5c2 1px solid;
    .el-timeline-item {
      //border: #f8a5c2 1px solid;
      span {
        font-size: 14px;
        font-weight: bold;
        color: $gray-10;
      }
      .item-icon {
        //border: #f8a5c2 1px solid;
        padding-right: 10px;
      }
      span.item-title-delete {
        text-decoration: line-through;
        color: $gray-7;
      }
    }
  }
  .create-todo {
    padding-bottom: 20px;
  }
}
</style>
