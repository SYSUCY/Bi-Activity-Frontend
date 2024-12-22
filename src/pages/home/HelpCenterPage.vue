<template>
  <div id="help-center-page">
    <el-row class="tac" style="display: flex; height: 80vh;">
      <el-col :span="5"></el-col>
      <el-col :span="2" :xs="24">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            style="height: 100%;"
        >
          <el-menu-item index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>常见问题</span>
            </template>
          </el-menu-item>
          <el-menu-item index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>
              <span>资料下载</span>
            </template>
          </el-menu-item>
          <el-menu-item index="3">
            <template #title>
              <el-icon><document /></el-icon>
              <span>功能指引</span>
            </template>
          </el-menu-item>
          <el-menu-item index="4">
            <template #title>
              <el-icon><setting /></el-icon>
              <span>联系我们</span>
            </template>
          </el-menu-item>
          <el-menu-item index="5">
            <template #title>
              <el-icon><More /></el-icon>
              <span>有待开发</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="12"
              style="padding-left: 10px; display: flex; flex-direction: column; justify-content: flex-start; flex-grow: 1;" :xs="12">
        <el-card class="box-card" style="flex-grow: 1; height: 100%;">
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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting, Search, More,
} from '@element-plus/icons-vue'
import {ref} from "vue";

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

const keyword = ref('')
const keywordChange = () => {
  console.log(keyword.value)
}
</script>
