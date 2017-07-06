import Vue from 'vue'

export default {
  getBannersAPI (authHeaders, payload, cb, errorCb) {
    // TODO: find a better way to access store data instead of pass down
    Vue.http.headers.common['Authorization'] = authHeaders['Authorization']
    return Vue.http.get('preset/banner/', payload)
      .then((response) => {
        cb(response.data.data)
      }, (error) => {
        errorCb(error)
      })
  },
  getBannerDetailsAPI (authHeaders, bannerID, cb, errorCb) {
    Vue.http.headers.common['Authorization'] = authHeaders['Authorization']
    return Vue.http.get('preset/banner/' + bannerID)
      .then((response) => {
        cb(response.data.data)
      }, (error) => {
        errorCb(error)
      })
  },
  uploadToQiniuAPI (authHeaders, formData, cb, errorCb) {
    Vue.http.headers.common['Authorization'] = authHeaders['Authorization']
    Vue.http.get('uptoken/')
      .then((response) => {
        var token = response.data.uptoken
        formData.append('token', token)
        Vue.http.post('http://upload.qiniu.com/', formData)
          .then((response) => {
            cb(response.data)
          }, (error) => {
            errorCb(error)
          })
      }, (error) => {
        console.log(error)
      })
  },
  updateBannerDetailsAPI (authHeaders, bannerID, data, cb, errorCb) {
    Vue.http.headers.common['Authorization'] = authHeaders['Authorization']
    return Vue.http.put('preset/banner/' + bannerID, data)
      .then((response) => {
        cb(response.data.data)
      }, (error) => {
        errorCb(error)
      })
  },
  createNewBannerAPI (authHeaders, data, cb, errorCb) {
    Vue.http.headers.common['Authorization'] = authHeaders['Authorization']
    return Vue.http.post('preset/banner/', data)
      .then((response) => {
        cb(response.data.data)
      }, (error) => {
        errorCb(error)
      })
  }
}
