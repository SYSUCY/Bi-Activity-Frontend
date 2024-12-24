<template>
  <div id="collegeRegisterPage">
    <el-container>
      <el-header class="register-header">
        <h2>学院注册</h2>
        <el-link target="_blank" @click="navigateTo('/login')">已有账号？点击登录</el-link>
      </el-header>
      <el-main>
        <el-form :model="form" :rules="rules" ref="formRef" label-width="120px" class="el-form">
          <!-- 账号信息 -->
          <el-card class="form-card">
            <h3>账号信息</h3>
            <!-- 学院名称选择 -->
            <el-form-item label="学院名称" prop="collegeName">
              <el-select
                v-model="form.collegeName"
                placeholder="请选择学院名称"
                filterable
                @change="handleCollegeChange"
              >
                <el-option
                  v-for="college in collegeOptions"
                  :key="college.Name"
                  :label="college.Name"
                  :value="college.Name"
                />
              </el-select>
            </el-form-item>
            <!-- 学院账号显示 -->
            <el-form-item label="学院账号" prop="collegeAccount">
              <el-input
                v-model="form.collegeAccount"
                placeholder="学院账号"
                disabled
              />
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" type="password" placeholder="请输入密码" />
            </el-form-item>

            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input v-model="form.confirmPassword" type="password" placeholder="请确认密码" />
            </el-form-item>
          </el-card>

          <!-- 管理员信息 -->
          <el-card class="form-card">
            <h3>管理员信息</h3>
            <el-form-item label="姓名" prop="adminName">
              <el-input v-model="form.adminName" placeholder="请输入姓名" />
            </el-form-item>

            <el-form-item label="证件号码" prop="adminIDNumber">
              <el-input v-model="form.adminIDNumber" placeholder="请输入证件号码" />
            </el-form-item>

            <el-form-item label="手持身份证照">
              <el-upload
                class="upload-demo"
                :before-upload="beforeUpload"
                :on-change="handleChange"
                :show-file-list="false"
                :auto-upload="false"
              >
                <el-button size="large">上传身份证照</el-button>
              </el-upload>
              <div v-if="imageUrl">
                <img :src="imageUrl" alt="手持身份证照" style="max-width: 200px; max-height: 300px;"/>
              </div>
            </el-form-item>          

            <el-form-item label="手机号码" prop="adminPhone">
              <el-input v-model="form.adminPhone" placeholder="请输入手机号码" />
            </el-form-item>

            <el-form-item label="图形验证码">
              <el-input v-model="phoneImageCaptchaForm.imageCaptcha" placeholder="请输入验证码" />
              <img :src="phoneImageCaptchaUrl" @click="refreshPhoneImageCaptcha" alt="验证码" class="captcha-img" />
              <p class="captcha-hint">点击图片更换验证码</p>
            </el-form-item>

            <el-form-item label="短信验证码" prop="phoneCode">
              <el-input v-model="form.phoneCode" placeholder="请输入短信验证码" >
                <template #append>
                  <el-button @click="handleSendPhoneCode" :disabled="phoneCodeSending">
                    {{ phoneCodeSending ? `${phoneCountdown}s` : '获取短信验证码' }}
                  </el-button>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="adminEmail">
              <el-input v-model="form.adminEmail" placeholder="请输入邮箱" />
            </el-form-item>

            <el-form-item label="图形验证码">
              <el-input v-model="emailImageCaptchaForm.imageCaptcha" placeholder="请输入验证码" />
              <img :src="emailImageCaptchaUrl" @click="refreshEmailImageCaptcha" alt="验证码" class="captcha-img" />
              <p class="captcha-hint">点击图片更换验证码</p>
            </el-form-item>

            <!-- 邮箱验证码 -->
            <el-form-item label="邮箱验证码" prop="emailCode" :rules="rules.emailCode">
              <el-input v-model="form.emailCode" placeholder="请输入邮箱验证码" >
                <template #append>
                  <el-button @click="handleSendEmailCode" :disabled="emailCodeSending">
                    {{ emailCodeSending ? `${emailCountdown}s` : '获取邮箱验证码' }}
                  </el-button>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="邀请码" prop="inviteCode">
              <el-input v-model="form.inviteCode" placeholder="请输入邀请码" />
            </el-form-item>
          </el-card>

          <!-- 学院信息 -->
          <el-card class="form-card">
            <h3>学院信息</h3>
            <el-form-item label="所属校区" prop="campus">
              <el-select v-model="form.campus" placeholder="请选择校区">
                <el-option v-for="campus in campuses" :key="campus.value" :label="campus.label" :value="campus.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="详细地址" prop="address">
              <el-input v-model="form.address" placeholder="请输入详细地址" />
            </el-form-item>

            <el-form-item label="学院介绍" prop="collegeIntroduction">
              <el-input type="textarea" v-model="form.collegeIntroduction" placeholder="请输入学院介绍" rows="4" />
            </el-form-item>
          </el-card>

          <el-form-item>
            <el-button type="primary" @click="submitForm">注册</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { ElMessage } from 'element-plus';
import myAxios from '@/request';
import { useRouter } from 'vue-router';
const router = useRouter();
function navigateTo(path) {
  router.push(path);
}

// 表单数据
const form = reactive({
  collegeAccount: '',
  collegeName: '',
  password: '',
  confirmPassword: '',
  adminName: '',
  adminIDNumber: '',
  handIDCardId: '',
  adminPhone: '',
  phoneCode: '',
  adminEmail: '',
  emailCode: '',
  inviteCode: '',
  campus: '',
  address: '',
  collegeIntroduction: '',
});

const formRef = ref(null);

// 校验规则
const rules = {
  collegeAccount: [{ required: true, message: '请选择学院账号', trigger: 'change' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    {
      validator: (rule, value) => value === form.password,
      message: '两次密码输入不一致',
      trigger: 'blur',
    },
  ],
  adminName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  adminIDNumber: [{ required: true, message: '请输入证件号码', trigger: 'blur' }],
  adminPhone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
  phoneCode: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }],
  adminEmail: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
  ],
  emailCode: [{ required: true, message: '请输入邮箱验证码', trigger: 'blur' }],
  inviteCode: [{ required: true, message: '请输入邀请码', trigger: 'blur' }],
  campus: [{ required: true, message: '请选择校区', trigger: 'change' }],
  address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
  collegeIntroduction: [{ required: true, message: '请输入学院介绍', trigger: 'blur' }],
};

// 学院信息部分相关操作
// 学院名称选项数据
const collegeOptions = ref([])

// 页面加载时获取学院数据
const fetchCollegeData = () => {
  myAxios.get('/register/college/name_to_account').then((response) => {
    const { data } = response.data
    collegeOptions.value = data || []
  }).catch(() => {
    ElMessage.error('学院数据加载失败！')
  })
}

// 学院名称选择后填充账号
const handleCollegeChange = (selectedName) => {
  const selectedCollege = collegeOptions.value.find(
    (college) => college.Name === selectedName
  )
  form.collegeAccount = selectedCollege
    ? selectedCollege.Account
    : ''
}

// 管理员信息部分相关操作
// 图片上传，提交注册表单前，先将手持身份证照上传并获取id
const imageUrl = ref('');  // 存储图片的 URL
const handIDCardFile = ref(null);    // 存储上传的文件

const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    ElMessage.error('只能上传');
    return false;
  }
  return true; 
};

const handleChange = (file) => {
  // 更新文件和图片 URL
  file.value = file.raw;
  handIDCardFile.value = file.raw;
  const reader = new FileReader();
  reader.onload = () => {
    imageUrl.value = reader.result;
  };
  reader.readAsDataURL(file.raw);
};

const imageUpload = () => {
  try { 
    console.log('开始上传文件:', handIDCardFile.value)  

    const formData = new FormData()
    formData.append('file', handIDCardFile.value)
    
    console.log('发送请求...')
    const { data: res } = myAxios.post(
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
      form.handIDCardId = res.data.id;
    } else {
      ElMessage.error('上传失败')
    }
  } catch (error) {
    console.error('上传错误:', error)
    ElMessage.error('上传失败: ' + error.message)
  }
}

// 手机号验证相关操作
const phoneImageCaptchaForm = reactive({
  imageCaptchaId: '',
  imageCaptcha: ''
});
const phoneImageCaptchaUrl = ref('');

const refreshPhoneImageCaptcha = () => {
  myAxios.get('/captcha/image').then((response) => {
    const { data } = response;
    phoneImageCaptchaForm.imageCaptchaId = data.id;
    phoneImageCaptchaUrl.value = data.img;
  }).catch(() => {
    ElMessage.error('获取验证码失败！')
  });
};

// 获取手机验证码
const phoneCodeSending = ref(false);
const phoneCountdown = ref(60);
let phoneTimer = null;

const handleSendPhoneCode = async () => {
  if(form.adminPhone.length ===0){
    ElMessage.error('请输入手机号码');
    return 
  }
  if(form.adminPhone.length !== 11){
    ElMessage.error('手机号码长度不正确');
    return 
  }
  
  if(!phoneImageCaptchaForm.imageCaptcha){
    ElMessage.error('请输入图形验证码');
    return 
  }
  try {
    await myAxios.post('/captcha/image', phoneImageCaptchaForm)

    phoneCodeSending.value = true;
    phoneCountdown.value = 60;

    await myAxios.get(`/captcha/phone/${form.adminPhone}`);

    ElMessage.success('验证码发送成功');

    phoneTimer = setInterval(() => {
      phoneCountdown.value--;
      if (phoneCountdown.value <= 0) {
        clearInterval(phoneTimer);
        phoneTimer = null;
        phoneCodeSending.value = false;
      }
    }, 1000);
  } catch (error) {
    phoneCodeSending.value = false;
    ElMessage.error(error.response?.data?.message || '验证码发送失败');
  }
};

// 邮箱验证码相关操作
const emailImageCaptchaForm = reactive({
  imageCaptchaId: '',
  imageCaptcha: ''
});
const emailImageCaptchaUrl = ref('');

const refreshEmailImageCaptcha = () => {
  myAxios.get('/captcha/image').then((response) => {
    const { data } = response;
    emailImageCaptchaForm.imageCaptchaId = data.id;
    emailImageCaptchaUrl.value = data.img;
  }).catch(() => {
    ElMessage.error('获取验证码失败！')
  });
};


// 获取邮箱验证码
const emailCodeSending = ref(false);
const emailCountdown = ref(60);
let emailTimer = null;

const handleSendEmailCode = async () => {
  if (!form.adminEmail || !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(form.adminEmail)) {
    ElMessage.warning('请输入正确的邮箱格式');
    return;
  }

  if (!emailImageCaptchaForm.imageCaptcha) {
    ElMessage.error('请输入图形验证码');
    return;
  }

  try {
    await myAxios.post('/captcha/image', emailImageCaptchaForm);

    emailCodeSending.value = true;
    emailCountdown.value = 60;

    await myAxios.get(`/captcha/email/${form.adminEmail}`);

    ElMessage.success('验证码发送成功');

    emailTimer = setInterval(() => {
      emailCountdown.value--;
      if (emailCountdown.value <= 0) {
        clearInterval(emailTimer);
        emailTimer = null;
        emailCodeSending.value = false;
      }
    }, 1000);
  } catch (error) {
    emailCodeSending.value = false;
    ElMessage.error(error.response?.data?.message || '验证码发送失败');
  }
};

// 学院信息部分相关操作
const campuses = ref([
  { value: 1, label: '珠海校区' },
  { value: 2, label: '广州校区' },
  { value: 3, label: '深圳校区' },
]);

// 注册表单提交

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      //需要先上传手持身份证照并获取id再提交登录表单
      //imageUpload();
      form.handIDCardId = 1;
      myAxios.post('/register/college', form).then(() => {
        ElMessage.success('注册成功，请登录');
        navigateTo('/login');
      }).catch((error) => {
        console.error('注册失败:', error);
        ElMessage.error(error.response?.data?.error || '注册失败');
      });
      console.log('提交表单数据:', form);
    } else {
      console.log('表单校验失败');
    }
  });
};

onBeforeUnmount(() => {
  if(phoneTimer){
    clearInterval(phoneTimer);
  }
  if(emailTimer){
    clearInterval(emailTimer);
  }
});

onMounted(() => {
  fetchCollegeData();
  refreshPhoneImageCaptcha();
  refreshEmailImageCaptcha();
});
</script>

<style scoped>
.register-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-card {
  margin-bottom: 20px;
}

.captcha-img {
  cursor: pointer;
  margin-top: 10px;
}

.captcha-hint {
  font-size: 12px;
  color: gray;
}

.upload-button {
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: 2px dashed #d9d9d9;
  cursor: pointer;
}

.uploaded-img img {
  max-width: 100px;
  max-height: 100px;
  margin-top: 10px;
}
</style>
