<template>
  <div id="globalHeader">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-menu"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="/" class="el-menu-item">
        <el-icon style="margin-left: 4px" :size="20">
          <House />
        </el-icon>
        首页
      </el-menu-item>
      <el-menu-item index="/activityQuery" class="el-menu-item">
        <el-icon style="margin-left: 4px" :size="20">
          <Search />
        </el-icon>
        活动查询
      </el-menu-item>
      <el-menu-item index="/myActivity" class="el-menu-item">
        <el-icon style="margin-left: 4px" :size="20">
          <Promotion />
        </el-icon>
        我的活动
      </el-menu-item>
      <el-menu-item index="/helpCenter" class="el-menu-item">
        <el-icon style="margin-left: 4px" :size="20">
          <Help />
        </el-icon>
        帮助中心
      </el-menu-item>
      <el-menu-item index="/Test" class="el-menu-item">
        Test
      </el-menu-item>
      <!-- 测试 -->
      <el-menu-item index="/collegePersonalCenter">学院个人中心</el-menu-item>
      <el-menu-item index="/studentPersonalCenter/personalInfo">学生个人中心</el-menu-item>
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
import {Help, House, Promotion} from "@element-plus/icons-vue";

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
  background-color: #ffffff;
}

.el-menu-menu {
  flex: 1;
  padding-left: 100px;
}

.el-menu-item {
  color: #333;
  margin-right: 16px;
  margin-left: 16px;
}

.user-actions {
  display: flex;
  gap: 8px;
}
</style>
