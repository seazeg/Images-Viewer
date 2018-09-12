<template>
    <div class="layout-header">
        <router-link to="/" class="logo"><img src="../assets/images/logo.png"></router-link>
        <span class="title">ImageViewer</span>
        <div class="tools">
            <a class="iconfont icon-zuixiaohua" @click="winHandle('min')"></a>
            <a class="iconfont icon-zuidahua" @click="winHandle('max')"></a>
            <a class="iconfont icon-guanbi" @click="winHandle('close')"> </a>
        </div>
    </div>
</template>
<script>
    const {
        ipcRenderer: ipc
    } = require('electron');
    export default {
        name: "layout-header",
        methods: {
            winHandle(type) {
                ipc.send(type);
            }
        },
        mounted() {

        }
    }
</script>