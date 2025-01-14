import myAxios from "@/request.js";

export const editTypeName = async(data) => {
    return myAxios.request({
        url: "api/admin/update-type",
        method: "PUT",
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const deleteType = async(params) => {
    return myAxios.request({
        url: "api/admin/delete-type",
        method: "DELETE",
        params,
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const addType = async(data) => {
    return myAxios.request({
        url: "api/admin/add-type",
        method: "POST",
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const editImagePut = async(data) => {
    return myAxios.request({
        url: "api/admin/update-image",
        method: "PUT",
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const deleteImageDELETE = async(params) => {
    return myAxios.request({
        url: "api/admin/delete-image",
        method: "DELETE",
        params,
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const addImagePOST = async(data) => {
    return myAxios.request({
        url: "api/admin/add-image",
        method: "POST",
        data,
        headers: {
            "Content-Type": "application/json"
        }
    })
}