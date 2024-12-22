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
              <el-image style="width: 70px; height: 50px" :src="activity.activityTypeImageUrl" fit="scale-down" />
            </el-col>
            <el-col :span="20" style="text-align: left; display: flex; align-items: flex-end; padding-left: 20px;">
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
          <el-row style="padding-top: 10px;">
            <el-col :span="24" style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
              <el-row style="display: flex; justify-content: center;">
                <el-tag
                    effect="dark"
                    type="danger"
                    size="large"      style="min-width: 70px; height: 40px; display: flex; align-items: center; justify-content: center;"
                >
                  {{ rTime }}
                </el-tag>
                <el-text v-show="rTime" style="text-align: left; padding-left: 4px; align-self: flex-end;" size="large">
                  天
                </el-text>
              </el-row>
              <el-row v-show="rTime" style="margin-top: 5px; margin-left: -10px;">
                <el-text size="large">
                  活动截止报名剩余 {{ 2 }} 天
                </el-text>
              </el-row>
              <el-row style="padding-top: 50px; display: flex; justify-content: center;">
                <el-tag
                    effect="dark"
                    type="danger"
                    size="large"      style="width: 70px; height: 40px; display: flex; align-items: center; justify-content: center;"
                >
                  {{ 0 }}
                </el-tag>
                <el-text style="text-align: left; padding-left: 4px; align-self: flex-end;" size="large">
                  人
                </el-text>
              </el-row>
              <el-row style="margin-top: 5px; margin-left: -10px;">
                <el-text size="large">
                  报名人数{{ 0 }}人（满额 {{ 2 }} 人）
                </el-text>
              </el-row>
              <el-row style="padding-top: 25px; margin-left: -20px;">
                <el-button type="danger" plain size="large" @click="participants()">
                  <el-text v-if="1" size="large">
                    我要报名
                  </el-text>
                  <el-text v-else-if="2" size="large">
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
        </el-card>
      </el-col>
      <el-col :span="16" class="contain-col" :xs="24">
        <el-card style="width: 100%;">
          <template #header>
            <div class="card-header">
              <span>Card name</span>
            </div>
          </template>
          <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
          <template #footer>Footer content</template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>

import {computed, ref} from "vue";
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
      registrationDeadline: "2024-12-21 18:00",
      activityIntroduction: "无",
      activityContent: "无",
      activityName: "没有活动名字",
      activityImageUrl: "url2",
      publisherName: "没有发布人",
      createdAt: "1999-12-31 23:59:59",
      ParticipateStatus: 0,
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
}

.centered-row {
  width: 70%; /* 设置行宽度为70% */
}

.contain-col {
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