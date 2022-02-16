<template>
  <aside
    class="sticky-header"
    :class="{
      'sticky-header--shown': shown
    }"
    aria-hidden="true"
    :data-mounted="isMounted"
  >
    <portal to="scrollbar-overlap">
      <div
        :class="{
          'sticky-header__scrollbar': true,
          'sticky-header__scrollbar--shown' : shown
        }"
      />
    </portal>

    <div class="sticky-header__inner main-content">
      <slot />
    </div>
  </aside>
</template>

<script>
import { Portal } from 'portal-vue';

export default {
  name: 'sticky-header',
  components: {
    Portal
  },
  props: {
    shown: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // We need this to prevent unneeded triggering of opacity transition
      isMounted: false
    };
  },
  mounted() {
    this.isMounted = true;
  }
}
</script>

<style lang="scss">
:root {
  --sticky-header-height: 43px;
  --sticky-header-background-color: #040302;
  @media (min-width: 768px) {
    --sticky-header-height: 82px;
    --sticky-header-background-color: rgba(23, 22, 21, 0.97);
  }
}

.sticky-header {
  position: sticky;
  // We use here negative value instead of zero "0", because when we scroll fast page down
  // on iOS device sometimes appear small gap (1-2px) where we can see content under the sticky header
  top: -1px;
  z-index: 100;
  left: 0;
  margin-bottom: calc(var(--sticky-header-height) * -1);
  width: 100%;
  height: var(--sticky-header-height);
  background-color: var(--sticky-header-background-color);
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  @media (max-width: 767px) {
    border-bottom: 1px solid #272625;
  }
  &[data-mounted=true] {
    transition: opacity 100ms linear;
  }
  &__scrollbar {
    position: absolute;
    content: "";
    position: absolute;
    z-index: 10;
    right: 335px;
    top: 0;
    height: calc(var(--sticky-header-height) - 1px);
    width: 10px;
    background-color: var(--sticky-header-background-color);
    pointer-events: none;
    transition: opacity 100ms linear;
    opacity: 0;
    &--shown {
      opacity: 1;
    }
    @media (max-width: 767px) {
      display: none;
    }
  }
  &__inner {
    display: flex;
    flex-direction: column;
  }
  &--shown {
    opacity: 1;
    pointer-events: auto;
  }
  &__top {
    display: flex;
    align-items: center;
    min-height: 47px;
    @media (max-width: 767px) {
      display: none;
    }
  }
  &__avatar {
    margin-left: 12px;
    width: 32px;
    height: 32px;
  }
  &__nav[class] {
    margin-top: 15px;
    margin-bottom: 12px;
    width: auto;
  }
  &__socials[class] {
    margin-left: auto;
    @media (max-width: 767px) {
      display: none;
    }
  }
}

.sticky-scrollbar {
  &-enter-active,
  &-leave-active {
    transition: opacity 100ms linear;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
}

.sticky-slide-down {
  &-enter-active,
  &-leave-active {
    transition-property: transform, opacity;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0.65, 0.05, 0.36, 1);
  }
  &-enter,
  &-leave-to {
    transform: translateY(15px);
    opacity: 0;
  }
}
</style>
