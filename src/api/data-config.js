import Vue from 'vue'

export default {
  getBannersAPI (authHeaders, params, cb, errorCb) {
    // TODO: find a better way to access store data instead of pass down
    Vue.http.headers.common['X-AUTH-USER'] = authHeaders['X-AUTH-USER']
    Vue.http.headers.common['X-AUTH-TOKEN'] = authHeaders['X-AUTH-TOKEN']
    return Vue.http.get('preset/banner/', params, authHeaders)
      .then((response) => {
        cb(response.data.data)
      }, (error) => {
        errorCb(error)
      })
  }
}
