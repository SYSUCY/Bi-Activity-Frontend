<template>
  <div id="college-pi">
    <el-form :model="formb" label-width="auto" style="max-width: 600px">
      <el-form-item label="姓名：">
        <el-input v-model="formb.AdminName" :disabled="!isEditable" />
      </el-form-item>
      <el-form-item label="证件号码：">
            <el-input v-model="formb.AdminIDNumber" :disabled="!isEditable" />
        </el-form-item>
      <el-form-item label="证件照：">
        <el-upload class="avatar-uploader" :disabled="!isEditable">
          <img v-if="formb.AdminImageUrl" :src="formb.AdminImageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="手机号码：">
        <el-input v-model="formb.AdminPhone" disabled=true />
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input v-model="formb.AdminEmail" disabled=true />
      </el-form-item>
      <el-form-item>
        <el-button @click="onEdit">编辑</el-button>
        <el-button @click="onSave">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
// 导包
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import myAxios from "@/request";

// 需要的变量
// 表单可编辑标记
const isEditable = ref(false);
// 用于展示的form表单数据
const formb = reactive({
    ID: '',
    AdminName: '',
    AdminIDNumber: '',
    AdminImageUrl: '',
    AdminPhone: '',
    AdminEmail: '',
});
// 用户备份的form表单数据
const forma = reactive({
    ID: '',
    AdminName: '',
    AdminIDNumber: '',
    AdminImageUrl: '',
    AdminPhone: '',
    AdminEmail: '',
});

// 需要的方法
// 已优化
const fetchData = async () => {
  try {
    const response = await myAxios.get('/college/personalCenter/adminInfo');
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = response.data.data;
    Object.assign(formb, data);
    Object.assign(forma, data);
  } catch (error) {
    console.error('Failed to fetch data: ' + error.message);
  }
};

// 已优化
const updateData = async () => {
  try {
    // 数据预处理
    const flag = JSON.stringify(formb) === JSON.stringify(forma);
    // alert(flag);
    // 将 reactive 对象转换为普通对象，以便发送
    const dataToSend = JSON.parse(JSON.stringify(formb));
    // 发送 POST 请求到后端
    if (!flag) {
      const response = await myAxios.post('/college/personalCenter/adminInfo', dataToSend);
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
  } catch (error) {
    console.error('Failed to update data: ' + error.message);
  }
};

onMounted(fetchData);

const onEdit = () => {
    isEditable.value = true;
}

const onSave = async () => {
    await updateData();
    await fetchData();
    isEditable.value = false;
    ElMessage({
      message: '已保存.',
      type: 'success',
    })
}

const onCancel = () => {
    Object.assign(formb, forma);
    isEditable.value = false;
    ElMessage({
      message: '已取消.',
      type: 'success',
    })
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

#college-pi {
  padding: 0;
  width: 60vw; /* 视口宽度 */
  height: 100vh; /* 视口高度 */
}
</style>