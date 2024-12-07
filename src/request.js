import axios from "axios";

const myAxios = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  withCredentials: true,
});

myAxios.interceptors.request.use(config => {
  // 请求发送之前
  return config
}, error => {
  // 处理请求错误
  return Promise.reject(error)
})

export default myAxios;