<template>
  <sticky-trigger
    ref="trigger"
    :top="stickyTop"
    :get-sticky-el="getStickyEl"
    @change="handleChange"
  >
    <slot />
  </sticky-trigger>
</template>

<script>
import StickyTrigger, { StickyTriggerController } from 'components/ui/sticky-trigger.vue';

export { StickyTriggerController };

export default {
  name: 'sticky-tabs',
  components: {
    StickyTrigger
  },
  data() {
    return {
      isMobile: false,
      isSticked: false
    }
  },
  mounted() {
    this.$syncMediaWithComponent(this.$mediaQueries.PHONE, 'isMobile');
    this.$root.$on('tab-pane:before-enter', this.scrollToTriggerTopIfNeeded);
  },
  beforeDestroy() {
    this.$root.$off('tab-pane:before-enter', this.scrollToTriggerTopIfNeeded);
  },
  computed: {
    stickyTop() {
      return this.isMobile ? 5 : 41;
    }
  },
  methods: {
    getStickyEl(triggerEl) {
      return triggerEl.querySelector('[role=tablist]');
    },
    scrollToTriggerTopIfNeeded() {
      if (!this.isSticked) return;

      // We want to use $nextTick to wait for tab content to be rendered
      this.$nextTick(() => {
        const { scrollContainerEl, startY } = this.$refs.trigger.getScrollScene();
        // +1 is needed for firefox in order to keep element sticked
        scrollContainerEl.scrollTop = startY + 1;
      });
    },
    handleChange(isSticked) {
      this.isSticked = isSticked;
      this.$emit('change', isSticked);
    }
  }
}
</script>