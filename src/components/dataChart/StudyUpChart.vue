<template>
  <div class="study-up-chart">
    <CartTitle
      :title="aboutUp.name + '最新大数据'"
      :color="underLineColor"
    ></CartTitle>
    <div id="upChart" class="up-list-chart"></div>
  </div>
</template>

<script>
import { ABOUT_B_UP } from "@/helpers/websiteList.js";
import { apiUpFansList } from "@/api/up-msg.js";
import * as echarts from "echarts";
import eChartColor from "@/CSS/echart.json";
import CartTitle from "@/components/common/CardTitle.vue";

export default {
  name: "StudyUpChart",
  components: { CartTitle },
  props: {
    underLineColor: { type: String },
  },
  data() {
    return {
      aboutUp: ABOUT_B_UP,
      upList: null,
      upCount: Object.keys(ABOUT_B_UP.websiteObj).length,
      archiveArr: null,
      followerArr: null,
      likesArr: null,
      nameArr: null,
      myChart: null,
    };
  },
  created() {
    this.getUpMsg(1, this.upCount);
  },
  mounted() {
    echarts.registerTheme("myChartColor", eChartColor);
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(
      document.getElementById("upChart"),
      "myChartColor"
    );

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.options);
    this.myChart = myChart;
  },
  computed: {
    options() {
      const app = {};
      const posList = [
        "left",
        "right",
        "top",
        "bottom",
        "inside",
        "insideTop",
        "insideLeft",
        "insideRight",
        "insideBottom",
        "insideTopLeft",
        "insideTopRight",
        "insideBottomLeft",
        "insideBottomRight",
      ];
      app.configParameters = {
        rotate: {
          min: -90,
          max: 90,
        },
        align: {
          options: {
            left: "left",
            center: "center",
            right: "right",
          },
        },
        verticalAlign: {
          options: {
            top: "top",
            middle: "middle",
            bottom: "bottom",
          },
        },
        position: {
          options: posList.reduce(function (map, pos) {
            map[pos] = pos;
            return map;
          }, {}),
        },
        distance: {
          min: 0,
          max: 100,
        },
      };
      //配置
      app.config = {
        //柱上文字位置角度
        rotate: 90,
        align: "left",
        verticalAlign: "middle",
        position: "insideBottom",
        distance: 5,
      };
      const labelOption = {
        show: false,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: "{c}  {name|{a}}",
        fontSize: 16,
        rich: {
          name: {},
        },
      };
      //多轴颜色
      const colors = [
        "#ff4d4f",
        "#ffa940",
        "#73d13d",
        "#597ef7",
        "#ff7a45",
        "#ffec3d",
        "#36cfc9",
        "#9254de",
        "#ffc53d",
        "#bae637",
        "#40a9ff",
        "#f759ab",
      ];
      // 指定图表的配置项和数据
      return {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        legend: {
          data: ["粉丝数", "视频累计播放量", "视频累计点赞数"],
        },
        grid: {
          left: "1%",
          top: 40,
          right: "1%",
          bottom: 10,
          width: "auto",
          height: "auto",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            axisLabel: { overflow: "truncate", interval: "0", width: 50 },
            data: this.nameArr,
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "粉丝数",
            position: "left",
            offset: 110,

            axisLine: {
              show: true,
              lineStyle: {
                color: colors[0],
              },
            },
            axisLabel: {
              formatter: "{value} 人",
            },
            splitNumber: 5,
          },
          {
            type: "value",
            name: "视频累计播放量",
            position: "left",
            offset: 0,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[1],
              },
            },
            axisLabel: {
              formatter: "{value} 次",
            },
            splitNumber: 5,
          },
          {
            type: "value",
            name: "视频累计点赞数",
            position: "right",
            offset: 0,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[2],
              },
            },
            axisLabel: {
              formatter: "{value} 次",
            },
            splitNumber: 5,
          },
        ],
        series: [
          {
            name: "粉丝数",
            type: "bar",
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            barWidth: 10,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: colors[0] }, //柱图渐变色
                { offset: 1, color: "#e4e5e6" }, //柱图渐变色
              ]),
              borderRadius: [3, 3, 0, 0],
            },
            data: this.followerArr,
            yAxisIndex: 0,
          },
          {
            name: "视频累计播放量",
            type: "bar",
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            barWidth: 10,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: colors[1] }, //柱图渐变色
                { offset: 1, color: "#e4e5e6" }, //柱图渐变色
              ]),
              borderRadius: [3, 3, 0, 0],
            },
            data: this.archiveArr,
            yAxisIndex: 1,
          },
          {
            name: "视频累计点赞数",
            type: "bar",
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            barWidth: 10,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: colors[2] }, //柱图渐变色
                { offset: 1, color: "#e4e5e6" }, //柱图渐变色
              ]),
              borderRadius: [3, 3, 0, 0],
            },
            data: this.likesArr,
            yAxisIndex: 2,
          },
        ],
      };
    },
  },
  methods: {
    getUpMsg(page, pageSize) {
      apiUpFansList({ page, pageSize }).then(
        (res) => {
          this.upList = res.data.list;
          const archive = [];
          const follower = [];
          const likes = [];
          const names = [];
          this.upList.forEach((item) => {
            archive.push(item["archive"]);
            follower.push(item["follower"]);
            likes.push(item["likes"]);
            names.push(item["name"]);
          });
          this.archiveArr = archive;
          this.followerArr = follower;
          this.likesArr = likes;
          this.nameArr = names;
          this.$nextTick(() => {
            this.myChart.setOption(this.options);
          });
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
.study-up-chart {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  .up-list-chart {
    flex: 1;
  }
}
</style>
