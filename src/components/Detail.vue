<template>
  <div class="detail">
    <div class="handle-box">
      <el-input v-model="keyWord" placeholder="筛选关键词" class="handle-input mr10" suffix-icon="el-icon-search"></el-input>
      <el-button type="primary" icon="el-icon-plus" class="handle-button" @click="handleAdd">添加</el-button>
    </div>
    <!-- 列表 -->
    <el-table
      :data="tableData"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      tooltip-effect="dark"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="100" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="日期" sortable>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column align="right" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row,tableData)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
    class="pagination"
    background
    layout="sizes, prev, pager, next, jumper"
    @next-click="nextPageClick"
    @prev-click="prevPageclick"
    @current-change="currentPagechange"
    @size-change="pageSizeChange"
    :page-sizes="[10, 15, 20]"
    :page-size="pageSize"
    :total="pageTotal">
  </el-pagination>
    <!-- 对话框 -->
    <el-dialog :title="dialogType == 'edit' ? `编辑ID${form.id}内容`:`添加内容`" :visible.sync="dialogFormVisible" @closed="dialogClose">
      <el-form :model="form">
        <el-form-item 
          label="名称" 
          label-width="120px"
          :rules="[{required: true}]"
        >
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入个人名称" clearable></el-input>
        </el-form-item>
        <el-form-item 
          label="地址" 
          label-width="120px"
          :rules="[{required: true}]"
        >
          <el-input v-model="form.address" autocomplete="off" placeholder="请输入个人住所/工作地址" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <Footer/>
  </div>
</template>
<script>
import search from '../plugins/search';
import Footer from './Footer';
import { detailGet,detailDelete,detailModify,detailAdd } from '../api/index';
export default {
  name: "Detail",
  data() {
    return {
      data: [],
      keyWord: '',
      multipleSelection: [],
      dialogFormVisible: false,
      dialogType:'',
      form: {
        id: "",
        name: "",
        address: ""
      },
      currentPage:1,  //  当前页面位置
      pageTotal:0,    //  数据总数
      pageSize:10     //  单页数量
    };
  },
  components: {
    Footer
  },
  created() {},
  mounted() {
    this.getData();
  },
  computed: {
    //搜素过滤
    tableData() {
      return this.getSearch(this.data,this.keyWord)
    },
    fullscreenLoading() {
      return this.$store.getters.fullscreenLoading
    }
  },
  methods: {
    //  请求数据
    getData() {
      detailGet.data = {
          page:this.currentPage,
          size:this.pageSize
      }
      this.$http(detailGet)
        .then(res => {
          if(res.data.code == 200){
            this.pageTotal = res.data.data.total
            this.data = res.data.data.data
          } else {
            this.$message.error('提交页数有误')
          }
          this.$store.dispatch('fullscreenLoading',false)
        });
    },
    //  获取搜索结果
    getSearch(data,keyword) {
        return search(data,keyword)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //  关闭对话框
    dialogClose() {
      this.form = {id:'',name:'',address:''}
      this.dialogFormVisible = false
    },
    //  添加内容
    handleAdd() {
      this.dialogType = 'add'
      this.dialogFormVisible = !this.dialogFormVisible
    },
    //  编辑内容
    handleEdit(index, row) {
      this.dialogType = 'edit'
      this.form = {
        id:row.id,
        name:row.name,
        address:row.address
      }
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    //  删除内容
    handleDelete(index, row,rows) {
      this.$confirm('此操作是真删数据库数据, 是否继续?', '警告', {
          confirmButtonText: '真删',
          cancelButtonText: '假删',
          type: 'warning'
        }).then(() => {
          this.submitDetailForm(row.id)
        }).catch(() => {
          rows.splice(index, 1);
          this.$message({
            type: 'info',
            message: '本地数据删除成功！'
          });          
        });
    },
    //  提交删除内容
    submitDetailForm(id) {
      detailDelete.data = {id}
      this.$http(detailDelete)
      .then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getData()
      })
      .catch(() => {
        this.$store.dispatch('fullscreenLoading',false)
        this.$message.error('数据请求失败哦~');
      });
    },
    //  提交内容
    submitForm() {
      let dataType = this.dialogType === 'edit' ? 'modify_data' : 'add_data'
      if(this.form.name.length > 0 && this.form.address.length > 0){
        this.dialogType === 'edit' ? detailModify.data = this.form : detailAdd.data = this.form
        this.$store.dispatch('fullscreenLoading',true)
        this.dialogFormVisible = !this.dialogFormVisible
        this.$http(this.dialogType === 'edit' ? detailModify: detailAdd)
        .then(res => {
          this.form = {id:'',name:'',address:''}
          this.$message({
            message: this.dialogType === 'edit' ? '修改成功' : '添加成功',
            type: 'success'
          })
          this.getData()
        })
        .catch(() => {
          this.$message.error('数据请求失败哦~');
          this.$store.dispatch('fullscreenLoading',false)
        });
      } else {
        this.$message.error('输入内容不能为空哦~');
      }
    },
    //  下一页
    nextPageClick(i) {
      this.$store.dispatch('fullscreenLoading',true)
      this.currentPage = i
      this.getData()
    },
    //  上一页
    prevPageclick(i) {
      this.$store.dispatch('fullscreenLoading',true)
      this.currentPage = i
      this.getData()
    },
    //  当前页
    currentPagechange(i) {
      this.$store.dispatch('fullscreenLoading',true)
      this.currentPage = i
      this.getData()
    },
    //  单页数据数量改变
    pageSizeChange(i) {
      this.$store.dispatch('fullscreenLoading',true)
      this.pageSize = i
      this.getData()
    }
  }
};
</script>

<style scoped>
.detail {
  padding: 20px;
}
.handle-box {
  margin-bottom: 20px;
}
.handle-input {
  width: 200px;
}
.handle-button {
  margin-left: 20px;
}
.pagination {
  background-color: #fff;
  padding:30px 0 30px 10px;
}
</style>
