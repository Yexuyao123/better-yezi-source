<template>
  <div class="month-count-chart">
    <div id="countChart" class="count-chart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import eChartColor from "@/CSS/echart.json";
import * as dayjs from "dayjs";

export default {
  name: "MonthCountChart",
  components: {},
  props: {
    monthData: { type: Object },
    totalCountObject: { type: Object },
  },
  data() {
    return {
      color: null,
      xName: [],
      yData: null,
      sData: null,
      myChart: null,
      monthCountObject: null,
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
    this.monthCountObject = JSON.parse(JSON.stringify(this.totalCountObject));
    for (
      let date = this.monthData.startDate;
      date !== this.monthData.endDate;
      date = dayjs(date).add(1, "day").format("YYYY-MM-DD")
    ) {
      this.xName.push(date);
    }
    this.yData = this.getYData();
    this.sData = this.getSeriesData();
    //多轴颜色
    this.color = [
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
    ];
  },
  mounted() {
    echarts.registerTheme("myChartColor", eChartColor);
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(
      document.getElementById("countChart"),
      "myChartColor"
    );
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.options);
    this.myChart = myChart;
  },
  computed: {
    options() {
      const xData = this.xName;
      const yData = this.yData;
      const sData = this.sData;
      const unitObject = this.unitObject;

      return {
        color: this.color,
        tooltip: {
          trigger: "axis",
          backgroundColor: "#e4e5e690",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
            },
            shadowStyle: {
              color: "#9aa7ab10",
              shadowBlur: 3,
            },
            animationDuration: 1000,
            animationDelay: function (idx) {
              // 越往后的数据延迟越大
              return idx * 100;
            },
          },
          transitionDuration: 2,
          position: function (point) {
            return [point[0], "8%"];
          },
          formatter: function (value) {
            const time = value[0].axisValue;
            let arr = "";
            value.forEach((item) => {
              if (item.data !== 0) {
                arr =
                  arr +
                  "<br>" +
                  item.seriesName +
                  ":" +
                  item.data +
                  unitObject[item.seriesName].unit;
              }
            });
            return time + arr;
          },
        },
        calculable: true,
        legend: {
          data: yData,
          itemGap: 10,
          textStyle: {
            color: "#e4e5e6",
          },
          selected: false,
        },
        grid: {
          left: "15px",
          top: 35,
          right: "10px",
          bottom: 10,
          width: "auto",
          height: "auto",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          // axisTick: { show: false },
          axisLabel: {
            overflow: "truncate",
            interval: "0",
            width: 28,
            formatter: function (value) {
              return value.slice(-5);
            },
            textStyle: {
              color: "#1f1f1f",
              fontSize: "9px",
              padding: 0,
              // fontWeight: "bold",
            },
          },
          axisTick: {
            alignWithLabel: true,
          },
          data: xData,
        },
        yAxis: [
          {
            type: "value",
            name: "计数",
            axisTick: { show: true },
            position: "left",
            offset: 45,
            nameTextStyle: {
              color: "#1f1f1f",
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#1f1f1f",
              },
            },
            axisLabel: {
              formatter: "{value}个",
              textStyle: {
                color: "#1f1f1f",
                fontSize: "10px",
                // fontWeight: "bold",
              },
            },
            // splitNumber: 5,//分段
          },
          {
            type: "value",
            name: "计数",
            axisTick: { show: true },
            position: "left",
            offset: 0,
            nameTextStyle: {
              color: "#1f1f1f",
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#1f1f1f",
              },
            },
            axisLabel: {
              formatter: "{value}次/杯",
              textStyle: {
                color: "#1f1f1f",
                fontSize: "10px",
                // fontWeight: "bold",
              },
            },
            splitNumber: 4,
            // splitNumber: 5,//分段
          },
          {
            type: "value",
            name: "计时",
            axisTick: { show: true },
            position: "right",
            offset: 0,
            nameTextStyle: {
              color: "#1f1f1f",
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#1f1f1f",
              },
            },
            axisLabel: {
              formatter: "{value}分钟",
              textStyle: {
                color: "#1f1f1f",
                fontSize: "10px",
                // fontWeight: "bold",
              },
            },
            // splitNumber: 5,//分段
          },
        ],
        series: sData,
      };
    },
  },
  methods: {
    getSeriesData() {
      const seriesArr = [];
      const labelList = Object.keys(this.monthCountObject);
      // console.log(labelList);
      labelList.forEach((name) => {
        let yType = 0;
        if (this.unitObject[name].type === "count") yType = 1;
        if (this.unitObject[name].type === "unit") yType = 0;
        if (this.unitObject[name].type === "time") yType = 2;
        const dateObj = {
          name,
          type: "line",
          emphasis: {
            focus: "series",
          },
          yAxisIndex: yType,
        };
        const dataList = [];
        this.xName.forEach((date, i) => {
          let state = 0;
          this.monthCountObject[name].dataList.forEach((arr, step) => {
            if (arr[0] === date) {
              dataList.push(arr[1]);
              state = 1;
            }
            if (step + 1 === this.monthCountObject[name].dataList.length) {
              if (state === 0) {
                dataList.push(0);
              }
              if (i + 1 === this.xName.length) {
                dateObj.data = dataList;
                seriesArr.push(dateObj);
              }
            }
          });
        });
      });
      return seriesArr;
    },
    getYData() {
      const YArr = [];
      const labelList = Object.keys(this.monthCountObject);
      labelList.forEach((name, index) => {
        YArr.push(name);
        if (index + 1 === labelList.length) {
          return YArr;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../CSS/base.scss";
.month-count-chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .count-chart {
    //border: #f8a5c2 1px solid;
    //width: 1250px;
    //height: 350px;
    width: 94%;
    height: 88%;
    overflow: hidden;
  }
}
</style>
