<template>
  <div>
    <el-radio-group v-model="radio" size="large">
      <el-radio-button label="待审核" value="待审核" />
      <el-radio-button label="已通过" value="已通过" />
      <el-radio-button label="未通过" value="未通过" />
    </el-radio-group>
  </div>

  <div>
    <el-table :data="tableData" height="100vh" style="width: 100%">
      <el-table-column prop="ActivityName" label="活动名称" width="150" />
      <!-- <el-table-column prop="StartTime" label="开始时间" width="150" /> -->
      <el-table-column prop="StartTime" label="开始时间" width="150">
        <template #default="scope">
          {{ formatDate(scope.row.StartTime) }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="EndTime" label="结束时间" width="150" /> -->
      <el-table-column prop="EndTime" label="结束时间" width="150">
        <template #default="scope">
          {{ formatDate(scope.row.EndTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="ActivityAddress" label="活动地点" width="150" />
      <el-table-column prop="Organizer" label="发起人" width="150" />
      <!-- <el-table-column prop="ApplicationTime" :label="dateLabel" width="120" /> -->
      <el-table-column prop="ApplicationTime" :label="dateLabel" width="150">
        <template #default="scope">
          {{ formatDate(scope.row.ApplicationTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="Status" label="状态">
        <template #default="scope">
          <el-tag :type="getTagType(scope.row.Status)">{{ getTagLabel(scope.row.Status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="120" v-if="showActionButtons">
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="audit(scope.$index, 2)">
            通过
          </el-button>
          <el-button link type="primary" size="small" @click.prevent="audit(scope.$index, 3)">
            不通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  
  <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import myAxios from '@/request';

// 表
// 默认选中的radio1按钮值
const radio = ref('待审核');
// 动态控制申请时间列的标签
const dateLabel = ref('申请时间');
// 动态控制操作列的显示或隐藏
const showActionButtons = ref(true);

// 分页条设置
const currentPage = ref('1');
const pageSize = ref('10');
const pageSizes = ref([10, 20, 50, 100]);
const total = ref(0);

// // 表数据
const tableData = ref([]);

// 监控单选按钮，动态调整表的显示
watch(radio, (newVal) => {
  dateLabel.value = newVal === '待审核' ? '申请时间' : '审核时间';
  showActionButtons.value = newVal === '待审核';
});

const getTagType = (s) => {
  // 根据状态返回不同的类型
  switch (s) {
    case 1:
      return 'primary';
    case 2:
      return 'success';
    default:
      return 'danger';
  }
};

const getTagLabel = (s) => {
  // 根据状态返回不同的标签文本
  const labels = {
    1: '待审核',
    2: '已通过',
    3: '未通过',
  };
  return labels[s];
}

// 监控分页参数变化，发送请求
const statusMap = {
  '待审核': 1,
  '已通过': 2,
  '未通过': 3,
};

const fetchData = async () => {
  // alert("我被调用了")
  try {
    const response = await myAxios.get('/college/activityManagement/activity', {
      params: {
        status: statusMap[radio.value],
        page: currentPage.value,
        size: pageSize.value
      }
    });
    total.value = response.data.data.total;
    tableData.value = response.data.data.data; // 假设返回的数据中包含items字段
    // console.log("我在这儿");
    // console.log(tableData);
    // console.log(total);
  } catch (error) {
    console.error('请求数据失败:', error);
  }
};

watch([currentPage, pageSize, radio], fetchData, { immediate: true }); // 立即执行一次，以便在组件加载时获取数据

const updateData = async (r) => {
  try {
    const dataToSend = JSON.parse(JSON.stringify(r));
    // 发送 POST 请求到后端
    const response = await myAxios.post('/college/activityManagement/activity', dataToSend);
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to update data: ' + error.message);
  }
};

const audit = async (index, s) => {
  const r = {
    Id: tableData.value[index].RecordId,
    Status: s
  };
  await updateData(r);
  await fetchData();
}

// 时间显示格式
const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hour = String(d.getHours()).padStart(2, '0');
  const minute = String(d.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}`;
};
</script>

<style>

</style>