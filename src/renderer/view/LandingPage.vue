<template>
  <div id="photos" class="photos-box" style="width:100%;">

    <div class="item" v-for="item in data">
      <img ref="img" :src="item.src" v-show="item.show" :alt="item.name" @load="init()">
    </div>

  </div>
</template>

<script>
  // import jquery from 'jquery'
  import viewerjs from 'viewerjs'
  export default {
    name: 'LandingPage',
    data() {
      return {
        data: [{
          name: "p1",
          src: "../../../static/0fe34ebe6f7e459b7792fd35af6c4f3c.jpg"
        }, {
          name: "p2",
          src: "../../../static/dyQ13p-ip9lZ2nT3cS122-la.jpg"
        }]
      }
    },
    methods: {
      init() {
        var _this = this;
        var viewer = new viewerjs(document.getElementById('photos'), {
          zoomRatio: 0.5,
          interval: 3000,
          minZoomRatio: 0.25,
          maxZoomRatio: 2
        });
         _this.$refs.img[0].click();
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  @import '/node_modules/viewerjs/dist/viewer.min.css';

  #photos {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    background: #2f3238;
  }

  #photos .item .tit {
    position: absolute;
    color: #fff;
    bottom: 0;
    background: #000;
    width: 100%;
    opacity: 0.8;
    font-size: 14px;
    padding: 5px;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    z-index: 10;
  }
</style>