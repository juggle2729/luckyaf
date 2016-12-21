<template>
  <div class="tile is-ancestor is-vertical">
    <card-modal :visible="isDeleteModalVisible"
                :title="deleteMessage"
                transition="zoom"
                :okText="'确定'"
                :cancelText="'取消'"
                v-on:ok="deleteConfirm"
                v-on:cancel="deleteCancel"
                v-on:close="deleteModalClose">
    </card-modal>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">编辑 Banner 详情</h1>
        <div class="block">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">图片</label>
            </div>
            <div class="control is-grouped is-vertical">
              <p class="control">
                <img :src="image">
              </p>
              <p class="control">
              </p>
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
              <p class="control is-grouped">
                <Flatpickr class="input" :options="options" v-model="start" @update="updateStart"/>
              </p>
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">失效时间</label>
            </div>
            <div class="control is-grouped">
              <p class="control">
                <Flatpickr class="input" :options="options" v-model="end" @update="updateEnd"/>
              </p>
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label"></label>
            </div>
            <div class="control">
              <button class="button is-primary" @click="submitClicked">保存</button>
              <button class="button is-link" @click="cancelClicked">取消</button>
            </div>
          </div>
        </div>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <div class="control">
          <button class="button is-danger is-pulled-right" @click="deleteClicked">删除</button>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import uuid from 'uuid'
  import moment from 'moment'
  import Flatpickr from 'vue-flatpickr/vue-flatpickr-default.vue'
  import Notification from 'vue-bulma-notification'
  import {CardModal} from 'vue-bulma-modal'
  import {getAuthHeaders} from '../../router'
  import dataConfig from '../../api/data-config'

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
      Flatpickr,
      Notification,
      CardModal
    },
    beforeMount () {
      this.$store.dispatch('getBannerDetails', {authHeaders: getAuthHeaders(), bannerID: this.$route.params.id})
    },
    mounted () {
    },
    data () {
      return {
        options: {
          allowInput: true,
          dateFormat: 'Y-m-d H:i:S',
          enableTime: true
        },
        deleteMessage: '确定要删除吗',
        isDeleteModalVisible: false
      }
    },
    methods: {
      updateStart (value) {
        var ts = moment(value, 'YYYY-MM-DD HH:mm:ss').unix()
        console.log(ts)
        this.$store.commit('updateBannerDetailsStart', ts)
      },
      updateEnd (value) {
        this.$store.commit('updateBannerDetailsEnd', moment(value).unix())
      },
      imageChanged () {
        var file = this.$refs.imageInput.files[0]
        var formData = new FormData()
        formData.append('file', file)
        formData.append('key', uuid.v4() + '-' + file.name)
        // Don't console.log(formData), cause it will be empty, WTF
        // http://stackoverflow.com/questions/7752188/formdata-appendkey-value-is-not-working
        this.$store.dispatch('uploadToQiniu', {
          authHeaders: getAuthHeaders(),
          formData: formData,
          usage: 'bannerDetails'
        })
      },
      submitClicked () {
        var data = {
          image: this.$store.state.dataConfig.bannerDetails.image,
          cmd: this.$store.state.dataConfig.bannerDetails.command,
          title: this.$store.state.dataConfig.bannerDetails.title,
          start_ts: this.$store.state.dataConfig.bannerDetails.start,
          end_ts: this.$store.state.dataConfig.bannerDetails.end
        }
        dataConfig.updateBannerDetailsAPI(getAuthHeaders(), this.$route.params.id, data, () => {
          this.openNotificationWithType('success', '成功', '修改成功')
          this.$router.back()
        }, (error) => {
          this.openNotificationWithType('danger', '失败', error.toString())
        })
      },
      cancelClicked () {
        this.$router.back()
      },
      deleteClicked () {
        this.isDeleteModalVisible = true
      },
      openNotificationWithType (type, title, message) {
        openNotification({
          title: title,
          message: message,
          type: type
        })
      },
      deleteModalClose () {
        this.isDeleteModalVisible = false
      },
      deleteConfirm () {
        this.isDeleteModalVisible = false
        console.log('delete it')
      },
      deleteCancel () {
        this.isDeleteModalVisible = false
        console.log('cancel')
      }
    },
    computed: {
      image: {
        get () {
          return this.$store.state.dataConfig.bannerDetails.image
        }
      },
      title: {
        get () {
          return this.$store.state.dataConfig.bannerDetails.title
        },
        set (value) {
          this.$store.commit('updateBannerDetailsTitle', value)
        }
      },
      command: {
        get () {
          return this.$store.state.dataConfig.bannerDetails.command
        },
        set (value) {
          this.$store.commit('updateBannerDetailsCommand', value)
        }
      },
      start: {
        get () {
          return moment.unix(this.$store.state.dataConfig.bannerDetails.start).toString()
        }
      },
      end: {
        get () {
          return moment.unix(this.$store.state.dataConfig.bannerDetails.end).clone().toDate()
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
