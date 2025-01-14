import myAxios from "@/request";

export const getNameToAccount = async() => {
  return myAxios.request({
      url: "register/college/name_to_account",
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
  })
}

// Post请求，不需要ID，直接调用接口
export const postNameToAccount = async(params) => {
  return myAxios.request({
      url: "register/college/name_to_account",
      method: "POST",
      data: params,
      headers: {
          "Content-Type": "application/json"
      }
  })
}

// Put请求，带上id参数
export const putNameToAccount = async(id, params) => {
  return myAxios.request({
      url: `register/college/name_to_account/${id}`,  // 在url中添加:id
      method: "PUT",
      data: params,
      headers: {
          "Content-Type": "application/json"
      }
  })
}

// Delete请求，带上id参数
export const deleteNameToAccount = async(id) => {
  return myAxios.request({
      url: `register/college/name_to_account/${id}`,  // 在url中添加:id
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      }
  })
}