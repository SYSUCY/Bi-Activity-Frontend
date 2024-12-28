<template>
  <div id="loginDefaultPage">
    <el-container>
      <el-header class="login-header">
        Bi活动登录
      </el-header>
      <el-main class="login-content">
        <el-button plain @click="navigateTo('/login/student')">
          <el-icon><UserFilled /></el-icon>
          学生登录
        </el-button>
        <el-button plain @click="navigateTo('/login/college')">
          <el-icon><School /></el-icon>
          学院登录
        </el-button>  
      </el-main>
      <el-footer class="login-footer">
        <el-link type="primary" @click="navigateTo('/register')">还没有账号？点击注册</el-link>
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
  font-size: 24px;     /* 自定义字体大小 */
  font-weight: bold; 
  margin: 20px;        
  background-color: rgb(253, 253, 253);
  border: 1px solid #b3b3b3;
}
#loginDefaultPage .el-button:hover {
  border-color: #409eff;
  border-width: 1px;
}

.login-content{
  display: flex;
}

.login-header {
  text-align: center;
  font-size: 30px;
  color: #303133;
}

.login-footer{
  text-align: center;
}
</style>