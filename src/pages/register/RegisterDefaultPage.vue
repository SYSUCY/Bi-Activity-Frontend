<template>
  <div class="registerPage">
    <div class="register-content-wrapper custom-card">
      <div id="registerDefaultPage">
        <el-container>
          <el-header class="register-header">
            Bi活动注册
          </el-header>
          <el-main class="register-content">
            <el-button plain @click="navigateTo('/register/student')" class="register-button">
              <el-icon><UserFilled /></el-icon>
              学生注册
            </el-button>
            <el-button plain @click="navigateTo('/register/college')" class="register-button">
              <el-icon><School /></el-icon>
              学院注册
            </el-button>  
          </el-main>
          <el-footer class="register-footer">
            <el-link type="primary" target="_blank" @click="navigateTo('/login')">已有账号？点击登录</el-link>
          </el-footer>
        </el-container>
      </div>
    </div>
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
#registerDefaultPage .el-button {
  padding: 80px 100px;  /* 自定义按钮内边距 */
  font-size: 24px;     /* 自定义字体大小 */
  font-weight: bold;   
  margin: 20px;       
  background-color: rgb(253, 253, 253);
  border: 1px solid #b3b3b3;
}

#registerDefaultPage .el-button:hover {
  border-color: #409eff;
  border-width: 1px;
}

.register-content{
  display: flex;
}

.register-header {
  text-align: center;
  font-size: 30px;
  color: #303133;
}
.register-footer{
  text-align: center;
}
/* 页面容器，使用 Flexbox 实现居中 */
.registerPage {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 让容器充满整个视口 */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 内容容器 */
.register-content-wrapper {
  width: 80vw; /* 宽度为视口宽度的 80% */
  max-width: 1000px; /* 最大宽度限制 */
  min-height: 60vh; /* 最小高度为视口高度的 60% */
  max-height: 600px; /* 最大高度限制 */
  background: #fff; /* 背景为白色 */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  border: 1px solid #ccc; /* 边框 */
  border-radius: 8px; /* 圆角 */
  display: flex;
  flex-direction: column; /* 内容垂直排列 */
  justify-content: center; /* 内容垂直居中 */
  align-items: center; /* 内容水平居中 */
  padding: 20px;
  box-sizing: border-box; /* 包含内边距 */
}

.custom-card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /* 与 el-card 阴影类似 */
  border-radius: 4px; /* 圆角，与 el-card 默认一致 */
  transition: box-shadow 0.3s ease; /* 添加平滑过渡效果 */
  background-color: #fff; /* 确保背景为白色 */
  padding: 16px; /* 默认内边距 */
}

.custom-card:hover {
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2); /* 鼠标悬停时加深阴影 */
}


@media (max-width: 768px) {
  .register-content-wrapper {
    width: 90vw; /* 更窄的屏幕占用更多宽度 */
    height: 70vh;
  }
}
</style>