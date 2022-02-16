<template>
  <component
    :is="component"
    class="tab"
    v-bind="attrs"
    @click="makeActive"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'base-tab',
  inheritAttrs: false,
  inject: {
    tabsNode: {
      type: Object,
      required: true
    }
  },
  props: {
    component: {
      type: [String, Object],
      default: 'button'
    }
  },
  computed: {
    value() {
      return this.$vnode.key;
    },
    isActive() {
      return this.value === this.tabsNode.activeTabModel;
    },
    attrs() {
      return {
        ...this.tabAttrs,
        ...this.$attrs
      };
    },
    tabAttrs() {
      if (this.component === 'router-link') return;
      if (this.component === 'a') return;

      return {
        'role': 'tab',
        'aria-selected': String(this.isActive)
      };
    }
  },
  methods: {
    makeActive() {
      this.tabsNode.$emit('change', this.value);
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract";

.tab {
  position: relative;
  z-index: 1;
  -webkit-appearance: none;
  border-radius: 0;
  border: 0;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--base-5-color);
  box-shadow: none;
  background-color: transparent;
  transition-property: background-color, color;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  &:hover {
    text-decoration: none;
  }
  @media #{$before-tablet} {
    flex-shrink: 0;
    flex-grow: 1;
    min-width: 100px;
    letter-spacing: 0.5px;
    text-align: center;
    text-transform: uppercase;
    &[aria-selected=true],
    &[aria-current=page] {
      color: #0C0B09;
      background-color: #FFF;
    }
  }
  @media #{$tablet} {
    margin-right: 16px;
    padding-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: -3px;
      right: -3px;
      height: 2px;
      background-color: transparent;
      transition: background-color 150ms ease-in-out;
    }
    &:hover {
      color: #F7F7F7;
    }
    &[aria-selected=true],
    &[aria-current=page] {
      color: #F7F7F7;
      &::after {
        background-color: currentColor;
      }
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>