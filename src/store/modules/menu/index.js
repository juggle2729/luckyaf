import * as types from '../../mutation-types'
import {lazyLoading} from './lazyLoading'
import charts from './charts'
import uifeatures from './uifeatures'
import components from './components'
import tables from './tables'
import dataConfig from './data-config'
import product from './product'
import award from './award'
import user from './user'
import analysis from './analysis'

// show: meta.label -> name
// name: component name
// meta.label: display label

const state = {
  items: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      meta: {
        icon: 'fa-tachometer'
      },
      component: lazyLoading('Home', false)
    },
    dataConfig,
    product,
    award,
    user,
    {
      name: '系统通知',
      path: '/notification',
      meta: {
        icon: 'fa-tachometer'
      },
      component: lazyLoading('Home', false)
    },
    {
      name: '用户反馈',
      path: '/feedback',
      meta: {
        icon: 'fa-tachometer'
      },
      component: lazyLoading('Home', false)
    },
    {
      name: '红包模版',
      path: '/coupon',
      meta: {
        icon: 'fa-tachometer'
      },
      component: lazyLoading('Home', false)
    },
    analysis,
    charts,
    uifeatures,
    components,
    tables
  ]
}

const mutations = {
  [types.EXPAND_MENU] (state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  }
}

export default {
  state,
  mutations
}
