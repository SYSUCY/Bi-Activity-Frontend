<template>
  <div id="activityManagement">
    <el-button @click="isAddDialogVisible = true" type="primary">添加活动类型</el-button>
    <el-table :data="typeList" style="width: 100%">
      <el-table-column label="活动类型ID" prop="id" width="200"></el-table-column>
      <el-table-column label="活动类型名称" prop="typeName" width="300"></el-table-column>
      <el-table-column label="活动展示图片" prop="url" width="600">
        <template #default="scope">
          <el-image
            :src="scope.row.url"
            alt="活动展示图片"
            style="max-width: 40%; height: auto; cursor: pointer;"
            fit="cover"
            @click="handleImageClick(scope.row.url)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template #default="scope">
          <el-button @click="editActivityType(scope.row)" size="small">编辑</el-button>
          <el-button @click="deleteActivityType(scope.row.id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加活动类型表单 -->
    <el-dialog v-model="isAddDialogVisible" title="添加活动类型" width="80%">
      <el-form :model="newActivityType" ref="form" label-width="120px">
        <el-form-item label="活动类型名称" prop="typeName" :rules="[{ required: true, message: '请输入活动类型名称', trigger: 'blur' }]">
          <el-input v-model="newActivityType.typeName" placeholder="请输入活动类型名称"></el-input>
        </el-form-item>
        <el-form-item label="活动展示图片" :rules="[{ required: true, message: '请选择活动展示图片', trigger: 'blur' }]">
          <el-upload
            class="upload-demo"
            :before-upload="beforeUpload"
            :on-change="handleChange"
            :show-file-list="false"
            :auto-upload="false"
          >
            <el-button size="large">+</el-button>
          </el-upload>
          <div v-if="imageUrl">
            <img :src="imageUrl" alt="手持身份证照" style="max-width: 200px; max-height: 300px;"/>
          </div>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="isAddDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addActivityType">添加</el-button>
      </span>
    </el-dialog>

    <!-- 修改活动类型表单 -->
    <el-dialog v-model="isEditDialogVisible" title="修改活动类型" width="80%">
      <span class="dialog-footer">
        <el-button @click="isEditDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import {getActivityTypeList} from "@/api/home/home.js";
import myAxios from '@/request';
import { ElMessage } from 'element-plus';

const isAddDialogVisible = ref(false);
const isEditDialogVisible = ref(false);
const newActivityType = reactive({
  typeName: "",
  imageId: ""
});
const editActivityType = reactive({
  id: "",
  typeName: "",
  imageId: ""
});

// 管理员信息部分相关操作
// 图片上传，提交注册表单前，先将手持身份证照上传并获取id
const imageUrl = ref('');  // 存储图片的 URL
const activityTypeImageFile = ref(null);    // 存储上传的文件

const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    ElMessage.error('只能上传');
    return false;
  }
  return true; 
};

const handleChange = (file) => {
  // 更新文件和图片 URL
  file.value = file.raw;
  activityTypeImageFile.value = file.raw;
  const reader = new FileReader();
  reader.onload = () => {
    imageUrl.value = reader.result;
  };
  reader.readAsDataURL(file.raw);
  imageUpload();
  
};

const imageUpload = async() => {
  try { 
    console.log('开始上传文件:', activityTypeImageFile.value)  

    const formData = new FormData()
    formData.append('file', activityTypeImageFile.value)
    
    console.log('发送请求...')
    const { data: res } = await myAxios.post(
      '/api/studentPersonalCenter/image/upload', 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    console.log('上传响应:', res)

    if (res.code === 0) {
      newActivityType.imageId = res.data.id;
    } else {
      ElMessage.error('上传失败')
    }
  } catch (error) {
    console.error('上传错误:', error)
    ElMessage.error('上传失败: ' + error.message)
  }
}

// 添加活动类型 todo
const addActivityType = async () => {
  try {
    imageUpload();
  } catch (error) {
    console.error("Panic to add activity type:", error);
  }
};

// 删除活动类型 todo
const deleteActivityType = async (id) => {
  try {
    const res = await deleteActivityType(id);
    if (res.data.label === 200) {
      typeList.value = typeList.value.filter(item => item.id !== id);  // 删除活动类型
    } else {
      console.error("Failed to delete activity type:", res.data.error);
    }
  } catch (error) {
    console.error("Error deleting activity type:", error);
  }
};

// 编辑活动类型 todo


// 获取活动类型列表
const typeList = ref([]);
onMounted(async () => {
  try {
    const res = await getActivityTypeList();
    console.log(res.data)
    if (res.data.label === 200) {
      typeList.value = res.data.data;
    } else {
      console.error("Failed to fetch activity type list:", res.data.error);
    }
  } catch (error) {
    console.error("Panic to fetch activity type list:", error);
  }
});
// 展示图片原尺寸
const handleImageClick = (url) => {
  console.log("Image clicked:", url);
}
</script>

<style scoped>

</style>