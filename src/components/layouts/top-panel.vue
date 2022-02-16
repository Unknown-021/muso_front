<template>
  <div class="top-panel">
    <slot />
    <div v-if="$slots.controls" class="top-panel__btns">
      <slot name="controls" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'top-panel'
}
</script>

<style lang="scss">
.top-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 768px) {
    padding-top: var(--top-panel-padding-top);
    padding-bottom: var(--top-panel-padding-bottom);
  }
  &__breadcrumb[class] {
    margin: 0;
  }
  &__btns {
    display: flex;
    // We want top-panel height to remain the same no matter if it has buttons or not.
    // It allows to prevent content jumping when we navigate from page which has not buttons
    // to ones which has.
    margin-top: -2px;
    margin-bottom: -2px;
    margin-left: auto;
    padding-left: 20px;
  }
  &__options {
    margin-left: 14px;
  }
}
</style>