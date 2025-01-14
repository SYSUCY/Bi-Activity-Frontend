<template>
  <div id="basicLayout">
    <el-container>
      <el-header :style="headerStyle" class="header">
        <GlobalHeader />
      </el-header>
      <el-main class="content">
        <router-view />
      </el-main>
      <el-footer class="footer">
        <a href="https://www.gdzyz.cn/" target="_blank">
          Bi活动
        </a>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
  import GlobalHeader from '@/components/GlobalHeader.vue'
  import { ref, onMounted } from 'vue'

  // 设置头部背景色的变化
  const headerStyle = ref({
    background: 'transparent',
    transition: 'background-color 0.3s ease'
  })

  // 监听滚动事件，改变背景颜色
  const changeHeaderBackground = () => {
    if (window.scrollY > 50) {
      headerStyle.value = { background: '#ffffff' }
    } else {
      headerStyle.value = { background: 'transparent' }
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', changeHeaderBackground)
  })
</script>

<style scoped>
#basicLayout .footer {
  background: #f1f1f1;
  padding: 16px;
  text-align: center;
  margin-top: 10px;  /* 底部与内容之间的间距 */
}

#basicLayout .content {
  background: linear-gradient(to right, #fefefe, #ffffff);
  padding: 30px 20px;
  margin-top: 56px;  /* 内容区域顶部间距，避免和固定头部重叠 */
}

#basicLayout .register-header {
  padding-inline: 20px;
  margin-bottom: 16px;
  color: unset;
  background: white;
}

/* 头部样式，透明背景 */
.el-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
}

.el-header .el-menu-menu {
  display: flex;
  justify-content: flex-start;  /* 左对齐 */
  flex: 1;
}

.el-menu-item {
  color: #333;
  margin: 0 16px;
}

.el-menu-item:hover {
  color: #409EFF;
}

.user-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
</style>
