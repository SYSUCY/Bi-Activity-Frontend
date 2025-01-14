<template>
  <el-container class="am-layout-container" >
      <el-aside width="200px">
          <el-scrollbar>
              <el-menu :router="true" :default-active="activeIndex">
                  <!-- 个人中心 -->
                  <el-sub-menu index="1">
                      <template #title>
                          <el-icon>
                              <UserFilled />
                          </el-icon>
                          <span>个人中心</span>
                      </template>
                      <el-menu-item index="/collegePersonalCenter/collegeInfo">
                          学院资料
                      </el-menu-item>
                      <el-menu-item index="/collegePersonalCenter/personalInfo">
                          个人资料
                      </el-menu-item>
                      <el-menu-item index="/collegePersonalCenter/myNews">
                          我的消息
                      </el-menu-item>
                      <el-menu-item index="/collegePersonalCenter/securitySettings">
                          安全设置
                      </el-menu-item>
                  </el-sub-menu>
                  <!-- 人员管理 -->
                  <el-sub-menu index="2">
                      <template #title>
                          <el-icon>
                              <User />
                          </el-icon>
                          <span>人员管理</span>
                      </template>

                      <el-menu-item index="/collegeMemberManagement/joinOrgReview">
                          加入组织审核
                      </el-menu-item>
                      <el-menu-item index="/collegeMemberManagement/memberQuery">
                          成员查询
                      </el-menu-item>
                  </el-sub-menu>
                  <!-- 活动管理 -->
                  <el-sub-menu index="3">
                      <template #title>
                          <el-icon>
                              <Management />
                          </el-icon>
                          <span>活动管理</span>
                      </template>
                      <el-menu-item index="/collegeActivityManagement/activityRelease">
                          活动发布
                      </el-menu-item>
                      <!-- <el-menu-item index="/collegeActivityManagement/activityQuery">
                          活动查询
                      </el-menu-item> -->
                      <el-menu-item index="/collegeActivityManagement/activityReview">
                          活动审核
                      </el-menu-item>
                      <el-menu-item index="/collegeActivityManagement/activityAdmission">
                          活动录取
                      </el-menu-item>
                  </el-sub-menu>
              </el-menu>
          </el-scrollbar>
      </el-aside>

      <el-container>
          <el-main>
              <el-scrollbar>
                  <router-view />
              </el-scrollbar>
          </el-main>
      </el-container>
  </el-container>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router';

const activeIndex = ref("/collegePersonalCenter/collegeInfo")

// 使用 vue-router 的 useRoute 钩子来获取当前路由对象
const route = useRoute();

// 使用 onBeforeMount 生命周期钩子在组件挂载之前设置 activeIndex
onBeforeMount(() => {
  activeIndex.value = route.path;
});
</script>

<style scoped>
.am-layout-container .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.am-layout-container .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.am-layout-container .el-menu {
  border-right: none;
}
.am-layout-container .el-main {
  padding: 15;
}
.am-layout-container .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.am-layout-container {
  padding: 0;
  width: 100vw; /* 视口宽度 */
  height: 100vh; /* 视口高度 */
}
</style>