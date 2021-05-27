<template>
  <div class="punch-count-chart">
    <div class="count-list-container" v-if="haveDealData">
      <div
        class="count-item-container"
        v-for="(item, index) in dataObj"
        :key="index + item + index"
      >
        <div class="item-name flex-end">
          <span>{{ item[0] }}</span>
        </div>
        <div class="item-bar flex-center">
          <div class="item-bar-bottom">
            <div
              class="item-bar-top"
              :style="{
                width: `${((dataObj.length - index) / dataObj.length) * 100}%`,
                'background-image': `linear-gradient(to right,#00416a00,${item[1].color})`,
                height: '100%',
              }"
            ></div>
          </div>
        </div>
        <div class="item-content flex-start">
          <span>{{ item[1].count }}{{ item[1].unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "YearPunchCountChart",
  components: {},
  props: {
    yearData: { type: Object },
    yearPunchObject: { type: Object },
  },
  data() {
    return {
      colorBox: [
        "#ff4d4f",
        "#ffa940",
        "#73d13d",
        "#597ef7",
        "#ff7a45",
        "#bae637",
        "#36cfc9",
        "#9254de",
        "#ffc53d",
        "#40a9ff",
        "#f759ab",
        "#ffec3d",
      ],
      dataObj: null,
      maxValue: null,
      haveDealData: false,
      unitObject: {
        不健康饮食: { type: "count", unit: "次" },
        奶茶: { type: "count", unit: "次" },
        护肤: { type: "count", unit: "次" },
        早睡: { type: "count", unit: "次" },
        早起: { type: "count", unit: "次" },
        健身: { type: "time", unit: "分钟" },
        观影: { type: "count", unit: "次" },
        背单词: { type: "unit", unit: "个" },
        写代码: { type: "time", unit: "分钟" },
        算法: { type: "time", unit: "分钟" },
      },
    };
  },
  created() {
    this.getVirtualData();
  },
  mounted() {},
  methods: {
    getVirtualData() {
      const data = [];
      const punchItems = Object.keys(this.yearPunchObject);
      punchItems.forEach((key, step) => {
        let d = 0;
        this.yearPunchObject[key].dataList.forEach((arr, index) => {
          if (arr[1] !== 0) d = d + arr[1];
          if (index + 1 === this.yearPunchObject[key].dataList.length) {
            data.push([
              key,
              {
                count: d,
                unit: this.unitObject[key].unit || "次",
                color: this.colorBox[step],
              },
            ]);
          }
        });
        if (step + 1 === punchItems.length) {
          this.dataObj = data;
          this.getMaxValue();
        }
      });
    },
    getMaxValue() {
      let max = 0;
      this.dataObj.forEach((arr) => {
        max = arr[1].count > max ? arr[1].count : max;
      });
      this.maxValue = max;
      this.dataObj.sort(function (a, b) {
        return b[1].count - a[1].count;
      });
      this.haveDealData = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.punch-count-chart {
  width: 100%;
  height: 100%;
  //padding: 10px;
  //border: #f8a5c2 1px solid;
  .count-list-container {
    width: 100%;
    height: 100%;
    //border: #f8a5c2 1px solid;
    display: flex;
    flex-direction: column;
    .count-item-container {
      flex: 1;
      //border: #f8a5c2 1px solid;
      display: flex;
      .item-name {
        //border: #f8a5c2 1px solid;
        width: 95px;
        font-size: 14px;
        color: $gray-11;
        padding-right: 10px;
        span {
          display: inline-block;
          width: 100%;
          text-align: justify;
          height: 20px;
          line-height: 20px;
          overflow: hidden;
        }
        span::after {
          display: inline-block;
          content: "";
          width: 100%;
        }
      }
      .item-bar {
        //border: #f8a5c2 1px solid;
        flex: 1;
        .item-bar-bottom {
          width: 100%;
          height: 10px;
          //border: #f8a5c2 1px solid;
          border-radius: 0 5px 5px 0;
          background-image: linear-gradient(
            to right,
            #d9d9d900,
            $color-primary2
          );
          .item-bar-top {
            border-radius: 0 5px 5px 0;
          }
        }
      }
      .item-content {
        //border: #f8a5c2 1px solid;
        width: 90px;
        font-size: 14px;
        color: $gray-11;
        padding-left: 10px;
      }
    }
  }
}
</style>
