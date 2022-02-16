<template>
  <component
    :is="component"
    :class="cssClass"
    v-bind="attrs"
    v-on="$listeners"
  >
    <base-icon v-if="icon" :name="icon" v-bind="iconAttrs" class="btn-icon" />
    <slot />
  </component>
</template>

<script>
import BaseIcon from 'components/ui/base-icon/base-icon.vue';
import { getIconAttrs } from './plain-button.icons';
const variants = ['primary', 'default', 'danger', 'light', 'ghost'];

export default {
  name: 'base-plain-button',
  inheritAttrs: false,
  components: {
    BaseIcon
  },
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: value => variants.includes(value)
    },
    component: {
      type: [String, Object],
      default: 'button'
    },
    icon: {
      type: String,
      default: undefined
    }
  },
  computed: {
    attrs() {
      const defaultAttrs = {};
      if (this.component === 'button') {
        defaultAttrs.type = 'button';
      }
      return Object.assign(defaultAttrs, this.$attrs);
    },
    cssClass() {
      return {
        'plain-btn': true,
        [`plain-btn--${this.variant}`]: true
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
  --plain-btn-color: var(--overlay-2-color);
  --plain-btn-hover-color: unset;
  --plain-btn-icon-color: var(--overlay-1-color);
}
.plain-btn {
  --hover-color: var(--plain-btn-hover-color, var(--plain-btn-color));
  display: inline-flex;
  border: 0;
  border-radius: 2px;
  padding: 2px 8px;
  font: inherit;
  text-align: center;
  color: var(--plain-btn-color);
  background-color: transparent;
  box-shadow: none;
  &:hover {
    text-decoration: none;
    color: var(--hover-color);
    background-color: rgba(143, 143, 143, 0.17);
  }
  &:active,
  &[data-active] {
    background-color: rgba(143, 143, 143, 0.1);
  }
  &[data-active] {
    transition-property: background-color, color;
    transition-duration: 150ms;
  }
  &--primary {
    --hover-color: var(--overlay-1-color);
    --plain-btn-color: #6BE7C8;
    line-height: 1.4;
    &:hover {
      border-color: rgba(107, 231, 200, 1);
      text-decoration: none;
      background: rgba(3, 201, 169, 0.25);
      box-shadow: inset 0px -10px 11px -13px rgba(247, 247, 247, 0.3);
      text-shadow: 0 0 7px hsla(0, 0%, 96.9%, 0.5);
    }
    &:hover svg {
      path {
        fill: var(--plain-btn-icon-color);
      }
    }
  }
  &--danger {
    --plain-btn-color: #FF3B30;
  }
  &--light {
    --plain-btn-color: #F2F2F2;
    --plain-btn-icon-color: #595857;
  }
  &--ghost {
    --plain-btn-color: #595857;
  }
  &[disabled] {
    pointer-events: none;
    --plain-btn-color: #595857;
  }
  svg {
    fill: var(--plain-btn-icon-color);
  }
}
.btn-icon {
  align-self: center;
  margin-right: 4px;
  max-width: 20px;
  &--tall {
    margin-top: -1px;
  }
}
</style>
