<template>
  <el-dialog 
    v-model="visible" 
    title="活动参与者"
    width="800px"
  >
    <div class="participant-list">
      <el-table :data="participantData" border>
        <el-table-column prop="student_name" label="姓名" width="120" />
        <el-table-column prop="student_id" label="学号" width="120" />
        <el-table-column prop="college_name" label="学院" width="180" />
        <el-table-column prop="student_phone" label="联系电话" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button 
              type="primary" 
              size="small" 
              @click="handleUpdateStatus(scope.row)"
              :disabled="scope.row.status === 3" 
            >
              {{ getActionText(scope.row.status) }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import myAxios from '@/request'

// 接收父组件的属性
const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  activityId: {
    type: [String, Number],
    required: true
  },
  participantData: {
    type: Array,
    default: () => []
  }
})

// 向父组件发送事件
const emit = defineEmits(['update:visible', 'refresh'])

// 计算属性：用于双向绑定visible
const visible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

// 获取状态样式
const getStatusType = (status) => {
  const statusMap = {
    1: 'info',     // 待审核
    2: 'success',  // 已录取
    3: 'warning',  // 未录取
    4: 'danger'    // 已取消报名
  }
  return statusMap[status] || ''
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    1: '待审核',
    2: '已录取',
    3: '未录取',
    4: '已取消报名'
  }
  return statusMap[status] || '未知状态'
}

// 获取操作按钮文本
const getActionText = (status) => {
  const actionMap = {
    1: '审核',
    2: '取消录取',
    3: '录取',
    4: '重新审核'
  }
  return actionMap[status] || '操作'
}

// 更新参与者状态
const handleUpdateStatus = async (participant) => {
  try {
    // 弹窗确认
    await ElMessageBox.confirm(
      `确定要${participant.status === 4 ? '重新审核' : '录取'}该学生吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    // 调用更新状态接口
    const { data: res } = await myAxios.put(
      `/api/studentPersonalCenter/activityManage/participant/${participant.id}`,
      {
        status: 3  // 设置为已录取状态
      }
    )

    if (res.code === 0) {
      ElMessage.success('操作成功')
      emit('refresh')  // 通知父组件刷新数据
    } else {
      ElMessage.error(res.message || '操作失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('操作失败')
    }
  }
}
</script>

<style scoped>
.participant-list {
  max-height: 60vh;
  overflow-y: auto;
}

:deep(.el-table) {
  margin-bottom: 20px;
}
</style>