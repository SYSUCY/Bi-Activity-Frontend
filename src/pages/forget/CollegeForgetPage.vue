<template> 
  <div id="collegeForgetPage">
    <el-container>
      <el-header class="register-header">
        <h2>忘记密码</h2>
        <el-link target="_blank" @click="navigateTo('/login')">想起来了！！！点击登录</el-link>
      </el-header>
      <el-main>
        <el-card class="forget-card">
          <div class="forget-message">
            <p>学院账号权限过高，请联系管理员</p>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
function navigateTo(path) {
  router.push(path);
}
</script>

<style scoped>
.register-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forget-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* 可根据需要调整高度 */
}

.forget-message {
  text-align: center;
  color: red;
  font-size: 18px; /* 可根据需要调整字体大小 */
  font-weight: bold;
}
</style>
