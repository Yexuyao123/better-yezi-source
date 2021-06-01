<template>
  <div class="punch-percent-chart">
    <div id="percentChart" class="percent-chart" v-if="haveDealData"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import * as dayjs from "dayjs";
import eChartColor from "@/CSS/echart.json";

export default {
  name: "YearPunchPercentChart",
  components: {},
  props: {
    yearData: { type: Object },
    yearPunchObject: { type: Object },
  },
  data() {
    return {
      // colorBox: ["rgb(73,119,147)", "#00416a", "#e67eb790", "#ff7a4590"],
      colorBox: ["rgb(67,115,145)", "#13c2c2", "#ff7a45", "#9254de"],
      dataObj: null,
      maxValue: null,
      doneValue: null,
      haveDealData: false,
    };
  },
  created() {
    this.getMaxValue();
    this.getDoneValue();
    this.getVirtualData();
  },
  mounted() {
    echarts.registerTheme("myChartColor", eChartColor);
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(
      document.getElementById("percentChart"),
      "myChartColor"
    );

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.options);
    this.myChart = myChart;
  },
  computed: {
    options() {
      const { data, punchItems } = this.dataObj;
      const haveDone = this.doneValue;
      return {
        legend: {
          show: true,
          bottom: "2%",
          left: "0",
          padding: [1, 1, 1, 1],
          data: ["全年", "已打卡", "当前时间", "年底"],
          textStyle: {
            color: "#141414",
            // fontWeight: "bold",
          },
        },
        grid: {
          top: 100,
        },
        angleAxis: {
          //极坐标系圈圈
          type: "category",
          data: punchItems,
          axisTick: {
            inside: true,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: this.colorBox[3],
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#e4e5e6",
              // fontWeight: "bold",
              fontSize: "12px",
            },
          },
          // splitArea: {
          //   //背景
          //   interval: 10,
          //   show: true,
          // },
        },
        radiusAxis: {
          //极坐标系径向
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#1f1f1f",
              // fontWeight: "bold",
            },
            formatter: function (value) {
              if (value < 0 || value > 360) return "";
              // return value + "天";
              return value + " d";
            },
          },
          min: -100,
          max: 360,
          splitNumber: 5,
        },
        tooltip: {
          //hover
          show: true,
          backgroundColor: "#e4e5e690",
          textStyle: { color: "#141414" },
          formatter: function (params) {
            const id = params.dataIndex;
            return (
              punchItems[id] +
              "<br>全年：" +
              data[id][1] +
              "天<br>已打卡：" +
              data[id][2] +
              "天<br>打卡率：" +
              Math.round((data[id][2] / data[id][1]) * 10000) / 100 +
              "%"
            );
          },
        },
        polar: {
          center: ["50%", "46%"],
        },
        series: [
          {
            type: "bar",
            itemStyle: {
              color: this.colorBox[1],
            },
            data: data.map(function (d) {
              return d[2] - d[0];
            }),
            coordinateSystem: "polar",
            name: "已打卡",
            stack: "最小值",
            // barGap: "-100%",
            z: -7,
          },
          {
            type: "bar",
            itemStyle: {
              color: this.colorBox[0],
            },
            data: data.map(function () {
              return haveDone - 1;
            }),
            coordinateSystem: "polar",
            stack: "全年底色",
            // barGap: "-100%",
            // silent: true,
            z: -8,
          },
          {
            type: "bar",
            itemStyle: {
              color: this.colorBox[2],
            },
            data: data.map(function () {
              return haveDone + 2;
            }),
            coordinateSystem: "polar",
            name: "当前时间",
            stack: "均值",
            barGap: "-100%",
            z: -9,
          },
          {
            type: "bar",
            itemStyle: {
              color: this.colorBox[0],
            },
            data: data.map(function (d) {
              return d[1];
              // return d[1] - haveDone - 2;
            }),
            coordinateSystem: "polar",
            name: "全年",
            stack: "最大值",
            // barGap: "-100%",
            z: -10,
          },
          {
            type: "bar",
            itemStyle: {
              color: this.colorBox[3],
            },
            data: data.map(function (d) {
              return d[1] + 1;
              // return d[1] - haveDone - 2;
            }),
            coordinateSystem: "polar",
            name: "年底",
            stack: "最大值",
            // barGap: "-100%",
            z: -11,
          },
        ],
      };
    },
  },
  methods: {
    getVirtualData() {
      const data = [];
      const punchItems = Object.keys(this.yearPunchObject);
      punchItems.forEach((key, step) => {
        let d = 0;
        this.yearPunchObject[key].dataList.forEach((arr, index) => {
          if (arr[1] !== 0) d += 1;
          if (index + 1 === this.yearPunchObject[key].dataList.length) {
            data.push([0, this.maxValue, d]);
          }
        });
        if (step + 1 === punchItems.length) {
          this.dataObj = { data, punchItems };
          this.haveDealData = true;
        }
      });
    },
    getMaxValue() {
      const FebDays = dayjs(this.yearData.year + "-2-1").daysInMonth();
      // console.log(typeof FebDays);
      this.maxValue = FebDays === 29 ? 366 : 365;
    },
    getDoneValue() {
      const start = dayjs(this.yearData.year + "-2-1").startOf("year");
      this.doneValue = dayjs(new Date().getTime()).diff(start, "day", false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.punch-percent-chart {
  width: 100%;
  height: 100%;
  //padding: 10px;
  //border: #f8a5c2 1px solid;
  .percent-chart {
    width: 100%;
    height: 100%;
    //border: #f8a5c2 1px solid;
  }
}
</style>
