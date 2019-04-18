<template>
  <div class="other">
    <div class="time">
      <h1>时间轴</h1>
      <div class="block">
        <el-timeline>
          <el-timeline-item timestamp="2018/4/12" placement="top">
            <el-card>
              <h4>更新 系统代码</h4>
              <p>小飘飘 提交于 2019/4/16 15:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/3" placement="top">
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>小飘飘 提交于 2019/4/14 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/2" placement="top">
            <el-card>
              <h4>更新 系统代码</h4>
              <p>小飘飘 提交于 2019/4/11 20:46</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>

    <div class="time">
      <h1>项目进度</h1>
      <div style="height: 300px;">
        <el-steps direction="vertical" :active="1">
          <el-step title="小飘飘今天入职" description="欢迎淘宝技术部高级专家淘小宝正式加入淘宝"></el-step>
          <el-step title="淘宝技术部淘小宝出席中国首届 React 开发者大会技术会议" description='2016-06-10 10:30:00淘宝技术部高级专家淘小宝正式确认出席中国首届 React 开发者大会技术会议，首届React开发者大会将于2018年8月18日在广州举行'></el-step>
          <el-step title="淘宝技术部年会正在举行中" description="2016-06-10 10:30:00欢迎参加淘宝技术部 2019 年会，年会正在杭州西湖某酒店举行"></el-step>
          <el-step title="淘宝技术部淘小宝出席中国首届 React 开发者大会技术会议" description="22016-06-10 10:30:00淘宝技术部高级专家淘小宝正式确认出席中国首届 React 开发者大会技术会议，首届React开发者大会将于2018年8月18日在广州举行"></el-step>
        </el-steps>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<script>
import Footer from "./Footer";
export default {
  name: "Other",
  data() {
    return {
    };
  },
  mounted() {
    this.$store.dispatch("fullscreenLoading", false);
  },
  components:{
    Footer
  }
};
</script>

<style scoped>
.other {
  padding: 20px;
}
.time {
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
}

h1 {
  margin: 0 0 20px 0;
  color: rgb(51, 51, 51);
}
</style>
