<template>
  <div class="add-punch">
    <el-form :model="form" v-if="haveGetLabelList">
      <!--  时间 -->
      <el-form-item label="打卡时间" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.selectTime"
          type="datetime"
          placeholder="选择日期时间"
          default-time="12:00:00"
          :default-value="defaultTime"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="所属类型" :label-width="formLabelWidth">
        <el-select
          v-model="form.pid"
          placeholder="请选择打卡分类"
          @change="tabOnClick"
        >
          <el-option
            :label="tabList[index]['icon'] + ' ' + item.name"
            :value="pid"
            v-for="(item, pid, index) in tabLabelObj"
            :key="item.name + pid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="打卡项目" :label-width="formLabelWidth">
        <el-select
          v-model="form.label"
          placeholder="请选择打卡项目"
          v-if="form.pid"
          @change="labelOnClick"
        >
          <el-option
            :label="item.icon + ' ' + item.name"
            :value="label"
            v-for="(item, label) in tabLabelObj[form.pid].labelList"
            :key="item.name + label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        :label="tabLabelObj[form.pid].labelList[form.label].unit + '数'"
        :label-width="formLabelWidth"
        v-if="
          form.pid &&
          form.label &&
          tabLabelObj[form.pid].labelList[form.label].type === 'count'
        "
      >
        <el-input-number
          size="mini"
          v-model="form.content"
          :min="0"
          :max="500"
          name=""
        ></el-input-number>
      </el-form-item>
      <el-form-item
        label="已完成"
        :label-width="formLabelWidth"
        v-if="
          form.pid &&
          form.label &&
          tabLabelObj[form.pid].labelList[form.label].type === 'check'
        "
      >
        <el-checkbox
          v-model="form.content"
          name=""
          :value="form.content"
        ></el-checkbox>
      </el-form-item>

      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input
          v-model="form.mark"
          autocomplete="off"
          :min="0"
          :max="100"
          placeholder="请输入备注"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelAddPunch">取 消</el-button>
      <el-button
        :disabled="!form.selectTime || !form.pid || !form.label"
        type="primary"
        @click="commitFormData"
        >提 交</el-button
      >
    </div>
  </div>
</template>

<script>
import { dailyCreate, getLabelList, getTabList } from "@/api/todo.js";

export default {
  name: "AddPunch",
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
        selectTime: "",
        pid: null,
        label: null,
        content: 0,
        mark: "",
      },
      formLabelWidth: "100px",
      //pid=0的label
      tabList: null,
      ////pid=0索引出pid=1的label
      tabLabelObj: {},
      haveGetLabelList: false,
    };
  },
  created() {
    this.init();
    this.getTabList();
  },
  watch: {
    tipClearFormData: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.haveGetLabelList = false;
          //表单初始化，请求到的label列表可以继续使用
          this.init();
        }
      },
    },
  },
  computed: {
    defaultTime() {
      return this.selectDateObj.date + " 12:00:00";
    },
  },
  methods: {
    init() {
      this.form.selectTime = "";
      this.form.pid = null;
      this.form.label = null;
      this.form.content = 0;
      this.haveGetLabelList = true;
    },
    cancelAddPunch() {
      this.$emit("cancelAddPunch");
    },
    tabOnClick() {
      this.form.label = null;
    },
    labelOnClick() {},
    commitFormData() {
      this.$emit("cancelAddPunch");
      const date = new Date(this.form.selectTime).getTime();
      this.createPunch(
        date,
        this.form.label,
        this.form.content,
        this.form.mark
      );
    },
    createPunch(date, label, content, mark) {
      dailyCreate({ date, label, content, mark }).then(
        (res) => {
          if (res.err === 0) {
            this.$emit("updatePunchData");
            this.$notify({
              title: "成功",
              message: "提交打卡成功",
              type: "success",
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getTabList() {
      //获取标签大类：健康、学习等
      getTabList().then(
        (res) => {
          //请求Tab也就是pid=0的label
          this.tabList = res.data;
          res.data.forEach((item, index) => {
            if (item.id !== 0) this.getTabSonLabel(item.id, item.name, index);
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
  },
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.add-punch {
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
