<template>
  <div class="create-new-label">
    <span class="add-Label-container" @click="openSelectCard">
      <span class="add-icon">➕ </span><span> {{ title }}</span>
    </span>
    <el-dialog :title="form.title" :visible.sync="dialogFormVisible">
      <AddPunch
        v-if="type === 'daily'"
        :selectDateObj="selectDateObj"
        @cancelAddPunch="dialogFormVisible = false"
        @updatePunchData="$emit('updatePunchData')"
        :tipClearFormData="tipClearFormData"
      ></AddPunch>
      <AddWork
        v-if="type === 'work'"
        :selectDateObj="selectDateObj"
        @cancelAddWork="dialogFormVisible = false"
        @updateWorkData="$emit('updateWorkData')"
        :tipClearFormData="tipClearFormData"
      ></AddWork>
    </el-dialog>
  </div>
</template>

<script>
import AddPunch from "@/components/addPunchAndTodo/AddPunch.vue";
import AddWork from "@/components/addPunchAndTodo/AddWork.vue";

export default {
  name: "CreateNewLabel",
  components: { AddWork, AddPunch },
  props: {
    selectDateObj: {
      type: Object,
    },
    title: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        title: "",
      },
      formLabelWidth: "100px",
      tipClearFormData: 1,
    };
  },
  created() {
    if (this.type === "daily") {
      this.form.title = "新增打卡";
    } else if (this.type === "work") {
      this.form.title = "新增代办事项";
    }
  },
  computed: {
    defaultTime() {
      return this.selectDateObj.date + " 12:00:00";
    },
  },
  methods: {
    openSelectCard() {
      this.dialogFormVisible = true;
      // this.initData();
      this.tipClearFormData += 1;
    },
    tabOnClick() {
      this.form.label = null;
      // console.log(this.form.pid);
      // console.log(this.form.label);
    },
    labelOnClick() {
      // console.log(this.form.pid);
      // console.log(this.form.label);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.create-new-label {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 15px;
  //border: #f8a5c2 1px solid;
  .add-Label-container {
    border: $color-primary5 1px solid;
    border-radius: 5px;
    font-size: 14px;
    padding: 3px 8px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    transition: all 0.3s;
    .add-icon {
      font-size: 10px;
      padding-right: 3px;
    }
    &:hover {
      cursor: pointer;
      background-color: #13557810;
    }
  }
  .el-dialog__wrapper {
    padding: 0 20%;
    .el-dialog {
    }
  }
}
</style>
