<template>
  <div class="skeleton">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Skeleton"
};
</script>

<style lang="scss">
// We moved skeleton styles to it's own .scss file just to have controll over
// styles import order. It helps us to ensure that "skeleton" styles will have the lowest
// posible priority, thus we can easily override them
</style>