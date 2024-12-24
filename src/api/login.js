import myAxios from "@/request";

export const studentLogin = async(params) => {
  return myAxios.request({
    url: "/login",
    method: "POST",
    data: params,
    headers: {
      "Content-Type": "application/json", // 确保请求头声明为 JSON 格式
    },
  });
};

export const collegeLogin = async(params) => {
  return myAxios.request({
    url: "/login",
    method: "POST",
    data: params,
    headers: {
      "Content-Type": "application/json", // 确保请求头声明为 JSON 格式
    },
  });
};