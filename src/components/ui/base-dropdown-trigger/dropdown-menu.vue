<template>
  <client-only>
    <mounting-portal mount-to="body" append>
      <transition name="fade-fast">
        <div
          v-if="visible && !disabled && trigger === 'click'"
          class="dropdown-overlay"
          :class="overlayClass"
        />
      </transition>

      <div
        ref="wrapper"
        class="dropdown-wrapper"
        v-on="dropdowListeners"
      >
        <transition
          :name="transition"
          v-on="$listeners"
          @after-leave="destroy"
        >
          <slot v-if="visible" />
        </transition>
      </div>
    </mounting-portal>
  </client-only>
</template>

<script>
import { isMouseMovedToElement } from 'helpers/dom';
import { MountingPortal } from 'portal-vue';
import { createPopper } from '@popperjs/core';
import { onClickOutside } from 'helpers/dom/on-click-outside';
import ClientOnly from 'vue-client-only';

export default {
  name: 'dropdown-menu',
  components: {
    ClientOnly,
    MountingPortal
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
    overlayClass: {
      type: [String, Object],
      default: undefined
    },
    transition: {
      type: String,
      default: 'fade-fast'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    getTargetEl: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      popper: null,
      clickOutside: null
    };
  },
  watch: {
    visible: {
      immediate: true,
      handler(value) {
        if (value) {
          window.setTimeout(this.init);
        }
      }
    }
  },
  computed: {
    dropdowListeners() {
      if (this.trigger === 'click') {
        return {
          click: this.onDropdownClick
        };
      } else if (this.trigger === 'hover') {
        return {
          click: this.onDropdownClick,
          mouseleave: this.onDropdownLeave
        };
      } else if (this.trigger === 'manual') {
        return {};
      }
    }
  },
  methods: {
    init() {
      this.popper = this.createPopper();
      this.clickOutside = onClickOutside(this.$refs.wrapper, this.onClickOutside, { capture: true });
    },
    destroy() {
      if (this.popper) {
        this.popper.destroy();
        this.popper = null;
      }
      this.clickOutside.off();
    },
    setVisible(value) {
      this.$emit('update:visible', value);
    },
    createPopper() {
      const buttonEl = this.getTargetEl();
      const dropdownEl = this.getEl();
      if (!buttonEl || !dropdownEl) return;

      this.popper = createPopper(buttonEl, dropdownEl, {
        placement: this.placement,
        modifiers: [{
          name: 'offset',
          options: {
            offset: this.offset
          }
        }, {
          name: 'preventOverflow',
          options: {
            altAxis: true, // false by default,
            padding: 15
          },
        },
        ...this.modifiers]
      });

      return this.popper;
    },
    getEl() {
      const { wrapper } = this.$refs;
      if (!wrapper) {
        return null;
      };

      return wrapper.firstElementChild;
    },
    onDropdownLeave(event) {
      const isMouseMovedToButton = isMouseMovedToElement(event, this.getTargetEl());
      if (!isMouseMovedToButton) {
        this.setVisible(false);
      }
    },
    onDropdownClick() {
      this.setVisible(false);
    },
    onClickOutside(event) {
      this.$emit('click-outside', event);
    }
  }
}
</script>

<style lang="scss">
:root {
  --dropdown-menu-z-index: 1000;
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