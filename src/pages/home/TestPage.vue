<template>
  <el-descriptions
      class="margin-top"
      :column="2"
      size="large"
      border
      direction="vertical"
  >
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon size="16px">
            <user />
          </el-icon>
          姓名
        </div>
      </template>
      {{  }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon size="16px">
            <UserFilled />
          </el-icon>
          学号
        </div>
      </template>
      {{  }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon size="16px">
            <HomeFilled />
          </el-icon>
          所属院系
        </div>
      </template>
      {{  }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon size="16px">
            <iphone />
          </el-icon>
          联系电话
        </div>
      </template>
      {{  }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon size="16px">
            <Message />
          </el-icon>
          邮箱
        </div>
      </template>
      {{  }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
import {
  HomeFilled,
  Iphone,
  Location,
  Message,
  OfficeBuilding,
  Tickets,
  User,
  UserFilled
} from "@element-plus/icons-vue";

</script>

<style scoped>

</style>