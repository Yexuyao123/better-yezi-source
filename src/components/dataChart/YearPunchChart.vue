<template>
  <div class="month-punch-chart">
    <div id="punchChart" class="punch-chart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import eChartColor from "@/CSS/echart.json";

export default {
  name: "MonthPunchChart",
  components: {},
  props: {
    type: { type: String },
    yearData: { type: Object },
    totalPunchObject: { type: Object },
  },
  data() {
    return {
      myChart: null,
      colorBox: [
        [
          "#f6ffed50",
          "#d9f7be",
          "#b7eb8f",
          "#95de64",
          "#73d13d",
          "#52c41a",
          "#389e0d",
          "#237804",
          "#135200",
          "#092b00",
        ],
        ["#f6ffed50", "#237804"],
      ],
      // colorBox: [
      //   [
      //     "#e6f7ff50",
      //     "#bae7ff",
      //     "#91d5ff",
      //     "#69c0ff",
      //     "#40a9ff",
      //     "#1890ff",
      //     "#096dd9",
      //     "#0050b3",
      //     "#003a8c",
      //     "#012a6d",
      //   ],
      //   ["#e6f7ff50", "#0050b3"],
      // ],
    };
  },
  created() {
    // console.log(this.totalPunchObject);
  },
  mounted() {
    // const eChartColorObj = JSON.parse(eChartColor);
    echarts.registerTheme("myChartColor", eChartColor);
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(
      document.getElementById("punchChart"),
      "myChartColor"
    );

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.options);
    this.myChart = myChart;
  },
  computed: {
    title() {
      const t = `${this.yearData.year}年${this.type}打卡`;
      return t.split("").join(" ");
    },
    options() {
      const maxValue = this.getMaxValue();
      return {
        color: this.colorBox,
        visualMap: {
          left: "1%",
          bottom: "15%",
          show: true,
          min: 0,
          max: maxValue,
          textGap: 5,
          itemGap: 5,
          pieces: this.generatePieces(maxValue, this.colorBox),
        },
        title: {
          top: "3%",
          left: "center",
          text: this.title,
          textStyle: {
            fontSize: "16px",
            color: "#1f1f1f",
            fontWeight: "bold",
          },
        },
        calendar: {
          left: "12%",
          bottom: "16%",
          right: "3%",
          top: "26%",
          range: this.yearData.year,
          // cellSize: [30, 30],
          // height: 200,
          splitLine: {
            // 月分割线
            show: true,
            lineStyle: {
              color: "#14141450",
            },
          },
          itemStyle: {
            //格子样式
            color: "#e4e5e610",
            borderColor: "#13557840",
          },
          dayLabel: {
            firstDay: 0,
            color: "#141414",
            fontSize: "14px",
          },
          monthLabel: {
            color: "#141414",
            fontSize: "14px",
          },
          yearLabel: {
            color: "#141414",
            show: false,
          },
        },
        series: {
          type: "heatmap",
          // type: "effectScatter",
          coordinateSystem: "calendar",
          data: this.getCalendarData(),
          emphasis: { focus: "series" },
          progressiveThreshold: 10, //渐进式渲染
        },
        aria: {
          enabled: true,
        },
        tooltip: {
          //鼠标hover
          backgroundColor: "#e4e5e699",
          axisPointer: {
            animation: true,
            animationDuration: 200,
            animationDurationUpdate: 200,
            animationEasing: "cubicInOut",
          },
          animation: true,
          triggerOn: "mousemove",
          transitionDuration: 0.8,
          padding: 4,
          textStyle: {
            fontSize: 13,
          },
          // formatter: "{c}分钟",
        },
        stateAnimation: {
          duration: 500,
          easing: "cubicInOut",
        },
      };
    },
  },
  methods: {
    getCalendarData() {
      return this.totalPunchObject.dataList;
    },
    generatePieces(maxValue, colorBox) {
      const pieces = [];
      let quotient = 1;
      const temp = {};
      temp.gte = 0;
      temp.lte = 0;
      // temp.lt = 1;
      temp.label = `${this.totalPunchObject.unit}`;
      temp.color = colorBox[0][0];
      temp.category = 0;
      pieces.push(temp);
      if (maxValue && maxValue === 1) {
        const temp = {
          gte: 1,
          lte: 1,
          label: "已达成",
          color: colorBox[1][1],
          category: 1,
        };
        pieces.push(temp);
      }
      if (maxValue && maxValue > 1 && maxValue < 10) {
        for (let i = 1; i <= maxValue; i++) {
          const temp = {
            gte: i,
            lte: i,
            color: colorBox[0][i],
            category: i,
          };
          pieces.push(temp);
        }
      }
      if (maxValue && maxValue >= 10) {
        quotient = Math.floor((maxValue + 10) / 9);
        for (let i = 1; i <= 9; i++) {
          const temp = {};
          if (i === 1) {
            temp.gte = 1;
          } else {
            temp.gte = quotient * (i - 1);
          }
          temp.lte = quotient * i;
          temp.color = colorBox[0][i];
          temp.category = 0;
          pieces.push(temp);
        }
      }
      // console.log(pieces);
      return pieces;
    },
    getMaxValue() {
      let max = 0;
      this.totalPunchObject.dataList.forEach((item) => {
        max = item[1] > max ? item[1] : max;
      });
      return max;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.month-punch-chart {
  width: 100%;
  height: 100%;
  padding: 30px 10px 10px;
  .punch-chart {
    width: 100%;
    height: 100%;
    //border: #f8a5c2 1px solid;
  }
}
</style>
