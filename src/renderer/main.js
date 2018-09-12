import Vue from 'vue'
import $ from 'jquery'

import App from './App'
import router from './router'
import store from './store'
import './assets/fonts/iconfont.css';
import './components/index';

Vue.prototype.jquery = $


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
