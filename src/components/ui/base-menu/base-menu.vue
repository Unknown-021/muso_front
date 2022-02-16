<template>
  <ul class="menu" role="menu" v-on="$listeners">
    <slot />
  </ul>
</template>

<script>
import BaseMenuItem from './base-menu-item.vue';
import MenuEmpty from './menu-empty.vue';
import MenuDivider from './menu-divider.vue';
import MenuTitle from './menu-title.vue';
import MenuIcon from './menu-icon.vue';

export { BaseMenuItem, BaseMenuItem as MenuItem, MenuEmpty, MenuDivider, MenuTitle, MenuIcon };

export default {
  name: 'base-menu'
}

export function isMenuItemClosable(el) {
  return !el.closest('[data-closable="false"]');
}
</script>

<style lang="scss">
:root {
  --menu-box-shadow: 1px 6px 35px rgba(4, 3, 2, 0.45);
  --menu-border-radius: 8px;
  --menu-padding-x: 15px;
}

.menu {
  z-index: var(--dropdown-menu-z-index);
  margin: 0;
  border-radius: var(--menu-border-radius);
  padding: 8px 0;
  box-shadow: var(--menu-box-shadow);
  background-color: #21201F;
  .menu {
    &::before {
      content: "";
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
    }
  }
}

.info-menu {
  --menu-box-shadow: 1px 6px 10px rgba(4, 3, 2, 0.45);
  padding: 9px 10px;
  pointer-events: none;
  font-size: 12px;
  color: #8F8F8F;
  background-color: #040302;
}
</style>