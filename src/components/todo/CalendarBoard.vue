<template>
  <div class="calendar-board">
    <el-calendar v-model="selectDate" :first-day-of-week="7">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template
        slot="dateCell"
        slot-scope="{ date, data }"
        v-if="haveGetWorkData"
      >
        <div
          class="date-container"
          :class="data.isSelected ? 'is-selected' : ''"
        >
          <el-popover
            class="el-popover-span"
            placement="right"
            width="200"
            trigger="hover"
            title="✔ 📋 记录"
            :visible-arrow="false"
            :open-delay="100"
          >
            <!-- hover面板-->
            <div class="el-popover-board">
              <!--  打卡记录部分 -->
              <div
                class="popover-board-punch"
                v-for="item in monthPunchMap[data.day]"
                :key="item.id + item['updated']"
              >
                <p
                  v-if="
                    monthPunchMap[data.day] &&
                    item['label_type'] === 'count' &&
                    item['content'] !== 0
                  "
                >
                  <span
                    class="item-color-icon"
                    :style="{ 'background-color': `${item['label_color']}` }"
                  ></span>
                  <span class="item-icon">{{ item["label_icon"] }}</span>
                  <span>{{ item["label_name"] }}</span>
                  <span>{{ item["content"] }}</span>
                  <span>{{ item["label_unit"] }}</span>
                </p>
                <p
                  v-else-if="
                    monthPunchMap[data.day] && item['label_type'] === 'check'
                  "
                >
                  <span
                    class="item-color-icon"
                    :style="{ 'background-color': `${item['label_color']}` }"
                  ></span>
                  <span class="item-icon">{{ item["label_icon"] }}</span>
                  <span>{{ item["label_name"] }}</span>
                  <span v-if="item['content'] === 1">✔️</span>
                  <span v-if="item['content'] === 0">❌</span>
                </p>
              </div>
              <template v-if="!monthPunchMap[data.day]">
                <div>
                  <P>暂时没有打卡记录呦！</P>
                </div>
              </template>
              <!--  代办事项部分 -->
              <div
                class="popover-board-work"
                v-for="item in monthTodoWorkMap[data.day]"
                :key="item.content + item.id"
              >
                <p v-if="monthTodoWorkMap[data.day] && item['content'] !== ''">
                  <span v-if="item['deadline']" class="item-icon"> 🍓 </span>
                  <span v-if="!item['deadline']" class="item-icon"> 🍋 </span>
                  <span class="ellipsis-2">{{ item["content"] }}</span>
                </p>
              </div>
            </div>
            <!--   日历卡板简单图标展示-->
            <div slot="reference">
              <div class="date-title">
                <span>{{ data.day.split("-").slice(1).join("-") }}</span>
                <span v-if="data.isSelected">{{
                  data.isSelected ? "😉" : ""
                }}</span>
                <span>{{ monthPunchMap[data.day] ? "✔" : "" }}</span>
              </div>
              <div class="todo-icon-list">
                <span class="todo-icon-punch" v-if="monthPunchMap[data.day]">
                  <span
                    v-for="item in monthPunchMap[data.day]"
                    :key="item.id + item['updated']"
                    >{{
                      item["label_type"] === "count" && item["content"] === 0
                        ? ""
                        : item["label_icon"]
                    }}</span
                  >
                </span>
                <span class="todo-icon-Work" v-if="monthTodoWorkMap[data.day]">
                  <span
                    v-for="item in monthTodoWorkMap[data.day]"
                    :key="item.id + item.content"
                    >{{ item["deadline"] ? "🍓" : "🍋" }}</span
                  >
                </span>
              </div>
            </div>
          </el-popover>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: "CalendarBoard",
  props: {
    monthPunchMap: { type: Object },
    monthTodoWorkMap: {
      type: Object,
    },
    haveGetWorkData: { type: Boolean },
  },
  components: {},
  data() {
    return {
      selectDate: new Date(), //当前的active的时间
    };
  },
  created() {
    //初始化时间
    this.$emit("changeDate", this.selectDate);
  },
  watch: {
    selectDate(val) {
      // console.log(val);
      this.$emit("changeDate", val);
    },
  },
  methods: {
    // SelectDay(date, data) {
    //   //点击的日子的时间
    //   console.log(date);
    //   //返回对象day是点击的时间，isSelected是点击的时间是否是当前时间
    //   console.log(data);
    // },
  },
};
</script>

<style lang="scss">
@import "../../CSS/base.scss";
.calendar-board {
  tr,
  th,
  td {
    display: inline-block;
  }
  thead,
  tbody {
    display: block;
  }

  div .el-calendar__title {
    //标题颜色
    color: $gray-9 !important;
    font-weight: bold;
  }
  .el-calendar__button-group {
    //head里的button
    background-color: #0d295a00 !important;
    .el-button {
      transition: all 0.3s;
      border: $gray-7 1px solid;
      background-color: #0d295a00 !important;
      span {
        color: $gray-9;
        font-weight: bold;
      }
      &:hover {
        background-color: #00416a30 !important;
        //background-color: $color-10 !important;
        span {
          //color: $fontColorCommon;
          color: $gray-4;
        }
      }
    }
  }
  .el-calendar {
    .el-calendar__header {
      border-bottom: #2a6885 2px solid;
    }
    .el-calendar__body {
      //border: #f8a5c2 1px solid;
      padding: 15px 10px 15px;
      flex: 1;
      height: calc(100% - 100px);
      .el-calendar-table {
        border: inherit 1px solid;
        height: 100%;
        display: flex;
        flex-direction: column;
        thead {
          //border: #f8a5c2 1px solid;
          display: flex;
          justify-content: space-around;
          th {
            color: $gray-9 !important;
            font-weight: bold;
          }
        }
        tbody {
          border: #e4e5e630 1px solid;
          flex: 1;
          display: flex;
          flex-direction: column;
          tr,
          tr .el-calendar-table__row {
            //border: #f8a5c2 1px solid;
            width: 100%;
            flex: 1;
            display: flex;
            td {
              //日期单元格
              border: #e4e5e630 1px solid;
              height: 100%;
              flex: 1;
              div {
                height: 100%;
                transition: all 0.1s;
                padding: 0;
                &:hover {
                  background-color: #ffffff40;
                  color: $color-primary1;
                  div.date-title {
                    background-color: #f8a5c200;
                  }
                  div.todo-icon-list {
                    background-color: #f8a5c200;
                  }
                }
                div.date-container {
                  background-color: #f8a5c200;
                  padding: 10px;
                  //display: flex;
                  //flex-direction: column;
                  span.el-popover-span {
                    display: inline-block;
                    //border: #f8a5c2 1px solid;
                    height: 100%;
                    width: 100%;
                    span.el-popover__reference-wrapper {
                      display: inline-block;
                      height: 100%;
                      width: 100%;
                      //border: #f8a5c2 1px solid;
                      div.el-popover__reference {
                        height: 100%;
                        width: 100%;
                        //border: #f8a5c2 1px solid;
                        &:hover {
                          background-color: #2c3e5000;
                        }
                        div.date-title {
                          background-color: #f8a5c200;
                          height: 24px;
                          text-align: center;
                          line-height: 24px;
                          span {
                            //border: #f8a5c2 1px solid;
                            padding: 0 5px;
                          }
                        }
                        div.todo-icon-list {
                          background-color: #f8a5c200;
                          height: calc(100% - 24px);
                          overflow-y: auto;
                          display: flex;
                          flex-direction: column;
                          span.todo-icon-punch {
                            background-color: #f8a5c200;
                            width: 100%;
                            padding-bottom: 10px;
                            height: auto;
                            span {
                              padding: 2px 0;
                              border: #f8a5c200 1px solid;
                            }
                          }
                          span.todo-icon-Work {
                            background-color: #f8a5c200;
                            width: 100%;
                            span {
                              padding: 2px 0;
                              border: #f8a5c200 1px solid;
                            }
                          }
                        }
                        div.todo-icon-list::-webkit-scrollbar {
                          //隐藏滚动条
                          display: none;
                        }
                      }
                    }
                  }
                }
              }
            }
            td.current {
              color: $gray-9;
              div .el-calendar-day {
              }
            }
            td.prev {
              color: $gray-6;
              div .el-calendar-day {
                //底下是插槽内的dom
                div {
                  //内容文字
                }
              }
            }
            td.next {
              color: $gray-6;
              div .el-calendar-day {
                //底下是插槽内的dom
                div {
                  //内容文字
                }
              }
            }
            td.is-selected {
              color: $fontColorCommon;
              font-weight: bold;
              height: 100%;
              width: 100%;
              background-color: #ffffff90 !important;
              //border: #f8a5c2 1px solid;
              div .el-calendar-day {
                div .is-selected {
                  //border: #f8a5c2 1px solid;
                }
              }
            }
          }
        }
      }
    }
  }
}

div.el-popover {
  //border: #f8a5c2 1px solid;
  background-color: #ffffff !important;
  .el-popover__title {
    font-size: 15px;
    font-weight: bold;
  }
  .el-popover-board {
    //border: #f8a5c2 1px solid;
    .popover-board-punch {
      //border: #f8a5c2 1px solid;
      p {
        padding: 3px 0;
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
          font-size: 14px;
          line-height: 16px;
        }
      }
    }
    .popover-board-work {
      //border: #f8a5c2 1px solid;
      p {
        //border: #f8a5c2 1px solid;
        padding: 8px 0 3px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        //border: #f8a5c200 1px solid;
        span {
          //border: #f8a5c2 1px solid;
          padding-right: 3px;
          font-size: 14px;
          line-height: 16px;
        }
        .item-icon {
          padding: 0 5px;
        }
      }
    }
  }
}

.el-calendar-table td.is-selected {
  background-color: #ffffff !important;
}
</style>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.calendar-board {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .el-calendar {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #e4e5e600;
  }
}
</style>
