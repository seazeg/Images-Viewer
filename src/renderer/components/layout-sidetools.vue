<template>
  <div class="layout-sidetools">
    <span class="operate iconfont icon-youshuangjiantou"></span>
    <div class="group">
      <div class="box" v-for="item in navInfo">
        <a class="iconfont" :class="[{'checked':item.flag},item.icon]" @click="to(item)">
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "layout-sidetools",
    data() {
      return {
        navInfo: [{
          "name": "按钮",
          "eName": "button",
          "icon": "icon-anniu",
          "href": "/button",
          "flag": false
        }, {
          "name": "文本框",
          "eName": "input",
          "icon": "icon-danhangshurukuang",
          "href": "/input",
          "flag": false
        },{
          "name": "单选",
          "eName": "button",
          "icon": "icon-danxuanyixuan",
          "href": "/radio",
          "flag": false
        },{
          "name": "多选",
          "eName": "button",
          "icon": "icon-duoxuanyixuan",
          "href": "/checkbox",
          "flag": false
        },{
          "name": "下拉框",
          "eName": "button",
          "icon": "icon-xialakuangbiaodan",
          "href": "/select",
          "flag": false
        },{
          "name": "下拉框",
          "eName": "button",
          "icon": "icon-yulan",
          "href": "/compressIMG",
          "flag": false
        }]
      }
    },
    methods: {
      to(obj) {
        this.$router.push({
          path: obj.href,
          query: {
            type: obj.eName
          }
        })
        for (var i in this.navInfo) {
          this.navInfo[i].flag = false;
        }
        obj.flag = true;
      }
    }
  }
</script>