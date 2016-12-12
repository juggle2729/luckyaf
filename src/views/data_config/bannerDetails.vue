<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">编辑 Banner 详情</h1>
        <div class="block">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">名称</label>
            </div>
            <div class="control is-grouped">
              <p class="control is-expanded">
                <input class="input" type="text" placeholder="名称">
              </p>
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">命令</label>
            </div>
            <div class="control is-grouped">
              <p class="control is-expanded">
                <input class="input" type="text" placeholder="命令">
              </p>
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">生效时间</label>
            </div>
            <div class="control is-grouped">
              <p class="control">
                <datepicker :config="{ wrap: true, enableTime: true, dateFormat: 'Y-m-d h:i K' }">
                  <a class="button" data-toggle><i class="fa fa-calendar"></i></a>
                  <a class="button" data-clear><i class="fa fa-close"></i></a>
                </datepicker>
              </p>
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">失效时间</label>
            </div>
            <div class="control is-grouped">
              <p class="control">
                <datepicker :config="{ wrap: true, enableTime: true, dateFormat: 'Y-m-d h:i K' }">
                  <a class="button" data-toggle><i class="fa fa-calendar"></i></a>
                  <a class="button" data-clear><i class="fa fa-close"></i></a>
                </datepicker>
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
  import Datepicker from 'vue-bulma-datepicker'
  export default {
    components: {
      Datepicker
    }
  }
</script>
