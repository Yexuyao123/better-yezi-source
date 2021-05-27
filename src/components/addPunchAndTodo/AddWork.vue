<template>
  <div class="add-work">
    <el-form :model="form">
      <!-- 代办内容-->
      <el-form-item label="待办事项" :label-width="formLabelWidth">
        <el-input
          v-model="form.content"
          autocomplete="off"
          placeholder="限时代办请输入“代办事项”+“完成时间点”"
        ></el-input>
      </el-form-item>
      <!--是否限时-->
      <el-form-item label="是否限时" :label-width="formLabelWidth">
        <el-checkbox
          v-model="form.deadline"
          name=""
          :value="form.deadline"
        ></el-checkbox>
      </el-form-item>
      <!--  限时时间 -->
      <el-form-item
        label="最迟完成时间"
        :label-width="formLabelWidth"
        v-if="form.deadline"
      >
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
      <el-button @click="cancelAddWork">取 消</el-button>
      <el-button
        :disabled="!form.content"
        type="primary"
        @click="commitFormData"
        >提 交</el-button
      >
    </div>
  </div>
</template>

<script>
import * as dayjs from "dayjs";
import { workCreat } from "@/api/todo.js";
import { translateTime } from "@/helpers/until.js";

export default {
  name: "AddWork",
  components: {},
  props: {
    selectDateObj: {
      type: Object,
    },
    tipClearFormData: {
      type: Number,
    },
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        content: "",
        deadline: false,
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
      this.form.deadline = false;
      this.form.content = "";
    },
    cancelAddWork() {
      this.$emit("cancelAddWork");
    },
    commitFormData() {
      this.$emit("cancelAddWork");
      // console.log(this.form);
      //需要{ deadline, content, deadline_date = "" }
      if (this.form.deadline) {
        const deadline_date = translateTime(this.form.selectTime)["date-1"];
        this.createWork(this.form.deadline, this.form.content, deadline_date);
      } else {
        this.createWork(this.form.deadline, this.form.content);
      }
    },
    createWork(deadline, content, deadline_date) {
      workCreat({ deadline, content, deadline_date }).then(
        (res) => {
          console.log(res);
          if (res.err === 0) {
            this.$emit("updateWorkData");
            this.$notify({
              title: "成功",
              message: "已添加待办事项~",
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
.add-work {
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
