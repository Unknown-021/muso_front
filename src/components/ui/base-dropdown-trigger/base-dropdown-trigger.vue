<template>
  <div :data-interactive="isInteractive" v-on="listeners">
    <first-slot :data-active="isVisible">
      <slot />
    </first-slot>

    <dropdown-menu
      ref="dropdown"
      :trigger="trigger"
      :visible="isVisible"
      :offset="offset"
      :placement="placement"
      :modifiers="modifiers"
      :transition="transition"
      :overlay-class="overlayClass"
      :get-target-el="getButtonEl"
      @update:visible="toggleDropdownVisible"
      @click-outside="onClickOutside"
      v-on="transitionListeners"
    >
      <slot name="dropdown" />
    </dropdown-menu>
  </div>
</template>

<script>
import DropdownMenu from './dropdown-menu.vue';
import FirstSlot from 'components/utils/first-slot.vue';
import { createTransitionListeners } from 'helpers/vue';
import { isMouseMovedToElement } from 'helpers/dom';

export default {
  name: 'base-dropdown-trigger',
  components: {
    FirstSlot,
    DropdownMenu
  },
  inheritAttrs: false,
  model: {
    prop: 'visible',
    event: 'visible-change'
  },
  props: {
    visible: {
      type: Boolean,
      default: undefined
    },
    trigger: {
      type: String,
      default: 'click'
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    offset: {
      type: [Array, Function],
      default: () => [0, 0]
    },
    modifiers: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    timeout: {
      type: Number,
      default: 0
    },
    overlayClass: {
      type: [String, Object],
      default: undefined
    },
    transition: {
      type: String,
      default: undefined
    }
  },
  provide() {
    return {
      dropdownTrigger: this
    };
  },
  inject: {
    parentTrigger: {
      type: Object,
      from: 'dropdownTrigger',
      default: undefined
    }
  },
  data() {
    return {
      isVisible: false,
      openChildren: new Set()
    };
  },
  beforeDestroy() {
    this.isVisible = false;
  },
  watch: {
    visible: {
      immediate: true,
      handler(value) {
        if (value !== undefined) {
          this.toggle(value);
        }
      }
    },
    disabled(disabled) {
      if (disabled) {
        this.toggle(false);
      } else {
        this.toggle(this.visible);
      }
    }
  },
  computed: {
    isInteractive() {
      return this.trigger !== 'manual';
    },
    transitionListeners() {
      return createTransitionListeners(this);
    },
    listeners() {
      if (this.disabled || this.trigger === 'manual') {
        return {};
      } else if (this.trigger === 'click') {
        return {
          click: this.open
        };
      } else if (this.trigger === 'hover') {
        return {
          mouseenter: this.onButtonEnter,
          mouseleave: this.onButtonLeave
        };
      }
    }
  },
  methods: {
    open() {
      this.toggle(true);
    },
    close() {
      this.toggle(false);
    },
    toggle(isVisible) {
      if (this.isVisible === isVisible) return;
      this.isVisible = isVisible;
      this.$emit('visible-change', isVisible);

      if (this.parentTrigger) {
        const { openChildren } = this.parentTrigger;
        const action = isVisible ? 'add' : 'delete';
        openChildren[action](this);
      }
    },
    update() {
      const { dropdown } = this.$refs;
      if (dropdown) {
        this.dropdown.update();
      }
    },
    toggleDropdownVisible(visible) {
      if (this.visible === undefined) {
        this.toggle(visible);
      }
    },

    onButtonEnter() {
      this.timeoutId = window.setTimeout(this.open, this.timeout);
    },
    onButtonLeave(event) {
      const dropdownEl = this.$refs.dropdown.getEl();
      const isMouseMovedToDropdown = isMouseMovedToElement(event, dropdownEl);

      if (!isMouseMovedToDropdown) {
        window.clearTimeout(this.timeoutId);
        this.timeoutId = null;
        this.close();
      }
    },
    getButtonEl() {
      return this.$el;
    },
    onClickOutside({ target }) {
      if (this.openChildren.size) return;

      const relatedToReference = this.getButtonEl().contains(target);
      this.$emit('auto-close', { target, relatedToReference });
      this.close();
    }
  }
}
</script>

<style lang="scss">
:root {
  --dropdown-menu-z-index: 1000;
}

.dropdown-trigger {
  display: inline-flex;
}

.dropdown-overlay {
  position: absolute;
  z-index: var(--dropdown-menu-z-index);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>