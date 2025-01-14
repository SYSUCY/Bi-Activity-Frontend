<template>
  <div id="webImageManagement">
    <el-button @click="isAddDialogVisible = true" type="primary">添加图片</el-button>
    <el-table :data="imageSlider" style="width: 100%">
      <el-table-column label="图片ID" prop="id" width="200"></el-table-column>
      <el-table-column label="图片名称" prop="fileName" width="300"></el-table-column>
      <el-table-column label="轮播图预览" prop="url" width="600">
        <template #default="scope">
          <el-image
            :src="scope.row.url"
            alt="轮播图"
            style="max-width: 40%; height: auto; cursor: pointer;"
            fit="cover"
            @click="handleImageClick(scope.row.url)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template #default="scope">
          <el-button @click="editImage(scope.row)" size="small">编辑</el-button>
          <el-button @click="deleteImage(scope.row.id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="isAddDialogVisible" title="修改图片信息" width="80%">
      <el-form :model="newImageInfo" ref="form" label-width="120px">
        <el-form-item label="图片名称" prop="typeName" :rules="[{ required: true, message: '请输入图片名称', trigger: 'blur' }]">
          <el-input v-model="newImageInfo.fileName" placeholder="请输入图片名称"></el-input>
        </el-form-item>
        <el-form-item label="展示图片" :rules="[{ required: true, message: '请选择展示图片', trigger: 'blur' }]">
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
            <img :src="imageUrl" alt="图片照" style="max-width: 200px; max-height: 300px;"/>
          </div>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" >
        <el-button @click="isAddDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addVerify">修改</el-button>
      </span>
    </el-dialog>

    <el-dialog v-model="isEditDialogVisible" title="修改图片信息" width="80%">
      <el-form :model="editImageInfo" ref="form" label-width="120px">
        <el-form-item label="图片名称" prop="typeName" :rules="[{ required: true, message: '请输入图片名称', trigger: 'blur' }]">
          <el-input v-model="editImageInfo.fileName" placeholder="请输入图片名称"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" >
        <el-button @click="isEditDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editVerify">修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
  import {getHomeLoopImages} from "@/api/home/home.js";
import {ElMessage} from "element-plus";
import myAxios from "@/request.js";
import {addImagePOST, deleteImageDELETE, editImagePut} from "@/api/home/admin.js";

  const isAddDialogVisible = ref(false);
  const isEditDialogVisible = ref(false);
  const imageUrl = ref('');
  const imageFile = ref(null);
  const newImageInfo = reactive({
    id: "",
    fileName: "",
    url: "",
  });
  const editImageInfo = reactive({
    id: "",
    fileName: "",
    url: "",
  });

  const imageSlider = ref([]);
  const fetchLoopImages = async () => {
    try {
      const res = await getHomeLoopImages();
      if (res.data.label === 200) {
        imageSlider.value = res.data.data
        console.log(imageSlider.value)
      } else {
        alert("Failed to fetch loop-images error: " + res.data.error)
      }
    } catch (error) {
      console.error("Panic to fetch loop-images error: ", error);
    }
  }
  onMounted(() => {
    fetchLoopImages()
  })

  const handleImageClick = (url) => {
    console.log("Image clicked:", url);
  }

  const editImage = (row) => {
    editImageInfo.id = row.id
    editImageInfo.fileName = row.fileName
    editImageInfo.url = row.url
    isEditDialogVisible.value = true
  }

  const deleteImage = async (id) => {
    try {
      const params = {
        id: id
      }
      const res = await deleteImageDELETE(params);
      if (res.data.label === 200) {
        imageSlider.value = imageSlider.value.filter(item => item.id !== id);  // 删除活动类型
      } else {
        console.error("Failed to delete activity type:", res.data.error);
      }
    } catch (error) {
      console.error("Error deleting activity type:", error);
    }
  }

const editVerify = async () => {
  try {
    if (editImageInfo.fileName === "") {
      ElMessage.error('请输入图片名称');
      return;
    }

    const params = {
      id: editImageInfo.id,
      fileName: editImageInfo.fileName,
      url: editImageInfo.url
    }
    const res = await editImagePut(params);
    if (res.data.label === 200) {
      ElMessage.success("修改成功");
      isEditDialogVisible.value = false;
      for (let i = 0; i < imageSlider.value.length; i++) {
        if (imageSlider.value[i].id === editImageInfo.id) {
          imageSlider.value[i].fileName = editImageInfo.fileName
          imageSlider.value[i].url = editImageInfo.url
        }
      }
    } else {
      ElMessage.error(res.data.error);
    }
  } catch (e) {
    console.error('Failed to edit image:', e);
  }
}

const addVerify = async () => {
  const data = {
    fileName: newImageInfo.fileName,
    url: newImageInfo.url
  }
  try {
    const res = await addImagePOST(data);
    if (res.data.label === 200) {
      ElMessage.success("添加成功");
      isAddDialogVisible.value = false;
      imageSlider.value.push({
        id: res.data.data.id,
        fileName: newImageInfo.fileName,
        url: newImageInfo.url
      });
    }
  } catch (e) {
    console.error('Failed to add image:', e);
  }
}

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
  imageFile.value = file.raw;
  const reader = new FileReader();
  reader.onload = () => {
    imageUrl.value = reader.result;
  };
  reader.readAsDataURL(file.raw);
  imageUpload();
};

// TODO
const imageUpload = async() => {
  try {
    console.log('开始上传文件:', imageFile.value)

    const formData = new FormData()
    formData.append('file', imageFile.value)

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
      newImageInfo.url = res.data.url;
    } else {
      ElMessage.error('上传失败')
    }
  } catch (error) {
    console.error('上传错误:', error)
    ElMessage.error('上传失败: ' + error.message)
  }
}
</script>

<style scoped>

</style>