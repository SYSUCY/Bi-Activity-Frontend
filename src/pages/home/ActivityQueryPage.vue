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
              <el-radio v-for="(item) in typeList" :key="item.id" :value="item.id" size="large" border style="margin-top: 10px">
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
        <el-card style="width: 100%; min-width: 300px;" shadow="always">
          <el-row :gutter="24">
            <el-col v-for="item in search" :key="item.id"
                    style="padding: 10px;"
                    :span="8"><div class="grid-content ep-bg-purple" />
              <el-card
                  style="max-width: 100%; background: linear-gradient(to bottom, #8ab8e7, #3c96f2);"
                  @click="clickActivityCard(item.id)"
              >
                <el-row>
                  <el-col :span="4" style="display: flex; flex-direction: column; align-items: flex-start;">
                    <el-image style="width: 70px; height: 50px" :src="item.activityTypeImageUrl" fit="fill" />
                  </el-col>
                  <el-col :span="4" style="display: flex; flex-direction: column; justify-content: flex-end; align-items: flex-end; margin-left: -20px">
                    {{ item.activityTypeName }}
                  </el-col>
                  <el-col :span="8" :offset="4" style="display: flex; flex-direction: column; justify-content: flex-end; align-items: flex-end;">
                    剩余名额：{{ item.remainingNumber }}
                  </el-col>
                </el-row>
                <el-row style="padding-top: 4px; font-size: 20px">
                  {{ item.activityName }}
                </el-row>
                <el-row style="padding-top: 20px;">
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
                <el-row>
                  <el-col :span="24">
                    编号:
                    {{ item.id }}
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-row>
      <el-row style="padding-top: 20px; display: flex;justify-content: center; align-content: center; margin-bottom: 20px;">
        <el-pagination
            background layout="prev, pager, next"
            :total="totalNum"
            :default-page-size="9"
            @current-change="handlePageChange"
        />
      </el-row>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue'
import 'dayjs/locale/zh-cn'
import {parseTime} from "@/utils/parseTime.js";
import {getActivityTypeList} from "@/api/home/home.js";
import {Search} from "@element-plus/icons-vue";
import {searchActivity} from "@/api/home/search.js";
import router from "@/router/index.js";

// 活动性质: 0:全部 1:学生 2:学院
const nature = ref("0")
const natureChange =  () => {
}

// 活动状态: 0:全部 2:报名中 3:进行中 4:已结束
const status = ref("0")
const statusChange = () => {
}

// 活动日期: "":全部  [开始日期, 结束日期]
const activityData = ref('')
const dataChange = () => {
}

// 活动类型: 0:全部 其他:类型ID
const typeID = ref("0");
const typeIDChange = () => {
}
// 获取活动类型列表
const typeList = ref([]);
onMounted(async () => {
  try {
    const res = await getActivityTypeList();
    if (res.data.label === 200) {
      typeList.value = res.data.data;
    } else {
      console.error("Failed to fetch activity type list:", res.data.error);
    }
  } catch (error) {
    console.error("Panic to fetch activity type list:", error);
  }
});


// 关键词："":全部 其他:关键词
const keyword = ref("");
const keywordChange = () => {
}

// 分页查询
const totalNum = ref(0);
const handlePageChange = (val) => {
  const params = ref({
    nature: nature.value,
    status: status.value,
    // 如果有活动时间，转化为time.DateOnly格式，否则为""表示全部活动
    start: activityData.value[0] ? parseTime(new Date(activityData.value[0]).getTime()) : "",
    end: activityData.value[1] ? parseTime(new Date(activityData.value[1]).getTime()) : "",
    type_id: typeID.value,
    keyword: keyword.value,
    page: val
  })
  fetchSearchResults(params);
}

// 搜索活动列表
const search = ref([]);
const params = computed(() => {
  return {
    nature: nature.value,
    status: status.value,
    // 如果有活动时间，转化为time.DateOnly格式，否则为""表示全部活动
    start: activityData.value? parseTime(new Date(activityData.value[0]).getTime()): "",
    end: activityData.value? parseTime(new Date(activityData.value[1]).getTime()): "",
    type_id: typeID.value,
    keyword: keyword.value,
    page: 1
  }
})
const fetchSearchResults = async (params) => {
  try {
    const res = await searchActivity(params.value);
    if (res.data.label === 200) {
      search.value = res.data.data[0];
      // 返回活动总数，用于分页
      return res.data.data[1];
    } else {
      console.error("Failed to fetch search result:", res.data.error);
    }
  } catch (e) {
    console.error("Panic to fetch search result:", e);
  }
};
watch(params, async () => {
  totalNum.value = await fetchSearchResults(params);
}, {immediate: true})

// 点击活动卡片 -> 跳转到活动详情页
// TODO: 当前跳转后查询参数会被重置，需要改进
const clickActivityCard = (id) => {
  router.push({name: 'ActivityDetail', params: {id: id}})
}
</script>

<style scoped>
#searchParams {
  margin-bottom: 20px;
  margin-left: 102px;
  margin-right: 102px;
}
</style>

<!--// type SearchActivityParams struct {-->
<!--//   ActivityPublisherID uint   `json:"activityPublisherID"` // 发布者ID-->
<!--//   ActivityNature      int    `json:"activityNature"`      // 活动性质 0 - 全部 1 - 个人活动 2 - 学院活动 || 0 - 全部 1 - 我的发布 2 - 我的参与, 其余非法-->
<!--//   ActivityStatus      int    `json:"activityStatus"`      // 活动状态 0 - 全部 2 - 招募中 3 - 活动开始 4 - 活动结束, 其余非法-->
<!--//   ActivityDateStart   string `json:"activityDateStart"`   // 活动日期 YYYY-MM-DD-->
<!--//   ActivityDateEnd     string `json:"activityDateEnd"`     // 活动日期 YYYY-MM-DD-->
<!--//   ActivityTypeID      uint   `json:"activityTypeID"`      // 活动类别ID 0 - 全部-->
<!--//   Keyword             string `json:"keyword"`             // 搜索关键字，活动名称相关-->
<!--//   Page                int    `json:"page"`                // 页码-->
<!--// }-->