<template>
  <div>
    <h1>个人基本信息</h1>
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="80px"
    >
      <!-- 学号 -->
      <el-form-item label="学号" prop="studentId">
        <el-input v-model="form.studentId" placeholder="请输入学号" />
      </el-form-item>

      <!-- 姓名 -->
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名" />
      </el-form-item>

      <!-- 昵称 -->
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" placeholder="请输入昵称" />
      </el-form-item>

      <!-- 性别 -->
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio value="男">男</el-radio>
          <el-radio value="女">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 手机号 -->
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" />
      </el-form-item>

      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>

      <!-- 学院 -->
      <el-form-item label="学院" prop="college">
        <el-input v-model="form.college" placeholder="请输入学院" />
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { useStudentStore } from "@/stores/student";
import myAxios from "@/request";

const studentStore = useStudentStore();
const studentId = studentStore.data.id
let collegeId = 0
export default {
  name: "PersonalInfo",
  data() {
    return {
      // 表单数据
      form: {
        studentId: "", // 学号
        name: "", // 姓名
        nickname: "", // 昵称
        gender: "男", // 性别
        phone: "", // 手机号
        email: "", // 邮箱
        college: "", // 学院
      },
      // 验证规则
      rules: {
        studentId: [{ required: true, message: "请输入学号", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" },
        ],
        college: [{ required: true, message: "请输入学院名称", trigger: "blur" }],
      },
    };
  },
  mounted() {
    // const studentStore = useStudentStore();
    if (studentStore.data.id) {
      this.loadStudentInfo(studentStore.data.id);
    } else {
      console.error("用户 ID 未找到");
    }
  },
  methods: {
    async loadStudentInfo(studentId) {
      try {
        // 向后端发送请求
        const response = await myAxios.get(`/api/studentPersonalCenter/studentPersonalInfo/${studentId}`);
        const data = response.data;

        // 填充表单数据
        this.form.studentId = data.student_id || "";
        this.form.name = data.student_name || "";
        this.form.nickname = data.nickname || "";
        this.form.gender = data.gender == 1 ? "男" : "女";
        this.form.phone = data.student_phone || "";
        this.form.email = data.student_email || "";

        collegeId = data.college_id

        if (data.college_id) {
          try {
            const collegeResponse = await myAxios.get(`/api/studentPersonalCenter/affiliatedOrganizations/${studentId}`);
            this.form.college = collegeResponse.data.data.college_name || "未知学院";
          } catch (error) {
            console.error("获取学院信息失败", error);
            this.form.college = "获取学院信息失败";
          }
        } else {
          this.form.college = "暂无学院";
        }

      } catch (error) {
        console.error("加载用户信息失败", error);
      }
    },

    // 提交表单
    async onSubmit() { // To do
      try { 
        // alert(this.form.gender)
        const payload = {
          student_id: this.form.studentId, // 学号
          student_name: this.form.name,    // 姓名
          nickname: this.form.nickname,   // 昵称
          gender: this.form.gender === "男" ? 1 : 2, // 性别转换
          student_phone: this.form.phone, // 手机号
          student_email: this.form.email, // 邮箱
          college_id: collegeId,  // 学院 ID   这里还有问题，要查新的学院ID
        };
        await myAxios.put(`/api/studentPersonalCenter/studentPersonalInfo/${studentId}`, payload);
        alert("信息已保存");
      } catch (error) {
        console.error("保存失败", error);
        alert("保存失败，请稍后再试");
      }
    },
    // 重置表单
    onReset() {
      this.loadUserInfo(this.form.studentId); // 重新加载用户信息
    },
  },
};
</script>

<style scoped>
/* 简单样式调整 */
h1 {
  margin-bottom: 20px;
  color: #333;
  font-size: 20px;
}

.el-form {
  max-width: 500px; /* 设置表单的最大宽度 */
  margin: 0 auto; /* 居中 */
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08); /* 添加阴影 */
}
</style>
