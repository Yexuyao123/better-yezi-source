<template>
  <div class="change-work">
    <el-form :model="form">
      <!--  限时时间 -->
      <el-form-item label="最迟完成时间" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.selectTime"
          type="datetime"
          placeholder="选择日期时间"
          default-time="12:00:00"
          :default-value="defaultTime"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelChangeWork">取 消</el-button>
      <el-button
        :disabled="!form.selectTime"
        type="primary"
        @click="commitFormData"
        >提 交</el-button
      >
    </div>
  </div>
</template>

<script>
import { workEditDeadline } from "@/api/todo.js";
import { translateTime } from "@/helpers/until.js";
import * as dayjs from "dayjs";

export default {
  name: "AddWorkDeadline",
  components: {},
  props: {
    tipClearFormData: {
      type: Number,
    },
    id: {
      type: Number,
    },
    msg: {
      type: String,
    },
  },
  data() {
    return {
      form: {
        selectTime: "",
      },
      formLabelWidth: "100px",
    };
  },
  created() {
    this.init();
  },
  watch: {
    tipClearFormData: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.init();
        }
      },
    },
  },
  computed: {
    defaultTime() {
      return dayjs(new Date().getTime())
        .add(5, "minute")
        .format("YYYY-MM-DD HH:mm:ss");
    },
  },
  methods: {
    init() {
      this.form.selectTime = "";
    },
    cancelChangeWork() {
      this.$emit("cancelChangeWork");
    },
    commitFormData() {
      this.$emit("cancelChangeWork");
      console.log(this.form);
      //需要{  id, deadline_date  }
      if (this.form.selectTime) {
        const deadlineDate = translateTime(this.form.selectTime)["date-1"];
        console.log(deadlineDate);
        this.changeDeadlineWork(this.id, deadlineDate);
      }
    },
    changeDeadlineWork(id, deadline_date) {
      workEditDeadline({ id, deadline_date }).then(
        (res) => {
          console.log(res);
          if (res.err === 0) {
            //todo:待改重新请求更新workList
            this.$emit("updateWorkData");
            this.$notify({
              title: "成功",
              message: this.msg,
              type: "success",
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.change-work {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  //border: #f8a5c2 1px solid;
  .el-form {
    width: 90%;
  }
  .dialog-footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 30px;
  }
}
</style>
