<template>
  <div id="searchParams">
    <div class="search-params" style="width: 95%; display: block; margin: 0 auto;">
      <el-card style="width: 100%">
        <el-row>
          <el-col :span="4" style="display: flex; align-items: center; justify-content: flex-end; margin-right: 20px; height: 30px;">
            <el-text class="mx-1" size="large">活动性质:</el-text>
          </el-col>
          <el-col :span="18">
            <el-radio-group v-model="nature" :change="natureChange()">
              <el-radio value="0" size="large" border>全部</el-radio>
              <el-radio value="1" size="large" border>学生活动</el-radio>
              <el-radio value="2" size="large" border>学院活动</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
          <el-col :span="4" style="display: flex; align-items: center; justify-content: flex-end; margin-right: 20px;">
            <el-text class="mx-1" size="large">活动状态:</el-text>
          </el-col>
          <el-col :span="18">
            <el-radio-group v-model="status" :change="statusChange()">
              <el-radio value="0" size="large" border>全部</el-radio>
              <el-radio value="2" size="large" border>招募中</el-radio>
              <el-radio value="3" size="large" border>进行中</el-radio>
              <el-radio value="4" size="large" border>已结束</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
          <el-col :span="4" style="display: flex; align-items: center; justify-content: flex-end; margin-right: 20px; height: 30px;">
            <el-text class="mx-1" size="large">活动时间:</el-text>
          </el-col>
          <el-col :span="18">
            <el-date-picker
                v-model="activityData"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
                size="large"
                :change="dataChange()"
            />
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
          <el-col :span="4" style="display: flex; align-items: center; justify-content: flex-end; margin-right: 20px; height: 50px;">
            <el-text class="mx-1" size="large">活动类别:</el-text>
          </el-col>
          <el-col :span="18">
            <el-radio-group v-model="typeID" :change="typeIDChange()">
              <el-radio value="0" size="large" border style="margin-top: 10px">全部</el-radio>
              <el-radio v-for="(item, index) in typeList" :key="item.id" :value="item.id" size="large" border style="margin-top: 10px">
                {{ item.typeName }}
              </el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row style="padding-top: 10px;">
          <el-col :span="4" style="display: flex; align-items: center; justify-content: flex-end; margin-right: 20px; height: 30px;">
            <el-text class="mx-1" size="large">搜索词:</el-text>
          </el-col>
          <el-col :span="18" style="display: flex; justify-content: left;align-content: center;;">
            <el-input
                v-model="keyword"
                style="width: 95%; height: 50px;"
                placeholder="Type something"
                :prefix-icon="Search"
                :change="keywordChange()"
            />
          </el-col>
        </el-row>
      </el-card>
    </div>
    <hr style="width: 95%; display: block; margin: 0 auto;">
    <div id="searchCard" style="width: 95%; display: block; margin: 0 auto;">
      <el-row>
        <el-card style="width: 100%;" shadow="always">
          <el-row>
            <el-col v-for="item in 9" :key="item.id"
                    style="padding: 10px;"
                    :span="8"><div class="grid-content ep-bg-purple" />
              <el-card style="max-width: 100%; background: linear-gradient(to bottom, #8ab8e7, #3c96f2);">

              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-row>
      <el-row style="padding-top: 20px; display: flex;justify-content: center; align-content: center; margin-bottom: 20px;">
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </el-row>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import 'dayjs/locale/zh-cn'
import {parseTime} from "@/utils/parseTime.js";
import {getActivityTypeList} from "@/api/home/home.js";
import {Search} from "@element-plus/icons-vue";

// type SearchActivityParams struct {
//   ActivityPublisherID uint   `json:"activityPublisherID"` // 发布者ID
//   ActivityNature      int    `json:"activityNature"`      // 活动性质 0 - 全部 1 - 个人活动 2 - 学院活动 || 0 - 全部 1 - 我的发布 2 - 我的参与, 其余非法
//   ActivityStatus      int    `json:"activityStatus"`      // 活动状态 0 - 全部 2 - 招募中 3 - 活动开始 4 - 活动结束, 其余非法
//   ActivityDateStart   string `json:"activityDateStart"`   // 活动日期 YYYY-MM-DD
//   ActivityDateEnd     string `json:"activityDateEnd"`     // 活动日期 YYYY-MM-DD
//   ActivityTypeID      uint   `json:"activityTypeID"`      // 活动类别ID 0 - 全部
//   Keyword             string `json:"keyword"`             // 搜索关键字，活动名称相关
//   Page                int    `json:"page"`                // 页码
// }

const nature = ref("0")
const natureChange = () => {
  // TODO: 发送查询条件
  console.log(nature.value)
}

const status = ref("0")
const statusChange = () => {
  // TODO: 发送查询条件
  console.log(status.value)
}

const activityData = ref('')
const dataChange = () => {
  let startTime = ''
  let endTime = ''
  if (activityData.value) {
    startTime = parseTime(new Date(activityData.value[0]).getTime())
    endTime = parseTime(new Date(activityData.value[1]).getTime())
  }
  // TODO: 发送查询条件
  console.log(startTime, endTime)
}

const typeID = ref("0");
const typeList = ref([]);
onMounted(async () => {
  try {
    const res = await getActivityTypeList();
    if (res.data.label === 200) {
      typeList.value = res.data.data;
      // id: 1
      // typeName: "type1"
      // url: "url1"
    } else {
      console.error("Failed to fetch activity type list:", res.data.error);
    }
  } catch (error) {
    console.error("Panic to fetch activity type list:", error);
  }
});
const typeIDChange = () => {
  // TODO: 发送查询条件
  console.log(typeID.value)
}

const keyword = ref("");
const keywordChange = () => {
  // TODO: 发送查询条件
  console.log(keyword.value)
}
</script>

<style scoped>

</style>