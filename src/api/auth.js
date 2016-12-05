import Vue from 'vue'

export default {
  loginAPI (params, cb, errorCb) {
    return Vue.http.post('user/login', params)
      .then((response) => {
        cb(response.data.data)
      }, (error) => {
        errorCb(error)
      })
  }
}
