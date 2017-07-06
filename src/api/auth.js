import Vue from 'vue'

export default {
  loginAPI (params, cb, errorCb) {
    return Vue.http.post('login_by_password', params)
      .then((response) => {
        cb(response.data)
      }, (error) => {
        errorCb(error)
      })
  }
}
