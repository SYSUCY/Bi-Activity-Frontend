import request from '@/request'

// 组织相关的 API 请求
export const organizationApi = {
    // 获取学生所属学院
    getStudentCollege(studentId) {
        return request({
            url: `/api/studentPersonalCenter/affiliatedOrganizations/${studentId}`,
            method: 'get'
        })
    },

    // 更新学生所属学院
    updateStudentCollege(studentId, collegeId) {
        return request({
            url: `/api/studentPersonalCenter/affiliatedOrganizations/${studentId}`,
            method: 'put',
            data: {
                college_id: collegeId
            }
        })
    },

    // 移除学生所属学院
    removeStudentCollege(studentId) {
        return request({
            url: `/api/studentPersonalCenter/affiliatedOrganizations/${studentId}`,
            method: 'delete'
        })
    },

    // 获取学院列表
    getCollegeList() {
        return request({
            url: `/api/studentPersonalCenter/affiliatedOrganizations/`,
            method: 'get'
        })
    }
}