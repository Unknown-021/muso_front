<template>
  <div class="menu-empty">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'menu-empty'
}
</script>

<style lang="scss">
.menu-empty {
  display: block;
  padding: var(--menu-item-padding-y) 0;
  padding-left: var(--menu-item-padding-left);
  padding-right: var(--menu-item-padding-right);
  text-align: center;
  color: var(--overlay-3-color);
}
</style>