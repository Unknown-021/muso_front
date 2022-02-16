<template>
  <button
    class="toggle-btn"
    type="button"
    :data-toggled="active"
    v-bind="$attrs"
    v-on="$listeners"
    @click="toggle"
  >
    <span v-if="$slots.default" class="toggle-btn__inner">
      <slot />
    </span>
    <arrow-down-icon class="toggle-icon" />
  </button>
</template>

<script>
import ArrowDownIcon from 'assets/images/icons/arrow-down.svg';

export default {
  name: 'toggle-button',
  components: {
    ArrowDownIcon
  },
  model: {
    event: 'toggle',
    prop: 'active'
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggle() {
      const value = !this.active;
      this.$emit('toggle', value);
      this.$emit('update:active', value);
    }
  }
}
</script>

<style lang="scss">
.toggle-btn {
  display: inline-flex;
  align-items: center;
  -webkit-appearance: none;
  position: relative;
  border: 0;
  padding: 0;
  min-height: 10px;
  box-shadow: none;
  color: #8F8F8F;
  background-color: transparent;
  &::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
  }
  &__inner {
    margin-right: var(--toggle-icon-margin);
  }
}

:root {
  --toggle-icon-color: currentColor;
  --toggle-icon-width: 10px;
  --toggle-icon-margin: 4px;
}
.toggle-icon {
  width: var(--toggle-icon-width);
  height: auto;
  fill: var(--toggle-icon-color);
  @at-root {
    .toggle-btn[data-toggled] & {
      transform: rotate(180deg);
    }
  }
}
</style>