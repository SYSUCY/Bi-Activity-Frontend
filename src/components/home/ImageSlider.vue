<template>
  <div id="imageSlider" style="width: 95%; display: block;margin: 0 auto;">
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item in imageSlider" :key="item.id">
        <img :src="item.url"  :alt="item.fileName"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getHomeLoopImages, getImageByUrl} from "@/api/home/home.js";

const imageSlider = ref([]);
const images = ref([]);
onMounted(async () => {
  try {
    const res = await getHomeLoopImages();
    if (res.data.label === 200) {
      imageSlider.value = res.data.data
      // fileName: "image4"
      // id: 4
      // url: "url4"
      // TODO: 请求远程图片
      // for (let i = 0; i < imageSlider.value.length; i++) {
      //   const image = getImageByUrl(imageSlider.value[i].url)
      //   images.value.push(image);
      // }
    } else {
      console.error("Failed to fetch loop-images error: ", res.data.error);
    }
  } catch (error) {
    console.error("Panic to fetch loop-images error: ", error);
  }
})
</script>

<style scoped>
el-carousel {
}

el-carousel-item {
  background-size: cover;
  background-position: center;
}

:nth-child(2n) {
  background-color: #99a9bf;
}

:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-carousel__item img {
  width: 100%;
  height: 100%;
  //object-fit: cover; /* 裁剪图片以适应容器 */
  color: #475669;
  opacity: 0.75;
  margin: 0;
  text-align: center;
}
</style>