<template>
  <div class="tablist no-scrollbar">
    <div role="tablist" class="tablist__inner">
      <slot />
    </div>
    <div v-if="$slots.after" class="tablist__after">
      <slot name="after" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'base-tablist'
};
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract";

.tablist {
  display: flex;
  position: relative;
  @media #{$before-tablet} {
    margin-left: -15px;
    margin-right: -15px;
    padding-left: 15px;
    overflow-x: scroll;
  }
  @media #{$tablet} {
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background-color: #272625;
    }
  }
  &__inner {
    display: flex;
    width: 100%;
    @media #{$before-tablet} {
      &::after {
        content: "";
        flex-shrink: 0;
        width: 15px;
      }
    }
  }
  &__after {
    align-self: center;
    padding-left: 20px;
    @media #{$before-tablet} {
      display: none;
    }
  }
}
</style>
