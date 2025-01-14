<template>
  <div class="activity-publish">
    <el-form 
      :model="form" 
      :rules="rules" 
      ref="formRef" 
      label-width="120px"
      class="publish-form"
    >
      <!-- 基本信息 -->
      <el-form-item label="活动名称" prop="ActivityName">
        <el-input v-model="form.ActivityName" placeholder="请输入活动名称" />
      </el-form-item>

      <el-form-item label="活动类型" prop="ActivityTypeID">
        <el-select v-model="form.ActivityTypeID" placeholder="请选择活动类型">
          <el-option
            v-for="type in typeList"
            :key="type.id"
            :label="type.typeName"
            :value="type.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="活动地址" prop="ActivityAddress">
        <el-input v-model="form.ActivityAddress" placeholder="请输入活动地址" />
      </el-form-item>

      <el-form-item label="活动简介" prop="ActivityIntroduction">
        <el-input 
          v-model="form.ActivityIntroduction" 
          type="textarea" 
          rows="3"
          placeholder="请输入活动简介" 
        />
      </el-form-item>

      <el-form-item label="活动内容" prop="ActivityContent">
        <el-input 
          v-model="form.ActivityContent" 
          type="textarea" 
          rows="5"
          placeholder="请输入活动内容" 
        />
      </el-form-item>

      <!-- 时间设置 -->
      <el-form-item label="活动日期" prop="ActivityDate">
        <el-date-picker
          v-model="form.ActivityDate"
          type="date"
          placeholder="选择活动日期"
        />
      </el-form-item>

      <el-form-item label="活动时间" prop="ActivityTime">
        <el-col :span="11">
          <el-time-picker
            v-model="form.StartTime"
            placeholder="开始时间"
          />
        </el-col>
        <el-col :span="2" class="text-center">-</el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.EndTime"
            placeholder="结束时间"
          />
        </el-col>
      </el-form-item>

      <!-- 报名设置 -->
      <el-form-item label="招募人数" prop="RecruitmentNumber">
        <el-input-number 
          v-model="form.RecruitmentNumber" 
          :min="1" 
          :max="999"
        />
      </el-form-item>

      <el-form-item label="报名限制" prop="RegistrationRestrictions">
        <el-select v-model="form.RegistrationRestrictions" placeholder="请选择报名限制">
          <el-option label="不限制" :value="1" />
          <el-option label="仅本院学生" :value="2" />
          <el-option label="仅本校学生" :value="3" />
        </el-select>
      </el-form-item>

      <el-form-item label="报名要求" prop="RegistrationRequirement">
        <el-input 
          v-model="form.RegistrationRequirement" 
          type="textarea" 
          rows="3"
          placeholder="请输入报名要求" 
        />
      </el-form-item>

      <el-form-item label="报名截止时间" prop="RegistrationDeadline">
        <el-date-picker
          v-model="form.RegistrationDeadline"
          type="datetime"
          placeholder="选择报名截止时间"
        />
      </el-form-item>

      <!-- 联系人信息 -->
      <el-form-item label="联系人姓名" prop="ContactName">
        <el-input v-model="form.ContactName" placeholder="请输入联系人姓名" />
      </el-form-item>

      <el-form-item label="联系人电话" prop="ContactDetails">
        <el-input v-model="form.ContactDetails" placeholder="请输入联系人电话" />
      </el-form-item>

      <el-form-item label="活动图片：">
        <el-upload class="avatar-uploader" action="http://127.0.0.1:8080/college/upload"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-error="handleAvatarError"
          :show-file-list="false">
          <img v-if="form.ActivityImageUrl" :src="form.ActivityImageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">发布活动</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
      
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import myAxios from '@/request'
import {getActivityTypeList} from "@/api/home/home.js";
import { Plus } from '@element-plus/icons-vue'

const formRef = ref(null)

const form = reactive({
	ActivityName: '',
	ActivityTypeID: null,
	ActivityAddress: '',
	ActivityIntroduction: '',
	ActivityContent: '',
	ActivityImageUrl: '',
	ActivityDate: '',
	StartTime: '',
	EndTime: '',
	RecruitmentNumber: 1,
	RegistrationRestrictions: '',
	RegistrationRequirement: '',
	RegistrationDeadline: '',
	ContactName: '',
	ContactDetails: ''
})

// 表单验证规则
const rules = {
  ActivityName: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  ActivityTypeID: [
    { required: true, message: '请选择活动类型', trigger: 'change' }
  ],
  ActivityAddress: [
    { required: true, message: '请输入活动地址', trigger: 'blur' }
  ],
  ActivityIntroduction: [
    { required: true, message: '请输入活动简介', trigger: 'blur' }
  ],
  ActivityContent: [
    { required: true, message: '请输入活动内容', trigger: 'blur' }
  ],
  ActivityDate: [
    { required: true, message: '请选择活动日期', trigger: 'change' }
  ],
  StartTime: [
    { required: true, message: '请选择开始时间', trigger: 'change' }
  ],
  EndTime: [
    { required: true, message: '请选择结束时间', trigger: 'change' }
  ],
  RecruitmentNumber: [
    { required: true, message: '请输入招募人数', trigger: 'change' }
  ],
  RegistrationRestrictions: [
    { required: true, message: '请选择报名限制', trigger: 'change' }
  ],
  RegistrationRequirement: [
    { required: true, message: '请输入报名要求', trigger: 'blur' }
  ],
  RegistrationDeadline: [
    { required: true, message: '请选择报名截止时间', trigger: 'change' }
  ],
  ContactName: [
    { required: true, message: '请输入联系人姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  ContactDetails: [
    { required: true, message: '请输入联系人电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ]
}

// 提交表单
const submit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    
    // 格式化日期和时间
    const formData = {
      ...form,
      ActivityDate: formatDateTime(form.ActivityDate),
      StartTime: formatDateTime(form.StartTime),
      EndTime: formatDateTime(form.EndTime),
      RegistrationDeadline: formatDateTime(form.RegistrationDeadline)
    }

    await myAxios.post('/college/activityManagement/activityRelease', formData)
    
    ElMessage.success('活动发布成功')
    reset() // 重置表单
  } catch (error) {
    console.error('发布失败:', error)
    ElMessage.error(error.response?.data?.message || '发布失败，请稍后重试')
  }
}

// 重置表单
const reset = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
}

// 日期时间格式化函数
const formatDateTime = (date) => {
  if (!date) return ''
  return new Date(date).toISOString().slice(0, 19).replace('T', ' ')
}

const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg';
  const isPNG = file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG && !isPNG) {
    alert('上传头像图片只能是 JPG/PNG 格式!');
    return false;
  }
  if (!isLt2M) {
    alert('上传头像图片大小不能超过 2MB!');
    return false;
  }
  return true;
};

const handleAvatarSuccess = (response, file) => {
  alert(response.data)
  if (response.label === 200) {
    form.ActivityImageUrl = response.data;
  } else {
    alert('上传失败：' + response.msg);
  }
};

const handleAvatarError = () => {
  alert('上传失败，请重试');
};

// 获取活动类型列表
const typeList = ref([]);
onMounted(async () => {
  try {
    const res = await getActivityTypeList();
    console.log(res.data)
    if (res.data.label === 200) {
      typeList.value = res.data.data;
    } else {
      console.error("Failed to fetch activity type list:", res.data.error);
    }
  } catch (error) {
    console.error("Panic to fetch activity type list:", error);
  }
});

</script>

<style scoped>
.activity-publish {
  padding: 20px;
}

.publish-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

h1 {
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  text-align: center;
}

.text-center {
  text-align: center;
}

.el-form-item:last-child {
  margin-bottom: 0;
}

/* 时间选择器样式 */
.el-date-picker,
.el-time-picker {
  width: 100%;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>