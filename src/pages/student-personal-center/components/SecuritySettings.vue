// src/pages/student-personal-center/components/SecuritySettings.vue
<template>
  <div class="security-settings">
    <h1>安全设置</h1>
    
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px" class="settings-form">
      <!-- 密码修改部分 -->
      <el-form-item label="修改密码">
        <el-button @click="showPasswordDialog">修改密码</el-button>
      </el-form-item>

      <!-- 手机绑定部分 -->
      <el-form-item label="手机绑定">
        <template v-if="form.phone">
          <span>{{ form.phone }}</span>
          <el-button type="text" @click="handleUnbindPhone">解绑</el-button>
        </template>
        <el-button v-else @click="showPhoneDialog">绑定手机号</el-button>
      </el-form-item>

      <!-- 邮箱绑定部分 -->
      <el-form-item label="邮箱绑定">
        <template v-if="form.email">
          <span>{{ form.email }}</span>
          <el-button type="text" @click="handleUnbindEmail">解绑</el-button>
        </template>
        <el-button v-else @click="showEmailDialog">绑定邮箱</el-button>
      </el-form-item>

      <!-- 账号注销 -->
      <el-form-item>
        <el-button type="danger" @click="showDeleteDialog">注销账号</el-button>
      </el-form-item>
    </el-form>

    <!-- 修改密码对话框 -->
    <el-dialog v-model="passwordDialog.visible" title="修改密码">
      <el-form :model="passwordDialog.form" :rules="passwordDialog.rules" ref="passwordFormRef">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="passwordDialog.form.oldPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passwordDialog.form.newPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="passwordDialog.form.confirmPassword" type="password" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="passwordDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="handleUpdatePassword">确认</el-button>
      </template>
    </el-dialog>

    <!-- 手机绑定对话框 -->
    <el-dialog v-model="phoneDialog.visible" title="绑定手机号">
      <el-form :model="phoneDialog.form" :rules="phoneDialog.rules" ref="phoneFormRef">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="phoneDialog.form.phone">
            <template #append>
              <el-button @click="handleSendPhoneCode">获取验证码</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="phoneDialog.form.code" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="phoneDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="handleBindPhone">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStudentStore } from '@/stores/student'
import myAxios from '@/request'

const studentStore = useStudentStore()
const formRef = ref(null)

// 基本表单数据
const form = reactive({
  phone: '',
  email: '',
})

// 加载安全设置信息
const loadSecurityInfo = async () => {
  try {
    const { data: res } = await myAxios.get(`/api/studentPersonalCenter/securitySettings/${studentStore.data.id}`)
    form.phone = res.data.phone
    form.email = res.data.email
  } catch (error) {
    ElMessage.error('加载安全设置信息失败')
  }
}

// 密码修改相关
const passwordDialog = reactive({
  visible: false,
  form: {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
  rules: {
    oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
    newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
    confirmPassword: [{ required: true, message: '请确认新密码', trigger: 'blur' }],
  },
})

const showPasswordDialog = () => {
  passwordDialog.visible = true
}

const handleUpdatePassword = async () => {
  try {
    const { oldPassword, newPassword, confirmPassword } = passwordDialog.form
    await myAxios.put(
      `/api/studentPersonalCenter/securitySettings/${studentStore.data.id}/password`,
      {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }
    )
    ElMessage.success('密码修改成功')
    passwordDialog.visible = false
  } catch (error) {
    ElMessage.error(error.response?.data?.message || '密码修改失败')
  }
}

// 手机绑定相关
const phoneDialog = reactive({
  visible: false,
  form: {
    phone: '',
    code: '',
  },
  rules: {
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' },
    ],
    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  },
})

const showPhoneDialog = () => {
  phoneDialog.visible = true
}

const handleSendPhoneCode = async () => {
  // TODO: 实现发送验证码逻辑
  ElMessage.success('验证码发送成功')
}

const handleBindPhone = async () => {
  try {
    await myAxios.post(
      `/api/studentPersonalCenter/securitySettings/${studentStore.data.id}/phone`,
      phoneDialog.form
    )
    ElMessage.success('手机号绑定成功')
    phoneDialog.visible = false
    loadSecurityInfo()
  } catch (error) {
    ElMessage.error(error.response?.data?.message || '手机号绑定失败')
  }
}

const handleUnbindPhone = async () => {
  try {
    await ElMessageBox.confirm('确定要解绑手机号吗？', '提示', {
      type: 'warning',
    })
    await myAxios.delete(
      `/api/studentPersonalCenter/securitySettings/${studentStore.data.id}/phone`
    )
    ElMessage.success('手机号解绑成功')
    loadSecurityInfo()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(error.response?.data?.message || '手机号解绑失败')
    }
  }
}

onMounted(() => {
  loadSecurityInfo()
})
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
</style>