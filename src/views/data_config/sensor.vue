<template>
  <div class="tile is-parent is-horizontal">
    <article class="tile is-child box">
      <h1 class="title">App Store(iOS)</h1>
      <div class="control is-horizontal">
        <div class="control-label">
          <label class="label">Build</label>
        </div>
        <div class="control">
          <input class="input" type="text" placeholder="Text input">
        </div>
        <div class="control">
          <vb-switch type="success" size="large"></vb-switch>
        </div>
      </div>
    </article>
    <article class="tile is-child box">
      <h1 class="title">Google Play(Android)</h1>
    </article>
  </div>
</template>

<script>
  import VbSwitch from 'vue-bulma-switch'

  export default {
    components: {
      VbSwitch
    }
  }

</script>

<style lang="css">

</style>
