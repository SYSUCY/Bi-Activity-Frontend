import myAxios from "@/request.js";

export const getHelpInfo = async() => {
    return myAxios.request({
        url: "api/help/list",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const searchHelpInfo = async(params) => {
    return myAxios.request({
        url: "api/help/search",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        params: params
    })
}