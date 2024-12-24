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
        <el-table-column prop="status" label="状态" width="110">
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
              :disabled="scope.row.status === 4" 
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
    1: 'warning',  // 待审核 - 黄色
    2: 'success',  // 已录取 - 绿色
    3: 'danger',   // 未录取 - 红色
    4: 'info'      // 已取消报名 - 灰色
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
    1: '录取',     // 待审核状态可以录取
    2: '取消录取', // 已录取状态可以改为未录取
    3: '录取',     // 未录取状态可以重新录取
    4: '不可操作'   // 已取消报名状态不能操作
  }
  return actionMap[status] || '操作'
}

// 更新参与者状态
const handleUpdateStatus = async (participant) => {
  try {
    console.log('当前活动ID:', props.activityId)  // 添加日志
    // 弹窗确认
    const newStatus = participant.status === 2 ? 3 : 2  // 在已录取和未录取之间切换

    await ElMessageBox.confirm(
      `确定要${participant.status === 2 ? '取消录取' : '录取'}该学生吗？`,
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
        status: newStatus
      }
    )

    if (res.code === 0) {
      ElMessage.success(participant.status === 2 ? '已取消录取' : '已录取')
      emit('refresh', props.activityId)
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