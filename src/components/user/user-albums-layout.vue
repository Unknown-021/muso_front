<template>
  <div class="user-albums-layout">
    <h1 v-if="$slots.title" class="visually-hidden">
      <slot name="title" />
    </h1>

    <div class="user-albums-layout__top-panel">
      <slot name="top-panel" />
    </div>

    <slot name="content" />
  </div>
</template>

<script>
import { Portal } from 'portal-vue';

export default {
  name: 'user-albums-layout',
  components: {
    Portal
  }
}
</script>

<style lang="scss">
.user-albums-layout {
  &[class] {
    padding: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;
    padding-right: 20px;
    min-height: 100%;
  }
  &__top-panel {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    margin-bottom: 7px;
    padding-top: 6px;
    padding-bottom: 6px;
    background-color: #040302;
  }
}
</style>