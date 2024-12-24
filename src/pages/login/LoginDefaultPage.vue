<template>
  <div id="loginDefaultPage">
    <el-container>
      <el-header class="login-header">
        Bi活动登录
      </el-header>
      <el-main class="login-content">
        <el-button type="primary" @click="navigateTo('/login/student')">学生登录</el-button>
        <el-button type="primary" @click="navigateTo('/login/college')">学院登录</el-button>  
      </el-main>
      <el-footer class="login-footer">
        <el-link @click="navigateTo('/register')">还没有账号？点击注册</el-link>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateTo(path) {
  router.push(path)
}
</script>

<style scoped>
/* 自定义按钮大小 */
#loginDefaultPage .el-button {
  padding: 80px 100px;  /* 自定义按钮内边距 */
  font-size: 18px;     /* 自定义字体大小 */
}

.login-header {
  text-align: center;
  font-size: 24px;
  color: #303133;
}

.login-footer{
  text-align: center;
}
</style>