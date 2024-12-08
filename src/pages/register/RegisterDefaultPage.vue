<template>
  <div>
    <el-button type="primary" plain @click="navigateTo('/register/student')">学生注册</el-button>
    <el-button type="primary" plain @click="navigateTo('/register/college')">学院注册</el-button>
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