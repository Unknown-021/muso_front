<template>
  <div class="master-table">
    <slot name="header" />
    <div v-if="$slots.default" class="master-table__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'master-table'
}
</script>

<style lang="scss">
.master-table {
  background-color: var(--base-1-color);
  border-radius: 8px;
  --tr-hover-offset: 16px;
  .mheader {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  &__body {
    padding: 16px;
  }
}
</style>