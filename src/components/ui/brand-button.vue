<template>
  <component
    :is="component"
    :class="{
      'brand-button': true,
      [`brand-button--${variant}`]: true
    }"
    v-bind="$attrs"
    v-on="$listeners"
    :disabled="disabled || loading"
    :data-loading="loading"
  >
    <transition name="fade-fast">
      <loader class="brand-button__loader" v-if="loading" />
    </transition>
    <slot />
  </component>
</template>

<script>
import Loader from 'components/ui/loader';

const variants = ['default', 'primary', 'danger'];

export default {
  name: 'brand-button',
  components: {
    Loader
  },
  props: {
    component: {
      type: [String, Object],
      default: 'button',
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'primary',
      validator: value => variants.includes(value)
    }
  },
};
</script>

<style lang="scss">
.brand-button {
  position: relative;
  -webkit-appearance: none;
  border-radius: 2px;
  border: 2px solid #595857;
  padding: 10px 25px;
  min-height: 40px;
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.25em;
  text-align: center;
  text-transform: uppercase;
  color: #CCCCCC;
  background-color: transparent;
  transition-property: border-color, color;
  transition-duration: 130ms;
  transition-timing-function: ease-in-out;
  text-decoration: none;
  &--default {
    &:hover {
      border-color: rgba(89, 88, 87, 0.5);
    }
    &:active {
      border-color: rgba(67, 67, 67, 0.5);
    }
  }
  &--primary {
    border-color: #6BE7C8;
    color: #6BE7C8;
    &:hover {
      border-color: rgba(107, 231, 200, 0.5);
    }
    &:active {
      border-color: #1E6654;
    }
  }
  &--danger {
    border-color: #FF3B30;
    color: #FF3B30;
    &:hover {
      border-color: rgba(255, 59, 48, 0.5);
    }
    &:active {
      border-color: rgba(255, 59, 48, 0.3);
    }
  }
  &:hover {
    text-decoration: none;
  }
  &[disabled] {
    pointer-events: none;
    border-color: #595857;
    color: #595857;
  }
  &[data-loading=true] {
    color: rgba(89, 88, 87, 0.33)
  }
  &__loader {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: scale(0.6);
  }
}
</style>
