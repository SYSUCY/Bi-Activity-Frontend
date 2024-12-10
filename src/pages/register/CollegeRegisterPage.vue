<template>
  <div id="collegeRegisterPage">
    <el-container>
      <el-header class="header">
        <h2>学院注册</h2>
        <el-link target="_blank" @click="navigateTo('/login')">已有账号？点击登录</el-link>
      </el-header>
      <el-main>
        <el-form :model="form" ref="form" label-width="120px" class="el-form">
          <!-- 账号信息 -->
          <el-card class="form-card">
            <h3>账号信息</h3>
            <el-form-item label="学院账号" :rules="[{ required: true, message: '请选择学院账号', trigger: 'change' }]">
              <el-select v-model="form.college" placeholder="请选择学院">
                <el-option v-for="college in colleges" :key="college.value" :label="college.label" :value="college.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="密码" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
              <el-input v-model="form.password" type="password" placeholder="请输入密码" />
            </el-form-item>

            <el-form-item label="确认密码" :rules="[{ required: true, message: '请确认密码', trigger: 'blur' }]">
              <el-input v-model="form.confirmPassword" type="password" placeholder="请确认密码" />
            </el-form-item>
          </el-card>

          <!-- 管理员信息 -->
          <el-card class="form-card">
            <h3>管理员信息</h3>
            <el-form-item label="姓名" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]">
              <el-input v-model="form.name" placeholder="请输入姓名" />
            </el-form-item>

            <el-form-item label="证件号码" :rules="[{ required: true, message: '请输入证件号码', trigger: 'blur' }]">
              <el-input v-model="form.idCard" placeholder="请输入证件号码" />
            </el-form-item>

            <el-form-item label="证件照片">
              <el-upload
                class="upload-demo"
                action=""
                :show-file-list="false"
                :on-success="handleSuccess"
                :before-upload="beforeUpload"
                :limit="1"
              >
                <el-button size="small" type="primary">上传证件照片</el-button>
                <div v-if="form.idCardImage" class="uploaded-img">
                  <img :src="form.idCardImage" alt="证件照片" />
                </div>
              </el-upload>
            </el-form-item>

            <el-form-item label="手机号码" :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' }]">
              <el-input v-model="form.phone" placeholder="请输入手机号码" />
            </el-form-item>

            <el-form-item label="图形验证码" :rules="[{ required: true, message: '请输入图形验证码', trigger: 'blur' }]">
              <el-input v-model="form.imageCaptcha" placeholder="请输入图形验证码" />
            </el-form-item>

            <el-form-item label="短信验证码" :rules="[{ required: true, message: '请输入短信验证码', trigger: 'blur' }]">
              <el-row :gutter="10">
                <el-col :span="16">
                  <el-input v-model="form.smsCaptcha" placeholder="请输入短信验证码" />
                </el-col>
                <el-col :span="8">
                  <el-button @click="sendSmsCaptcha" type="primary" :disabled="smsCaptchaDisabled">获取验证码</el-button>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="邮箱" :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' }]">
              <el-input v-model="form.email" placeholder="请输入邮箱" />
            </el-form-item>

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

            <el-form-item label="邀请码" :rules="[{ required: true, message: '请输入邀请码', trigger: 'blur' }]">
              <el-input v-model="form.inviteCode" placeholder="请输入邀请码" />
            </el-form-item>
          </el-card>

          <!-- 学院信息 -->
          <el-card class="form-card">
            <h3>学院信息</h3>
            <el-form-item label="所属校区" :rules="[{ required: true, message: '请选择校区', trigger: 'change' }]">
              <el-select v-model="form.campus" placeholder="请选择校区">
                <el-option v-for="campus in campuses" :key="campus.value" :label="campus.label" :value="campus.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="详细地址" :rules="[{ required: true, message: '请输入详细地址', trigger: 'blur' }]">
              <el-input v-model="form.address" placeholder="请输入详细地址" />
            </el-form-item>

            <el-form-item label="学院介绍" :rules="[{ required: true, message: '请输入学院介绍', trigger: 'blur' }]">
              <el-input type="textarea" v-model="form.introduction" placeholder="请输入学院介绍" rows="4" />
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
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateTo(path) {
  router.push(path)
}

const form = ref({
  college: '',
  password: '',
  confirmPassword: '',
  name: '',
  idCard: '',
  idCardImage: '',
  phone: '',
  imageCaptcha: '',
  smsCaptcha: '',
  email: '',
  emailCaptcha: '',
  inviteCode: '',
  campus: '',
  address: '',
  introduction: ''
});

const colleges = [
  { label: '计算机学院', value: 'computer' },
  { label: '电子学院', value: 'electronics' },
  { label: '机械学院', value: 'mechanical' },
  { label: '土木学院', value: 'civil' }
];

const campuses = [
  { label: '南校区', value: 'south' },
  { label: '北校区', value: 'north' }
];

const smsCaptchaDisabled = ref(false);
const emailCaptchaDisabled = ref(false);

// 验证图形验证码
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    alert('请上传图片文件');
  }
  return isImage;
};

// 上传证件照片后的处理
const handleSuccess = (response, file, fileList) => {
  form.value.idCardImage = URL.createObjectURL(file.raw);
};

// 获取短信验证码
const sendSmsCaptcha = () => {
  smsCaptchaDisabled.value = true;
  setTimeout(() => {
    smsCaptchaDisabled.value = false;
  }, 60000); // 60秒内不能重复发送
};

// 获取邮箱验证码
const sendEmailCaptcha = () => {
  emailCaptchaDisabled.value = true;
  setTimeout(() => {
    emailCaptchaDisabled.value = false;
  }, 60000); // 60秒内不能重复发送
};

// 提交表单
const submitForm = () => {
  console.log(form.value);
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

.upload-demo {
  margin-top: 10px;
}

.uploaded-img img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-top: 10px;
}
</style>