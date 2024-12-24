import myAxios from "@/request.js";

export const getHomeLoopImages = async() => {
    return myAxios.request({
        url: "api/home/loop-images",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const getActivityTypeList = async() => {
    return myAxios.request({
        url: "api/home/type-list",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const getPopularActivityList = async() => {
    return myAxios.request({
        url: "api/home/popular-list",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const getHomeBiData = async() => {
    return myAxios.request({
        url: "api/home/bi-data",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const getHomeLeaderboard = async() => {
    return myAxios.request({
        url: "api/home/leaderboard",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const getImageByUrl = async(params) => {
    return myAxios.request({
        url: params,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
}