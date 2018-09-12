<template>
  <div class="main-container">
    <layout-header></layout-header>
    <div class="layout-section">
      <!-- <layout-sidetools></layout-sidetools> -->
      <layout-container>
        <transition name="component-fade" mode="out-in">
          <!-- <router-view></router-view> -->
        </transition>
      </layout-container>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'images-viewer'
  }
</script>
<style lang="less">
  @import './assets/css/base.less';
  @import './assets/css/theme.less';
</style>