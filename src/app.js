import Vue from 'vue'
import Resource from 'vue-resource'
import NProgress from 'vue-nprogress'
import {sync} from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'
import {TOGGLE_SIDEBAR} from 'vuex-store/mutation-types'

Vue.use(Resource)
const options = {
  latencyThreshold: 200, // Number of ms before progressbar starts showing, default: 100,
  router: true, // Show progressbar when navigating routes, default: true
  // TODO: bug here, when progressbar turn on http, cause one error, see https://github.com/rstacruz/nprogress/pull/129
  http: false // Show progressbar when doing Vue.http, default: true
}
Vue.use(NProgress, options)

sync(store, router)

const nprogress = new NProgress({ parent: '.nprogress-container' })

const { state } = store

router.beforeEach((route, redirect, next) => {
  if (state.app.device.isMobile && state.app.sidebar.opened) {
    store.commit(TOGGLE_SIDEBAR, false)
  }
  next()
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const app = new Vue({
  router,
  store,
  nprogress,
  ...App
})

export { app, router, store }
