<template>
  <section class="mheader">
    <h2 v-if="$slots.title" class="mheader__title">
      <slot name="title" />
    </h2>
    <slot />
    <div class="mheader__after">
      <span v-if="$slots.text" class="mheader__text">
        <slot name="text" />
      </span>
      <slot name="tags" />
      <div v-if="$slots.cta" class="mheader__cta mobile-none">
        <div v-if="$slots.text || $slots.tags" class="v-line" />
        <slot name="cta" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'master-header'
}
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract";

.mheader {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  min-height: 40px;
  line-height: 1.14;
  color: #8F8F8F;
  background-color: #1D1B1A;
  --action-btn-padding: 2px 12px;
  @media #{$tablet} {
    padding: 12px 16px;
    min-height: 50px;
    border-radius: 4px;
  }
  &__text,
  &__cta {
    @media #{$before-tablet} {
      display: none;
    }
  }
  &__title {
    font-size: 20px;
    line-height: 1.4;
    font-weight: 500;
    color: var(--overlay-1-color);
  }
  .master-search {
    margin-top: -3px;
    margin-bottom: -3px;
  }
  &__after {
    margin-left: auto;
    margin-right: -10px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    > * {
      margin-right: 10px;
    }
  }
  &__cta {
    --vline-color: var(--border-color);
    --vline-gap: 10px;
    display: flex;
    align-items: center;
    margin-left: calc(-1 * var(--vline-gap))
  }
}
</style>