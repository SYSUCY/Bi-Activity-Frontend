<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="user-info">
        <img 
          :src="userInfo.avatarUrl || '/images/avatar.jpg'" 
          alt="用户头像" 
          class="avatar" 
        />
        <p class="username">张三</p>
      </div>
      <ul>
        <li><router-link to="/studentPersonalCenter/personalInfo">个人资料</router-link></li>
        <li><router-link to="/studentPersonalCenter/affiliatedOrganizations">归属组织</router-link></li>
        <li><router-link to="/studentPersonalCenter/myMessages">我的消息</router-link></li>
        <li><router-link to="/studentPersonalCenter/activityRecords">活动记录</router-link></li>
        <li><router-link to="/studentPersonalCenter/publishActivity">发布活动</router-link></li>
        <li><router-link to="/studentPersonalCenter/activityAdmissions">活动录取</router-link></li>
        <li><router-link to="/studentPersonalCenter/securitySettings">安全设置</router-link></li>
        <!-- 可以继续添加其他模块的链接 -->
      </ul>
    </aside>
    <main class="main-content">
     <router-view @avatar-updated="loadUserInfo" /> <!-- 子页面内容显示在这里 -->
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStudentStore } from '@/stores/student'
import myAxios from '@/request'

const studentStore = useStudentStore()
const userInfo = ref({
  avatarUrl: '',
  name: ''
})

// 获取用户信息
const loadUserInfo = async () => {
  try {
    // 获取学生基本信息
    const { data: response } = await myAxios.get(
      `/api/studentPersonalCenter/studentPersonalInfo/${studentStore.data.id}`
    )
    
    if (response.code === 0) {
      const studentData = response.data
      userInfo.value.name = studentData.student_name

      // 如果有头像ID，获取头像URL
      if (studentData.student_avatar_id) {
        const { data: imageRes } = await myAxios.get(
          `/api/studentPersonalCenter/image/${studentData.student_avatar_id}`
        )
        if (imageRes.code === 0) {
          userInfo.value.avatarUrl = imageRes.data.url
        }
      }
    }
  } catch (error) {
    console.error('加载用户信息失败', error)
  }
}

onMounted(() => {
  loadUserInfo()
})
</script>


<style scoped>
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  margin-bottom: 20px; /* 与导航链接的间距 */
}

.avatar {
  width: 80px; /* 头像宽度 */
  height: 80px; /* 头像高度 */
  border-radius: 50%; /* 圆形头像 */
  object-fit: cover; /* 保持图像比例 */
  margin-bottom: 10px; /* 与用户名的间距 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 可选：添加阴影 */
}

.username {
  font-size: 18px; /* 用户名字体大小 */
  font-weight: bold;
  color: #333; /* 用户名颜色 */
}


.layout {
  display: flex; /* 左右布局 */
  height: 100vh; /* 让整个布局占满视口高度 */
  margin-left: 140px;
  gap: 40px;
  background-color: #f8f9fa; /*浅灰*/ 
  box-sizing: border-box;
}

.sidebar {
  width: 200px;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar h2 {
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.sidebar li {
  text-align: center;
  margin: 20px 0;
}

.sidebar a {
  text-decoration: none;
  color: #333;
  font-size: 20px;
}

.sidebar a.router-link-active {
  font-weight: bold;
  color: #007bff;
}

.main-content {
  flex: 1; /* 占据剩余空间 */
  padding: 20px;
  overflow-y: auto; /* 如果内容超出，则滚动 */

  background-color: #ffffff;
  margin-right: 100px;
}


</style>
