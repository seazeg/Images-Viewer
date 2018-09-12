//组件全局注册
import Vue from 'vue'
import header from './layout-header.vue'
import sidetools from './layout-sidetools.vue'
import container from './layout-container.vue'

Vue.component(header.name, header);
Vue.component(sidetools.name, sidetools);
Vue.component(container.name, container);