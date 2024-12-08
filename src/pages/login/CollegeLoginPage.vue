<template>
  <div id="loginPage">
    <h1>学院登录</h1>
    <el-form 
      :model="loginForm"
    >
      <el-form-item label="账号">
        <el-input
          placeholder="请输入账号"
          v-model="loginForm.username"
        />
      </el-form-item>
      <el-form-item label="密码">
        <el-input 
          placeholder="请输入密码"
          show-password 
          v-model="loginForm.password"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script  setup>
  // import {useStudentStore} from "@/stores/student.js";
  // const studentStore = useStudentStore();
  // console.log(studentStore.data);
  import { reactive, ref } from "vue";

  
  // 登录表单可以直接发给后端
  const loginForm = reactive({
    username: "",
    password: ""
  });

  const checkLoginForm = () => {
    if (loginForm.username === "" || loginForm.password === "") {
      alert("账号或密码不能为空");
      return false;
    }
    else if(loginForm.password.length < 8){
      alert("密码长度不能少于8位");
      return false;
    }
    return true;
  }

  const login = () => {
    // 登录表单校验
    if (!checkLoginForm()) {
      return;
    }
    console.log(loginForm);
  }
</script>

<style scoped>

</style>