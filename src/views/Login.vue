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
            <input class="input" type="text" placeholder="用户名">
            <span class="icon is-small">
                <i class="fa fa-envelope"></i>
              </span>
          </p>
          <p class="control has-icon">
            <input class="input" type="password" placeholder="密码">
            <span class="icon is-small">
            <i class="fa fa-lock"></i>
            </span>
          </p>
          <p class="control">
            <button class="button is-success" @click="login">
              Login
            </button>
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
  import Chart from 'vue-bulma-chartjs'

  export default {
    components: {
      Chart
    },
    beforeMount () {
    },
    methods: {
      login: function () {
        this.$store.dispatch('login', {username: 'maomao', password: '333333'}).then(
          () => {
            this.$router.replace(this.$route.query.redirect || '/')
          },
          () => {
            console.log('login failed')
          }
        )
      }
    },
    data () {
      return {}
    },
    computed: {
      authenticated () {
        return this.$store.state.auth.loginStatus
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
