import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      tabIndex: 0,
      isFooterShow: true,
      animateIndex: 10
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Setting.vue'),
    meta: {
      tabIndex: 1,
      isFooterShow: true,
      animateIndex: 20
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
