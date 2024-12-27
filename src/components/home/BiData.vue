<template>
  <div id="biData">
    <el-row type="flex" justify="center">
      <el-card style="width: 95%;">
        <el-row>
          <el-col :span="8">
            <el-row type="flex" justify="center">
              <el-statistic :value="biData.activityTotal">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    Activity Total
                    <el-icon style="margin-left: 4px" :size="12">
                      <TopRight />
                    </el-icon>
                  </div>
                </template>
              </el-statistic>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row type="flex" justify="center">
              <el-statistic :value="biData.collegeTotal">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    Join College
                    <el-icon style="margin-left: 4px" :size="12">
                      <HomeFilled />
                    </el-icon>
                  </div>
                </template>
              </el-statistic>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row type="flex" justify="center">
              <el-statistic :value="biData.studentTotal">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    Sign In Student
                    <el-icon style="margin-left: 4px" :size="12">
                      <User />
                    </el-icon>
                  </div>
                </template>
              </el-statistic>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row type="flex" justify="center">
      <el-card style="width: 95%">
        <div style="text-align: center; background: linear-gradient(to bottom, #ff7e5f, #feb47b);">
          <el-scrollbar height="400px">
            <el-row :gutter="20"
                    v-for="(item, index) in leaderboardData"
                    :key="item" class="scrollbar-demo-item"
                    style="margin-left: 10px; margin-right: 10px">
              <el-col :span="2">
                {{ (index+1).toString().padStart(2, '0') }}.
              </el-col>
              <el-col :span="22">
                {{ item.collegeName.padEnd(20, ' ') }}
                {{ item.studentTotal.toString().padStart(5, ' ') }}
              </el-col>
            </el-row>
          </el-scrollbar>
        </div>
        <template #footer class="footer">
          <div style="text-align: center;">数据榜单</div>
        </template>
      </el-card>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {HomeFilled, TopRight, User} from '@element-plus/icons-vue'
import { getHomeBiData, getHomeLeaderboard } from '@/api/home/home'

const biData = ref([])
onMounted(async() => {
  try {
    const res = await getHomeBiData()
    if (res.data.label === 200) {
      biData.value = res.data.data
    } else {
      console.error("Failed to fetch biData:", res.data.error)
    }
  } catch (error) {
    console.error("Panic to fetch biData:", error)
  }
})

const leaderboardData = ref([])
onMounted(async() => {
  try {
    const res = await getHomeLeaderboard()
    if (res.data.label === 200) {
      leaderboardData.value = res.data.data
    } else {
      console.error('Failed to fetch leaderboard data:', res.data.error)
    }
  } catch (error) {
    console.error('Panic to fetch leaderboard data:', error)
  }
})
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>