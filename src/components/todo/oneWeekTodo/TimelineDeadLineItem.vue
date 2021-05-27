<template>
  <div
    class="timeline-deadline"
    v-if="
      dateStatus !== 'pass' &&
      haveInitData &&
      (timeoutTodo[0] || deadlineTodo[0])
    "
  >
    <el-timeline-item placement="top">
      <el-card class="title-card">
        <h4 class="common-contain">
          <span class="item-icon">🍓</span>
          <span>限时待办事项</span>
        </h4>
      </el-card>
    </el-timeline-item>
    <el-timeline-item
      v-for="(item, index) in timeoutTodo"
      :key="'' + index + item.deadline_date"
      :timestamp="item.timestamp"
      placement="top"
    >
      <el-card class="timeout-card">
        <h4>
          <span class="item-icon">🍓</span> <span>{{ item.content }}</span>
        </h4>
        <p>
          <span class="item-icon">💡</span>
          <span>类型：限时待办</span>
        </p>
        <div class="item-detail">
          <p class="item-detail-deadline">
            <span class="item-icon">🚩</span>
            <span>最迟完成时间 {{ item.timestamp }} 💢 已经超时啦！</span>
          </p>
          <p class="item-detail-status">
            <span class="item-finish">
              <el-button
                type="warning"
                icon="el-icon-mouse"
                circle
                size="mini"
                @click="addDeadlineDate"
                title="推迟"
              ></el-button>
            </span>
            <span class="item-finish">
              <el-button
                type="success"
                icon="el-icon-check"
                circle
                size="mini"
                @click="$emit('finishWork', item.id)"
                title="完成"
              ></el-button>
            </span>
            <span class="item-delete">
              <el-button
                type="info"
                icon="el-icon-delete"
                circle
                size="mini"
                @click="$emit('deleteWork', item.id)"
                title="删除"
              ></el-button>
            </span>
          </p>
        </div>
      </el-card>
      <el-dialog :title="form.title" :visible.sync="dialogFormVisible">
        <AddWorkDeadline
          @cancelChangeWork="cancelChangeWork"
          :id="item.id"
          :msg="form.msg"
          @updateWorkData="$emit('updateWorkData')"
        ></AddWorkDeadline>
      </el-dialog>
    </el-timeline-item>

    <el-timeline-item
      v-for="(item, index) in deadlineTodo"
      :key="'' + index + item.deadline_date"
      :timestamp="item.timestamp"
      placement="top"
    >
      <el-card>
        <h4>
          <span class="item-icon">🍓</span> <span>{{ item.content }}</span>
        </h4>
        <p>
          <span class="item-icon">💡</span>
          <span>类型：限时待办</span>
        </p>
        <div class="item-detail">
          <p class="item-detail-deadline">
            <span class="item-icon">🚩</span>
            <span>最迟完成时间 {{ item.timestamp }}</span>
          </p>
          <p class="item-detail-status">
            <span class="item-finish">
              <el-button
                type="success"
                icon="el-icon-check"
                circle
                size="mini"
                @click="$emit('finishWork', item.id)"
                title="完成"
              ></el-button>
            </span>
            <span class="item-delete">
              <el-button
                type="info"
                icon="el-icon-delete"
                circle
                size="mini"
                @click="$emit('deleteWork', item.id)"
                title="删除"
              ></el-button>
            </span>
          </p>
        </div>
      </el-card>
    </el-timeline-item>
  </div>
</template>

<script>
import * as dayjs from "dayjs";
import AddWorkDeadline from "@/components/addPunchAndTodo/AddWorkDeadline.vue";

export default {
  name: "TimelineDeadline",
  components: { AddWorkDeadline },
  props: {
    weekDeadlineMap: {
      //紧急待办
      type: Array,
    },
    timeoutMap: {
      //超时待办
      type: Array,
    },
    dateStatus: {
      type: String,
    },
  },
  data() {
    return {
      haveInitData: false,
      deadlineTodo: [],
      timeoutTodo: [],
      dialogFormVisible: false,
      form: {
        title: "推迟限时待办",
        msg: "已成功推迟限时待办事项！",
      },
    };
  },
  created() {
    this.haveInitData = false;
    this.initAllData();
  },
  watch: {
    weekDeadlineMap: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.haveInitData = false;
          this.initAllData();
        }
      },
      deep: true,
    },
    timeoutMap: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.haveInitData = false;
          this.initAllData();
        }
      },
      deep: true,
    },
  },
  computed: {},
  methods: {
    initDeadlineTodo() {
      this.deadlineTodo = this.fn(this.weekDeadlineMap, "deadline_time");
    },
    initTimeoutTodo() {
      this.timeoutTodo = this.fn(this.timeoutMap, "deadline_time");
    },
    fn(arr, key) {
      return arr.map((item) => {
        const { content, id } = item;
        return {
          content,
          timestamp: dayjs(item[key]).format("YYYY-MM-DD HH:MM"),
          createTime: dayjs(item["created"]).format("YYYY-MM-DD HH:MM"),
          id,
        };
      });
    },
    initAllData() {
      this.initDeadlineTodo();
      this.initTimeoutTodo();
      this.haveInitData = true;
    },
    addDeadlineDate() {
      this.dialogFormVisible = true;
    },
    cancelChangeWork() {
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style lang="scss">
@import "../../../CSS/base.scss";
.timeline-deadline {
  div.el-card__body {
    padding: 15px !important;
  }
  .el-timeline-item {
    .el-timeline-item__wrapper {
      .el-timeline-item__timestamp {
        color: $gray-10;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@import "../../../CSS/base.scss";
.timeline-deadline {
  width: 100%;
  .el-timeline-item {
    //border: #f8a5c2 1px solid;
    .title-card {
      background-color: #e4e5e620 !important;
    }
    .el-card {
      background-color: $gray-1;
      div.el-card__body {
        h4 {
          padding-bottom: 6px;
          //border: #f8a5c2 1px solid;
          span {
            font-size: 14px;
            font-weight: bold;
            color: $gray-10;
          }
          .item-icon {
            //border: #f8a5c2 1px solid;
            padding-right: 2px;
            display: inline-block;
            width: 30px;
            margin-right: 5px;
          }
        }
        .common-contain {
          padding-bottom: 0;
        }
        p {
          font-size: 14px;
          padding-bottom: 6px;
          .item-icon {
            //border: #f8a5c2 1px solid;
            padding-right: 2px;
            display: inline-block;
            margin-right: 5px;
            width: 30px;
          }
        }
        .item-detail {
          font-size: 14px;
          width: 100%;
          display: grid;
          grid-template-columns: 60% 40%;
          p.item-detail-deadline {
            span {
              padding-right: 10px;
            }
            .item-icon {
              //border: #f8a5c2 1px solid;
              padding-right: 2px;
              display: inline-block;
              width: 30px;
              margin-right: 5px;
            }
          }
          p.item-detail-status {
            //border: #f8a5c2 1px solid;
            text-align: end;
            span {
              padding-left: 15px;
            }
            .item-icon {
              //border: #f8a5c2 1px solid;
              padding-right: 2px;
              display: inline-block;
              margin-right: 5px;
              width: 30px;
            }
          }
        }
      }
    }
    &:hover {
      cursor: pointer;
    }
    .timeout-card {
      position: relative;
      &::after {
        content: "超 时";
        position: absolute;
        top: 30%;
        right: 30%;
        font-size: 24px;
        font-weight: bold;
        box-sizing: border-box;
        padding: 1px 22px;
        text-align: center;
        color: #ff4d4f;
        display: block;
        border-radius: 5px;
        transform: rotate(-22deg);
        border: #ff4d4f 4px solid;
      }
    }
  }
}
</style>
