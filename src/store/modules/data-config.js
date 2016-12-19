import moment from 'moment'
import * as types from '../mutation-types'
import dataConfig from '../../api/data-config'
import {QINIU_IMAGE_DOMAIN} from '../../const'

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
    start: 1000000000,
    end: 1000000000,
    error: null,
    requestStatus: null
  },
  qiniu: {
    requestStatus: null,
    data: null,
    error: null
  },
  newBanner: {
    id: null,
    image: null,
    title: null,
    command: null,
    start: moment().unix(),
    end: moment().unix(),
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
  },
  uploadToQiniu ({commit}, params) {
    commit(types.UPLOAD_IMAGE_REQUEST)
    dataConfig.uploadToQiniuAPI(params.authHeaders, params.formData,
      (data) => {
        if (params.usage === 'bannerDetails') {
          commit(types.UPLOAD_BANNER_DETAIL_IMAGE_SUCCESS, data)
        } else if (params.usage === 'newBanner') {
          commit(types.UPLOAD_NEW_BANNER_IMAGE_SUCCESS, data)
        }
      },
      (error) => commit(types.UPLOAD_IMAGE_FAILURE, error)
    )
  }
}

// mutations
const mutations = {
  [types.GET_BANNER_LIST_REQUEST] (state) {
    state.bannerList.requestStatus = 'started'
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
    state.bannerDetails.start = data.start_ts
    state.bannerDetails.end = data.end_ts
    state.bannerList.requestStatus = 'stopped'
  },
  [types.GET_BANNER_DETAILS_FAILURE] (state, error) {
    state.bannerList.error = error
    state.bannerList.requestStatus = 'stopped'
  },
  [types.updateBannerDetailsTitle] (state, value) {
    state.bannerDetails.title = value
  },
  [types.updateBannerDetailsStart] (state, value) {
    state.bannerDetails.start = value
  },
  [types.updateBannerDetailsEnd] (state, value) {
    state.bannerDetails.end = value
  },
  [types.updateBannerDetailsCommand] (state, value) {
    state.bannerDetails.command = value
  },
  [types.UPLOAD_IMAGE_REQUEST] (state) {
    state.qiniu.requestStatus = 'started'
  },
  [types.UPLOAD_BANNER_DETAIL_IMAGE_SUCCESS] (state, value) {
    state.qiniu.requestStatus = 'stopped'
    state.qiniu.data = value
    state.bannerDetails.image = QINIU_IMAGE_DOMAIN + value.key
  },
  [types.UPLOAD_NEW_BANNER_IMAGE_SUCCESS] (state, value) {
    state.qiniu.requestStatus = 'stopped'
    state.qiniu.data = value
    state.newBanner.image = QINIU_IMAGE_DOMAIN + value.key
  },
  [types.UPLOAD_IMAGE_FAILURE] (state, error) {
    state.qiniu.requestStatus = 'stopped'
    state.qiniu.error = error
  },
  [types.updateNewBannerTitle] (state, value) {
    state.newBanner.title = value
  },
  [types.updateNewBannerStart] (state, value) {
    state.newBanner.start = value
  },
  [types.updateNewBannerEnd] (state, value) {
    state.newBanner.end = value
  },
  [types.updateNewBannerCommand] (state, value) {
    state.newBanner.command = value
  }
}

export default {
  state,
  actions,
  mutations
}
