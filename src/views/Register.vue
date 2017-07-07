<template>
  <div class="content has-text-centered">
    <p>
      <img width="100" src="~assets/logo.svg">
    </p>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">注册</h1>
        <div class="block">
          <p class="control has-icon">
            <input class="input" type="text" placeholder="用户名" v-model="username"  @keyup="VerifyUsername">
            <span class="icon is-small">
                <i class="fa fa-envelope"></i>
            </span>
          </p>
          <p class="checkuser" v-if="usercue" ref="user"></p>
          <p class="control has-icon">
            <input class="input" type="password" placeholder="密码" v-model="password " @keyup="VerifyPsd">
            <span class="icon is-small">
            <i class="fa fa-lock"></i>
            </span>
          </p>
          <p class="checkpsd" v-if="psdcue" ref="psd"></p>
          <p class="control">
            <button class="button is-success" @click="register" ref="reg">
              Register
            </button>
            <button class="button is-success"  @click="openMessageWithType('')" >
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
  const MessageComponent = Vue.extend(Message)

  const openMessage =
    (propsData = {title: '', message: '', type: '', direction: '', duration: 3500, container: '.messages'}) => {
      return new MessageComponent({
        el: document.createElement('div'),
        propsData
      })
    }
  export default {
    components: {
      Chart,
      Message
    },
    data () {
      return {
        usercue: false,
        psdcue: false
      }
    },
    beforeMount () {
    },
    methods: {
      register: function () {
        this.$store.dispatch('register', {username: this.username, password: this.password}).then(
          () => {
            this.$router.replace(this.$route.query.redirect || '/')
          },
          () => {
            alert('该用户名已被注册')
          }
        )
      },
      VerifyUsername: function () {
        if (this.username.length < 6 && this.username.length > 0) {
          this.usercue = true
          this.$refs.user.innerHTML = '<span>用户名不能少于六位！</span>'
          this.$refs.reg.disabled = true
        } else if (this.username.length === 0) {
          this.usercue = true
          this.$refs.user.innerHTML = '<span>用户名不能为空！</span>'
          this.$refs.reg.disabled = true
        } else {
          this.usercue = false
        }
        if (!this.usercue && !this.psdcue) {
          this.$refs.reg.disabled = false
        }
      },
      VerifyPsd: function () {
        if (this.password.length < 6 && this.password.length > 0) {
          this.psdcue = true
          this.$refs.psd.innerHTML = '<span>密码不能少于六位！</span>'
          this.$refs.reg.disabled = true
        } else if (this.password.length === 0) {
          this.psdcue = true
          this.$refs.psd.innerHTML = '<span>密码不能为空！</span>'
          this.$refs.reg.disabled = true
        } else {
          this.psdcue = false
        }
        if (!this.usercue && !this.psdcue) {
          this.$refs.reg.disabled = false
        }
      },
      openMessageWithType (type) {
        openMessage({
          title: '注册失败',
          message: '该用户名已注册',
          type: type
        })
      }
    },
    mounted: {
    },
    computed: {
      authenticated () {
        return this.$store.state.auth.loginStatus
      }
    }
  }
</script>

<style lang="scss" scoped>
  .checkpsd,.checkuser{
    text-align: left;
    color: red
  }
</style>
