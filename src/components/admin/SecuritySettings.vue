<template>
  <div class="security-settings">
    <h1>安全设置</h1>
    
    <el-form 
      :model="passwordForm" 
      :rules="rules" 
      ref="formRef" 
      label-width="100px" 
      class="settings-form"
    >
      <el-form-item label="原密码" prop="oldPassword">
        <el-input 
          v-model="passwordForm.oldPassword" 
          type="password" 
          show-password
          placeholder="请输入原密码" 
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input 
          v-model="passwordForm.newPassword" 
          type="password" 
          show-password
          placeholder="请输入新密码" 
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input 
          v-model="passwordForm.confirmPassword" 
          type="password" 
          show-password
          placeholder="请确认新密码" 
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleUpdatePassword">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useLoginStore } from '@/stores/login'
import myAxios from '@/request'

const studentStore = useLoginStore()
const formRef = ref(null)

// 密码表单数据
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// 表单验证规则
const rules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 处理密码更新
const handleUpdatePassword = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    
    await myAxios.put(
      '/api/studentPersonalCenter/securitySettings/password',
      {
        old_password: passwordForm.oldPassword,
        new_password: passwordForm.newPassword,
        confirm_password: passwordForm.confirmPassword,
      }
    )
    
    ElMessage.success('密码修改成功')
    
    // 清空表单
    passwordForm.oldPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
    
    // 重置表单校验结果
    formRef.value.resetFields()
    
  } catch (error) {
    if (error.response) {
      ElMessage.error(error.response.data.message || '密码修改失败')
    }
  }
}
</script>

<style scoped>
.security-settings {
  padding: 20px;
}

.settings-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.el-form-item:last-child {
  margin-bottom: 0;
}

:deep(.el-input) {
  max-width: 300px;
}
</style>