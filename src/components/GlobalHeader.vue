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
      <!-- 登录/注册按钮 -->
      <template v-if="token === ''">
        <el-button type="primary" @click="navigateTo('/login')">登录</el-button>
        <el-button type="primary" @click="navigateTo('/register')">注册</el-button>
      </template>

      <!-- 用户头像下拉菜单 -->
      <template v-else-if="role === 'student'">
        <el-dropdown @command="handleStudentDropdownCommand">
          <span class="el-dropdown-link">
            <img :src="userAvatar" alt="学生头像" class="user-avatar" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="personalCenter">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template v-else-if="role === 'college'">
        <el-dropdown @command="handleCollegeDropdownCommand">
          <span class="el-dropdown-link">
            <img :src="userAvatar" alt="管理员头像" class="user-avatar" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="personalCenter">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/login';

const activeIndex = ref('/')
const router = useRouter()
const userAvatar = ref('https://via.placeholder.com/40') // 默认头像 URL

const loginStore = useLoginStore()
const token = computed(() => loginStore.data.token)
const role = computed(() => loginStore.data.role)

// 处理学生头像下拉菜单命令
const handleStudentDropdownCommand = (command) => {
  if (command === 'personalCenter') {
    router.push('/studentPersonalCenter');
  } else if (command === 'logout') {
    loginStore.loginOut();
    router.push({ path: '/login', replace: true });
  }
};

// 处理学院头像下拉菜单命令
const handleCollegeDropdownCommand = (command) => {
  if (command === 'personalCenter') {
    router.push('/collegePersonalCenter');
  } else if (command === 'logout') {
    loginStore.loginOut();
    router.push({ path: '/login', replace: true });
  }
};

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
