<template>
  <div id="college-ci">
    <el-form :model="formb" label-width="auto" style="max-width: 600px">
      <el-form-item label="学院头像：">
        <el-upload class="avatar-uploader" :disabled=!isEditable action="http://127.0.0.1:8080/api/studentPersonalCenter/image/upload"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-error="handleAvatarError"
          :show-file-list="false">
          <img v-if="formb.CollegeAvatarUrl" :src="formb.CollegeAvatarUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="学院名称：">
        <el-input v-model="formb.CollegeName" disabled=true />
      </el-form-item>
      <el-form-item label="学院账号：">
        <el-input v-model="formb.CollegeAccount" disabled=true />
      </el-form-item>
      <el-form-item label="所属校区：">
        <el-select v-model="formb.Campus" placeholder="选择校区" size="large" style="width: 240px" :disabled=!isEditable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址：">
        <el-input v-model="formb.CollegeAddress" :disabled=!isEditable />
      </el-form-item>
      <el-form-item label="学院介绍：">
        <el-input v-model="formb.CollegeIntroduction" type="textarea" :disabled=!isEditable />
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
  CollegeAccount: '',
  CollegeName: '',
  Campus: '',
  CollegeAddress: '',
  CollegeIntroduction: '',
  CollegeAvatarUrl: ''
});
// 用于备份的form表单数据
const forma = reactive({
  ID: '',
  CollegeAccount: '',
  CollegeName: '',
  Campus: '',
  CollegeAddress: '',
  CollegeIntroduction: '',
  CollegeAvatarUrl: ''
});
// Selector的可取值
const options = [
  {
    value: 1,
    label: '珠海校区',
  },
  {
    value: 2,
    label: '深圳校区',
  },
  {
    value: 3,
    label: '广州校区',
  },
]

// 需要的方法
// 已优化
// 获取学院资料
const fetchData = async () => {
  try {
    const response = await myAxios.get('/api/college/profile');
    // 检查响应状态和业务状态码
    if (response.data.code === 0) {
      const data = response.data.data;
      Object.assign(formb, {
        ID: data.id,
        CollegeAccount: data.college_account,
        CollegeName: data.college_name,
        Campus: data.campus,
        CollegeAddress: data.college_address,
        CollegeIntroduction: data.college_introduction,
        CollegeAvatarUrl: data.college_avatar?.url || ''
      });
      console.log()
      Object.assign(forma, formb);
    } else {
      ElMessage.error(response.data.message || '获取数据失败');
    }
  } catch (error) {
    ElMessage.error('获取数据失败：' + error.message);
  }
};


// 已优化
// 更新学院资料
const updateData = async () => {
  try {
    // 数据预处理
    const flag = JSON.stringify(formb) === JSON.stringify(forma);
    if (!flag) {
      const dataToSend = {
        college_name: formb.CollegeName,
        college_account: formb.CollegeAccount,
        campus: formb.Campus,
        college_address: formb.CollegeAddress,
        college_introduction: formb.CollegeIntroduction
      };
      
      const response = await myAxios.put('/api/college/profile', dataToSend);
      if (response.data.code !== 0) {
        throw new Error(response.data.message);
      }
    }
  } catch (error) {
    ElMessage.error(error.message || '更新失败');
    throw error;
  }
};





onMounted(fetchData);

const onEdit = () => {
  isEditable.value = true;
}
const onSave = async () => {
  try {
    await updateData();
    await fetchData();
    isEditable.value = false;
    ElMessage.success('保存成功');
  } catch (error) {
    ElMessage.error('保存失败：' + error.message);
  }
};

const onCancel = () => {
  Object.assign(formb, forma);
  isEditable.value = false;
  ElMessage({
    message: '已取消.',
    type: 'success',
  })
}
// 文件上传相关

const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg';
  const isPNG = file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG && !isPNG) {
    alert('上传头像图片只能是 JPG/PNG 格式!');
    return false;
  }
  if (!isLt2M) {
    alert('上传头像图片大小不能超过 2MB!');
    return false;
  }
  return true;
};

// 头像上传相关
const handleAvatarSuccess = async (response) => {
  if (response.code === 0) {
    try {
      // 上传成功后，调用更新头像的接口
      await myAxios.put('/api/college/profile/avatar', {
        avatar_id: response.data.id
      });
      formb.CollegeAvatarUrl = response.data.url;
      ElMessage.success('头像更新成功');
    } catch (error) {
      ElMessage.error('头像更新失败');
    }
  } else {
    ElMessage.error(response.message || '上传失败');
  }
};

const handleAvatarError = (err) => {
  ElMessage.error('上传失败：' + err.message);
};
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

#college-ci {
  padding: 0;
  width: 60vw; /* 视口宽度 */
  height: 100vh; /* 视口高度 */
}
</style>