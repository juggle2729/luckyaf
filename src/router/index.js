import Vue from 'vue'
import Router from 'vue-router'
import menuModule from 'vuex-store/modules/menu'
import store from '../store'
Vue.use(Router)

function isAuthenticated () {
  if (store.state.auth.login && store.state.auth.login.loginStatus && store.state.auth.jwt_token) {
    localStorage.loginStatus = true
    localStorage.jwt_token = store.state.auth.jwt_token
    return true
  }
  if (localStorage.loginStatus && localStorage.jwt_token) {
    store.dispatch('syncAuthStore')
    return true
  }
}

function getAuthHeaders () {
  return {
    'Authorization': 'Bearer ' + store.state.auth.jwt_token
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
      name: 'Register',
      path: '/register',
      component: require('../views/Register')
    },
    {
      name: 'Banner Details',
      path: '/data_config/banner/:id(\\d+)',
      component: require('../views/data_config/bannerDetails'),
      beforeEnter: requireAuth
    },
    {
      name: 'New Banner',
      path: '/data_config/banner/new',
      component: require('../views/data_config/bannerNew'),
      beforeEnter: requireAuth
    },
    ...generateRoutesFromMenu(menuModule.state.items),
    {
      name: '404',
      path: '/404',
      component: require('../views/404'),
      beforeEnter: requireAuth
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

export { isAuthenticated, getAuthHeaders }
