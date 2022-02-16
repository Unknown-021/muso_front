<template>
  <component
    :is="component"
    :class="cssClass"
    :data-loading="loading"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <base-icon v-if="icon" :name="icon" v-bind="iconAttrs" class="btn-icon" />
    <slot />
  </component>
</template>

<script>
import BaseIcon from 'components/ui/base-icon/base-icon.vue';
import { getIconAttrs } from './base-plain-button/plain-button.icons';

const variants = ['default', 'danger', 'primary', 'primary-ghost', 'primary-danger'];

export default {
  name: 'action-button',
  inheritAttrs: false,
  components: {
    BaseIcon
  },
  props: {
    component: {
      type: String,
      default: 'button'
    },
    variant: {
      type: String,
      default: 'default',
      validator: value => variants.includes(value)
    },
    loading: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: undefined
    }
  },
  computed: {
    cssClass() {
      return {
        'action-btn': true,
        [`action-btn--${this.variant}`]: true,
        'action-btn--plain': this.plain
      };
    },
    iconAttrs() {
      return getIconAttrs(this.icon);
    }
  }
}
</script>

<style lang="scss">
:root {
  --action-btn-padding: 5px 10px;
}
.action-btn {
  display: inline-flex;
  justify-content: center;
  border: 1px solid #595857;
  border-radius: 2px;
  padding: var(--action-btn-padding);
  font-size: 14px;
  line-height: 1.4;
  min-width: var(--action-button-min-width, auto);
  box-shadow: none;
  color: #CCCCCC;
  background-color: transparent;
  transition-property: opacity, background-color, border-color, color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
  &:hover {
    text-decoration: none;
  }
  &--plain {
    border-color: transparent !important;
    color: var(--action-button-plain-color, currentColor);
  }
  &--default {
    &:hover {
      border-color: #595857;
      background-color: rgba(89, 88, 87, 0.1);
    }
    &:active {
      border-color: #434343;
      background-color: rgba(67, 67, 67, 0.1);
    }
  }
  &--danger {
    color: #FF3B30;
    border-color: #FF3B30;
    &:hover {
      border-color: rgba(255, 59, 48, 0.5);
      background-color: rgba(255, 59, 48, 0.1);
    }
    &:active {
      border-color: rgba(255, 59, 48, 0.3);
      background: rgba(255, 59, 48, 0.06);
    }
  }
  &--primary {
    color: #6BE7C8;
    border-color: #6BE7C8;
    &:hover {
      border-color: rgba(107, 231, 200, 1);
      text-decoration: none;
      background: rgba(3, 201, 169, 0.25);
      box-shadow: inset 0px -10px 11px -13px rgba(247, 247, 247, 0.3);
      text-shadow: 0 0 7px hsla(0, 0%, 96.9%, 0.5);
      color: var(--hover-color);
    }
    &:active {
      border-color: #1E6654;
      background-color: rgba(30, 102, 84, 0.1);
    }
  }
  &--primary-ghost {
    border: none;
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--primary-color);

  }
  &--primary-danger {
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--error-color);
    border: none;
    padding: 16px 24px;
    margin-bottom: 20px;
  }
  &[disabled],
  &[data-loading] {
    pointer-events: none;
    border-color: #595857;
    color: #595857;
    background-color: transparent;
  }
  &[data-icon],
  &[data-icon-tiny] {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &[data-icon-tiny] {
    padding-left: 5px;
    padding-right: 5px;
  }
  svg {
    fill: currentColor;
  }
}
</style>
