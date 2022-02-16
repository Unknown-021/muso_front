<template>
  <h3 class="menu-title"><slot /></h3>
</template>

<script>
export default {
  name: 'menu-title'
}
</script>

<style lang="scss">
.menu-title {
  padding: 10px var(--menu-item-padding-right) 5px var(--menu-item-padding-left);
  font-size: 14px;
  font-weight: normal;
}
</style>