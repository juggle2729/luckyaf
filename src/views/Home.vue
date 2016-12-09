<template>
  <div class="content has-text-centered">
    <p>
      <img width="100" src="~assets/logo.svg" :alt="description">
    </p>

    <h1 class="is-title is-bold">{{ name.replace('-', ' ') }}</h1>

    <p>
      <strong>{{ description }}</strong>
    </p>

    <div class="tile is-ancestor">
      <div class="tile is-vertical">
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <h4 class="title">用户</h4>
              <chart :type="'line'" :data="seriesData" :options="options_3" class="chart"></chart>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <h4 class="title">充值</h4>
              <chart :type="'line'" :data="seriesData" :options="options_3" class="chart"></chart>
            </article>
          </div>
        </div>
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">待发货</p>
              <p class="subtitle">22</p>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">新增反馈</p>
              <p class="subtitle">3</p>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">新增晒单</p>
              <p class="subtitle">12</p>
            </article>
          </div>
        </div>
      </div>
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
    data () {
      return Object.assign(this.$store.state.pkg, {
        series: ['Product A', 'Product B'],
        labels_3: ['May', 'June', 'Jule', 'August', 'September', 'October', 'November'],
        backgroundColor_3: [
          'rgba(31, 200, 219, 1)',
          'rgba(151, 205, 118, 1)'
        ],
        options_3: {
          tooltips: {
            mode: 'label'
          }
        },
        data_3: [
          [65, 59, 90, 81, 56, 55, 40],
          [28, 48, 40, 19, 88, 27, 45]
        ]
      })
    },
    computed: {
      seriesData () {
        let data = {
          labels: this.labels_3
        }
        data.datasets = this.series.map((e, i) => {
          return {
            data: this.data_3[i],
            label: this.series[i],
            borderColor: this.backgroundColor_3[i].replace(/1\)$/, '.5)'),
            pointBackgroundColor: this.backgroundColor_3[i],
            backgroundColor: this.backgroundColor_3[i].replace(/1\)$/, '.5)')
          }
        })
        return data
      }
    }
  }
</script>

<style lang="scss" scoped>
  .is-title {
    text-transform: capitalize;
  }

  .chart {
    height: 200px;
  }
</style>
