<template>
  <div class="affiliated-organizations">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="title">归属组织</span>
        </div>
      </template>
      
      <!-- 审核中状态 -->
      <div v-if="auditStatus === 1" class="college-info">
        <div class="info-row">
          <span class="label">申请学院：</span>
          <span class="value">{{ auditCollegeName }}</span>
        </div>
        <div class="info-row">
          <span class="label">申请状态：</span>
          <span class="value">正在审核中...</span>
        </div>
        <div class="info-row">
          <span class="label">申请时间：</span>
          <span class="value">{{ formatDate(auditCreatedAt) }}</span>
        </div>
      </div>

      <!-- 已有组织 且不在审核中 -->
      <div v-else-if="currentCollege" class="college-info">
        <div class="info-row">
          <span class="label">当前所属学院：</span>
          <span class="value">{{ currentCollege.collegeName }}</span>
        </div>
        <div class="actions">
          <el-button class="btn change" type="primary" size="default" @click="handleChangeCollege">
            更换组织
          </el-button>
          <el-button class="btn delete" type="danger" size="default" @click="handleRemoveCollege">
            退出组织
          </el-button>
        </div>
      </div>

      <!-- 无组织状态 -->
      <el-empty v-else description="暂无归属组织">
        <el-button type="primary" @click="handleChangeCollege">
          加入组织
        </el-button>
      </el-empty>

      <!-- 选择学院的对话框 -->
      <el-dialog
        v-model="dialogVisible"
        :title="currentCollege ? '更换组织' : '加入组织'"
        width="30%"
        destroy-on-close
      >
        <el-form :model="form" label-width="80px">
          <el-form-item label="选择学院">
            <el-select v-model="form.collegeId" placeholder="请选择学院">
              <el-option
                v-for="item in collegeList"
                :key="item.college_id"
                :label="item.college_name"
                :value="item.college_id" 
              />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmChangeCollege">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useLoginStore } from '@/stores/login'
import myAxios from '@/request'

// 数据定义
const currentCollege = ref(null)
const dialogVisible = ref(false)
const collegeList = ref([])
const form = ref({
  collegeId: ''
})
const auditStatus = ref(0)  // 0-无审核 1-审核中 2-审核通过
const auditCreatedAt = ref(null)
const auditCollegeId = ref(null)  // 审核中的学院ID

// 生命周期钩子
onMounted(async () => {
  await Promise.all([
    fetchCurrentCollege(),
    fetchCollegeList(),
    fetchAuditStatus()
  ])
})

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 获取当前学院信息
const fetchCurrentCollege = async () => {
  try {
    const response = await myAxios.get('/api/studentPersonalCenter/affiliatedOrganizations/student')
    if (response.data.code === 0) {
      currentCollege.value = {
        collegeName: response.data.data.college_name
      }
    } else {
      if (auditStatus.value !== 1) {  // 不在审核中时才清空当前学院
        currentCollege.value = null
      }
      if (response.data.code !== 10102) { // 忽略"学生没有组织归属"的错误提示
        ElMessage.error(response.data.message || '获取组织信息失败')
      }
    }
  } catch (error) {
    console.error('获取组织信息失败:', error)
    if (auditStatus.value !== 1) {
      currentCollege.value = null
    }
  }
}

// 获取学院列表
const fetchCollegeList = async () => {
  try {
    const response = await myAxios.get('/api/studentPersonalCenter/affiliatedOrganizations/list')
    if (response.data.code === 0) {
      collegeList.value = response.data.data.colleges || []
    } else {
      ElMessage.error(response.data.message || '获取学院列表失败')
    }
  } catch (error) {
    console.error('获取学院列表失败:', error)
    ElMessage.error('获取学院列表失败')
  }
}

// 获取审核状态
const fetchAuditStatus = async () => {
  try {
    const response = await myAxios.get('/api/studentPersonalCenter/affiliatedOrganizations/audit')
    if (response.data.code === 0) {
      auditStatus.value = response.data.data.status
      auditCreatedAt.value = response.data.data.created_at
      auditCollegeId.value = response.data.data.college_id
      await updateAuditInfo()  // 获取并更新学院名称
    } else {
      auditStatus.value = 0
      auditCreatedAt.value = null
      auditCollegeId.value = null
      auditCollegeName.value = ''
    }
  } catch (error) {
    console.error('获取审核状态失败:', error)
    auditStatus.value = 0
    auditCreatedAt.value = null
    auditCollegeId.value = null
    auditCollegeName.value = ''
  }
}

// 显示更换/加入学院对话框
const handleChangeCollege = () => {
  dialogVisible.value = true
  form.value.collegeId = ''
}

// 根据ID获取学院名称
const getCollegeName = async (collegeId) => {
  try {
    const response = await myAxios.get('/api/studentPersonalCenter/affiliatedOrganizations/student')
    if (response.data.code === 0) {
      return response.data.data.college_name
    }
    return '未知学院'
  } catch (error) {
    console.error('获取学院名称失败:', error)
    return '未知学院'
  }
}

// 存储审核中的学院名称
const auditCollegeName = ref('')

// 更新显示的审核信息
const updateAuditInfo = async () => {
  if (auditStatus.value === 1 && auditCollegeId.value) {
    auditCollegeName.value = await getCollegeName(auditCollegeId.value)
  }
}

const handleRemoveCollege = async () => {
  try {
    await ElMessageBox.confirm('确认退出当前归属组织？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    const response = await myAxios.delete('/api/studentPersonalCenter/affiliatedOrganizations')
    if (response.data.code === 0) {
      ElMessage.success('已成功退出组织')
      currentCollege.value = null
      auditStatus.value = 0
      auditCreatedAt.value = null
    } else {
      ElMessage.error(response.data.message || '退出组织失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('退出组织失败:', error)
      ElMessage.error('退出组织失败')
    }
  }
}

// 确认更换/加入学院
const confirmChangeCollege = async () => {
  if (!form.value.collegeId) {
    ElMessage.warning('请选择学院')
    return
  }

  try {
    const response = await myAxios.post('/api/studentPersonalCenter/affiliatedOrganizations/audit', {
      college_id: form.value.collegeId
    })

    if (response.data.code === 0) {
      ElMessage.success(currentCollege.value ? '更换申请已提交,请等待审核' : '加入申请已提交,请等待审核')
      dialogVisible.value = false
      // 刷新所有状态
      await Promise.all([
        fetchCurrentCollege(),
        fetchAuditStatus()
      ])
    } else {
      ElMessage.error(response.data.message || '申请提交失败')
    }
  } catch (error) {
    console.error('申请提交失败:', error)
    ElMessage.error('申请提交失败')
  }
}
</script>

<style scoped>
.btn {
  font-size: 14px;
}

.affiliated-organizations {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 16px;
  font-weight: bold;
}

.college-info {
  padding: 10px 0;
}

.info-row {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.label {
  color: #606266;
  margin-right: 10px;
  font-size: 16px;
}

.value {
  font-size: 16px;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.dialog-footer {
  margin-top: 20px;
}
</style>