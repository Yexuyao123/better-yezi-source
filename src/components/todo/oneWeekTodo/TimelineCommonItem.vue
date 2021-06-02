<template>
  <div class="timeline-common" v-if="haveInitData">
    <el-timeline-item placement="top">
      <el-card class="title-card">
        <h4 class="common-contain">
          <span class="item-icon">🍋</span>
          <span>不限时待办事项</span>
        </h4>
      </el-card>
    </el-timeline-item>
    <el-timeline-item
      v-for="(item, index) in commonTodo"
      :key="'' + index + item.id + item.content"
      :timestamp="item.timestamp"
      placement="top"
    >
      <el-card>
        <h4>
          <span class="item-icon">🍋</span> <span>{{ item.content }}</span>
        </h4>
        <div class="item-detail">
          <p class="item-detail-deadline">
            <span class="item-icon">💡</span>
            <span>类型：普通待办</span>
          </p>
          <p class="item-detail-status">
            <span class="item-deadline">
              <el-button
                type="danger"
                icon="el-icon-alarm-clock"
                circle
                size="mini"
                @click="addDeadlineDate"
                title="加急"
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
  </div>
</template>

<script>
import * as dayjs from "dayjs";
import AddWorkDeadline from "@/components/addPunchAndTodo/AddWorkDeadline.vue";

export default {
  name: "TimelineCommon",
  components: { AddWorkDeadline },
  props: {
    totalCommonWorkList: {
      //紧急待办
      type: Array,
    },
  },
  data() {
    return {
      haveInitData: false,
      dialogFormVisible: false,
      form: {
        title: "升级限时待办",
        msg: "已成功升级为紧急待办事项！",
      },
      commonTodo: [],
    };
  },
  created() {
    this.initCommonTodo();
  },
  watch: {
    totalCommonWorkList: {
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
      this.commonTodo = this.totalCommonWorkList[0]
        ? this.fn(this.totalCommonWorkList, "deadline_time")
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
.timeline-common {
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
.timeline-common {
  width: 100%;
  .el-timeline-item {
    //border: #f8a5c2 1px solid;
    .title-card {
      background-color: #e4e5e620 !important;
    }
    .el-card {
      background-color: #ffffff;
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
        .item-detail {
          font-size: 14px;
          width: 100%;
          display: grid;
          grid-template-columns: 60% 40%;
          p.item-detail-deadline {
            span {
              padding-right: 15px;
            }
            .item-icon {
              //border: #f8a5c2 1px solid;
              padding-right: 2px;
              display: inline-block;
              margin-right: 5px;
              width: 30px;
            }
          }
          p.item-detail-status {
            //border: #f8a5c2 1px solid;
            text-align: end;
            span {
              padding-left: 15px;
            }
          }
        }
      }
      .common-contain {
        padding-bottom: 0 !important;
      }
    }

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
