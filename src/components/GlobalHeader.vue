<template>
  <div id="globalHeader">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/activityQuery">活动查询</el-menu-item>
      <el-menu-item index="/myActivity">我的活动</el-menu-item>
      <el-menu-item index="/helpCenter">帮助中心</el-menu-item>
    </el-menu>
    <div class="user-actions">
      <el-button type="primary" @click="navigateTo('/login')">登录</el-button>
      <el-button type="primary" @click="navigateTo('/register')">注册</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const activeIndex = ref('/')
const router = useRouter()

// 监听路由变化，更新当前选中菜单
router.afterEach((to, from, failure) => {
  activeIndex.value = to.path;
});


// 菜单项导航
const handleSelect = (path) => {
  activeIndex.value = path
  router.push(path)
}

// 按钮导航
const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
#globalHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #f5f5f5;
}

.el-menu-demo {
  flex: 1;
}

.user-actions {
  display: flex;
  gap: 8px;
}
</style>
