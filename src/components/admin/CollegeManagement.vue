<template>
  <div id="collegeManagement">
    <el-button @click="isAddDialogVisible = true" type="primary">添加学院账号映射</el-button>
    <el-table :data="nameToAccount" style="width: 100%">
      <el-table-column label="学院名称" prop="Name" width="600"></el-table-column>
      <el-table-column label="学院账号" prop="Account" width="600"></el-table-column>
      <el-table-column label="操作" width="300">
        <template #default="scope">
          <el-button @click="editNameToAccount(scope.row)" size="small">编辑</el-button>
          <el-button @click="deleteNameToAccount(scope.row.account)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加学院账号映射表单 -->
    <el-dialog v-model="isAddDialogVisible" title="添加学院账号映射" width="80%">
      <el-form :model="newMapping" ref="addForm" label-width="120px">
        <el-form-item label="学院名称" prop="Name" :rules="[{ required: true, message: '请输入学院名称', trigger: 'blur' }]">
          <el-input v-model="newMapping.Name"></el-input>
        </el-form-item>
        <el-form-item label="学院账号" prop="Account" :rules="[{ required: true, message: '请输入学院账号', trigger: 'blur' }]">
          <el-input v-model="newMapping.Account"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="isAddDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addNameToAccount">添加</el-button>
      </span>
    </el-dialog>

    <!-- 修改学院账号映射表单 -->
    <el-dialog v-model="isEditDialogVisible" title="修改学院账号映射" width="80%">
      <el-form :model="editMapping" ref="editForm" label-width="120px">
        <el-form-item label="学院名称" prop="Name" :rules="[{ required: true, message: '请输入学院名称', trigger: 'blur' }]">
          <el-input v-model="editMapping.Name"></el-input>
        </el-form-item>
        <el-form-item label="学院账号" prop="Account" :rules="[{ required: true, message: '请输入学院账号', trigger: 'blur' }]">
          <el-input v-model="editMapping.Account"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="isEditDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateNameToAccount">修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getNameToAccount } from '@/api/register';
import { ElMessage } from 'element-plus';

const nameToAccount = ref([]);
const isAddDialogVisible = ref(false);
const isEditDialogVisible = ref(false);
const newMapping = reactive({ 
  Name: '', 
  Account: '' 
});
const editMapping = ref({ 
  Name: '', 
  Account: '' 
});

// 页面加载时获取学院数据
const fetchCollegeData = async () => {
  try {
    const res = await getNameToAccount();
    if (res.data && res.data.label === 200) {
      nameToAccount.value = res.data.data;
    } else {
      ElMessage.error('学院数据加载失败！');
    }
  } catch (error) {
    ElMessage.error('网络或服务器错误，请稍后重试！');
  }
};

// 添加学院账号映射
const addNameToAccount = async () => {
  try {
    // 调用API添加 todo
    const res = await addNameToAccount(newMapping.value);
    if (res.data.label === 200) {
      ElMessage.success('学院账号映射添加成功');
      isAddDialogVisible.value = false;
      fetchCollegeData(); // 更新数据
    } else {
      ElMessage.error('添加失败，请重试！');
    }
  } catch (error) {
    ElMessage.error('网络或服务器错误，请稍后重试！');
  }
};

// 编辑学院账号映射
const editNameToAccount = (row) => {
  editMapping.value = { ...row }; // 填充表单数据
  isEditDialogVisible.value = true;
};

// 修改学院账号映射
const updateNameToAccount = async () => {
  try {
    // 调用API更新 todo
    const res = await updateNameToAccount(editMapping.value);
    if (res.data.label === 200) {
      ElMessage.success('学院账号映射修改成功');
      isEditDialogVisible.value = false;
      fetchCollegeData(); // 更新数据
    } else {
      ElMessage.error('修改失败，请重试！');
    }
  } catch (error) {
    ElMessage.error('网络或服务器错误，请稍后重试！');
  }
};

// 删除学院账号映射
const deleteNameToAccount = (row) => {
  // 调用API删除 todo
  deleteNameToAccountApi(row.id)
    .then(res => {
      if (res.data.label === 200) {
        ElMessage.success('删除成功');
        fetchCollegeData(); // 更新数据
      } else {
        ElMessage.error('删除失败，请重试！');
      }
    })
    .catch(() => ElMessage.error('网络或服务器错误，请稍后重试！'));
};

// 页面加载时获取数据
onMounted(() => {
  fetchCollegeData();
});
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
