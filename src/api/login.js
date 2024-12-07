import myAxios from "@/request";

export const studentRegister = async(params) => {
  return myAxios.request({
    url: "/student/register",
    method: "POST",
    data: params,
    headers: {
      "Content-Type": "application/json", // 确保请求头声明为 JSON 格式
    },
  });
};

export const studentLogin = async(params) => {
  return myAxios.request({
    url: "/student/login",
    method: "POST",
    data: params,
    headers: {
      "Content-Type": "application/json", // 确保请求头声明为 JSON 格式
    },
  });
};