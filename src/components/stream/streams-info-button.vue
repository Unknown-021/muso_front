<template>
  <base-dropdown-trigger
    v-model="isMenuOpen"
    :placement="placement"
    :offset="offset"
    :trigger="trigger"
    overlay-class="streams-overlay"
    @before-enter="createContainerClone"
    @after-leave="removeContainerClone"
  >
    <button class="info-btn zero-btn" aria-label="Where do we get streams info?">
      <info-icon width="12px" height="12px" />
    </button>

    <template #dropdown="slotProps">
      <div class="menu-wrap">
        <base-menu class="streams-menu" @click="closeMenu">
          <p class="menu-text">All streams are collected from SoundCloud and Youtube.</p>
        </base-menu>
      </div>
    </template>
  </base-dropdown-trigger>
</template>

<script>
import BaseDropdownTrigger from 'components/ui/base-dropdown-trigger/base-dropdown-trigger.vue';
import InfoIcon from 'assets/images/icons/info.svg';
import BaseMenu from 'components/ui/base-menu/base-menu.vue';
import { onWindowResize } from 'helpers/vue';
import { cloneElement } from 'helpers/dom';

export default {
  name: 'streams-info-button',
  components: {
    BaseDropdownTrigger,
    BaseMenu,
    InfoIcon
  },
  props: {
    mobileOffset: {
      type: Array,
      default: () => [0, 35]
    }
  },
  data() {
    return {
      isMobile: false,
      isMenuOpen: false,
      clonedEl: null
    };
  },
  mounted() {
    onWindowResize(this, this.closeMenu);
    this.$syncMediaWithComponent(this.$mediaQueries.PHONE, 'isMobile');
  },
  beforeDestroy() {
    this.removeContainerClone();
  },
  computed: {
    trigger() {
      return this.isMobile
        ? 'click'
        : 'hover';
    },
    placement() {
      return this.isMobile
        ? 'top'
        : 'bottom-start'
    },
    offset() {
      return this.isMobile
        ? this.mobileOffset
        : [0, 5]
    }
  },
  methods: {
    closeMenu() {
      this.isMenuOpen = false;
    },
    createContainerClone() {
      const el = this.$el.closest('[data-streams-info]');
      if (!el) return;
      if (!this.isMobile) return;

      this.clonedEl = cloneElement(el);
      this.clonedEl.style.zIndex = 'var(--dropdown-menu-z-index)';
      this.clonedEl.style.pointerEvents = 'none';
      document.body.appendChild(this.clonedEl);
    },
    removeContainerClone() {
      if (this.clonedEl) {
        this.clonedEl.remove();
        this.clonedEl = null;
      }
    }
  }
}
</script>

<style lang="scss">
.menu-wrap {
  z-index: 1000;
  @media (max-width: 767px) {
    padding-left: 16px;
    padding-right: 16px;
  }
}

.streams-overlay {
  @media (max-width: 767px) {
    background-color: rgba(4, 3, 2, 0.7%);
  }
}

.streams-menu {
  max-width: 345px;
  @media (min-width: 768px) {
    max-width: 190px;
  }
}

.info-btn {
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
  }
}

.menu-text {
  padding: 0 10px;
  font-size: 14px;
  line-height: 1.4;
  color: #F7F7F7;
  @media (min-width: 768px) {
    font-size: 12px;
    line-height: 1.3;
    color: #8F8F8F;
  }
}
</style>