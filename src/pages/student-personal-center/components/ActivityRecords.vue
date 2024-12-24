<template>
  <div class="activity-record">
    <h1>活动记录</h1>
    
    <!-- 活动列表 -->
    <el-table :data="activities" style="width: 100%">
      <el-table-column prop="activity_name" label="活动名称" />
      <!-- 修改日期列的显示 -->
      <el-table-column label="活动日期">
        <template #default="scope">
          {{ formatDate(scope.row.activity_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="activity_address" label="活动地点" />
      <el-table-column prop="activity_status" label="状态">
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.activity_status)">
            {{ getStatusText(scope.row.activity_status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="text" @click="viewDetail(scope.row)">查看详情</el-button>
          <el-button 
            type="text" 
            @click="viewParticipants(scope.row)"
            v-if="scope.row.activity_status !== 1"
          >
            查看参与者
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 使用详情弹窗组件 -->
    <ActivityDetailDialog
      v-model:visible="detailDialog.visible"
      :detail-data="detailDialog.data"
    />

    <!-- 参与者列表弹窗 -->
    <ParticipantListDialog
      v-model:visible="participantDialog.visible"
      :activity-id="participantDialog.activityId"
      :participant-data="participantDialog.data"
      @refresh="loadParticipants"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useLoginStore } from '@/stores/login'
import myAxios from '@/request'
import ActivityDetailDialog from './dialogs/ActivityDetailDialog.vue'
import ParticipantListDialog from './dialogs/ParticipantListDialog.vue'

const studentStore = useLoginStore()

// 活动列表数据
const activities = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

// 详情弹窗数据
const detailDialog = reactive({
  visible: false,
  data: {}
})

// 获取活动记录列表
const loadActivities = async () => {
  try {
    const { data: res } = await myAxios.get(
      `/api/studentPersonalCenter/activityManage/${studentStore.data.id}`
    )
    if (res.code === 0) {
      activities.value = res.data.activities  // 从 data.activities 获取列表
      total.value = res.data.total           // 从 data.total 获取总数
    } else {
      ElMessage.error(res.message || '获取活动列表失败')
    }
  } catch (error) {
    console.error('获取活动列表错误:', error)
    ElMessage.error('获取活动列表失败')
  }
}

// 添加日期格式化方法
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// 获取状态样式
const getStatusType = (status) => {
  const statusMap = {
    1: 'info',     // 审核中
    2: 'success',  // 招募中
    3: 'warning',  // 活动开始
    4: 'danger',   // 活动结束
    5: 'info'      // 审核失败
  }
  return statusMap[status] || ''
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    1: '审核中',
    2: '招募中',
    3: '活动开始',
    4: '活动结束',
    5: '审核失败'
  }
  return statusMap[status] || '未知状态'
}

// 查看详情
const viewDetail = async (row) => {
  try {
    const { data: res } = await myAxios.get(
      `/api/studentPersonalCenter/activityManage/detail/${row.id}`
    )
    if (res.code === 0) {
      detailDialog.data = res.data
      detailDialog.visible = true
    } else {
      ElMessage.error(res.message || '获取活动详情失败')
    }
  } catch (error) {
    console.error('获取活动详情错误:', error)
    ElMessage.error('获取活动详情失败')
  }
}

// 查看参与者
const viewParticipants = async (row) => {
  participantDialog.activityId = row.id
  loadParticipants(row.id)
  participantDialog.visible = true
}

// 参与者列表弹窗数据
const participantDialog = reactive({
  visible: false,
  activityId: '',
  data: []
})

// 加载参与者列表
const loadParticipants = async (activityId) => {
  try {
    const { data: res } = await myAxios.get(
      `/api/studentPersonalCenter/activityManage/participants/${activityId}`
    )
    if (res.code === 0) {
      participantDialog.data = res.data
    } else {
      ElMessage.error(res.message || '获取参与者列表失败')
    }
  } catch (error) {
    console.error('获取参与者列表错误:', error)
    ElMessage.error('获取参与者列表失败')
  }
}

// 页码改变
const handlePageChange = () => {
  loadActivities()
}

onMounted(() => {
  loadActivities()
})
</script>

<style scoped>
.activity-record {
  padding: 20px;
}

.pagination {
  margin-top: 20px;
  text-align: right;
}

.el-table {
  margin-top: 20px;
}

.el-button + .el-button {
  margin-left: 8px;
}
</style>