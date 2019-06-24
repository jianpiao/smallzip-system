<template>
  <div class="workplace">
    <!-- <el-card class="box-card info-card"> -->
    <div class="header-nav">
      <h1>快捷导航</h1>
      <div class="nav-list">
        <div class="nav-item" v-for="(item, index) in navList" :key="index">
          <img :src="item.img" alt="logo" width="50" height="50">
          <p>
            {{item.title}}
            <span>{{item.num}}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- </el-card> -->
    <div style="display:flex;margin:0 0 20px 0;">
      <div class="member">
        <div class="member-item" v-for="(item, index) in member" :key="index">
          <div>
            <img :src="item.img" alt height="20" width="20">
          </div>
          <div>
            <p>{{item.title}}</p>
            <p>{{item.num}}</p>
          </div>
        </div>
      </div>
      <div class="sex">
        <h1>员工情况</h1>
        <div ref="echart1" style="width:600px;height:400px;"></div>
      </div>
      <div class="income">
        <h1>费用概览</h1>
        <div ref="echart2" style="width:600px;height:400px;"></div>
      </div>
    </div>
    <div class="program">
      <h1>项目列表</h1>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="项目名称" width="150"></el-table-column>
        <el-table-column prop="date" label="截止日期" width="150"></el-table-column>
        <el-table-column prop="pro" label="进度">
          <template slot-scope="scope">
            <el-progress :percentage="scope.row.pro" :status="scope.$index == 0 ? 'success' : 'text'"></el-progress>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="负责人" width="150"></el-table-column>
        <el-table-column prop="group" label="团队">
          <template slot-scope="scope">
            <div style="display:flex;">
              <img
                src="https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png"
                alt
                width="20"
                height="20"
                v-for="(item,index) in scope.row.group"
                :key="index"
                style="border-radius: 50%;margin:0 0 0 4px"
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state ? 'success' : 'warning'"
            >{{scope.row.state ? '已完成' : '进行中'}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pro">
        <h1>薪资趋势</h1>
        <div ref="echart3" style="width:100%;height:400px;"></div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import echart from "echarts";
import "echarts/theme/macarons.js";
import Footer from "./Footer";
export default {
  name: "Workpaly",
  data() {
    return {
      navList: [
        { title: "员工管理", img: require("../assets/l6.png"), num: 1 },
        { title: "通讯录", img: require("../assets/l3.png"), num: 34 },
        { title: "考勤", img: require("../assets/l4.png"), num: 0 },
        { title: "薪资福利", img: require("../assets/l1.png"), num: 12 },
        { title: "审批", img: require("../assets/l5.png"), num: 4 },
        { title: "组织框架", img: require("../assets/l7.png"), num: 0 },
        { title: "合同管理", img: require("../assets/l8.png"), num: 1 },
        { title: "完成项目", img: require("../assets/l2.png"), num: 0 }
      ],
      member: [
        { title: "新增员工", num: 123, img: require("../assets/c1.png") },
        { title: "总员工数", num: 77, img: require("../assets/c3.png") },
        { title: "离职人数", num: 34, img: require("../assets/c3.png") },
        { title: "面试人数", num: 24, img: require("../assets/c2.png") },
        { title: "待入职人数", num: 2, img: require("../assets/c4.png") }
      ],
      tableData: [
        {
          title: "项目A",
          date: "2016-05-02",
          ame: "小李",
          pro: 100,
          group: [1, 2, 3, 4, 5],
          state: false
        },
        {
          title: "项目B",
          date: "2016-05-04",
          name: "小王",
          pro: 70,
          group: [1, 2],
          state: false
        },
        {
          title: "项目C",
          date: "2016-05-01",
          name: "小鼠",
          pro: 40,
          group: [1, 2, 3],
          state: true
        },
        {
          title: "项目D",
          date: "2016-05-03",
          name: "无力",
          pro: 20,
          group: [1, 2],
          state: false
        },
        {
          title: "项目E",
          date: "2016-05-07",
          name: "我司",
          pro: 0,
          group: [1, 2, 3, 7],
          state: false
        },
        {
          title: "项目F",
          date: "2016-05-08",
          name: "阿道夫",
          pro: 90,
          group: [1],
          state: true
        },
        {
          title: "项目G",
          date: "2016-05-09",
          name: "韩国",
          pro: 30,
          group: [1, 2, 3],
          state: true
        }
      ]
    };
  },
  components: {
    Footer
  },
  mounted() {
    this.$store.dispatch("fullscreenLoading", false);
    this.initChart();
  },
  methods: {
    initChart() {
      echart.init(this.$refs.echart1, "macarons").setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          bottom: 10,
          left: 10,
          data: ["新增员工", "总员工数", "离职员工", "面视人数", "待入职数"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["38%", "50%"],
            data: [
              { value: 89, name: "新增员工" },
              { value: 1234, name: "总员工数" },
              { value: 257, name: "离职员工" },
              { value: 34, name: "面视人数" },
              { value: 6, name: "待入职数" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });

      echart.init(this.$refs.echart2, "macarons").setOption({
        xAxis: {
          type: "category",
          data: ["星期一", "星期二", "星期三", "星期四", "星期五","星期六","星期日" ]
        },
        yAxis: {
          type: "value"
        },
        legend: {
          bottom: 10,
          left: 10,
          data: [ "星期一",  "星期二","星期三","星期四", "星期五","星期六","星期日"]
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar"
          }
        ]
      });

      echart.init(this.$refs.echart3, "macarons").setOption({
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6六', '7月','8月','9月','10月','11月','12月']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [5200, 6320, 7010, 8340, 9900, 11300, 12200, 6670, 5250, 11990, 10880, 15660],
            type: 'line'
        }]
      })
    }
  }
};
</script>

<style scoped>
.workplace {
  padding: 20px;
}

.header-nav {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

h1 {
  margin: 0 0 20px 0;
  color: rgb(51, 51, 51);
}

.nav-list {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.nav-item {
  width: 25%;
  margin-bottom: 10px;
}

.nav-item img {
  border-radius: 8px;
  cursor: pointer;
}

.nav-item p {
  color: rgb(120, 120, 120);
  margin: 6px 0 20px 0;
  font-size: 0.87rem;
  cursor: pointer;
}

.nav-item span {
  color: rgb(255, 54, 59);
  cursor: pointer;
}

.member {
  background-color: #fff;
  padding: 0 20px;
  width: 30%;
}

.member-item {
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid rgb(240, 240, 240);
}

.member-item div:nth-child(1) {
  width: 50px;
  height: 50px;
  text-align: center;
  border: 1px solid rgb(240, 240, 240);
}

.member-item div img {
  border-radius: 5px;
  margin: 15px 0;
}

.member-item div p {
  margin: 0;
  line-height: 25px;
  padding-left: 20px;
}

.member-item div p:nth-child(1) {
  color: rgb(77, 77, 77);
}

.member-item div p:nth-child(2) {
  font-weight: bold;
}

.sex {
  width: 30%;
  padding: 20px;
  margin: 0 20px;
  background-color: #fff;
}

.income {
  padding: 20px;
  background-color: #fff;
}

.program {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
}

.pro {
    background-color: #fff;
    padding: 20px;
}
</style>
