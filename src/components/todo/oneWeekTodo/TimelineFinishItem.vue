<template>
  <div class="timeline-finish" v-if="haveInitData">
    <el-timeline-item placement="top">
      <el-card>
        <h4 class="common-contain">
          <span class="item-icon">✅</span>
          <span>已完成待办事项</span>
        </h4>
      </el-card>
    </el-timeline-item>
    <el-timeline-item
      v-for="(item, index) in finishTodo"
      :key="'' + index + item.id + item.content"
      :timestamp="item.timestamp"
      placement="top"
    >
      <el-card class="mark-icon">
        <h4>
          <span class="item-icon">✅</span>
          <span class="finish-content">{{ item.content }}</span>
        </h4>
        <div class="item-detail"></div>
      </el-card>
    </el-timeline-item>
  </div>
</template>

<script>
import * as dayjs from "dayjs";

export default {
  name: "TimelineFinish",
  components: {},
  props: {
    dayFinishMap: {
      //紧急待办
      type: Array,
    },
  },
  data() {
    return {
      haveInitData: false,
      finishTodo: [],
    };
  },
  created() {
    this.initCommonTodo();
  },
  watch: {
    dayFinishMap: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.initCommonTodo();
        }
      },
      deep: true,
    },
  },
  computed: {},
  methods: {
    initCommonTodo() {
      this.finishTodo = this.dayFinishMap[0]
        ? this.fn(this.dayFinishMap, "finish_time")
        : [];
      this.haveInitData = true;
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
.timeline-finish {
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
.timeline-finish {
  width: 100%;
  .el-timeline-item {
    //border: #f8a5c2 1px solid;
    .el-card {
      background-color: #e4e5e620;
      div.el-card__body {
        h4 {
          //border: #f8a5c2 1px solid;
          span {
            font-size: 14px;
            font-weight: bold;
            color: $gray-10;
          }
          span.finish-content {
            text-decoration: line-through;
          }
          .item-icon {
            //border: #f8a5c2 1px solid;
            padding-right: 2px;
            display: inline-block;
            margin-right: 5px;
            width: 30px;
          }
        }
        .common-contain {
          padding-bottom: 0;
        }
        .item-detail {
          font-size: 14px;
          width: 100%;
          display: grid;
          grid-template-columns: 60% 40%;
          p.item-detail-deadline {
            span {
              padding-right: 15px;
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
    .mark-icon {
      h4 {
        span {
          font-size: 14px;
          font-weight: bold;
          color: $gray-10;
        }
        span.finish-content {
          text-decoration: line-through;
        }
        .item-icon {
          //border: #f8a5c2 1px solid;
          padding-right: 2px;
          display: inline-block;
          margin-right: 5px;
          width: 30px;
        }
      }
      position: relative;
      &::after {
        content: "完成";
        position: absolute;
        top: 14px;
        right: -7px;
        font-size: 14px;
        line-height: 14px;
        box-sizing: border-box;
        padding: 12px 0 22px;
        text-align: center;
        color: $base-green;
        display: block;
        height: 48px;
        width: 48px;
        border-radius: 50%;
        transform: rotate(-45deg);
        border: $base-green 2px solid;
      }
    }
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
