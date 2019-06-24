<template>
  <div class="login-wrap">
    <div id="backgroun"></div>
    <div class="ms-login">
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555562238783&di=703f9a3770772c2502b325bf3a0335cc&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140221%2F20140221020609-1676452068.jpg" alt="" width="100" height="100">
      <div class="title">小飘飘后台管理系统</div>
      <div class="titleEn">smallzip management system</div>
      <el-form ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="username" placeholder="管理员帐号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="管理员密码"
            v-model="password"
            clearable
            @keyup.enter.native="login"
            @keyup.13="login"
          ></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
        <p class="tips">提示 : 默认账户admin,密码123456</p>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (this.username == "" || this.password == "") {
        this.$message.error("帐号或密码不能为空");
        return;
      } else {
        this.check();
      }
    },
    check() {
      this.$http
        .post(
          "http://www.smallzip.com/test/public/index.php/index/Heifeng/login",
          {
            name: this.username,
            password: this.password
          }
        )
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "登录成功"
            });
            this.$router.push("/home");
          } else {
            this.$message.error(res.data.data);
          }
        })
        .catch(err => {
            this.$message.error('请求异常');
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
  background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555562444678&di=2e26bf783f25fcef4ac7a5addc9f0257&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201408%2F22%2F105929p5qdodm5qm4mfjf6.jpg');
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
  color: #44afd0;
  padding: 20px 0 10px 0;
  font-size: 1.6rem;
  font-family: '华文行楷';
}
.titleEn {
  font-family: 'Monotype Corsiva';
  padding: 0px 0 30px 0;
  color: #44afd0;
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