import Vue from 'vue'

export default {
  getBannersAPI (authHeaders, payload, cb, errorCb) {
    // TODO: find a better way to access store data instead of pass down
    Vue.http.headers.common['X-AUTH-USER'] = authHeaders['X-AUTH-USER']
    Vue.http.headers.common['X-AUTH-TOKEN'] = authHeaders['X-AUTH-TOKEN']
    return Vue.http.get('preset/banner/', payload, authHeaders)
      .then((response) => {
        cb(response.data.data)
      }, (error) => {
        errorCb(error)
      })
  },
  getBannerDetailsAPI (authHeaders, bannerID, cb, errorCb) {
    Vue.http.headers.common['X-AUTH-USER'] = authHeaders['X-AUTH-USER']
    Vue.http.headers.common['X-AUTH-TOKEN'] = authHeaders['X-AUTH-TOKEN']
    return Vue.http.get('preset/banner/' + bannerID, authHeaders)
      .then((response) => {
        cb(response.data.data)
      }, (error) => {
        errorCb(error)
      })
  }
}
