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
      <el-form-item label="学号" prop="studentId">
        <el-input v-model="form.studentId" placeholder="请输入学号" />
      </el-form-item>

      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名" />
      </el-form-item>

      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" placeholder="请输入昵称" />
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio :value="1">男</el-radio>
          <el-radio :value="2">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>

      <el-form-item label="学院" prop="college">
        <el-input v-model="form.college" disabled placeholder="请输入学院" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useStudentStore } from "@/stores/student"
import { ElMessage } from 'element-plus'
import myAxios from "@/request"

const formRef = ref(null)
const studentStore = useStudentStore()
const collegeId = ref(0)

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
const loadStudentInfo = async (studentId) => {
  try {
    const { data: response } = await myAxios.get(`/api/studentPersonalCenter/studentPersonalInfo/${studentId}`)
    const studentData = response.data

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

    // 获取学院信息
    if (studentData.college_id) {
      try {
        const { data: collegeResponse } = await myAxios.get(
          `/api/studentPersonalCenter/affiliatedOrganizations/${studentId}`
        )
        form.college = collegeResponse.data.college_name || '未知学院'
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
  if (studentStore.data.id) {
    loadStudentInfo(studentStore.data.id)
  }
}

// 组件挂载时加载数据
onMounted(() => {
  if (studentStore.data.id) {
    loadStudentInfo(studentStore.data.id)
  } else {
    ElMessage.error('用户 ID 未找到')
  }
})
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
</style>