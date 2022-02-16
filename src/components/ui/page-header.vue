<template>
  <header class="page-header">
    <img src="images/MusoM.svg" width="32" height="25" alt="Muso logo" class="page-header__logo" />
    <h1 class="page-header__title title-2">
      <slot name="title" />
    </h1>
    <p class="page-header__description title-4">
      <slot name="description" />
    </p>
  </header>
</template>

<script>
export default {
  name: 'subscripiton-header'
}
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract.scss";

.page-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 11px;
  &__logo {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 16px;
    @media #{$tablet} {
      margin-bottom: 12px;
    }
  }
  &__description {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--overlay-2-color);
  }
}
</style>
