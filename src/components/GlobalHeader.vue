<template>
  <div id="globalHeader">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-menu"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="/" class="el-menu-item">
        <el-icon :size="20">
          <House />
        </el-icon>
        首页
      </el-menu-item>
      <el-menu-item index="/activityQuery" class="el-menu-item">
        <el-icon :size="20">
          <Search />
        </el-icon>
        活动查询
      </el-menu-item>
      <el-menu-item index="/myActivity" class="el-menu-item">
        <el-icon :size="20">
          <Promotion />
        </el-icon>
        我的活动
      </el-menu-item>
      <el-menu-item index="/helpCenter" class="el-menu-item">
        <el-icon :size="20">
          <Help />
        </el-icon>
        帮助中心
      </el-menu-item>
    </el-menu>
    <div class="user-actions">
      <template v-if="token === ''">
        <el-link type="primary" @click="navigateTo('/login')">登录</el-link>
        <el-link @click="navigateTo('/register')">注册</el-link>
      </template>

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
            <img :src="userAvatar" alt="学院logo" class="user-avatar" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="personalCenter">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template v-else-if="role === 'admin'">
        <el-dropdown @command="handleAdminDropdownCommand">
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
import { useLoginStore } from '@/stores/login'

const activeIndex = ref('/')
const router = useRouter()
const userAvatar = ref('https://via.placeholder.com/40') // 默认头像 URL

const loginStore = useLoginStore()
const token = computed(() => loginStore.data.token)
const role = computed(() => loginStore.data.role)

const handleStudentDropdownCommand = (command) => {
  if (command === 'personalCenter') {
    router.push('/studentPersonalCenter')
  } else if (command === 'logout') {
    loginStore.loginOut()
    router.push({ path: '/login', replace: true })
  }
}

const handleCollegeDropdownCommand = (command) => {
  if (command === 'personalCenter') {
    router.push('/collegePersonalCenter')
  } else if (command === 'logout') {
    loginStore.loginOut()
    router.push({ path: '/login', replace: true })
  }
}

const handleAdminDropdownCommand = (command) => {
  if (command === 'personalCenter') {
    router.push('/admin')
  } else if (command === 'logout') {
    loginStore.loginOut()
    router.push({ path: '/login', replace: true })
  }
}

router.afterEach((to) => {
  activeIndex.value = to.path
})

const handleSelect = (path) => {
  activeIndex.value = path
  router.push(path)
}

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
#globalHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  width: 100%;
  padding: 10px 30px;
}

.el-menu-menu {
  flex: 1;
  display: flex;
  justify-content: flex-start;  /* 左对齐 */
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
