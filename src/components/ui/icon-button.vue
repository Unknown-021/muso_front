<template>
  <button
    :class="{
      'icon-btn': true,
      [`icon-btn--${size}`]: size
    }"
    type="button"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <base-icon :name="icon" />
  </button>
</template>

<script>
import BaseIcon from 'components/ui/base-icon/base-icon.vue';

const sizes = ['small'];

export default {
  name: 'icon-button',
  components: {
    BaseIcon
  },
  props: {
    icon: {
      name: String,
      required: true
    },
    size: {
      name: String,
      default: undefined,
      validator: value => sizes.includes(value)
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract";

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  width: 24px;
  height: 24px;
  border: 1px solid var(--primary-color);
  border-radius: 2px;
  background-color: transparent;
  svg {
    width: 100%;
    height: 100%;
  }
  &--small {
    width: 16px;
    height: 16px;
  }
  &:hover {
    background-color: rgba(3, 201, 169, 0.25);
  }
  &:active {
    background-color: rgba(143, 143, 143, 0.25);
  }
}
</style>
