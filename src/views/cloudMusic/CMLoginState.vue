<template>
  <div class="login-wrap" v-show="loginState">
    <div id="backgroun"></div>
    <div class="ms-login">
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557988635959&di=070ba0da60103448e73ecf6d4f9a2984&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F19%2F03%2F5b63fa018944e_610.jpg" alt="" width="100" height="100">
      <div class="title">网易云音乐登录</div>
      <el-form ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="username" placeholder="网易云音乐手机号码" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="网易云音乐登录密码"
            v-model="password"
            clearable
            @keyup.enter.native="login"
            @keyup.13="login"
          ></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="danger" @click="login">登录</el-button>
        </div>
        <p class="tips">提示 : 可登陆自己真实的网易云音乐账号</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import { CMLoginState,CMLogin } from '../../request/cloudApi'
export default {
  data: function() {
    return {
      username: "",
      password: "",
      loginState: false
    };
  },
  created(){
      this.$store.dispatch("fullscreenLoading", true);
  },
  mounted(){
      this.check()
  },
  methods: {
    login() {
      if (this.username == "" || this.password == "") {
        this.$message.error("帐号或密码不能为空");
        return;
      } else {
        CMLogin(this.username,this.password).then(res => {
            this.$router.replace(`/cloudMusic`)
        }).catch(err => {
            this.$message.error("登录失败");
        })
      }
    },
    check() {
      CMLoginState().then(res => {
          console.log(res);
          this.$store.dispatch(`userinfo`,res.profile)
          this.$store.dispatch("fullscreenLoading", false);
          this.$router.replace(`/cloudMusic`)
      }).catch(err => {
          this.loginState = true
          this.$store.dispatch("fullscreenLoading", false);
            this.$message.success("请登录网易云音乐");
      })
    }
  }
};
</script>

<style scoped>
#backgroun {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #242f42;
  background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557988714789&di=fb81a1d4193fed52a916b7235dedb4a3&imgtype=0&src=http%3A%2F%2Fp1.music.126.net%2FmAkD_e44t-hSslacfWZdUg%3D%3D%2F109951163217656197.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  text-align: center;
  -webkit-filter: blur(3px);
  -moz-filter: blur(3px);
  -o-filter: blur(3px);
  -ms-filter: blur(3px);
  filter:blur(3px);
}
.title {
  text-align: center;
  color: #F56C6C;
  padding: 20px 0 10px 0;
  font-size: 1.6rem;
  font-family: '华文行楷';
}
.ms-login {
  text-align: center;
}
.ms-login img {
  text-align: center;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 40%;
  width: 300px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
.tips {
  font-size:12px;
  line-height:30px;
  color:#999;
}
</style>