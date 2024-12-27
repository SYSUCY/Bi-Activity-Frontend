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
                  :span="8"><div class="grid-content ep-bg-purple"
          />
            <el-card
                style="max-width: 100%; background: linear-gradient(to bottom, #8ab8e7, #3c96f2);"
                @click="clickActivityCard(item.id)"
            >
              <template #header>
                <div class="card-header" style="text-align: center;">
                  {{ item.activityName }}
                </div>
              </template>
              <el-row :gutter="20">
                <el-col :span="6" :xs="24">
                  <el-image style="width: 50px; height: 50px" :src="item.activityTypeImageUrl" fit="fill" />
                  <el-text size="large">
                    {{ item.activityTypeName }}
                  </el-text>
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

// 跳转至活动查询页面
const gotoActivityQuery = () => {
  router.push({name: 'ActivityQuery'})
}

// 点击卡片跳转至活动详情页面
const clickActivityCard = (id) => {
  router.push({name: 'ActivityDetail', params: {id: id}})
}

const activityList = ref([]);
onMounted(async() => {
  try {
    const res = await getPopularActivityList();
    if (res.data.label === 200) {
      activityList.value = res.data.data;
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