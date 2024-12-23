<template>
  <div id="help-center-page">
    <el-row class="tac" style="display: flex; height: 80vh;">
      <el-col :span="6"></el-col>
      <el-col :span="2" :xs="24">
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @select="handleSelect"
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
          <el-menu-item index="5" disabled>
            <template #title>
              <el-icon><More /></el-icon>
              <span>有待开发</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="12"
              style="padding-left: 10px; display: flex; flex-direction: column; justify-content: flex-start; flex-grow: 1; width: 100%;"
              :xs="12">
        <el-card class="box-card" style="flex-grow: 1; height: 80vh;">
          <component :is="currentComponent" />
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
  Setting, More,
} from '@element-plus/icons-vue'
import {shallowRef} from "vue";
import problem from "@/components/Problem.vue";

const currentComponent = shallowRef(problem);

const handleSelect = (index) => {
  switch (index) {
    case "1":
      currentComponent.value = problem;
      break;
    case "2":
      currentComponent.value = null;
      break;
    case "3":
      currentComponent.value = null;
      break;
    case "4":
      currentComponent.value = null;
      break;
  }
}
</script>

<style scoped>
#help-center-page {
  margin-bottom: 50px;
}
</style>
