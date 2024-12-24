<template>
  <div class="registerPage">
    <div class="register-content-wrapper">
      <div id="registerDefaultPage">
        <el-container>
          <el-header class="register-header">
            Bi活动注册
          </el-header>
          <el-main class="register-content">
            <el-button type="primary" @click="navigateTo('/register/student')">学生注册</el-button>
            <el-button type="primary" @click="navigateTo('/register/college')">学院注册</el-button>  
          </el-main>
          <el-footer class="register-footer">
            <el-link target="_blank" @click="navigateTo('/login')">已有账号？点击登录</el-link>
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
  font-size: 18px;     /* 自定义字体大小 */
}

.register-header {
  text-align: center;
  font-size: 24px;
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
  background-color: #f5f5f5; /* 背景颜色 */
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

@media (max-width: 768px) {
  .register-content-wrapper {
    width: 90vw; /* 更窄的屏幕占用更多宽度 */
    height: 70vh;
  }
}
</style>