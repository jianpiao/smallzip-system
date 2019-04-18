<template>
  <div class="test">
    <div class="file1">
      <h1>文件上传</h1>
      <el-upload
        class="upload-demo"
        action="http://www.smallzip.com/test/public/index.php/index/Heifeng/get"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>

    <div class="file2">
      <h1>头像上传</h1>
      <el-upload
        action="http://www.smallzip.com/test/public/index.php/index/Heifeng/get"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </div>

    <div class="file2">
      <h1>缩略图</h1>
      <el-upload
        class="upload-demo"
        action="http://www.smallzip.com/test/public/index.php/index/Heifeng/get"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>

    <div class="file2">
      <h1>拖拽上传</h1>
      <el-upload
        class="upload-demo"
        drag
        action="http://www.smallzip.com/test/public/index.php/index/Heifeng/get"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
    <Footer/>
  </div>
</template>
<script>
import Footer from "./Footer";
export default {
  name: "Test",
  data() {
    return {
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  mounted() {
    this.$store.dispatch("fullscreenLoading", false);
  },
  components:{
    Footer
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
.test {
  padding: 20px;
}

.file1,
.file2 {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 20px;
}
</style>
