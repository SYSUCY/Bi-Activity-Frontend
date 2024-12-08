<template>
  <div>
    <el-button type="primary" plain @click="navigateTo('/login/student')">学生登录</el-button>
    <el-button type="primary" plain @click="navigateTo('/login/college')">学院登录</el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateTo(path) {
  router.push(path)
}

</script>

<style scoped>

</style>