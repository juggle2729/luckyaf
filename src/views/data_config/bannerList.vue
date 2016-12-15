<template>
  <div>
    <div class="tile is-ancestor is-vertical">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <button class="button is-primary is-pulled-right">+ add banner</button>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <table class="table">
            <thead>
            <tr>
              <th>ID</th>
              <th>名称</th>
              <th>图像</th>
              <th>生效时间</th>
              <th>结束时间</th>
              <th>命令</th>
              <th>更新时间</th>
            </tr>
            </thead>
            <paginate name="bannerList" :list="bannerList" :per="10" tag="tbody">
              <tr v-for="banner in paginated('bannerList')">
                <td>
                  <router-link :to="{ name: 'Banner Details', params: { id: banner.id }}">{{ banner.id }}</router-link>
                </td>
                <td>{{ banner.title }}</td>
                <td><img :src="banner.image" alt="Banner image" height="42" width="42"></td>
                <td>{{ banner.start_str }}</td>
                <td>{{ banner.end_str }}</td>
                <td>{{ banner.cmd }}</td>
                <td>{{ banner.updated_at }}</td>
              </tr>
            </paginate>
          </table>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <paginate-links for="bannerList" :limit="10"></paginate-links>
          <paginate-links for="bannerList" :simple="{next: 'Next »', prev: '« Back'}"></paginate-links>
        </article>
      </div>
    </div>
  </div>

</template>

<script>
  import moment from 'moment'
  import {getAuthHeaders} from '../../router'
  export default {
    beforeMount () {
      this.$store.dispatch('getBannerList', {
        authHeaders: getAuthHeaders(),
        payload: {page: 1, size: 15, orderby: 'updated_at'}
      })
    },
    data () {
      return {
        paginate: ['bannerList']
      }
    },
    computed: {
      bannerList () {
        var bannerList = this.$store.state.dataConfig.bannerList.list
        bannerList.forEach(function (item) {
          item.start_str = moment.unix(item.start_ts).format('YYYY-MM-DD h:mm:ss')
          item.end_str = moment.unix(item.end_ts).format('YYYY-MM-DD h:mm:ss')
        })
        return bannerList
      }
    }
  }
</script>

<style lang="scss">
  .table-responsive {
    display: block;
    width: 100%;
    min-height: .01%;
    overflow-x: auto;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  .paginate-list {
    width: 159px;
    margin: 0 auto;
    text-align: left;

  li {
    display: block;

  &
  :before {
    content: '⚬ ';
    font-weight: bold;
    color: slategray;
  }

  }
  }

  .paginate-links.bannerList {
    user-select: none;

  a {
    cursor: pointer;
  }

  li.active a {
    font-weight: bold;
  }

  li.next:before {
    content: ' | ';
    margin-right: 13px;
    color: #ddd;
  }

  li.disabled a {
    color: #ccc;
    cursor: no-drop;
  }

  }

</style>
