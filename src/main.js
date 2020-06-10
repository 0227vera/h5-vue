import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import loading from './components/loading/index'
import './assets/css/style.scss'
import { cancelAjax } from './services/services'

Vue.use(Vant)
Vue.use(loading)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // 路由切换时，自动取消上一个页面未完成的请求，提高网络性能
  cancelAjax()
  // 设置是否显示footer
  store.commit('UPDATE_FOOTER', to.meta.isFooterShow)
  store.commit('UPDATE_HEADER', { title: to.meta.title })
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
