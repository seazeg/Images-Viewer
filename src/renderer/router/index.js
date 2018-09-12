import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: require('@/view/LandingPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
