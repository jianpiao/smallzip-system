<template>
  <div class="lock">
    <div style="display:flex;">
      <!-- 今日收入 -->
      <el-card class="box-card chart-card3 income">
        <div slot="header" class="clearfix">
          <span>今日收入</span>
          <span class="header-select">
            <el-date-picker v-model="day" type="date" placeholder="选择日期"></el-date-picker>
          </span>
        </div>
        <div>
          <div class="body-title">
            <div class="body-tag"></div>
            <p class="body-title-word">当日收入总额</p>
          </div>
          <p class="body-income">
            <span class="body-income-money">121.98</span> 元
          </p>
          <p class="body-income-compare">较昨日 上升34%</p>
        </div>
      </el-card>
      <!-- 本月收入 -->
      <el-card class="box-card chart-card3 income">
        <div slot="header" class="clearfix">
          <span>本月收入</span>
          <span class="header-select">
            <el-date-picker v-model="month" type="month" placeholder="选择月份"></el-date-picker>
          </span>
        </div>
        <div>
          <div class="body-title">
            <div class="body-tag"></div>
            <p class="body-title-word">当月收入总额</p>
          </div>
          <p class="body-income">
            <span class="body-income-money">43551.98</span> 元
          </p>
          <p class="body-income-compare">较上月 上升79%</p>
        </div>
      </el-card>
    </div>
    <!-- 收入趋势 -->
    <el-card class="box-card chart-card3" style="margin:20px 0">
      <div slot="header" class="clearfix">
        <span>收入趋势</span>
      </div>
      <div ref="echart2" style="width:100%;height:400px;"></div>
    </el-card>
    <!-- 智能锁列表 -->
    <el-card class="box-card chart-card3" style="margin:20px 0">
      <div slot="header" class="clearfix">
        <span>智能锁列表</span>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属区域">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="编号">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <span>{{ props.row.state | filterState}}</span>
              </el-form-item>
              <el-form-item label="分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="编号" prop="id"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="状态" prop="state">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.state == 1">未使用</el-tag>
            <el-tag v-else-if="scope.row.state == 2" type="success">已使用</el-tag>
            <el-tag v-else-if="scope.row.state == 3" type="info">未支付</el-tag>
            <el-tag v-else type="info">维护中</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">加锁</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">解锁</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="4"
        layout="total, sizes, prev, pager, next, jumper"
        :total="5"
      ></el-pagination>
    </el-card>
    <Footer/>
  </div>
</template>

<script>
import echart from "echarts";
import "echarts/theme/macarons.js";
import Footer from "../components/Footer";
export default {
  name: "lock",
  data() {
    return {
      tableData: [
        {
          id: "12987122",
          name: "智能锁",
          category: "第二类",
          desc: "运营中...",
          address: "上海市普陀区真北路",
          shop: "一区",
          shopId: "10333",
          state: 1
        },
        {
          id: "12987123",
          name: "智能锁",
          category: "第二类",
          desc: "运营中...",
          address: "上海市普陀区真北路",
          shop: "一区",
          shopId: "10333",
          state: 2
        },
        {
          id: "12987125",
          name: "智能锁",
          category: "第二类",
          desc: "运营中...",
          address: "上海市普陀区真北路",
          shop: "一区",
          shopId: "10333",
          state: 3
        },
        {
          id: "12987126",
          name: "智能锁",
          category: "第二类",
          desc: "维护中...",
          address: "上海市普陀区真北路",
          shop: "一区",
          shopId: "10333",
          state: 4
        }
      ],
      day: "",
      month: "",
      currentPage4: 4
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
    handleEdit(index, row) {
        // 加锁
      console.log(index, row);
      this.$confirm('加锁之后需要密码才能开锁, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '加锁成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    handleDelete(index, row) {
        // 解锁
      console.log(index, row);
      this.$confirm('解锁之后金额会自动入账, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '解锁成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    initChart() {
      echart.init(this.$refs.echart2, "macarons").setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: "category",
          data: [
            "1号",
            "2号",
            "3号",
            "4号",
            "5号",
            "6号",
            "7号",
            "8号",
            "9号",
            "10号",
            "11号",
            "12号",
            "13号",
            "14号",
            "15号",
            "16号",
            "17号",
            "18号",
            "19号",
            "20号",
            "21号",
            "22号",
            "23号",
            "24号",
            "25号",
            "26号",
            "27号",
            "28号",
            "29号",
            "30号",
            "31号"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "日收入/元",
            data: [
              120,
              200,
              150,
              80,
              70,
              110,
              130,
              13,
              15,
              123,
              234,
              454,
              545,
              234,
              34,
              123,
              902,
              1234,
              34,
              123,
              34,
              54,
              2314,
              23,
              123,
              2314,
              56,
              89,
              56,
              45,
              32
            ],
            type: "bar"
          }
        ]
      });
    }
  },
  filters: {
    filterState(i) {
      let state = {
        1: "未使用",
        2: "已使用",
        3: "未支付",
        4: "维护中"
      };
      return state[i];
    }
  }
};
</script>

<style scoped>
.lock {
  padding: 20px;
}

.income {
  flex: 1;
  margin-right: 10px;
}

.clearfix {
  display: flex;
  align-items: center;
}

.clearfix > span {
  color: #666;
}

.header-select {
  flex: 1;
  text-align: right;
}

.body-title {
  display: flex;
  align-items: center;
}

.body-tag {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #26c9ad;
  margin-right: 15px;
}

.body-title-word {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  padding: 0;
}

.body-income {
  color: #333;
  margin: 0;
  padding: 15px 0;
}

.body-income-money {
  font-size: 32px;
  font-weight: 600;
}

.body-income-compare {
  font-size: 0.9rem;
  color: #999;
  margin: 0;
  padding: 0;
}

/* 表单样式 */
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
