<template>
  <div id="photos" class="photos-box" style="width:100%;">
    <div id="logo" @click="open()"></div>
    <div class="item" v-for="item in data">
      <img ref="img" :src="item" v-show="isshow" @load="init()">
    </div>
  </div>
</template>

<script>
  import viewerjs from 'viewerjs'
  
  const {
    ipcRenderer: ipc
  } = require('electron');
  var viewer = null;
  export default {
    name: 'LandingPage',
    data() {
      return {
        data: [],
        isshow: false
      }
    },
    methods: {
      init() {
        var _this = this;
        viewer = new viewerjs(document.getElementById('photos'), {
          zoomRatio: 0.05,
          interval: 3000,
          minZoomRatio: 0.25,
          maxZoomRatio: 2,
          button: false,
          title:function(e){
            return decodeURIComponent(e.alt)
          },
          ready: function () {
            document.getElementsByClassName('viewer-canvas')[0].setAttribute('data-viewer-action', '');
          }
        });

        _this.$refs.img[0].click();
      },
      reset() {
        if (document.getElementsByClassName('viewer-container').length > 0) {
          document.getElementsByClassName('viewer-container')[0].parentNode.removeChild(document.getElementsByClassName(
            'viewer-container')[0]);
          viewer.destroy();
          document.getElementById('logo').style.display = 'block';
        }

      },
      open(){
        var _this = this;
        _this.reset();
        document.getElementById('logo').style.display = 'none';
        ipc.send("open-message");
      }
    },
    mounted() {
      var _this = this
      ipc.on('files-reply', function (event, arg) {
        var tmp = [];
        for (var i in arg) {
          tmp.push('file:///' + arg[i].replace(/\\/g, "/"));
        }
        _this.data = tmp;
        _this.reset()

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
  #logo{
    background:url('../assets/images/bg.jpg') no-repeat;
    width:600px;
    height:180px;
    margin:0 auto;
    position: relative;
    top:50%;
    margin-top:-90px;
    cursor:pointer;


  }
  #photos {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    background: #292a2b;
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