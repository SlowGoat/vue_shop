<template>
  <div class="login">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar">
        <img src="../assets/logo.png" alt="" />
      </div>

      <!-- 登录表单区 -->
      <el-form
        label-width="0px"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-user"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      //表单数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      //表单输入验证对象
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    //重置表单函数
    resetForm() {
      this.$refs.loginFormRef.resetFields();
    },
    //表单提交预校验
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.loginForm);

        if (res.meta.status != 200) {
          return this.$message.error("登录失败");
        } else {
          this.$message.success("登录成功");
        }

        //将登陆成功后的后台返回的token 保存到客户端的sessionStorage中
        //sessionStorage只在网站打开期间生效
        window.sessionStorage.setItem("token", res.data.token);
        //登录成功后跳转到后台主页
        this.$router.push("/home")
      });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.login {
  background-color: #2b4b6b;
  height: 100%;
}

.login .login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #eee;
  border-radius: 50%;
  box-shadow: 0 0 10px #eee;
  padding: 10px;
  background-color: #eee;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
