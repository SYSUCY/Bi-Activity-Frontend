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
    <el-dialog 
      v-model="phoneDialog.visible" 
      title="绑定手机号"
      width="600px"  
      class="phone-dialog"
    >
      <el-form 
        :model="phoneDialog.form" 
        :rules="phoneDialog.rules" 
        ref="phoneFormRef"
        class="phone-form"
        label-width="100px"  
      >
        <el-form-item label="手机号" prop="phone">
          <el-input 
            v-model="phoneDialog.form.phone"
            class="phone-input"
            placeholder="请输入手机号"
          >
            <template #append>
              <el-button 
                @click="handleSendPhoneCode" 
                :disabled="phoneDialog.codeSending"
                class="code-button"
              >
                {{ phoneDialog.codeSending ? `${phoneDialog.countdown}s` : '获取验证码' }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="图形验证码" prop="captcha" class="captcha-item">
          <div class="captcha-container">
            <el-input 
              v-model="phoneDialog.form.captcha" 
              class="captcha-input"
              placeholder="请输入图形验证码"
            />
            <img 
              :src="phoneDialog.captchaImage" 
              class="captcha-img"
              @click="refreshPhoneCaptcha"
              alt="验证码"
            />
          </div>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input 
            v-model="phoneDialog.form.code" 
            class="code-input"
            placeholder="请输入验证码"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="phoneDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="handleBindPhone">确认</el-button>
      </template>
    </el-dialog>

    <!-- 邮箱绑定对话框 -->
    <el-dialog 
      v-model="emailDialog.visible" 
      title="绑定邮箱"
      width="600px"  
      class="email-dialog"
    >
      <el-form 
        :model="emailDialog.form" 
        :rules="emailDialog.rules" 
        ref="emailFormRef"
        class="email-form"
        label-width="100px"  
      >
        <el-form-item label="邮箱" prop="email">
          <el-input 
            v-model="emailDialog.form.email"
            class="email-input"
            placeholder="请输入邮箱"
          >
            <template #append>
              <el-button 
                @click="handleSendEmailCode" 
                :disabled="emailDialog.codeSending"
                class="code-button"
              >
                {{ emailDialog.codeSending ? `${emailDialog.countdown}s` : '获取验证码' }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="图形验证码" prop="captcha" class="captcha-item">
          <div class="captcha-container">
            <el-input 
              v-model="emailDialog.form.captcha" 
              class="captcha-input"
              placeholder="请输入图形验证码"
            />
            <img 
              :src="emailDialog.captchaImage"
              class="captcha-img"
              @click="refreshEmailCaptcha"
              alt="验证码"
            />
          </div>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input 
            v-model="emailDialog.form.code" 
            class="code-input"
            placeholder="请输入验证码"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="emailDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="handleBindEmail">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useLoginStore } from '@/stores/login'
import myAxios from '@/request'

const studentStore = useLoginStore()
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
  passwordDialog.form.oldPassword = ''
  passwordDialog.form.newPassword = ''
  passwordDialog.form.confirmPassword = ''
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
  codeSending: false,
  countdown: 60,
  captchaImage: '',
  captchaId: '',
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
    captcha: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }],
  },
})

const emailDialog = reactive({
  visible: false,
  codeSending: false,
  countdown: 60,
  captchaImage: '',
  captchaId: '',
  form: {
    email: '',
    code: '',
    captcha: '', 
  },
  rules: {
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
    ],
    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
    captcha: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }],
  },
})

const showPhoneDialog = () => {
  phoneDialog.visible = true
  refreshPhoneCaptcha()
}

const showEmailDialog = () => {
  emailDialog.visible = true
  refreshEmailCaptcha()
}

// 手机验证的刷新验证码方法
const refreshPhoneCaptcha = async () => {
  try {
    const { data: res } = await myAxios.get('/api/studentPersonalCenter/securitySettings/captcha')
    if (res.code === 0) {
      phoneDialog.captchaImage = res.data.captcha_image
      phoneDialog.captchaId = res.data.captcha_id
      phoneDialog.form.captcha = ''
    }
  } catch (error) {
    ElMessage.error('获取验证码失败')
  }
}

const refreshEmailCaptcha = async () => {
  try {
    const { data: res } = await myAxios.get('/api/studentPersonalCenter/securitySettings/captcha')
    if (res.code === 0) {
      emailDialog.captchaImage = res.data.captcha_image
      emailDialog.captchaId = res.data.captcha_id
      emailDialog.form.captcha = ''
    }
  } catch (error) {
    console.error('获取验证码失败:', error)
    ElMessage.error('获取验证码失败')
  }
}

const handleSendPhoneCode = async () => {
  try {
    // 验证手机号格式
    if (!phoneDialog.form.phone || !/^1[3-9]\d{9}$/.test(phoneDialog.form.phone)) {
      ElMessage.warning('请输入正确的手机号格式')
      return
    }

    // 验证图形验证码
    if (!phoneDialog.form.captcha) {
      ElMessage.warning('请输入图形验证码')
      return
    }

    // 先验证图形验证码
    await myAxios.post('/api/studentPersonalCenter/securitySettings/captcha/verify', {
      captcha_id: phoneDialog.captchaId,
      captcha_code: phoneDialog.form.captcha
    })

    phoneDialog.codeSending = true
    phoneDialog.countdown = 60

    // 发送验证码
    await myAxios.post(
      `/api/studentPersonalCenter/securitySettings/${studentStore.data.id}/phone/code`,
      { phone: phoneDialog.form.phone }
    )

    ElMessage.success('验证码发送成功')

    // 开始倒计时
    const timer = setInterval(() => {
      phoneDialog.countdown--
      if (phoneDialog.countdown <= 0) {
        clearInterval(timer)
        phoneDialog.codeSending = false
      }
    }, 1000)
  } catch (error) {
    phoneDialog.codeSending = false
    ElMessage.error(error.response?.data?.message || '验证码发送失败')
  }
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
    // 重置手机绑定对话框的表单
    phoneDialog.form.phone = ''
    phoneDialog.form.code = ''
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(error.response?.data?.message || '手机号解绑失败')
    }
  }
}

// 处理发送邮箱验证码
const handleSendEmailCode = async () => {
  try {
    // 验证邮箱格式
    if (!emailDialog.form.email || !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(emailDialog.form.email)) {
      ElMessage.warning('请输入正确的邮箱格式')
      return
    }

    // 验证图形验证码
    if (!emailDialog.form.captcha) {
      ElMessage.warning('请输入图形验证码')
      return
    }

    // 先验证图形验证码
    await myAxios.post('/api/studentPersonalCenter/securitySettings/captcha/verify', {
      captcha_id: emailDialog.captchaId,
      captcha_code: emailDialog.form.captcha
    })

    emailDialog.codeSending = true
    emailDialog.countdown = 60

    // 发送验证码
    await myAxios.post(
      `/api/studentPersonalCenter/securitySettings/${studentStore.data.id}/email/code`,
      { email: emailDialog.form.email }
    )

    ElMessage.success('验证码发送成功')

    // 开始倒计时
    const timer = setInterval(() => {
      emailDialog.countdown--
      if (emailDialog.countdown <= 0) {
        clearInterval(timer)
        emailDialog.codeSending = false
      }
    }, 1000)
  } catch (error) {
    emailDialog.codeSending = false
    ElMessage.error(error.response?.data?.message || '验证码发送失败')
  }
}

// 处理绑定邮箱
const handleBindEmail = async () => {
  try {
    await myAxios.post(
      `/api/studentPersonalCenter/securitySettings/${studentStore.data.id}/email`,
      emailDialog.form
    )
    ElMessage.success('邮箱绑定成功')
    emailDialog.visible = false
    loadSecurityInfo()
  } catch (error) {
    ElMessage.error(error.response?.data?.message || '邮箱绑定失败')
  }
}

// 处理解绑邮箱
const handleUnbindEmail = async () => {
  try {
    await ElMessageBox.confirm('确定要解绑邮箱吗？', '提示', {
      type: 'warning',
    })
    await myAxios.delete(
      `/api/studentPersonalCenter/securitySettings/${studentStore.data.id}/email`
    )
    ElMessage.success('邮箱解绑成功')
    loadSecurityInfo()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error(error.response?.data?.message || '邮箱解绑失败')
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

.email-form {
  padding: 0 20px;
}

.email-input {
  width: 400px;  /* 邮箱输入框宽度 */
}

.code-input {
  width: 300px;  /* 验证码输入框宽度 */
}

:deep(.email-dialog) {
  border-radius: 8px;
}

:deep(.el-dialog__body) {
  padding: 20px 0;  /* 减小内边距 */
}

:deep(.el-dialog__header) {
  margin-right: 0;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
}

:deep(.el-dialog__footer) {
  padding: 10px 20px 20px;
  border-top: 1px solid #f0f0f0;
}

.captcha-container {
  display: flex;
  align-items: center;
  gap: 15px;  
}

.captcha-input {
  flex: 1;    /* 让输入框占据剩余空间 */
  max-width: 150px;  
}

.captcha-img {
  height: 32px;  /* 和输入框高度保持一致 */
  border: 1px solid #dcdfe6;  
  border-radius: 4px;  
  cursor: pointer;  
}
</style>