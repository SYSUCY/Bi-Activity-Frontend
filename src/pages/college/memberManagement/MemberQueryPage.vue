<template>
  <div class="input-group">
    <div class="input-with-label">
      <span>姓名：</span>
      <el-input v-model="formData.StudentName" placeholder="请输入姓名"></el-input>
    </div>
    <div class="input-with-label">
      <span>学号：</span>
      <el-input v-model="formData.StudentID" placeholder="请输入学号"></el-input>
    </div>
    <div class="input-with-label">
      <span>加入时间：</span>
      <el-date-picker v-model="formData.DateRange" type="daterange" range-separator="To" start-placeholder="开始时间"
        end-placeholder="结束时间" @change="handleDateChange"></el-date-picker>
    </div>
  </div>

  <div>
    <el-button type="primary" @click="query">查询</el-button>
    <el-button type="default" @click="clear">清空</el-button>
  </div>

  <div>
    <el-table :data="tableData" height="100vh" style="width: 100%">
      <el-table-column prop="StudentName" label="姓名" width="180" />
      <el-table-column prop="StudentId" label="学号" width="180" />
      <!-- <el-table-column prop="UpdatedAt" label="加入时间" /> -->
      <el-table-column prop="UpdatedAt" label="加入时间" width="180">
        <template #default="scope">
          {{ formatDate(scope.row.UpdatedAt) }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="remove(scope.$index)">
            移出
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div class="pagination-block">
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
import { ref, reactive, watch, onMounted } from 'vue';
import myAxios from "@/request";

// 查询条件
const formData = reactive({
  StudentName: '',
  StudentID: '',
  DateRange: ['', '']
});

// 分页条设置
const currentPage = ref('1');
const pageSize = ref('10');
const pageSizes = ref([10, 20, 50, 100]);
const total = ref(0);

// 表数据
const tableData = ref([])

const handleDateChange = (value) => {
  if (value) {
    formData.DateRange[0] = value[0] ? value[0].toISOString() : '';
    formData.DateRange[1] = value[1] ? value[1].toISOString() : '';
    // console.log('日期范围变化:', start, end);
  }
};

// 已优化
const fetchData = async () => {
  console.log("我在这儿")
  console.log(formData.DateRange[0])
  try {
    const response = await myAxios.get('/college/memberManagement/query', {
      params: {
        page: currentPage.value,
        size: pageSize.value,
        studentName: formData.StudentName,
        studentId: formData.StudentID,
        start: formData.DateRange[0],
        end: formData.DateRange[1]
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

// 已优化
const updateData = async (index) => {
  try {
    const response = await myAxios.delete('/college/memberManagement/delete', {
      params: {
        studentId: tableData.value[index].StudentId,
      },
    });
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to update data: ' + error.message);
  }
};

const remove = async (index) => {
  await updateData(index);
  await fetchData();
}

watch([currentPage, pageSize], fetchData, { immediate: true });

onMounted(fetchData);

const query = () => {
  fetchData();
};

const clear = () => {
  formData.StudentName = '';
  formData.StudentID = '';
  formData.DateRange = ['', ''];
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
.input-group {
  display: flex;
  align-items: center;
  /* 垂直居中 */
  margin-bottom: 10px;
  /* 添加一些间距 */
}

.input-with-label {
  display: flex;
  align-items: center;
  /* 垂直居中 */
  margin-right: 10px;
  /* 每个元素之间的间距 */
}

.input-with-label span {
  margin-right: 8px;
  /* 标签和输入框之间的间距 */
  white-space: nowrap;
  /* 防止标签换行 */
}
</style>