<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">新增 Banner</h1>
        <div class="block">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">图片</label>
            </div>
            <div class="control is-grouped is-vertical">
              <img :src="image">
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label"></label>
            </div>
            <div class="control">
              <input ref="imageInput" id="image-upload" name="file" type="file" class="input-file"
                     @change="imageChanged"/>
              <label for="image-upload" class="button is-primary is-outlined ">更改图片</label>
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">名称</label>
            </div>
            <div class="control is-grouped">
              <p class="control is-expanded">
                <input class="input" type="text" placeholder="名称" v-model="title">
              </p>
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">命令</label>
            </div>
            <div class="control is-grouped">
              <p class="control is-expanded">
                <input class="input" type="text" placeholder="命令" v-model="command">
              </p>
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">生效时间</label>
            </div>
            <div class="control">
              <datepicker :config="{ enableTime: true, time_24hr: true, dateFormat: 'Y-m-d H:i' }"
                          v-model="start"></datepicker>
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">失效时间</label>
            </div>
            <div class="control">
              <datepicker :config="{ enableTime: true, time_24hr: true, dateFormat: 'Y-m-d H:i' }"
                          v-model="end"></datepicker>
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label"></label>
            </div>
            <div class="control">
              <button class="button is-primary" @click="submitClicked">Submit</button>
              <button class="button is-link" @click="cancelClicked">Cancel</button>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Notification from 'vue-bulma-notification'
  import {getAuthHeaders} from '../../router'
  import uuid from 'uuid'
  import moment from 'moment'
  import dataConfig from '../../api/data-config'
  import Datepicker from 'vue-bulma-datepicker'

  const NotificationComponent = Vue.extend(Notification)

  const openNotification = (propsData = {
    title: '',
    message: '',
    type: '',
    direction: '',
    duration: 4500,
    container: '.notifications'
  }) => {
    return new NotificationComponent({
      el: document.createElement('div'),
      propsData
    })
  }

  export default {
    components: {
      Notification,
      Datepicker
    },
    beforeMount () {
    },
    mounted () {
    },
    methods: {
      imageChanged () {
        var file = this.$refs.imageInput.files[0]
        var formData = new FormData()
        formData.append('file', file)
        formData.append('key', uuid.v4() + '-' + file.name)
        // Don't console.log(formData), cause it will be empty, WTF
        // http://stackoverflow.com/questions/7752188/formdata-appendkey-value-is-not-working
        this.$store.dispatch('uploadToQiniu', {authHeaders: getAuthHeaders(), formData: formData, usage: 'newBanner'})
      },
      submitClicked () {
        var data = {
          image: this.$store.state.dataConfig.newBanner.image,
          cmd: this.$store.state.dataConfig.newBanner.command,
          title: this.$store.state.dataConfig.newBanner.title,
          start_ts: this.$store.state.dataConfig.newBanner.start,
          end_ts: this.$store.state.dataConfig.newBanner.end
        }
        for (var key in data) {
          if (data.hasOwnProperty(key) && !data[key]) {
            this.openNotificationWithType('warning', '注意', '有空数据')
            return
          }
        }
        dataConfig.createNewBannerAPI(getAuthHeaders(), data, () => {
          this.openNotificationWithType('success', '成功', '新增成功')
          this.$router.back()
        }, (error) => {
          this.openNotificationWithType('danger', '失败', error.toString())
        })
      },
      cancelClicked () {
        this.$router.back()
      },
      openNotificationWithType (type, title, message) {
        openNotification({
          title: title,
          message: message,
          type: type
        })
      }
    },
    computed: {
      image: {
        get () {
          return this.$store.state.dataConfig.newBanner.image
        }
      },
      title: {
        get () {
          return this.$store.state.dataConfig.newBanner.title
        },
        set (value) {
          this.$store.commit('updateNewBannerTitle', value)
        }
      },
      command: {
        get () {
          return this.$store.state.dataConfig.newBanner.command
        },
        set (value) {
          this.$store.commit('updateNewBannerCommand', value)
        }
      },
      start: {
        get () {
          return moment.unix(this.$store.state.dataConfig.newBanner.start).toString()
        },
        set (value) {
          var ts = moment(value, 'YYYY-MM-DD HH:mm:ss').unix()
          this.$store.commit('updateNewBannerStart', ts)
        }
      },
      end: {
        get () {
          return moment.unix(this.$store.state.dataConfig.newBanner.end).toString()
        },
        set (value) {
          var ts = moment(value, 'YYYY-MM-DD HH:mm:ss').unix()
          this.$store.commit('updateNewBannerEnd', ts)
        }
      }
    }
  }
</script>

<style lang="css">
  /*
    trick from https://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/
   */
  .input-file {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
</style>
