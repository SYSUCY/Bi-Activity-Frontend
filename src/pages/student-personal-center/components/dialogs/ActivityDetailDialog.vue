<template>
  <el-dialog 
    v-model="visible" 
    title="活动详情"
    width="600px"
  >
    <div class="activity-detail">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="活动名称">
          {{ detailData.activity_name }}
        </el-descriptions-item>
        <el-descriptions-item label="活动地点">
          {{ detailData.activity_address }}
        </el-descriptions-item>
        <el-descriptions-item label="活动简介">
          {{ detailData.activity_introduction }}
        </el-descriptions-item>
        <el-descriptions-item label="活动内容">
          {{ detailData.activity_content }}
        </el-descriptions-item>
        <el-descriptions-item label="活动日期">
          {{ formatDate(detailData.activity_date) }}
        </el-descriptions-item>
        <el-descriptions-item label="活动时间">
          {{ formatDateTime(detailData.start_time) }} 至 {{ formatDateTime(detailData.end_time) }}
        </el-descriptions-item>
        <el-descriptions-item label="招募人数">
          {{ detailData.recruitment_number }} 人
        </el-descriptions-item>
        <el-descriptions-item label="报名截止时间">
          {{ formatDateTime(detailData.registration_deadline) }}
        </el-descriptions-item>
        <el-descriptions-item label="联系人">
          {{ detailData.contact_name }}
        </el-descriptions-item>
        <el-descriptions-item label="联系方式">
          {{ detailData.contact_details }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'

// 接收父组件的属性
const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  detailData: {
    type: Object,
    default: () => ({})
  }
})

// 向父组件发送事件
const emit = defineEmits(['update:visible'])

// 计算属性：用于双向绑定visible
const visible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

// 格式化日期（年月日）
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

// 格式化日期时间
const formatDateTime = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return `${formatDate(dateString)} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}
</script>

<style scoped>
.activity-detail {
  max-height: 60vh;
  overflow-y: auto;
}

:deep(.el-descriptions__cell) {
  padding: 12px !important;
}

:deep(.el-descriptions__label) {
  width: 120px;
  color: #606266;
}
</style>