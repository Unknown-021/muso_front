<template>
  <div
    :class="{
      'hr': true,
      'hr--broadless': broadless
    }"
  />
</template>

<script>
export default {
  name: 'horizontal-line',
  props: {
    broadless: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract";

:root {
  --hr-color: var(--border-color-2);
}

.hr {
  width: 100%;
  height: 1px;
  background: var(--hr-color);

  &--broadless {
    @media #{$tablet} {
      width: calc(100% + 32px);
      margin-left: -16px;
    }
  }

  &.thick-5 {
    height: 5px;
  }
  &.thick-4 {
    height: 4px;
  }
  &.thick-8 {
    height: 8px;
  }
  &.thick-10 {
    height: 10px;
  }
  &.thick-12 {
    height: 12px;
  }
  &.thick-15 {
    height: 15px;
  }

  &.thick-12-mobile {
    @media #{$before-tablet} {
      height: 12px;
    }
  }

  @media #{$tablet} {
    &.md-normal {
      height: 1px;
    }
    &.md-thick-5 {
      height: 5px;
    }
    &.md-thick-4 {
      height: 5px;
    }
    &.md-thick-10 {
      height: 10px;
    }
    &.md-thick-15 {
      height: 15px;
    }
  }

  @media #{$desktop} {
    &.xl-normal {
      height: 1px;
    }
    &.xl-thick-5 {
      height: 5px;
    }
    &.xl-thick-10 {
      height: 10px;
    }
    &.xl-thick-15 {
      height: 15px;
    }
  }
}
</style>
