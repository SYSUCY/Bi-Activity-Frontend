<template>
  <div id="homePage">
    <image-slider></image-slider>
    <hr style="width: 95%;">
    <activity-type></activity-type>
    <hr style="width: 95%;">
    <popular-list></popular-list>
    <hr style="width: 95%;">
    <bi-data></bi-data>
  </div>
</template>

<script setup>
import ImageSlider from "@/components/home/ImageSlider.vue";
import ActivityType from "@/components/home/ActivityType.vue";
import PopularList from "@/components/home/PopularList.vue";
import BiData from "@/components/home/BiData.vue";
</script>

<style scoped>
#homePage {
  margin-bottom: 10px;
}
</style>