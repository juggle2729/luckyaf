import * as types from '../mutation-types'
import auth from '../../api/auth'

// initial state
const state = {
  user_id: null,
  token: null,
  requestStatus: null,
  loginStatus: null,
  auth_error: null
}

// actions
const actions = {
  login ({commit}, params) {
    commit(types.AUTHENTICATE_REQUEST)
    auth.loginAPI(params,
      (data) => commit(types.AUTHENTICATE_SUCCESS, data),
      (error) => commit(types.AUTHENTICATE_FAILURE, error)
    )
  }
}

// mutations
const mutations = {
  [types.AUTHENTICATE_REQUEST] (state) {
    state.requestStatus = 'started'
  },
  [types.AUTHENTICATE_SUCCESS] (state, data) {
    state.user_id = data.id
    state.token = data.token
    state.loginStatus = 'successful'
    state.requestStatus = 'stopped'
  },
  [types.AUTHENTICATE_FAILURE] (state, error) {
    state.loginStatus = 'failed'
    state.auth_error = error
    state.requestStatus = 'stopped'
  }
}

export default {
  state,
  actions,
  mutations
}
