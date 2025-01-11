<template>
  <div id="adminPage">
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="idx"
          class="el-menu-vertical-demo"
          router
        >
          <el-menu-item index="/admin/college-management">
            <el-icon><Management /></el-icon>
            <template #title>学院账号管理</template>
          </el-menu-item>
          <el-menu-item index="/admin/activity-management">
            <el-icon><Management /></el-icon>
            <template #title>活动类型管理</template>
          </el-menu-item>
          <el-menu-item index="/admin/website-image-management">
            <el-icon><Management /></el-icon>
            <template #title>网站形象管理</template>
          </el-menu-item>
          <el-menu-item index="/admin/help-center-management">
            <el-icon><Connection /></el-icon>
            <template #title>帮助中心管理</template>
          </el-menu-item>
          <el-menu-item index="/admin/security-settings">
            <el-icon><Search /></el-icon>
            <template #title>安全设置</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
if (router.currentRoute.value.path === '/') {
  router.push('admin/college-management')
}
const idx = ref(router.currentRoute.value.path !== '/admin' ? router.currentRoute.value.path : 'admin/college-management')
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 750px;
}
</style>