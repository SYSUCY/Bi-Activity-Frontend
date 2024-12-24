<template> 
  <div id="studentForgetPage">
    <el-container>
      <el-header class="register-header">
        <h2>修改密码</h2>
        <el-link target="_blank" @click="navigateTo('/login')">想起来了！！！点击登录</el-link>
      </el-header>
      <el-main>
        <el-card>
          <el-form :model="form" ref="formRef" label-width="120px">
            <h3>邮箱找回</h3>
            <!-- 邮箱 -->
            <el-form-item label="邮箱" prop="email" :rules="rules.email">
              <el-input v-model="form.email" placeholder="请输入邮箱" />
            </el-form-item>

            <!-- 密码 -->
            <el-form-item label="新密码" prop="password" :rules="rules.password" >
              <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password/>
            </el-form-item>

            <!-- 确认密码 -->
            <el-form-item label="确认密码" prop="confirmPassword" :rules="rules.confirmPassword">
              <el-input v-model="form.confirmPassword" type="password" placeholder="请确认密码" show-password/>
            </el-form-item>

            <!-- 邮箱验证码 -->
            <el-form-item label="邮箱验证码" prop="emailCode" :rules="rules.emailCode">
              <el-input v-model="form.emailCode" placeholder="请输入邮箱验证码" >
                <template #append>
                  <el-button @click="handleSendEmailCode" :disabled="codeSending">
                    {{ codeSending ? `${countdown}s` : '获取验证码' }}
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
            <!-- 提交按钮 -->
            <el-form-item>
              <el-button type="primary" @click="submitForm">确认修改</el-button>      
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import myAxios from '@/request';

const router = useRouter();
function navigateTo(path) {
  router.push(path);
}

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  emailCode: '',
});

const formRef = ref(null);

// 密码确认校验
const validatePassword = (rule, value, callback) => {
  if (value !== form.password) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};

// 表单规则提取到 script 部分
const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, message: '密码长度至少为8个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' }
  ],
  emailCode: [
    { required: true, message: '请输入邮箱验证码', trigger: 'blur' }
  ]
};

// 获取邮箱验证码
const codeSending = ref(false);
const countdown = ref(60);

const handleSendEmailCode = async () => {
  if (!form.email || !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(form.email)) {
    ElMessage.warning('请输入正确的邮箱格式');
    return;
  }

  try {
    codeSending.value = true;
    countdown.value = 60;

    await myAxios.get(`/captcha/email/${form.email}`);

    ElMessage.success('验证码发送成功');

    timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer);
        timer = null;
        codeSending.value = false;
      }
    }, 1000);
  } catch (error) {
    codeSending.value = false;
    ElMessage.error(error.response?.data?.message || '验证码发送失败');
  }
};

// 提交表单
const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      myAxios.post('/forget/student', JSON.stringify({
        "username": form.email,
        "password": form.password,
        "confirmPassword": form.confirmPassword,
        "captchaCode": form.emailCode,
        "type": "1"
      })).then(() => {
        ElMessage.success('密码修改成功，请登录');
        navigateTo('/login');
      }).catch((error) => {
        ElMessage.error(error.response?.data?.error || '修改密码失败');
      });
    } else {
      ElMessage.warning('请完整填写表单');
    }
  });
};


let timer = null;
onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.register-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
