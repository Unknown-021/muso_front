<template>
  <base-menu
    class="select-dropdown"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </base-menu>
</template>

<script>
import BaseMenu, { MenuItem } from 'components/ui/base-menu/base-menu.vue';

export default {
  name: 'form-select-dropdown',
  inheritAttrs: false,
  components: {
    BaseMenu
  }
}
</script>

<style lang="scss">
.select-dropdown {
  --menu-item-padding-left: 15px;
  --menu-item-padding-right: 15px;
  --menu-item-padding-y: 6px;
  --tag-padding: 2px 5px;
  &[data-taggable] {
    --menu-item-padding-y: 5px;
  }
}
</style>