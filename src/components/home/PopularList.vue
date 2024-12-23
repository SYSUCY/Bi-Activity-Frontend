<template>
  <div id="popularList">
    <el-card style="max-width: 95%; min-width: 95%">
      <template #header>
        <div class="card-header">
          <el-row>
            <el-col :span="12">
              <span>热门活动</span>
            </el-col>
            <el-col :span="12" style="text-align: right;">
              <el-icon style="margin-right: 4px" :size="20" @click="gotoActivityQuery">
                <More />
              </el-icon>
            </el-col>
          </el-row>
        </div>
      </template>
      <el-scrollbar height="500px">
        <el-row>
          <el-col v-for="item in activityList" :key="item.id"
                  style="padding-left: 10px; padding-right: 10px;"
                  :span="8"><div class="grid-content ep-bg-purple" />
            <el-card style="max-width: 100%; background: linear-gradient(to bottom, #8ab8e7, #3c96f2);">
              <template #header>
                <div class="card-header" style="text-align: center;">
                  {{ item.activityName }}
                </div>
              </template>
              <el-row :gutter="20">
                <el-col :span="6" :xs="24">
                  <el-image style="width: 50px; height: 50px" :src="item.activityTypeImageUrl" fit="fill" />
                </el-col>
                <el-col :span="18" :xs="24"
                        style="text-align: left; display: flex; flex-direction: column; justify-content: center">
                  <el-row>
                    <el-col :span="24">
                      发布组织:
                      {{ item.activityPublisherName }}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      活动时间:
                      {{ item.activityDate + " " + item.startTime + " - " + item.endTime }}
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-scrollbar>
    </el-card>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getPopularActivityList} from "@/api/home/home.js";
import {More} from "@element-plus/icons-vue";
import router from "@/router/index.js";

const gotoActivityQuery = () => {
  router.push({name: 'ActivityQuery'})
}

const activityList = ref([]);
onMounted(async() => {
  try {
    const res = await getPopularActivityList();
    if (res.data.label === 200) {
      activityList.value = res.data.data;
      // type ActivityCard struct {
      //   ID                    uint   `json:"id"`                    // 主键
      //   ActivityName          string `json:"activityName"`          // 活动名称
      //   ActivityDate          string `json:"activityDate"`          // 活动日期：YYYY-MM-DD
      //   StartTime             string `json:"startTime"`             // 活动开始时间： HH:MM
      //   EndTime               string `json:"endTime"`               // 活动结束时间： HH:MM
      //   ActivityPublisherName string `json:"activityPublisherName"` // 发布者名称
      //   ActivityTypeName      string `json:"activityTypeName"`      // 活动类型名称
      //   ActivityTypeImageUrl  string `json:"activityTypeImageUrl"`  // 活动类型图片地址
      //   RemainingNumber       int    `json:"remainingNumber"`       // 活动招募剩余人数
      // }
      // TODO: 活动类型图片的展示
    } else {
      console.error("Failed to fetch popular activity list:", res.data.error);
    }
  } catch (error) {
    console.error("Panic to fetch popular activity list:", error);
  }
})
</script>

<style scoped>
#popularList {
  display: flex;
  justify-content: center;
}
</style>