import * as types from '../mutation-types'
import dataConfig from '../../api/data-config'

// initial state
const state = {
  banners: {
    list: null,
    total: null,
    page: null,
    size: null,
    error: null,
    requestStatus: null
  }
}

// actions
const actions = {
  getBanners ({commit}, authHeaders, params) {
    commit(types.GET_BANNER_REQUEST)
    dataConfig.getBannersAPI(authHeaders, params,
      (data) => commit(types.GET_BANNER_SUCCESS, data),
      (error) => commit(types.GET_BANNER_FAILURE, error)
    )
  }
}

// mutations
const mutations = {
  [types.GET_BANNER_REQUEST] (state) {
    state.requestStatus = 'started'
  },
  [types.GET_BANNER_SUCCESS] (state, data) {
    state.banners.total = data.total_count
    state.banners.size = data.size
    state.banners.page = data.page
    state.banners.list = data.list
    state.banners.requestStatus = 'stopped'
  },
  [types.GET_BANNER_FAILURE] (state, error) {
    state.banners.error = error
    state.banners.requestStatus = 'stopped'
  }
}

export default {
  state,
  actions,
  mutations
}
