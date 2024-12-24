<template>
  <div id="basicLayout">
    <el-container>
      <el-header class="header">
        <GlobalHeader/>
      </el-header>
      <el-main class="content">
        <router-view/>
      </el-main>
      <el-footer class="footer">
        <a href="https://www.gdzyz.cn/" target="_blank">
          Bi活动
        </a>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
  import GlobalHeader from '@/components/GlobalHeader.vue'
</script>

<style  scoped>
#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

#basicLayout .content{
  background: linear-gradient(to right, #fefefe, #fff);
  margin-bottom: 28px;
  padding: 20px;
}

#basicLayout .register-header {
  padding-inline: 20px;
  //margin-bottom: 16px;
  color: unset;
  background: white;
}

</style>