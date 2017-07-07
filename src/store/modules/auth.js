import * as types from '../mutation-types'
import auth from '../../api/auth'

// initial state
const state = {
  jwt_token: null,
  login: {
    requestStatus: null,
    loginStatus: false,
    auth_error: null
  },
  register: {
    requestStatus: null,
    registerStatus: false,
    reg_error: null
  }
}

// actions
const actions = {
  login ({commit}, params) {
    return new Promise((resolve, reject) => {
      commit(types.AUTHENTICATE_REQUEST)
      auth.loginAPI(params.authHeaders, params.payload,
        (data) => {
          commit(types.AUTHENTICATE_SUCCESS, data)
          resolve()
        },
        (error) => {
          commit(types.AUTHENTICATE_FAILURE, error)
          reject(new Error('Auth failed'))
        }
      )
    })
  },
  register ({commit}, params) {
    return new Promise((resolve, reject) => {
      commit(types.REGISTER_REQUEST)
      auth.registerAPI(params,
        (data) => {
          commit(types.REGISTER_SUCCESS, data)
          resolve()
        },
        (error) => {
          commit(types.REGISTER_FAILURE, error)
          reject(new Error('Auth failed'))
        }
      )
    })
  },
  syncAuthStore ({commit}) {
    commit(types.SYNC_AUTH_STORE)
  },
  syncRegStore ({commit}) {
    commit(types.SYNC_REG_STORE)
  }
}

// mutations
const mutations = {
  [types.AUTHENTICATE_REQUEST] (state) {
    state.login.requestStatus = 'started'
  },
  [types.AUTHENTICATE_SUCCESS] (state, data) {
    state.jwt_token = data.jwt_token
    state.login.loginStatus = true
    state.login.requestStatus = 'stopped'
    localStorage.jwt_token = data.jwt_token
    localStorage.loginStatus = true
  },
  [types.AUTHENTICATE_FAILURE] (state, error) {
    state.login.loginStatus = false
    state.login.auth_error = error
    state.login.requestStatus = 'stopped'
  },
  [types.SYNC_AUTH_STORE] (state) {
    state.loginStatus = localStorage.loginStatus
    state.jwt_token = localStorage.jwt_token
  },
  [types.REGISTER_REQUEST] (state) {
    state.register.registerStatus = 'started'
  },
  [types.REGISTER_SUCCESS] (state, data) {
    state.jwt_token = data.jwt_token
    state.register.registerStatus = true
    state.register.requestStatus = 'stopped'
    localStorage.jwt_token = data.jwt_token
    localStorage.registerStatus = true
  },
  [types.REGISTER_FAILURE] (state, error) {
    state.register.registerStatus = false
    state.register.auth_error = error
    state.register.requestStatus = 'stopped'
  },
  [types.SYNC_REG_STORE] (state) {
    state.regStatus = localStorage.registerStatus
    state.jwt_token = localStorage.jwt_token
  }
}

export default {
  state,
  actions,
  mutations
}
