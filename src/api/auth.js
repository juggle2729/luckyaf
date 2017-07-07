import Vue from 'vue'

export default {
  loginAPI (authHeaders, params, cb, errorCb) {
    Vue.http.headers.common['Authorization'] = authHeaders['Authorization']
    return Vue.http.post('login_by_password', params)
      .then((response) => {
        cb(response.data)
      }, (error) => {
        errorCb(error)
      })
  },
  registerAPI (params, cb, errorCb) {
    return Vue.http.post('register', params)
      .then((response) => {
        cb(response.data)
      }, (error) => {
        errorCb(error)
      })
  }
}
