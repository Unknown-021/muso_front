<template>
  <div class="tab-panel" role="tabpanel">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'base-tab-panel'
}
</script>

<style lang="scss">
.tab-panel,
.tabs-content {
  padding-top: 16px;
}
</style>