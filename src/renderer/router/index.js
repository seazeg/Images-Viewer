import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const LandingPage = resolve => require(['@/view/LandingPage'], resolve);

export default new Router({
  routes: [{
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },{
    path: '*',
    redirect: '/'
  }]
})