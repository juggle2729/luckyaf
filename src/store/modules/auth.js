import * as types from '../mutation-types'
import auth from '../../api/auth'

// initial state
const state = {
  jwt_token: null,
  requestStatus: null,
  loginStatus: false,
  auth_error: null
}

// actions
const actions = {
  login ({commit}, params) {
    return new Promise((resolve, reject) => {
      commit(types.AUTHENTICATE_REQUEST)
      auth.loginAPI(params,
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
      commit(types.AUTHENTICATE_REQUEST)
      auth.loginAPI(params,
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
  syncAuthStore ({commit}) {
    commit(types.SYNC_AUTH_STORE)
  }
}

// mutations
const mutations = {
  [types.AUTHENTICATE_REQUEST] (state) {
    state.requestStatus = 'started'
  },
  [types.AUTHENTICATE_SUCCESS] (state, data) {
    state.jwt_token = data.jwt_token
    state.loginStatus = true
    state.requestStatus = 'stopped'
    localStorage.jwt_token = data.jwt_token
    localStorage.loginStatus = true
  },
  [types.AUTHENTICATE_FAILURE] (state, error) {
    state.loginStatus = false
    state.auth_error = error
    state.requestStatus = 'stopped'
  },
  [types.SYNC_AUTH_STORE] (state) {
    state.loginStatus = localStorage.loginStatus
    state.jwt_token = localStorage.jwt_token
  }
}

export default {
  state,
  actions,
  mutations
}
