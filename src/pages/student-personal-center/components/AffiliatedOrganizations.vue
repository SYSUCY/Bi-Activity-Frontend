<template>
  <div class="affiliated-organizations">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="title">归属组织</span>
        </div>
      </template>
      
      <!-- 当前所属组织信息 -->
      <div v-if="currentCollege" class="college-info">
        <div class="info-row">
          <span class="label">当前所属学院：</span>
          <span class="value">{{ currentCollege.collegeName }}</span>
        </div>
        <div class="actions">
          <el-button class = "btn change" type="primary" size="default" @click="handleChangeCollege">
            更换组织
          </el-button>
          <el-button class = "btn delete" type="danger" size="default" @click="handleRemoveCollege">
            退出组织
          </el-button>
        </div>
      </div>

      <!-- 未设置组织时的空状态 -->
      <el-empty v-else description="暂无归属组织">
        <el-button type="primary" @click="handleChangeCollege">
          添加组织
        </el-button>
      </el-empty>

      <!-- 选择学院的对话框 -->
      <el-dialog
        v-model="dialogVisible"
        title="选择归属学院"
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
import { useStudentStore } from '@/stores/student'
import { organizationApi } from '@/api/student-personal-center/organization'

// 数据定义
const studentStore = useStudentStore()
const studentId = studentStore.data.id
const currentCollege = ref(null)
const dialogVisible = ref(false)
const collegeList = ref([])
const form = ref({
  collegeId: ''
})

// 生命周期钩子
onMounted(() => {
  fetchCurrentCollege()
  fetchCollegeList()
})

// 方法定义
// 调用API获取当前学生的学院信息
const fetchCurrentCollege = async () => {
  if (!studentId) {
    ElMessage.error('未获取到学生信息')
    return
  }

  try {
    const response = await organizationApi.getStudentCollege(studentId)
    // console.log('API response:', response)
    if (response.data.code === 0) {
      currentCollege.value = {
        collegeName: response.data.data.college_name
      }
      // console.log('currentCollege value:', currentCollege.value)
    } else {
      ElMessage.error(response.message || '获取组织信息失败')
      currentCollege.value = null
    }
  } catch (error) {
    ElMessage.error('获取组织信息失败')
    console.error('获取组织信息失败:', error)
    currentCollege.value = null
  }
  
}

const fetchCollegeList = async () => {
  // 调用API获取学院列表
  try {
    const response = await organizationApi.getCollegeList()

    if (response.data.code === 0) {
      collegeList.value = response.data.data.colleges || [] 
    } else {
      ElMessage.error(response.message || '获取学院列表信息失败')
      console.error('获取学院列表信息失败:', response.message)
    }
    
  } catch (error) {
    ElMessage.error('获取学院列表信息失败')
    console.error('获取学院列表信息失败:', error)
  }
}

const handleChangeCollege = () => {
  dialogVisible.value = true
}

const handleRemoveCollege = async () => {
  try {
    await ElMessageBox.confirm('确认退出当前归属组织？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    const response = await organizationApi.removeStudentCollege(studentId);
    if (response.data.code === 0) {
      ElMessage.success('已成功退出组织');
      currentCollege.value = null;
    } else {
      ElMessage.error(response.data.message || '退出组织失败');
    }

  } catch {
    if (error !== 'cancel') {
      ElMessage.error('退出组织失败');
      console.error('退出组织失败:', error);
    }
  }
}

const confirmChangeCollege = async () => {
  if (!form.value.collegeId) {
    ElMessage.warning('请选择学院')
    return
  }
  try {
    // 调用更新 API
    const response = await organizationApi.updateStudentCollege(studentId, form.value.collegeId);

    if (response.data.code === 0) {
      ElMessage.success('组织更新成功');
      dialogVisible.value = false;

      // 刷新当前学院信息
      await fetchCurrentCollege();
    } else {
      ElMessage.error(response.data.message || '更新组织失败');
    }
  } catch (error) {
    ElMessage.error('更新组织失败');
    console.error('更新组织失败:', error);
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