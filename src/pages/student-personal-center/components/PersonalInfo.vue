<template>
  <div class="personal-info">
    <h1>个人基本信息</h1>
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="80px"
      class="info-form"
    >
      <!-- 添加头像上传区域 -->
      <el-form-item label="头像">
        <div class="avatar-upload">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :http-request="customUpload"
            accept=".jpg,.jpeg,.png"
            :before-upload="beforeAvatarUpload"
          >
            <img 
              v-if="form.avatarUrl" 
              :src="form.avatarUrl" 
              class="avatar" 
            />
            <div v-else class="avatar-placeholder">
              <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
              <span>点击上传</span>
            </div>
          </el-upload>
        </div>
      </el-form-item>

      <el-form-item label="学号" prop="studentId">
        <el-input v-model="form.studentId" 
          readonly
          placeholder="请输入学号" 
        />
      </el-form-item>

      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" 
          readonly
          placeholder="请输入姓名" 
        />
      </el-form-item>

      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" 
          readonly
          placeholder="请输入昵称" 
        />
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender" class="custom-readonly-radio">
          <el-radio :value="1" disabled>男</el-radio>
          <el-radio :value="2" disabled>女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="手机" prop="phone">
        <el-input 
          v-model="form.phone" 
          readonly
          placeholder="请输入手机号" 
          
        />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input 
          v-model="form.email" 
          readonly
          placeholder="未绑定邮箱" 
          
        />
      </el-form-item>

      <el-form-item label="学院" prop="college">
        <el-input 
          v-model="form.college" 
          readonly
          placeholder="未加入学院" 
          
        />
      </el-form-item>

      <!-- <el-form-item>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useLoginStore } from "@/stores/login"
import { ElMessage } from 'element-plus'
import myAxios from "@/request"

const formRef = ref(null)
const studentStore = useLoginStore()
const collegeId = ref(0)
const emit = defineEmits(['avatar-updated'])

// 表单数据
const form = reactive({
  studentId: '',
  name: '',
  nickname: '',
  gender: 1,
  phone: '',
  email: '',
  college: '',
})

// 表单验证规则
const rules = {
  studentId: [{ required: true, message: '请输入学号', trigger: 'blur' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ],
  college: [{ required: true, message: '请输入学院名称', trigger: 'blur' }]
}

// 获取学生信息
const loadStudentInfo = async () => {
  try {
    // 获取学生基本信息
    const response = await myAxios.get('/api/studentPersonalCenter/studentPersonalInfo')
    const studentData = response.data.data

    // 更新表单数据
    Object.assign(form, {
      studentId: studentData.student_id || '',
      name: studentData.student_name || '',
      nickname: studentData.nickname || '',
      gender: studentData.gender || 1,
      phone: studentData.student_phone || '',
      email: studentData.student_email || '',
    })

    collegeId.value = studentData.college_id

    // 加载头像
    if (studentData.student_avatar_id) {
      const imageResponse = await myAxios.get(
        `/api/studentPersonalCenter/image/${studentData.student_avatar_id}`
      )
      if (imageResponse.data.code === 0) {
        form.avatarUrl = imageResponse.data.data.url
      }
    }

    // 获取学院信息
    if (studentData.college_id) {
      try {
        const collegeResponse = await myAxios.get(
          '/api/studentPersonalCenter/affiliatedOrganizations/student'
        )
        form.college = collegeResponse.data.data.college_name || '未知学院'
      } catch (error) {
        console.error('获取学院信息失败', error)
        form.college = '获取学院信息失败'
      }
    } else {
      form.college = '暂无学院'
    }
  } catch (error) {
    console.error('加载用户信息失败', error)
    ElMessage.error('加载用户信息失败')
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    
    const payload = {
      student_id: form.studentId,
      student_name: form.name,
      nickname: form.nickname,
      gender: form.gender,
      student_phone: form.phone,
      student_email: form.email,
      college_id: collegeId.value,
    }

    await myAxios.put(
      `/api/studentPersonalCenter/studentPersonalInfo/${studentStore.data.id}`,
      payload
    )
    
    ElMessage.success('信息已保存')
  } catch (error) {
    console.error('保存失败', error)
    ElMessage.error('保存失败，请稍后再试')
  }
}

// 重置表单
const handleReset = () => {
  form.studentId = ''
  form.nickname = ''
  form.name = ''
}

// 组件挂载时加载数据
onMounted(() => {
  loadStudentInfo()
})

// 添加更新头像的方法
const handleUpdateAvatar = async (imageId) => {
  try {
    const { data: res } = await myAxios.put(
      '/api/studentPersonalCenter/studentPersonalInfo',
      {
        student_avatar_id: imageId
      }
    )
    if (res.code === 0) {
      ElMessage.success('头像更新成功')
      // 更新父组件（Layout）中的头像
      emit('avatar-updated')
    }
  } catch (error) {
    console.error('更新头像失败:', error)
    ElMessage.error('头像更新失败')
  }
}

// customUpload 方法，添加错误处理
const customUpload = async (options) => {
  try {
    console.log('开始上传文件:', options.file)
    
    const formData = new FormData()
    formData.append('file', options.file)
    
    console.log('发送请求...')
    const { data: res } = await myAxios.post(
      '/api/studentPersonalCenter/image/upload', 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    console.log('上传响应:', res)

    if (res.code === 0) {
      form.avatarUrl = res.data.url
      // 更新学生信息中的头像ID
      await handleUpdateAvatar(res.data.id)
    } else {
      ElMessage.error('上传失败')
    }
  } catch (error) {
    console.error('上传错误:', error)
    ElMessage.error('上传失败: ' + error.message)
  }
}
</script>

<style scoped>
.personal-info {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  color: #333;
  font-size: 20px;
}

.info-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #8c939d;
}


.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s;
  width: 100px;  /* 增加宽度 */
  height: 100px; /* 增加高度 */
  margin: 0 auto;
}

.avatar-uploader:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;    /* 对应容器宽度 */
  height: 100px;   /* 对应容器高度 */
  text-align: center;
  line-height: 100px;
}

.avatar {
  width: 100px;    /* 对应容器宽度 */
  height: 100px;   /* 对应容器高度 */
  display: block;
  object-fit: cover;
}

.custom-disabled-input :deep(.el-input__inner) {
  background-color: #fff !important;  /* 浅灰色背景 */
  color: #909399 !important;             /* 灰色文字 */
  -webkit-text-fill-color: #909399 !important;
  border-color: #e4e7ed !important;      /* 浅灰色边框 */
  cursor: not-allowed;
}

.custom-readonly-radio :deep(.el-radio) {
  cursor: not-allowed;
}

.custom-readonly-radio :deep(.el-radio__input.is-disabled + .el-radio__label) {
  color: #606266 !important;  /* 正常文本颜色 */
  cursor: not-allowed;
}

.custom-readonly-radio :deep(.el-radio__input.is-disabled.is-checked .el-radio__inner) {
  background-color: #409eff !important;  /* 选中状态保持蓝色 */
  border-color: #409eff !important;
}

.custom-readonly-radio :deep(.el-radio__input.is-disabled .el-radio__inner) {
  background-color: #ffffff !important;  /* 未选中状态保持白色 */
  border-color: #dcdfe6 !important;
}


</style>