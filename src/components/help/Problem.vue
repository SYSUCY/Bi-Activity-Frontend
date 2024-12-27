<template>
  <div id="problem">
    <el-row :span="24">
      <el-col :span="18" style="display: flex; justify-content: left; align-content: center;">
        <el-input
            v-model="keyword"
            style="width: 100%; height: 50px;"
            placeholder="问题检索"
            :prefix-icon="Search"
            @change="keywordChange"
        />
      </el-col>
    </el-row>
    <el-scrollbar height="80vh">
      <div v-for="(item, index) in problemList" :key="item.id"
           :style="{ width: '100%', display: 'flow', marginBottom: index === problemList.length - 1 ? '100px' : '0' }"
      >
        <el-row style="font-size: 20px; padding-top: 10px; white-space: pre-wrap; display: block">
          {{ item.problem }}
        </el-row>
        <el-row style="margin-top: 10px; word-wrap: break-word; display: block; background-color: #99a9bf">
          {{ item.answer }}
        </el-row>
        <el-divider v-if="index !== problemList.length -1"/>
      </div>
    </el-scrollbar>

  </div>
</template>

<script setup>
import {Search} from "@element-plus/icons-vue";
import {onMounted, ref, watch} from "vue";
import {getHelpInfo, searchHelpInfo} from "@/api/home/help.js";

// 关键词搜索
const keyword = ref('')
const keywordChange = async () => {
}
watch(keyword, async () => {
  try {
    const res = await searchHelpInfo({keyword: keyword.value});
    if (res.data.label === 200) {
      problemList.value = res.data.data;
    } else {
      console.error('Failed to fetch problem list:', res.data.error);
    }
  } catch (error) {
    console.error('Panic to fetch problem list:', error.response.data.error);
  }
}, {deep: true})

// 问题列表
const problemList = ref([]);
onMounted(async () => {
  try {
    const res = await getHelpInfo();
    if (res.data.label === 200) {
      problemList.value = res.data.data;
    } else {
      console.error('Failed to fetch problem list:', res.data.error);
    }
  } catch (error) {
    console.error('Panic to fetch problem list:', error.response.data.error);
  }
})
</script>

<style scoped>

</style>