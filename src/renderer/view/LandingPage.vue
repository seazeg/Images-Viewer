<template>
  <div id="photos" class="photos-box" style="width:100%;">
    <div class="item" v-for="item in data">
      <img ref="img" :src="item" v-show="isshow"  @load="init()">
    </div>
  </div>
</template>

<script>
  // import jquery from 'jquery'
  import viewerjs from 'viewerjs'
  const {
    ipcRenderer: ipc
  } = require('electron');
  export default {
    name: 'LandingPage',
    data() {
      return {
        data: [],
        isshow:false
      }
    },
    methods: {
      init() {
        var _this = this;
        var viewer = new viewerjs(document.getElementById('photos'), {
          zoomRatio: 0.5,
          interval: 3000,
          minZoomRatio: 0.25,
          maxZoomRatio: 2,
          button: false,
          ready: function () {
            document.getElementsByClassName('viewer-canvas')[0].setAttribute('data-viewer-action', '')
          }
        });
        _this.$refs.img[0].click();
      }
    },
    mounted() {
      var _this = this
      ipc.send('images-message');
      ipc.on('images-reply', function (event, arg) {
        var tmp = [];
        for(var i in arg){
          tmp.push('file:///' + arg[i].replace(/\\/g,"/"));
        }
        console.log(tmp);
        _this.data = tmp
      });

    }
  }
</script>
<style>
  /* .viewer-list {
    width: 93px !important;
  } */

  .viewer-canvas {
    top: 25px !important;
  }
</style>

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