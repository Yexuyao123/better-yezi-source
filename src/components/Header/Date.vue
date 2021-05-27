<template>
  <div class="date-block">
    <div class="weather-block"></div>
    <div class="time-block">
      <div class="date flex-center">
        <span>{{ timeObj.date }}</span>
      </div>
      <div class="week flex-center">
        <span>{{ timeObj.week }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentTime } from "@/helpers/until.js";

export default {
  name: "DateBlock",
  components: {},
  data() {
    return {};
  },
  computed: {
    timeObj() {
      return getCurrentTime();
    },
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.date-block {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .weather-block {
  }
  .time-block {
    padding: 0 20px;
    display: flex;
    //border: #f8a5c2 1px solid;
    div {
      //border: #f8a5c2 1px solid;
      padding-left: 10px;
      span {
        font-size: 14px;
        line-height: 1;
      }
    }
    div.week {
    }
    div.date {
    }
  }
}
</style>
