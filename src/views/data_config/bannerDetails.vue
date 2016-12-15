<template>
  <div class="tile is-ancestor">
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
              <button class="button is-primary is-outlined ">更改图片</button>
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
              <button class="button is-primary">Submit</button>
              <button class="button is-link">Cancel</button>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
  import Flatpickr from 'vue-flatpickr/vue-flatpickr-default.vue'
  import {getAuthHeaders} from '../../router'

  export default {
    components: {
      Flatpickr
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
          enableTime: true,
          dateFormat: 'Y-m-d h:i K',
          defaultDate: this.$store.state.dataConfig.bannerDetails.start
        }
      }
    },
    methods: {
      updateStart (value) {
        this.$store.commit('updateBannerStart', value)
      },
      updateEnd (value) {
        this.$store.commit('updateBannerEnd', value)
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
          this.$store.commit('updateBannerTitle', value)
        }
      },
      command: {
        get () {
          return this.$store.state.dataConfig.bannerDetails.command
        },
        set (value) {
          this.$store.commit('updateBannerCommand', value)
        }
      },
      start: {
        get () {
          return this.$store.state.dataConfig.bannerDetails.start
        }
      },
      end: {
        get () {
          return this.$store.state.dataConfig.bannerDetails.end
        }
      }
    }
  }
</script>
