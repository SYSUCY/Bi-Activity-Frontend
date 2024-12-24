import myAxios from "@/request.js";

export const searchActivity = async(params) => {
    return myAxios.request({
        url: "api/search/params",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        params: params
    })
}

export const getActivityDetail = async(params) => {
    return myAxios.request({
        url: "api/search/get-activity-detail",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        params: params
    })
}

export const myActivity = async(params) => {
    return myAxios.request({
        url: "api/my-activity/params",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        params: params
    })
}

export const participateActivity = async(params) => {
    return myAxios.request({
        url: "api/activity/participate-activity",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        params: params
    })
}

// TODO: 更换方式，采用POST 方式
export const getStuInfo = async(params) => {
    return myAxios.request({
        url: "api/student/info",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        params: params
    })
}