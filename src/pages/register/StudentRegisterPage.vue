<template>
  <div id="studentRegisterPage">
    <el-container>
      <el-header class="header">
        <h2>学生注册</h2>
        <el-link target="_blank" @click="navigateTo('/login')">已有账号？点击登录</el-link>
      </el-header>
      <el-main>
        <el-form :model="form" ref="form" label-width="120px">
          <el-card class="form-card">
            <h3>基本信息</h3>
            <!-- 邮箱 -->
            <el-form-item label="邮箱" :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' }, { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] }]">
              <el-input v-model="form.email" placeholder="请输入邮箱" />
            </el-form-item>

            <!-- 密码 -->
            <el-form-item label="密码" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, message: '密码长度至少为6个字符', trigger: 'blur' }]">
              <el-input v-model="form.password" type="password" placeholder="请输入密码" />
            </el-form-item>

            <!-- 确认密码 -->
            <el-form-item label="确认密码" :rules="[{ required: true, message: '请确认密码', trigger: 'blur' }, { validator: validatePassword, trigger: 'blur' }]">
              <el-input v-model="form.confirmPassword" type="password" placeholder="请确认密码" />
            </el-form-item>

            <!-- 邮箱验证码 -->
            <el-form-item label="邮箱验证码" :rules="[{ required: true, message: '请输入邮箱验证码', trigger: 'blur' }]">
              <el-row :gutter="10">
                <el-col :span="16">
                  <el-input v-model="form.emailCaptcha" placeholder="请输入邮箱验证码" />
                </el-col>
                <el-col :span="8">
                  <el-button @click="sendEmailCaptcha" type="primary" :disabled="emailCaptchaDisabled">获取验证码</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          
          </el-card>
          <!-- 提交按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm">注册</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateTo(path) {
  router.push(path)
}

const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
  emailCaptcha: ''
});

const emailCaptchaDisabled = ref(false);

// 密码确认校验
const validatePassword = (rule, value, callback) => {
  if (value !== form.value.password) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};

// 获取邮箱验证码
const sendEmailCaptcha = () => {
  if (!form.value.email) {
    return this.$message.error('请先输入邮箱');
  }
  
  emailCaptchaDisabled.value = true;
  setTimeout(() => {
    emailCaptchaDisabled.value = false;
  }, 60000); // 60秒后可以重新获取验证码
  this.$message.success('验证码已发送');
};

// 提交表单
const submitForm = () => {
  form.value.$refs.form.validate((valid) => {
    if (valid) {
      console.log('表单提交成功：', form.value);
    } else {
      console.log('表单验证失败');
      return false;
    }
  });
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header span {
  flex: 1;
}

.form-card {
  margin-bottom: 20px;
}

</style>
