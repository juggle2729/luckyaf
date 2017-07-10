<template>
  <div class="content has-text-centered">
    <p>
      <img width="100" src="~assets/logo.svg">
    </p>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">注册登录</h1>
        <div class="block">
          <p class="control has-icon">
            <input class="input" type="text" placeholder="用户名" v-model="username"  @keyup="VerifyUsername">
            <span class="icon is-small">
                <i class="fa fa-envelope"></i>
              </span>
          </p>
          <p class="verify-username" v-if="ErrorPromptUsername" ref="user"></p>
          <p class="control has-icon">
            <input class="input" type="password" placeholder="密码" v-model="password" @keyup="VerifyPsd">
            <span class="icon is-small">
            <i class="fa fa-lock"></i>
            </span>
          </p>
          <p class="verify-password" v-if="ErrorPromptPassword" ref="psd"></p>
          <p class="control">
            <button class="button is-success" @click="login" ref="log">
              Login
            </button>
            <button class="button is-success" @click="register">
              Register
            </button>
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Chart from 'vue-bulma-chartjs'
  import Message from 'vue-bulma-message'
  import Notification from 'vue-bulma-notification'
  const MessageComponent = Vue.extend(Message)
  const NotificationComponent = Vue.extend(Notification)

  const openMessage =
    (propsData = {title: '', message: '', type: '', direction: '', duration: 8000, container: '.messages'}) => {
      return new MessageComponent({
        el: document.createElement('div'),
        propsData
      })
    }
  const openNotification =
    (propsData = {title: '', message: '', type: '', direction: '', duration: 4500, container: '.notifications'}) => {
      return new NotificationComponent({
        el: document.createElement('div'),
        propsData
      })
    }
  export default {
    components: {
      Chart,
      Message,
      Notification
    },
    data () {
      return {
        ErrorPromptUsername: false,
        ErrorPromptPassword: false,
        username: '',
        password: ''
      }
    },
    beforeMount () {
    },
    methods: {
      login: function () {
        this.$store.dispatch('login', {username: this.username, password: this.password}).then(
          () => {
            this.$router.replace(this.$route.query.redirect || '/')
          },
          () => {
            if (this.$store.state.auth.auth_error.status === 468) {
              this.openMessageWithType('')
            }
            if (this.$store.state.auth.auth_error.status === 500) {
              this.openNotificationWithType('')
            }
          }
        )
      },
      register: function () {
        this.$router.push({path: '/register'})
      },
      VerifyUsername: function () {
        if (this.username.length < 6 && this.username.length > 0) {
          this.ErrorPromptUsername = true
          this.$refs.user.innerHTML = '<span>用户名不能少于六位！</span>'
          this.$refs.log.disabled = true
        } else if (this.username.length === 0) {
          this.ErrorPromptUsername = true
          this.$refs.user.innerHTML = '<span>用户名不能为空！</span>'
          this.$refs.log.disabled = true
        } else {
          this.ErrorPromptUsername = false
        }
        if (!this.ErrorPromptUsername && !this.ErrorPromptPassword) {
          this.$refs.log.disabled = false
        }
      },
      VerifyPsd: function () {
        if (this.password.length < 6 && this.password.length > 0) {
          this.ErrorPromptPassword = true
          this.$refs.psd.innerHTML = '<span>密码不能少于六位！</span>'
          this.$refs.log.disabled = true
        } else if (this.password.length === 0) {
          this.ErrorPromptPassword = true
          this.$refs.psd.innerHTML = '<span>密码不能为空！</span>'
          this.$refs.log.disabled = true
        } else {
          this.ErrorPromptPassword = false
        }
        if (!this.ErrorPromptUsername && !this.ErrorPromptPassword) {
          this.$refs.log.disabled = false
        }
      },
      openMessageWithType (type) {
        openMessage({
          title: '登录失败',
          message: '请联系管理员开放权限',
          type: type
        })
      },
      openNotificationWithType (type) {
        openNotification({
          title: '登录失败',
          message: '服务器出了问题',
          type: type
        })
      }
    },
    computed: {
      authenticated () {
        return this.$store.state.auth.loginStatus
      }
    }
  }
</script>

<style lang="scss" scoped>
  .verify-password,.verify-username{
    text-align: left;
    color: red
  }
</style>
