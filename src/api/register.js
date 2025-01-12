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