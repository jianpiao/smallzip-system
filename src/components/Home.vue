<template>
  <div class="home">
    <div style="display:flex;width:100%;justify-content:space-between;">
      <el-card
        class="box-card info-card"
        v-for="(item,index) in yearData"
        :key="index"
      >
        <div slot="header" class="clearfix">
          <span>{{item.title}}</span>
        </div>
        <div class="text item">
          <h1>
            {{index == 0 ? '$' : ''}}{{item.num}}
            <span v-show="screenWidth > 1280" style="float:right;font-size:.9rem;margin-top:.5rem;" :style="{color:index%2==0?'#0db16e':'red'}">
            {{index%2 == 0 ? '↓' : '↑'}} {{item.type}}
            </span>
          </h1>
          <span v-show="screenWidth <= 1280" style="font-size:.9rem;margin-top:.5rem;font-weight:bold;" :style="{color:index%2==0?'#0db16e':'red'}"
            >{{item.type}}</span>
        </div>
      </el-card>
    </div>
    <div style="display:flex;width:100%;justify-content:space-between;">
      <el-card class="box-card chart-card1">
        <div slot="header" class="clearfix">
          <span>订单趋势</span>
        </div>
        <div ref="echart1" style="width:600px;height:400px;"></div>
      </el-card>
      <el-card class="box-card chart-card2">
        <div slot="header" class="clearfix">
          <span>订单周期</span>
        </div>
        <div ref="echart2" style="width:600px;height:400px;"></div>
      </el-card>
    </div>
    <el-card class="box-card chart-card3">
      <div slot="header" class="clearfix">
        <span>最近的订单</span>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="img" label="订单照片" width="140">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt="img" width="50" height="50" style="border-radius: 50px;">
          </template>
        </el-table-column>
        <el-table-column prop="date" label="开始日期" sortable></el-table-column>
        <el-table-column prop="name" label="客户名称"></el-table-column>
        <el-table-column prop="address" label="交付地址"></el-table-column>
        <el-table-column prop="num" label="订单数量" sortable></el-table-column>
        <el-table-column prop="price" label="订单价格" sortable></el-table-column>
        <el-table-column prop="state" label="订单状态">
          <template slot-scope="scope">
            <el-tag size="medium" v-if="scope.row.state">已完成</el-tag>
            <el-tag size="medium" type="warning" v-else>进行中</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <Footer/>
  </div>
</template>
<script>
import echart from "echarts";
import "echarts/theme/macarons.js";
import Footer from './Footer';
export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      yearData:[],
      screenWidth:0
    };
  },
  created() {},
  mounted() {
    this.getData()
    //  初始化图表
    this.initEchart()
    //  监听可视区域宽度
    this.screenWidth = document.documentElement.clientWidth;
    window.onresize = () => {
      this.screenWidth = document.documentElement.clientWidth;
    };
    this.$store.dispatch('fullscreenLoading',false)
  },
  watch: {
    //  监听可视区域宽度
    screenHeight() {
      this.changePageHeight(this.screenHeight);
    }
  },
  methods: {
    //  请求最近订单数据
    getData() {
       this.$http
        .post("http://www.smallzip.com/test/public/index.php/index/Heifeng/get_new_order")
        .then(res => {
          this.tableData = res.data.data
        });

        this.$http
        .post("http://www.smallzip.com/test/public/index.php/index/Heifeng/get_year_data")
        .then(res => {
          this.yearData = res.data.data
        });
    },
    changePageWidth(h) {
      //  改变高度
      this.screenWidth = h;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    initEchart() {
      //  初始化，配置图表信息
      echart.init(this.$refs.echart1, "macarons").setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["年度总收入", "年度总订单量", "年度交付量", "年度客户数"]
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "金额",
            min: 0,
            max: 2000,
            interval: 200,
            axisLabel: {
              formatter: "{value} ￥"
            }
          },
          {
            type: "value",
            name: "人数",
            min: 0,
            max: 250,
            interval: 20,
            axisLabel: {
              formatter: "{value} 人"
            }
          }
        ],
        series: [
          {
            name: "年度总收入",
            type: "bar",
            data: [20, 49, 70, 232, 256, 767, 1356, 1622, 326, 200, 64, 33]
          },
          {
            name: "年度总订单量",
            type: "bar",
            data: [26, 59, 90, 264, 287, 707, 1756, 1822, 487, 188, 60, 23]
          },
          {
            name: "年度交付量",
            type: "line",
            yAxisIndex: 1,
            data: [20, 22, 33, 45, 63, 102, 203, 234, 230, 165, 120, 62]
          },
          {
            name: "年度客户数",
            type: "line",
            yAxisIndex: 1,
            data: [20, 22, 33, 45, 63, 102, 203, 234, 230, 165, 120, 62]
          }
        ]
      });

      echart.init(this.$refs.echart2, "macarons").setOption({
        angleAxis: {},
        radiusAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四"],
          z: 10
        },
        polar: {},
        series: [
          {
            type: "bar",
            data: [1, 2, 3, 4],
            coordinateSystem: "polar",
            name: "A",
            stack: "a"
          },
          {
            type: "bar",
            data: [2, 4, 6, 8],
            coordinateSystem: "polar",
            name: "B",
            stack: "a"
          },
          {
            type: "bar",
            data: [1, 2, 3, 4],
            coordinateSystem: "polar",
            name: "C",
            stack: "a"
          }
        ],
        legend: {
          show: true,
          data: ["A", "B", "C"]
        }
      });
    }
  },
  components: {
    Footer
  }
};
</script>

<style scoped>
.home {
  padding: 20px;
}
.info-card {
  width: calc(25% - 20px);
  margin: 10px;
}
.text {
  font-size: 1.4rem;
}
.clearfix > span {
  color: #666;
}

.chart-card1 {
  margin: 10px 0 20px 10px;
  width: calc(50% - 20px);
  overflow-x:scroll;
}
.chart-card2 {
  margin: 10px 10px 20px 0;
  width: calc(50% - 20px);
  overflow-x:scroll;
}

.chart-card3 {
  margin: 0 10px;
}
</style>
