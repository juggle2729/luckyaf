import * as types from '../mutation-types'
import dataConfig from '../../api/data-config'
import moment from 'moment'

// initial state
const state = {
  bannerList: {
    list: [],
    total: null,
    page: null,
    size: null,
    error: null,
    requestStatus: null
  },
  bannerDetails: {
    id: null,
    image: null,
    title: null,
    command: null,
    start: null,
    end: null,
    error: null,
    requestStatus: null
  }
}

// actions
const actions = {
  getBannerList ({commit}, params) {
    commit(types.GET_BANNER_LIST_REQUEST)
    dataConfig.getBannersAPI(params.authHeaders, params.payload,
      (data) => commit(types.GET_BANNER_LIST_SUCCESS, data),
      (error) => commit(types.GET_BANNER_LIST_FAILURE, error)
    )
  },
  getBannerDetails ({commit}, params) {
    commit(types.GET_BANNER_DETAILS_REQUEST)
    dataConfig.getBannerDetailsAPI(params.authHeaders, params.bannerID,
      (data) => commit(types.GET_BANNER_DETAILS_SUCCESS, data),
      (error) => commit(types.GET_BANNER_DETAILS_FAILURE, error)
    )
  }
}

// mutations
const mutations = {
  [types.GET_BANNER_LIST_REQUEST] (state) {
    state.requestStatus = 'started'
  },
  [types.GET_BANNER_LIST_SUCCESS] (state, data) {
    state.bannerList.total = data.total_count
    state.bannerList.size = data.size
    state.bannerList.page = data.page
    state.bannerList.list = data.list
    state.bannerList.requestStatus = 'stopped'
  },
  [types.GET_BANNER_LIST_FAILURE] (state, error) {
    state.bannerList.error = error
    state.bannerList.requestStatus = 'stopped'
  },
  [types.GET_BANNER_DETAILS_REQUEST] (state) {
    state.requestStatus = 'started'
  },
  [types.GET_BANNER_DETAILS_SUCCESS] (state, data) {
    state.bannerDetails.id = data.id
    state.bannerDetails.image = data.image
    state.bannerDetails.title = data.title
    state.bannerDetails.command = data.cmd
    state.bannerDetails.start = moment.unix(data.start_ts)
    state.bannerDetails.end = moment.unix(data.end_ts)
    state.bannerList.requestStatus = 'stopped'
  },
  [types.GET_BANNER_DETAILS_FAILURE] (state, error) {
    state.bannerList.error = error
    state.bannerList.requestStatus = 'stopped'
  },
  [types.updateBannerTitle] (state, value) {
    state.bannerDetails.title = value
  },
  [types.updateBannerStart] (state, value) {
    state.bannerDetails.start = value
  },
  [types.updateBannerEnd] (state, value) {
    state.bannerDetails.end = value
  },
  [types.updateBannerCommand] (state, value) {
    state.bannerDetails.command = value
  }
}

export default {
  state,
  actions,
  mutations
}
