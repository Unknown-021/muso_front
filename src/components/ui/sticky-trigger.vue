<template>
  <div class="sticky-trigger" :style="`--sticky-top: ${top}px`">
    <slot />
  </div>
</template>

<script>
import { onTransitionFinished } from 'helpers/dom';
import { ScrollScene } from 'helpers/scroll-scene';
import { StickyTriggerController, UPDATE_STICKY_HEADER_EVENT } from './sticky-trigger.controller';

export { StickyTriggerController };

export default {
  name: 'sticky-trigger',
  props: {
    top: {
      type: Number,
      default: 0
    },
    getStickyEl: {
      type: Function,
      default: undefined
    }
  },
  data() {
    return {
      stickyEl: null,
      isSticked: false
    };
  },
  mounted() {
    if (this.getStickyEl) {
      this.stickyEl = this.getStickyEl(this.$el);
    }
    this.init();
    this.$root.$on(UPDATE_STICKY_HEADER_EVENT, this.updateScrollScene);
  },
  beforeDestroy() {
    this.$root.$off(UPDATE_STICKY_HEADER_EVENT, this.updateScrollScene);
    this.scrollScene.destroy();
  },
  watch: {
    top() {
      this.scrollScene.setOptions({
        offset: -this.top
      });
    }
  },
  methods: {
    init() {
      this.initScrollScene();
      if (this.stickyEl) {
        this.initStickyEl(this.stickyEl);
      }
    },
    initScrollScene() {
      this.scrollScene = new ScrollScene({
        triggerEl: this.$el,
        offset: -this.top
      });
      this.scrollScene.on('progress', (event) => {
        this.setIsSticked(event.progress === 1);
      });
      this.scrollScene.calcProgress();
    },
    initStickyEl(stickyEl) {
      stickyEl.dataset.stickyTarget = true;

      if (this.scrollScene.progress === 1) {
        enterTransition(stickyEl, 'sticky-target');
      }
    },
    setIsSticked(value) {
      this.isSticked = value;
      this.$emit('change', value);
    },
    updateScrollScene() {
      this.scrollScene.update();
    },
    getScrollScene() {
      return this.scrollScene;
    }
  }
}

function enterTransition(el, name) {
  const enterClass = `${name}-enter`;
  const enterActiveClass = `${name}-enter-active`;

  el.classList.add(enterClass);
  onTransitionFinished(el, () => {
    el.classList.remove(enterActiveClass);
  });
  setTimeout(() => {
    el.classList.add(enterActiveClass);
    // Trigger transition
    el.classList.remove(enterClass);
  });
}
</script>

<style lang="scss">
[data-sticky-target] {
  position: sticky;
  z-index: 100;
  top: var(--sticky-top);
}

.sticky-target {
  &-enter-active {
    transition: 100ms ease-in-out;  
  }
  &-enter {
    opacity: 0;
  }
}
</style>