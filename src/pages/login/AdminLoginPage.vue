<template>
  <div id="adminLoginPage">
    <el-container class="login-container">
      <el-header class="login-header">
        <el-icon><Management /></el-icon>
        管理员登录
      </el-header>
      <el-main>
        <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
          <el-form-item label="账号:" prop="username">
            <el-input
              placeholder="请输入账号"
              v-model="loginForm.username"
              class="login-input"
            />
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input 
              placeholder="请输入密码"
              show-password 
              v-model="loginForm.password"
              class="login-input"
            />
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="login" class="login-btn">
          登录
        </el-button>
      </el-main>
    </el-container>    
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { adminLogin } from "@/api/login.js";
import { useRouter } from 'vue-router';
import { useLoginStore } from "@/stores/login.js";

const router = useRouter();

function navigateTo(path) {
  router.push({
    path: path,
    replace: true
  });
}

const loginForm = reactive({
  username: "",
  password: ""
});

const rules = {
  username: [
    { required: true, message: "账号不能为空", trigger: "blur" }
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 8, message: "密码长度不能少于8位", trigger: "blur" }
  ]
};

const loginFormRef = ref(null);

const login = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      adminLogin({
        ...loginForm,
        "role": "admin"
      }).then((response) => {
        const loginStore = useLoginStore();
        loginStore.loginIn(response.data.data.token, "admin")
        navigateTo('/admin');
      }).catch((err) => {
        console.error(err);
        alert("登录失败，用户名或密码不存在");
      });
    } else {
      console.log("表单验证失败");
    }
  });
};
</script>

<style scoped>
.login-header {
  display: flex;
  margin: auto;
  padding: 10px;
  font-size: 28px;
}

.login-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
}

.login-input {
  width: 260px;
}

.login-btn {
  width: 320px;
  margin-top: 20px;
}
</style>
