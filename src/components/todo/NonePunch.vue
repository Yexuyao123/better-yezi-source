<template>
  <div class="none-punch flex-center">
    <div class="none-punch-contain">
      <span>{{ msg }}</span>
      <CreateNewLabel
        v-if="
          (dateStatus !== 'future' && type === 'daily') ||
          (dateStatus !== 'pass' && type === 'work')
        "
        :title="title"
        :selectDateObj="selectDateObj"
        :type="type"
        @updatePunchData="$emit('updatePunchData')"
        @updateWorkData="$emit('updateWorkData')"
      ></CreateNewLabel>
    </div>
  </div>
</template>

<script>
import CreateNewLabel from "@/components/addPunchAndTodo/CreateNewLabel.vue";
export default {
  name: "NonePunch",
  components: { CreateNewLabel },
  props: {
    msg: { type: String },
    title: {
      type: String,
    },
    dateStatus: {
      type: String,
    },
    selectDateObj: {
      type: Object,
    },
    type: {
      type: String,
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.none-punch {
  width: 100%;
  height: 200px;
  //border: #f8a5c2 1px solid;
  .none-punch-contain {
    //border: #f8a5c2 1px solid;
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      font-size: 15px;
      //border: #f8a5c2 1px solid;
    }
  }
}
</style>
