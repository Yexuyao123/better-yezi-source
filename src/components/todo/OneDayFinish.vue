<template>
  <div class="one-day-finish">
    <div class="one-day-date-title">
      <div class="date-title">
        <span>当前日期：</span>
        <span
          >{{ selectDateObj.year }} 年 {{ selectDateObj.month }} 月
          {{ selectDateObj.day }} 日
        </span>
        <span> {{ selectDateObj.week }}</span>
      </div>
    </div>
    <div class="one-day-total-contain">
      <div class="total-scroll-container">
        <div class="finish-contain-head" v-if="haveGetTabList">
          <ShowClassSelection
            :tabArr="tabArr"
            @selectPid="selectPid"
          ></ShowClassSelection>
        </div>
        <div class="finish-contain-main">
          <div
            class="punch-mark finish-contain"
            v-if="monthPunchMap && showPid !== 3"
          >
            <div class="punch-title title"><span>打卡记录</span></div>
            <div class="none-punch" v-if="!monthPunchMap[selectDateObj.date]">
              <NonePunch
                :msg="!notHappen ? '暂时没有打卡记录呦~' : '还没有打过卡噢~'"
                :title="!notHappen ? ' 补个卡吧' : ' 打个卡吧'"
                :selectDateObj="selectDateObj"
                type="daily"
                @updatePunchData="$emit('updatePunchData')"
                :dateStatus="dateStatus"
              ></NonePunch>
            </div>
            <div class="punch-list" v-if="monthPunchMap[selectDateObj.date]">
              <div
                v-for="(item, index) in monthPunchMap[selectDateObj.date]"
                :key="item.id + item.updated"
              >
                <p
                  v-if="
                    monthPunchMap[selectDateObj.date] &&
                    item.label_type === 'count' &&
                    item.content !== 0 &&
                    (showPid === item['label_pid'] || showPid === 0)
                  "
                >
                  <span
                    :style="{ 'background-color': `${item.label_color}` }"
                    class="item-color-icon"
                  ></span>
                  <span class="item-icon">{{ item.label_icon }}</span>
                  <span>{{ item.label_name }}</span>
                  <span class="item-count-input">
                    <CountInput
                      :content="
                        newMonthPunchObj[selectDateObj.date][index].content
                      "
                      :label="
                        newMonthPunchObj[selectDateObj.date].label_name + '计数'
                      "
                      :unit="item.label_unit"
                      @change="inputContentChange($event, index)"
                      @commitLabel="updateDailyLabelData(index)"
                      @deleteLabel="deleteDailyLabelData(index)"
                    ></CountInput>
                  </span>
                </p>
                <p
                  v-else-if="
                    monthPunchMap[selectDateObj.date] &&
                    item.label_type === 'check' &&
                    [0, item.label_pid].includes(showPid)
                  "
                >
                  <span
                    class="item-color-icon"
                    :style="{ 'background-color': `${item.label_color}` }"
                  ></span>
                  <span class="item-icon">{{ item.label_icon }}</span>
                  <span>{{ item["label_name"] }}</span>
                  <CheckInput
                    :content="
                      newMonthPunchObj[selectDateObj.date][index].content
                    "
                    @check="inputContentChange($event, index)"
                    @commitCheck="updateDailyLabelData(index)"
                    @deleteCheck="deleteDailyLabelData(index)"
                  ></CheckInput>
                </p>
              </div>
              <div class="add-new-label">
                <CreateNewLabel
                  :title="dateStatus === 'pass' ? '补卡' : '打卡'"
                  :selectDateObj="selectDateObj"
                  type="daily"
                  @updatePunchData="$emit('updatePunchData')"
                  @updateWorkData="$emit('updateWorkData')"
                ></CreateNewLabel>
              </div>
            </div>
          </div>
          <div class="todo-mark finish-contain" v-if="[0, 3].includes(showPid)">
            <div class="todo-title title">
              <span>{{
                dateStatus === "pass" ? "完成事项记录" : "未来1周待办事项"
              }}</span>
            </div>
            <div class="todo-list">
              <div
                class="todo-list-container"
                v-if="selectDateStr && haveGetTabList"
              >
                <OneWeekTodo
                  :totalCommonWorkList="totalCommonWorkList"
                  @updateWorkData="updateWorkData"
                  :dateStatus="dateStatus"
                  :selectDateStr="selectDateStr"
                  :selectDateObj="selectDateObj"
                ></OneWeekTodo>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTabList, getLabelList, dailyEdit, dailyDel } from "@/api/todo.js";
import { getCurrentTime } from "@/helpers/until.js";
import NonePunch from "@/components/todo/NonePunch.vue";
import CountInput from "@/components/todo/punchBoard/CountInput.vue";
import CheckInput from "@/components/todo/punchBoard/CheckInput.vue";
import CreateNewLabel from "@/components/addPunchAndTodo/CreateNewLabel.vue";
import OneWeekTodo from "@/components/todo/oneWeekTodo/OneWeekTodo.vue";
import ShowClassSelection from "@/components/todo/oneDayFinish/OneDayShowClassSelection.vue";

export default {
  name: "OneDayFinish",
  components: {
    NonePunch,
    CountInput,
    CheckInput,
    CreateNewLabel,
    OneWeekTodo,
    ShowClassSelection,
  },
  props: {
    selectDateObj: {
      //选择时间的Date时间对象
      type: Object,
    },
    selectDateStr: {
      //选择时间的时间戳
      type: Date,
    },
    monthPunchMap: {
      type: Object,
    },
    monthTodoWorkMap: {
      //30天紧急与非紧急待办事项key为时间value为改天待办事项数组的对象
      type: Object,
    },
    totalCommonWorkList: {
      //全部非紧急待办事项数组
      type: Array,
    },
  },
  data() {
    return {
      haveGetTabList: false,
      tabList: null, //pid
      tabArr: ["全部"],
      notHappen: null,
      dateStatus: null,
      tabLabelObj: {},
      newMonthPunchObj: null,
      newMonthTodoWorkObj: null,
      showPid: 0,
    };
  },
  created() {
    this.showPid = 0;
    this.getTabArr();
    this.initOperation();
  },
  watch: {
    selectDateObj: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          //todo:时间变化
          this.initOperation();
        }
      },
      deep: true,
    },
    monthPunchMap: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.copyMonthPunchMap();
        }
      },
      deep: true,
    },
    monthTodoWorkMap: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.copyMonthWorkMap();
        }
      },
      deep: true,
    },
  },
  computed: {
    activeDay() {
      return (
        this.selectDateObj.year +
        "/" +
        this.selectDateObj.month +
        "/" +
        this.selectDateObj.day
      );
    },
  },
  methods: {
    getTabArr() {
      //获取标签大类：健康、学习等
      getTabList()
        .then(
          (res) => {
            //请求Tab也就是pid=0的label
            this.tabList = res.data;
            this.tabList.forEach((item, index) => {
              this.tabArr.push(item.name + "打卡");
              if (item.id !== 0) this.getTabSonLabel(item.id, item.name, index);
            });
            this.tabArr = this.tabArr.concat(["代办事项"]);
            this.haveGetTabList = true;
          },
          (err) => {
            console.log(err);
          }
        )
        .catch((error) => {
          console.log(error);
        });
    },
    getTabSonLabel(pid, name, index) {
      getLabelList({ pid }).then(
        (res) => {
          this.tabLabelObj[pid] = { name, labelList: {} };
          res.data.forEach((item) => {
            this.tabLabelObj[pid].labelList[item.id] = item;
          });
          if (index === this.tabList.length - 1) this.haveGetLabelList = true;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    selectPid(index) {
      console.log(index);
      this.showPid = index;
    },
    checkIfHappen() {
      const today = getCurrentTime();
      if (this.selectDateObj.year < today.year) {
        //年份小了过去
        this.notHappen = false;
        this.dateStatus = "pass";
      } else if (this.selectDateObj.year > today.year) {
        //年份大了未来
        this.notHappen = true;
        this.dateStatus = "future";
      } else if (this.selectDateObj.month < today.month) {
        // 年份相等比较月份
        this.notHappen = false;
        this.dateStatus = "pass";
      } else if (this.selectDateObj.month > today.month) {
        this.notHappen = true;
        this.dateStatus = "future";
      } else if (this.selectDateObj.day < today.day) {
        this.notHappen = false;
        this.dateStatus = "pass";
      } else if (this.selectDateObj.day > today.day) {
        this.notHappen = true;
        this.dateStatus = "future";
      } else {
        this.notHappen = true;
        this.dateStatus = "today";
      }
    },
    inputContentChange(content, index) {
      this.newMonthPunchObj[this.selectDateObj.date][index][
        "content"
      ] = content;
    },
    updateDailyLabelData(index) {
      const item = this.newMonthPunchObj[this.selectDateObj.date][index];
      console.log(item);
      dailyEdit(item).then(
        (res) => {
          if (res.err === 0) {
            this.$emit("updatePunchData");
            this.$notify({
              title: "成功",
              message: "修改打卡成功啦",
              type: "success",
            });
          }
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    deleteDailyLabelData(index) {
      const item = this.newMonthPunchObj[this.selectDateObj.date][index];
      dailyDel(item).then(
        (res) => {
          if (res.err === 0) {
            this.$emit("updatePunchData");
            this.$notify({
              title: "成功",
              message: "删除打卡成功啦",
              type: "success",
            });
          }
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    copyMonthPunchMap() {
      this.newMonthPunchObj = JSON.parse(JSON.stringify(this.monthPunchMap));
    },
    copyMonthWorkMap() {
      this.newMonthTodoWorkObj = JSON.parse(
        JSON.stringify(this.monthTodoWorkMap)
      );
    },
    initOperation() {
      this.checkIfHappen();
      this.copyMonthPunchMap();
      this.copyMonthWorkMap();
    },
    updateWorkData: function () {
      this.$emit("updateWorkData");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.one-day-finish {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //border: #f8a5c2 1px solid;
  .one-day-date-title {
    //border: #f8a5c2 1px solid;
    border-bottom: $color-primary7 2px solid;
    padding: 28px 0 12px;
    margin-bottom: 10px;
    text-align: start;
    //height: 75px;
    .date-title {
      //border: #f8a5c2 1px solid;
      font-size: 16px;
      color: $gray-9;
      font-weight: bold;
      padding-left: 18px;
    }
  }
  .one-day-total-contain {
    width: 100%;
    padding: 10px;
    //border: #f8a5c2 1px solid;
    flex: 1;
    overflow-y: auto;
    .total-scroll-container {
      width: 100%;
      //border: #f8a5c2 1px solid;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      .finish-contain-head {
        border-bottom: #e4e5e680 1px solid;
        height: 40px;
      }
      .finish-contain-main {
        margin-bottom: 5px;
        //border: #f8a5c2 1px solid;
        .finish-contain {
          //border: #f8a5c2 1px solid;
          margin-bottom: 15px;
          .title {
            border-bottom: #e4e5e660 1px solid;
            padding: 10px 0 5px 5px;
            span {
              font-size: 15px;
              color: $color-primary1;
              font-weight: bold;
            }
          }
          .punch-list {
            div {
              p {
                padding: 12px 0 0 5px;
                margin-bottom: 5px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                border: #f8a5c200 1px solid;
                .item-color-icon {
                  box-sizing: border-box;
                  display: inline-block;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  margin-right: 6px;
                  border: $color-primary2 1px solid;
                }
                .item-icon {
                  padding: 0 5px;
                }
                span {
                  font-size: 15px;
                  line-height: 16px;
                  margin: 0 4px;
                  //border: #f8a5c2 1px solid;
                }
                span.item-count-input {
                  //border: #f8a5c2 1px solid;
                  display: inline-block;
                  padding: 0 8px;
                  //height: 25px;
                  background-color: #00416a00;
                }
              }
            }
            .add-new-label {
              margin-top: 20px;
            }
          }
          .todo-list {
            width: 100%;
            .todo-list-container {
              width: 100%;
              //border: #f8a5c2 1px solid;
            }
          }
        }
      }
    }
  }
  .one-day-total-contain::-webkit-scrollbar {
    //隐藏滚动条
    display: none;
  }
}
</style>
