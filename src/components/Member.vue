<template>
  <div class="member">
    <div class="header">
      <div v-for="(item, index) in proList" :key="index">
        <el-progress
          type="circle"
          :percentage="item.percentage"
          :color="item.color"
          :stroke-width="15"
        ></el-progress>
        <p>{{item.name}}</p>
      </div>
    </div>
    <div class="program">
      <div style="display:flex;">
        <h1>员工列表</h1>
        <div style="display:flex;width:calc(100% - 100px);justify-content:flex-end">
          <el-input
            placeholder="请输入内容"
            v-model="keyWord"
            clearable
            style="width:200px;margin-right:20px"
          ></el-input>
          <el-button type="primary" style="height:40px;" @click="addMember">添加员工</el-button>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="工号"></el-table-column>
        <el-table-column prop="img" label="头像">
          <template slot-scope="scope">
            <img
              :src="scope.row.img"
              alt="logo"
              height="30"
              width="30"
              @click="checkImg(scope.row.img)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="position" label="职位"></el-table-column>
        <el-table-column prop="date" label="入职时间"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleModify(scope.row)" size="small">修改</el-button>
            <el-button type="danger" size="small" @click="handleDelete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next, jumper"
        @next-click="nextPageClick"
        @prev-click="prevPageclick"
        @current-change="currentPagechange"
        :total="pageTotal"
      ></el-pagination>
    </div>

    <!-- 对话框 -->
    <el-dialog title="图片" :visible.sync="dialogVisible">
      <img :src="showImg" alt="logo" width="100%" height="100%" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加员工 -->
    <el-dialog title="添加员工" :visible.sync="dialogVisibleForm" width="50%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="名字" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入名字"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="ruleForm.address" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="ruleForm.position" placeholder="请输入职位"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleForm = false">取 消</el-button>
        <el-button type="primary" @click="confirmFrom('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>

    <Footer />
  </div>
</template>

<script>
import echart from "echarts";
import "echarts/theme/macarons.js";
import Footer from "./Footer";
import search from "../plugins/search";
export default {
  name: "Member",
  data() {
    return {
      keyWord: "",
      proList: [
        { percentage: 14, color: "#409EFF", name: "正式员工" },
        { percentage: 78, color: "#8e71c7", name: "实习员工" },
        { percentage: 56, color: "#ff3000", name: "试用期员工" },
        { percentage: 37, color: "#2eca9c", name: "外包员工" }
      ],
      data: [],
      dialogVisible: false,
      showImg: "",
      currentPage: 1, //  当前页面位置
      pageTotal: 0, //  数据总数
      dialogVisibleForm: false,
      confirmType: 1, // 1:添加 2:修改
      ruleForm: {
        name: "",
        address: "",
        email: "",
        position: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入名字", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 40 个字符", trigger: "blur" }
        ],
        position: [
          { required: true, message: "请输入职位", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    Footer
  },
  computed: {
    //搜素过滤
    tableData() {
      return this.getSearch(this.data, this.keyWord);
    }
  },
  mounted() {
    this.getData(1);
  },
  methods: {
    //  获取搜索结果
    getSearch(data, keyword) {
      return search(data, keyword);
    },
    getData(page) {
      this.$http
        .post(
          "localhost/test/public/index.php/index/Heifeng/get_member",
          { page }
        )
        .then(res => {
          if (res.data.code == 200) {
            this.pageTotal = res.data.data.total;
            this.data = res.data.data.data;
          } else {
            this.$message.error("提交页数有误");
          }
          this.$store.dispatch("fullscreenLoading", false);
        });
    },
    addMember() {
      this.dialogVisibleForm = true;
      this.confirmType = 1;
    },
    //  修改
    handleModify(row) {
      this.ruleForm = JSON.parse(JSON.stringify(row));
      this.dialogVisibleForm = true;
      this.confirmType = 2;
    },
    confirmFrom(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(
              `localhost/test/public/index.php/index/Heifeng/${
                this.confirmType == 1 ? "add_member" : "modify_member"
              }`,
              { ...this.ruleForm }
            )
            .then(res => {
              if (res.data.code == 200) {
                this.getData();
                this.dialogVisibleForm = false;
                this.$refs[formName].resetFields();
              } else {
                this.$message.error("添加失败" + res.data.data);
              }
              this.$store.dispatch("fullscreenLoading", false);
            });
        } else {
          this.$message.error("输入有误");
          return false;
        }
      });
    },
    //  删除
    handleDelete() {},
    checkImg(i) {
      this.showImg = i;
      this.dialogVisible = !this.dialogVisible;
    },
    //  下一页
    nextPageClick(i) {
      this.$store.dispatch("fullscreenLoading", true);
      this.getData(i);
    },
    //  上一页
    prevPageclick(i) {
      this.$store.dispatch("fullscreenLoading", true);
      this.getData(i);
    },
    //  当前页
    currentPagechange(i) {
      this.$store.dispatch("fullscreenLoading", true);
      this.getData(i);
    }
  }
};
</script>

<style scoped>
.member {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-evenly;
  background-color: #fff;
  margin-bottom: 20px;
  padding: 20px;
  text-align: center;
}

.header p {
  color: rgb(88, 88, 88);
}

.program {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
}

h1 {
  margin: 0 0 20px 0;
  color: rgb(51, 51, 51);
}

.pagination {
  background-color: #fff;
  padding: 30px 0 30px 10px;
}
</style>
