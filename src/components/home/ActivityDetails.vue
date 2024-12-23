<template>
  <div id="activityDetails" class="container">
    <el-row :gutter="20" class="centered-row">
      <el-col :span="8" class="contain-col" :xs="24">
        <el-card style="width: 100%;">
          <el-row style="display: flex; justify-content: center;">
            <el-col :span="24" style="display: flex; justify-content: center;">
              <el-image style="width: 100%; height: 200px" :src="activity.activityImageUrl" fit="scale-down" />
            </el-col>
          </el-row>
          <el-row style="padding-top: 10px;">
            <el-col :span="4">
              <el-image style="width: 100%; height: 50px" :src="activity.activityTypeImageUrl" fit="scale-down" />
            </el-col>
            <el-col :span="20" style="text-align: left; display: flex; align-items: flex-end; padding-left: 10px;">
              <el-text size="large">
                {{ activity.activityTypeName }}
              </el-text>
            </el-col>
          </el-row>
          <el-row style="padding-top: 10px;">
            <el-text size="large" style="font-size: 20px">
              {{ activity.activityName }}
            </el-text>
          </el-row>
          <el-row style="padding-top: 10px;">
            <el-text size="large">
              发布组织: {{ activity.publisherName}}
            </el-text>
          </el-row>
          <el-row style="padding-top: 5px;">
            <el-text size="large">
              发布时间: {{ activity.createdAt }}
            </el-text>
          </el-row>
          <el-row style="padding-top: 5px;">
            <el-text size="large">
              活动地点: {{ activity.activityAddress }}
            </el-text>
          </el-row>
          <el-row style="padding-top: 10px">
            <el-divider content-position="left">Join In</el-divider>
          </el-row>
          <el-row style="padding-top: 10px;" v-if="rTime">
            <el-col :span="24" style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
              <el-row style="display: flex; justify-content: center;">
                <el-tag
                    effect="dark"
                    type="danger"
                    size="large"
                    style="min-width: 70px; height: 40px; display: flex; align-items: center; justify-content: center;"
                >
                  {{ rTime }}
                </el-tag>
                <el-text
                    style="text-align: left; padding-left: 4px; align-self: flex-end;"
                    size="large">
                  天
                </el-text>
              </el-row>
              <el-row style="margin-top: 5px; margin-left: -10px;">
                <el-text size="large">
                  活动截止报名剩余 {{ rTime }} 天
                </el-text>
              </el-row>
              <el-row style="padding-top: 50px; display: flex; justify-content: center;">
                <el-tag
                    effect="dark"
                    type="danger"
                    size="large"      style="width: 70px; height: 40px; display: flex; align-items: center; justify-content: center;"
                >
                  {{ activity.recruitedNumber }}
                </el-tag>
                <el-text style="text-align: left; padding-left: 4px; align-self: flex-end;" size="large">
                  人
                </el-text>
              </el-row>
              <el-row style="margin-top: 5px; margin-left: -10px;">
                <el-text size="large">
                  报名人数{{ activity.recruitedNumber }}人（满额 {{ activity.recruitmentNumber }} 人）
                </el-text>
              </el-row>
              <el-row style="padding-top: 25px; margin-left: -20px;">
                <el-button
                    type="danger"
                    plain size="large"
                    @click="participants()"
                    :disabled="rTime === 0 || activity.participateStatus !== 1"
                >
                  <el-text v-if="activity.participateStatus === 1" size="large">
                    我要报名
                  </el-text>
                  <el-text v-else-if="activity.participateStatus === 2" size="large">
                    等待审核
                  </el-text>
                  <el-text v-else size="large">
                    已报名
                  </el-text>
                </el-button>
              </el-row>
              <el-row style="padding-top: 10px;"></el-row>
            </el-col>
          </el-row>
          <el-row v-else>
            <el-col
                style="display: flex; justify-content: center; padding-top: 20px; padding-bottom: 20px;"
            >
              <el-tag
                  effect="dark"
                  type="danger"
                  size="large"
                  style="min-width: 70px; height: 50px; display: flex; align-items: center; justify-content: center;"
              >
                <el-text size="large">
                  活动已结束
                </el-text>
              </el-tag>
            </el-col>
          </el-row>
        </el-card >
      </el-col>
      <el-col :span="16" class="contain-col" :xs="24">
        <el-card style="width: 100%;">
          <el-col>
            <div>
              <el-row class="card2-title">
                活动信息
              </el-row>
              <el-row class="details-title-row">
                <el-col :span="5" class="details-title-col1">
                  <el-text size="large">
                    活动地点
                  </el-text>
                </el-col>
                <el-col :span="18" class="details-title-col12">
                  <el-text size="large" class="details-text">
                    {{ activity.activityAddress }}
                  </el-text>
                </el-col>
              </el-row>
              <el-row class="details-title-row">
                <el-col :span="5" class="details-title-col1">
                  <el-text size="large">
                    联系方式
                  </el-text>
                </el-col>
                <el-col :span="18" class="details-title-col12">
                  <el-text size="large" class="details-text">
                    {{ activity.contactName }} {{ activity.contactDetails }}
                  </el-text>
                </el-col>
              </el-row>
              <el-row class="details-title-row">
                <el-col :span="5" class="details-title-col1">
                  <el-text size="large">
                    活动分类
                  </el-text>
                </el-col>
                <el-col :span="18" class="details-title-col12">
                  <el-text size="large" class="details-text">
                    {{ activity.activityTypeName }}
                  </el-text>
                </el-col>
              </el-row>
            </div>
            <div class="card2-padding">
              <el-row class="card2-title">
                志愿者招募信息
              </el-row>
              <el-row class="details-title-row">
                <el-col :span="5" class="details-title-col1">
                  <el-text size="large">
                    时间段
                  </el-text>
                </el-col>
                <el-col :span="18" class="details-title-col12">
                  <el-text size="large" class="details-text">
                    {{ activity.activityDate }} {{ activity.startTime }}-{{ activity.endTime }}
                  </el-text>
                </el-col>
              </el-row>
              <el-row class="details-title-row">
                <el-col :span="5" class="details-title-col1">
                  <el-text size="large">
                    招募岗位
                  </el-text>
                </el-col>
                <el-col :span="18" class="details-title-col12">
                  <el-text size="large" class="details-text">
                    志愿者
                  </el-text>
                </el-col>
              </el-row>
              <el-row class="details-title-row">
                <el-col :span="5" class="details-title-col1">
                  <el-text size="large">
                    招募人数
                  </el-text>
                </el-col>
                <el-col :span="18" class="details-title-col12">
                  <el-text size="large" class="details-text">
                    {{ activity.recruitedNumber }}/{{ activity.recruitmentNumber }} 人
                  </el-text>
                </el-col>
              </el-row>
            </div>
            <div class="card2-padding">
              <el-row class="card2-title">
                报名须知
              </el-row>
              <el-row class="details-title-row">
                <el-col :span="5" class="details-title-col1">
                  <el-text size="large">
                    报名限制
                  </el-text>
                </el-col>
                <el-col :span="18" class="details-title-col12">
                  <el-text size="large" class="details-text">
                    {{ activity.registrationRestrictions }}
                  </el-text>
                </el-col>
              </el-row>
              <el-row class="details-title-row">
                <el-col :span="5" class="details-title-col1">
                  <el-text size="large">
                    截止时间
                  </el-text>
                </el-col>
                <el-col :span="18" class="details-title-col12">
                  <el-text size="large" class="details-text">
                    {{ activity.registrationDeadline }}
                  </el-text>
                </el-col>
              </el-row>
              <el-row class="details-title-row">
                <el-col :span="5" class="details-title-col1">
                  <el-text size="large">
                    报名要求
                  </el-text>
                </el-col>
                <el-col :span="18" class="details-title-col12">
                  <el-text size="large" class="details-text">
                    {{ activity.registrationRequirement }}
                  </el-text>
                </el-col>
              </el-row>
            </div>
            <div class="card2-padding" style="padding-bottom: 20px;">
              <el-row class="card2-title">
                活动介绍
              </el-row>
              <el-row class="details-title-row">
                <el-col :span="5" class="details-title-col1">
                  <el-text size="large">
                    活动简介
                  </el-text>
                </el-col>
                <el-col :span="18" class="details-title-col12">
                  <el-text size="large" class="details-text">
                    {{ activity.activityIntroduction }}
                  </el-text>
                </el-col>
              </el-row>
              <el-row class="details-title-row">
                <el-col :span="5" class="details-title-col1">
                  <el-text size="large">
                    活动内容
                  </el-text>
                </el-col>
                <el-col :span="18" class="details-title-col12">
                  <el-text size="large" class="details-text">
                    {{ activity.activityContent }}
                  </el-text>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>

import {computed} from "vue";
import {remainingTime} from "@/utils/parseTime.js";

const participants = () => {
  console.log(1)
}

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      activityAddress: "马六甲海峡",
      contactName: "yz",
      contactDetails: "123456789123",
      activityTypeName: "自由活动",
      activityTypeImageUrl: "url1",
      activityDate: "2050-10-01",
      startTime: "08:00",
      endTime: "23:59",
      recruitmentNumber: 100,
      recruitedNumber: 20,
      registrationRestrictions: "无",
      registrationRequirement: "无",
      registrationDeadline: "2024-12-23 18:00",
      activityIntroduction: "无",
      activityContent: "无",
      activityName: "没有活动名字",
      activityImageUrl: "url2",
      publisherName: "没有发布人",
      createdAt: "1999-12-31 23:59:59",
      activityStatus: 1,
      participateStatus: 1,
    })
  }
});

const rTime = computed(() => {
  return remainingTime(new Date(props.activity.registrationDeadline))
})

</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  height: 100vh; /* 使容器占满整个视口高度 */
  //overflow: hidden;
  margin-bottom: 50px;
}

.centered-row {
  width: 70%; /* 设置行宽度为70% */
}

.contain-col {
}

.card2-title {
  font-size: 20px;
}

.card2-padding {
  padding-top: 30px;
}

.details-title-row {
  padding-top: 10px;
}

.details-title-col1 {

}

.details-text {
  font-weight: bold;
}
</style>

<!--type Activity struct {-->
<!--// 活动信息-->
<!--ID                   uint   `json:"id"`                   // 主键，自动递增-->
<!--ActivityAddress      string `json:"activityAddress"`      // 活动指点-->
<!--ContactName          string `json:"contactName"`          // 联系人姓名-->
<!--ContactDetails       string `json:"contactDetails"`       // 联系人电话-->
<!--ActivityTypeName     string `json:"activityTypeName"`     // 活动类别（标签）-->
<!--ActivityTypeImageUrl string `json:"activityTypeImageUrl"` // 活动类别图片地址-->

<!--// 志愿招募信息-->
<!--ActivityDate      string `json:"activityDate"`      // 活动日期：YYYY-MM-DD-->
<!--StartTime         string `json:"startTime"`         // 开始时间：HH:MM-->
<!--EndTime           string `json:"endTime"`           // 结束时间：HH:MM-->
<!--RecruitmentNumber int    `json:"recruitmentNumber"` // 招募人数-->
<!--RecruitedNumber   int    `json:"recruitedNumber"`   // 已招募人数-->

<!--// 活动限制-->
<!--RegistrationRestrictions string `json:"registrationRestrictions"` // 报名限制：本学院成员、全校成员-->
<!--RegistrationRequirement  string `json:"registrationRequirement"`  // 报名要求-->
<!--RegistrationDeadline     string `json:"registrationDeadline"`     // 报名截止时间-->

<!--// 活动介绍-->
<!--ActivityIntroduction string `json:"activityIntroduction"` // 活动简介-->
<!--ActivityContent      string `json:"activityContent"`      // 活动内容-->

<!--ActivityName     string `json:"activityName"`     // 活动名称-->
<!--ActivityImageUrl string `json:"activityImageUrl"` // 活动图片地址-->
<!--PublisherName    string `json:"publisherName"`    // 活动发布者名称-->
<!--CreatedAt        string `json:"createdAt"`        // 活动发布时间-->
<!--ActivityStatus   int    `json:"activityStatus"`   // 活动状态：-->

<!--// 报名状态-->
<!--ParticipateStatus int `json:"participateStatus"`-->
<!--}-->