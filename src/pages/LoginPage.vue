<template>
  <div id="loginPage">
    <el-form>
      <el-form-item label="账号">
        <el-input/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
  // import {useStudentStore} from "@/stores/student.js";
  // const studentStore = useStudentStore();
  // console.log(studentStore.data);
</script>

<style scoped>

</style>