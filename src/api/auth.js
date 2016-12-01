import Vue from 'vue'

export default {
  loginAPI (params, cb, errorCb) {
    return Vue.http.post('http://121.40.29.144/admin/user/login', params)
      .then((response) => {
        cb(response.data.data)
      }, (error) => {
        console.log(error)
        errorCb(error)
      })
  }
}
