<template>
  <div class="activity-publish">
    <h1>发布活动</h1>
    
    <el-form 
      :model="form" 
      :rules="rules" 
      ref="formRef" 
      label-width="120px"
      class="publish-form"
    >
      <!-- 基本信息 -->
      <el-form-item label="活动名称" prop="activity_name">
        <el-input v-model="form.activity_name" placeholder="请输入活动名称" />
      </el-form-item>

      <el-form-item label="活动性质" prop="activity_nature">
        <el-select v-model="form.activity_nature" placeholder="请选择活动性质">
          <el-option label="校级活动" :value="1" />
          <el-option label="院级活动" :value="2" />
          <el-option label="社团活动" :value="3" />
        </el-select>
      </el-form-item>

      <el-form-item label="活动类型" prop="activity_type_id">
        <el-select v-model="form.activity_type_id" placeholder="请选择活动类型">
          <el-option label="文体活动" :value="1" />
          <el-option label="学术讲座" :value="2" />
          <el-option label="志愿服务" :value="3" />
        </el-select>
      </el-form-item>

      <el-form-item label="活动地址" prop="activity_address">
        <el-input v-model="form.activity_address" placeholder="请输入活动地址" />
      </el-form-item>

      <el-form-item label="活动简介" prop="activity_introduction">
        <el-input 
          v-model="form.activity_introduction" 
          type="textarea" 
          rows="3"
          placeholder="请输入活动简介" 
        />
      </el-form-item>

      <el-form-item label="活动内容" prop="activity_content">
        <el-input 
          v-model="form.activity_content" 
          type="textarea" 
          rows="5"
          placeholder="请输入活动内容" 
        />
      </el-form-item>

      <!-- 时间设置 -->
      <el-form-item label="活动日期" prop="activity_date">
        <el-date-picker
          v-model="form.activity_date"
          type="date"
          placeholder="选择活动日期"
        />
      </el-form-item>

      <el-form-item label="活动时间" prop="activity_time">
        <el-col :span="11">
          <el-time-picker
            v-model="form.start_time"
            placeholder="开始时间"
          />
        </el-col>
        <el-col :span="2" class="text-center">-</el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.end_time"
            placeholder="结束时间"
          />
        </el-col>
      </el-form-item>

      <!-- 报名设置 -->
      <el-form-item label="招募人数" prop="recruitment_number">
        <el-input-number 
          v-model="form.recruitment_number" 
          :min="1" 
          :max="999"
        />
      </el-form-item>

      <el-form-item label="报名限制" prop="registration_restrictions">
        <el-select v-model="form.registration_restrictions" placeholder="请选择报名限制">
          <el-option label="不限制" :value="1" />
          <el-option label="仅本院学生" :value="2" />
          <el-option label="仅本校学生" :value="3" />
        </el-select>
      </el-form-item>

      <el-form-item label="报名要求" prop="registration_requirement">
        <el-input 
          v-model="form.registration_requirement" 
          type="textarea" 
          rows="3"
          placeholder="请输入报名要求" 
        />
      </el-form-item>

      <el-form-item label="报名截止时间" prop="registration_deadline">
        <el-date-picker
          v-model="form.registration_deadline"
          type="datetime"
          placeholder="选择报名截止时间"
        />
      </el-form-item>

      <!-- 联系人信息 -->
      <el-form-item label="联系人姓名" prop="contact_name">
        <el-input v-model="form.contact_name" placeholder="请输入联系人姓名" />
      </el-form-item>

      <el-form-item label="联系人电话" prop="contact_details">
        <el-input v-model="form.contact_details" placeholder="请输入联系人电话" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">发布活动</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useStudentStore } from '@/stores/student'
import myAxios from '@/request'

const studentStore = useStudentStore()
const formRef = ref(null)

// 表单数据
const form = reactive({
  activity_name: '',
  activity_nature: '',
  activity_type_id: '',
  activity_address: '',
  activity_introduction: '',
  activity_content: '',
  activity_date: '',
  start_time: '',
  end_time: '',
  recruitment_number: 1,
  registration_restrictions: '',
  registration_requirement: '',
  registration_deadline: '',
  contact_name: '',
  contact_details: '',
  activity_publisher_id: studentStore.data.id, // 设置发布者ID为当前登录学生ID
  activity_status: 1, // 1表示审核中状态
})

// 表单验证规则
const rules = {
  activity_name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  activity_nature: [
    { required: true, message: '请选择活动性质', trigger: 'change' }
  ],
  activity_type_id: [
    { required: true, message: '请选择活动类型', trigger: 'change' }
  ],
  activity_address: [
    { required: true, message: '请输入活动地址', trigger: 'blur' }
  ],
  activity_introduction: [
    { required: true, message: '请输入活动简介', trigger: 'blur' }
  ],
  activity_content: [
    { required: true, message: '请输入活动内容', trigger: 'blur' }
  ],
  activity_date: [
    { required: true, message: '请选择活动日期', trigger: 'change' }
  ],
  start_time: [
    { required: true, message: '请选择开始时间', trigger: 'change' }
  ],
  end_time: [
    { required: true, message: '请选择结束时间', trigger: 'change' }
  ],
  recruitment_number: [
    { required: true, message: '请输入招募人数', trigger: 'change' }
  ],
  registration_restrictions: [
    { required: true, message: '请选择报名限制', trigger: 'change' }
  ],
  registration_requirement: [
    { required: true, message: '请输入报名要求', trigger: 'blur' }
  ],
  registration_deadline: [
    { required: true, message: '请选择报名截止时间', trigger: 'change' }
  ],
  contact_name: [
    { required: true, message: '请输入联系人姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  contact_details: [
    { required: true, message: '请输入联系人电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ]
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    
    // 格式化日期和时间
    const formData = {
      ...form,
      activity_date: formatDateTime(form.activity_date),
      start_time: formatDateTime(form.start_time),
      end_time: formatDateTime(form.end_time),
      registration_deadline: formatDateTime(form.registration_deadline)
    }

    await myAxios.post(`/api/studentPersonalCenter/activityManage/${studentStore.data.id}`, formData)
    
    ElMessage.success('活动发布成功，请等待审核')
    handleReset() // 重置表单
  } catch (error) {
    console.error('发布失败:', error)
    ElMessage.error(error.response?.data?.message || '发布失败，请稍后重试')
  }
}

// 重置表单
const handleReset = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
}

// 日期时间格式化函数
const formatDateTime = (date) => {
  if (!date) return ''
  return new Date(date).toISOString().slice(0, 19).replace('T', ' ')
}

// 检查日期时间是否合法
const validateDateTime = (rule, value, callback) => {
  if (!value) {
    callback(new Error(rule.message))
    return
  }
  
  const currentDate = new Date()
  const selectedDate = new Date(value)
  
  if (selectedDate < currentDate) {
    callback(new Error('不能选择过去的时间'))
    return
  }
  
  callback()
}
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
</style>