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
  </div>
</template>

<script setup>
  import {onMounted, ref} from "vue";
  import {getHomeLoopImages} from "@/api/home/home.js";

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
</script>

<style scoped>

</style>