<template>
  <li
    role="none"
    class="menu-item"
    :data-danger="danger"
    :data-hoveralbe="hoverable"
    :data-has-menu="Boolean($scopedSlots.menu)"
    :data-loading="loading"
    v-bind="$attrs"
    @mouseenter="onMouseEnter"
    v-on="$listeners"
  >
    <base-loader v-if="loading" class="menu-item__loader" />

    <menu-icon v-if="icon" :name="icon" />
    <slot />
    <template v-if="$scopedSlots.menu">
      <arrow-right class="menu-item-cascade-icon" />
      <div ref="menu" class="menu-item__submenu">
        <slot name="menu" />
      </div>
    </template>
  </li>
</template>

<script>
import MenuIcon from './menu-icon.vue';
import ArrowRight from 'assets/images/icons/arrow-right-new.svg';
import BaseLoader from 'components/ui/loader.vue';

import { createPopper } from '@popperjs/core';

const TRANSITION_DURATION = 150;
const MENU_PADDING_Y = 8; //px

export default {
  name: 'base-menu-item',
  inheritAttrs: false,
  components: {
    MenuIcon,
    ArrowRight,
    BaseLoader
  },
  props: {
    icon: {
      type: String,
      default: undefined
    },
    danger: {
      type: Boolean,
      default: false
    },
    hoverable: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    menuPlacement: {
      type: String,
      default: 'right-start'
    }
  },
  data() {
    return {
      popper: null
    };
  },
  mounted() {
    if (this.$scopedSlots.menu) {
      this.initPopper();
    }
  },
  beforeDestroy() {
    const { popper } = this;
    if (popper) {
      setTimeout(() => popper.destroy(), TRANSITION_DURATION);
    }
  },
  methods: {
    getMenu() {
      return this.$refs.menu.firstElementChild;
    },
    initPopper() {
      this.popper = createPopper(this.$el, this.getMenu(), {
        modifiers: {
          name: 'offset',
          options: {
            offset: this.menuOffset
          }
        },
        placement: this.menuPlacement
      });
    },
    menuOffset() {
      const menuEl = this.$refs.menu.firstElementChild;
      const item = getMiddleChild(menuEl, '.menu-item');
      const offsetX = item
        ? -item.offsetTop
        : MENU_PADDING_Y;

      return [offsetX, -10];
    },
    onMouseEnter() {
      if (this.popper) {
        this.popper.update();
      }
    }
  }
};

function getMiddleChild(el, matches) {
  const items = [...el.children].filter(item => item.matches(matches));
  const itemIndex = Math.round(items.length / 2) - 1;
  return items[itemIndex];
}
</script>

<style lang="scss">
:root {
  --menu-item-color: #F7F7F7;
  --menu-item-color-hover: #171615;
  --menu-item-padding-left: 20px;
  --menu-item-padding-right: 24px;
  --menu-item-padding-y: 7px;
  --menu-item-icon-color: #8F8F8F;
}
.menu-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: var(--menu-item-padding-y) 0;
  padding-left: var(--menu-item-padding-left);
  padding-right: var(--menu-item-padding-right);
  list-style: none;
  color: var(--menu-item-color);
  &[data-hoveralbe]:hover {
    cursor: pointer;
    background-color: var(--menu-item-color-hover);
  }
  &:not([data-hoverable]) {
    cursor: default;
  }
  &[data-has-menu] {
    padding-right: calc(15px + var(--menu-item-padding-right));
  }
  &[data-loading] {
    --menu-item-color: rgba(247, 247, 247, 0.6);
    pointer-events: none;
  }
  &[data-danger] {
    --menu-item-color: #FF3B30;
    --menu-item-icon-color: var(--menu-item-color);
  }
  &__loader {
    position: absolute;
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 39px;
    transform: scale(0.5);
    ~ * {
      opacity: 0.6;
    }
  }
  &__submenu {
    opacity: 0;
    pointer-events: none;
    @at-root .menu-item:hover > & {
      opacity: 1;
      pointer-events: auto;
    }
  }
}
.menu-item-inner {
  flex-grow: 1;
  margin: calc(-1 * var(--menu-item-padding-y)) 0;
  margin-left: calc(-1 * var(--menu-item-padding-left));
  margin-right: calc(-1 * var(--menu-item-padding-right));
  padding-left: 20px;
  padding-right: 20px;
}
</style>