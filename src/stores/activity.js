import {defineStore} from "pinia";
import {ref} from "vue";

const activityData = defineStore('activity', () =>{
    const data = ref({
        id: 0,
        activityAddress: "",
        contactName: "",
        contactDetails: "",
        activityTypeName: "",
        activityTypeImageUrl: "",
        activityDate: "",
        startTime: "",
        endTime: "",
        recruitmentNumber: 0,
        recruitedNumber: 0,
        registrationRestrictions: "",
        registrationRequirement: "",
        registrationDeadline: "",
        activityIntroduction: "",
        activityContent: "",
        activityName: "",
        activityImageUrl: "",
        publisherName: "",
        createdAt: "",
        ParticipateStatus: 0,
    })

    const setData = (data) => {
        data.value = data
    }

    const getData = () => {
        return data
    }

    return {setData, getData}
})

export default activityData

// type Activity struct {
//     // 活动信息
//     ID                   uint   `json:"id"`                   // 主键，自动递增
//     ActivityAddress      string `json:"activityAddress"`      // 活动指点
//     ContactName          string `json:"contactName"`          // 联系人姓名
//     ContactDetails       string `json:"contactDetails"`       // 联系人电话
//     ActivityTypeName     string `json:"activityTypeName"`     // 活动类别（标签）
//     ActivityTypeImageUrl string `json:"activityTypeImageUrl"` // 活动类别图片地址
//
//     // 志愿招募信息
//     ActivityDate      string `json:"activityDate"`      // 活动日期：YYYY-MM-DD
//     StartTime         string `json:"startTime"`         // 开始时间：HH:MM
//     EndTime           string `json:"endTime"`           // 结束时间：HH:MM
//     RecruitmentNumber int    `json:"recruitmentNumber"` // 招募人数
//     RecruitedNumber   int    `json:"recruitedNumber"`   // 已招募人数
//
//     // 活动限制
//     RegistrationRestrictions string `json:"registrationRestrictions"` // 报名限制：本学院成员、全校成员
//     RegistrationRequirement  string `json:"registrationRequirement"`  // 报名要求
//     RegistrationDeadline     string `json:"registrationDeadline"`     // 报名截止时间
//
//     // 活动介绍
//     ActivityIntroduction string `json:"activityIntroduction"` // 活动简介
//     ActivityContent      string `json:"activityContent"`      // 活动内容
//
//     ActivityName     string `json:"activityName"`     // 活动名称
//     ActivityImageUrl string `json:"activityImageUrl"` // 活动图片地址
//     PublisherName    string `json:"publisherName"`    // 活动发布者名称
//     CreatedAt        string `json:"createdAt"`        // 活动发布时间
//     ActivityStatus   int    `json:"activityStatus"`   // 活动状态：
//
//     // 报名状态
//     ParticipateStatus int `json:"participateStatus"`
// }