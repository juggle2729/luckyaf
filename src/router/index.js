import Vue from 'vue'
import Router from 'vue-router'
import menuModule from 'vuex-store/modules/menu'
import store from '../store'
Vue.use(Router)

function isAuthenticated () {
  if (store.state.auth && store.state.auth.loginStatus && store.state.auth.user_id && store.state.auth.token) {
    localStorage.loginStatus = true
    localStorage.user_id = store.state.auth.user_id
    localStorage.token = store.state.auth.token
    return true
  }
  if (localStorage.loginStatus && localStorage.user_id && localStorage.token) {
    store.dispatch('syncAuthStore')
    return true
  }
}

function getAuthHeaders () {
  return {
    'X-AUTH-USER': store.state.auth.user_id.toString(),
    'X-AUTH-TOKEN': store.state.auth.token
  }
}

function requireAuth (to, from, next) {
  if (isAuthenticated()) {
    next()
  } else {
    next({
      path: '/login',
      query: {redirect: to.fullPath}
    })
  }
}

export default new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: require('../views/Home'),
      beforeEnter: requireAuth
    },
    {
      name: 'Login',
      path: '/login',
      component: require('../views/Login')
    },
    {
      name: 'Banner Details',
      path: '/data_config/banner/:id',
      component: require('../views/data_config/bannerDetails'),
      beforeEnter: requireAuth
    },
    ...generateRoutesFromMenu(menuModule.state.items),
    {
      name: '404',
      path: '/404',
      component: require('../views/Login')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

// Menu should have 2 levels.
function generateRoutesFromMenu (menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    if (item.path) {
      item.beforeEnter = requireAuth
      routes.push(item)
    }
    if (!item.component) {
      generateRoutesFromMenu(item.children, routes)
    }
  }
  return routes
}

export {isAuthenticated, getAuthHeaders}
