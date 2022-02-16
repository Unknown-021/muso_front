<template>
  <span class="badge">PRO</span>
</template>

<script>
export default {
  name: 'pro-badge'
}
</script>

<style lang="scss">
.badge {
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 2px;
  padding: 0 3px;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.3;
  color: var(--overlay-1-color);
}
</style>