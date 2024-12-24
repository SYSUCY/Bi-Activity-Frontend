import axios from "axios";
import { useLoginStore } from "@/stores/login.js";

const myAxios = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  withCredentials: true,
});

myAxios.interceptors.request.use(config => {
  // 从状态管理中获取token
  const loginStore = useLoginStore()
  const token = loginStore.data.token
  // 如果有token，则在请求头中添加token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  // 处理请求错误
  return Promise.reject(error)
})

export default myAxios;