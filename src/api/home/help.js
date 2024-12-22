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