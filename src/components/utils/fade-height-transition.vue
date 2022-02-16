<template>
  <transition name="fade-with-height" mode="out-in" v-on="listeners" v-bind="$attrs">
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'fade-height-transition',
  data() {
    return {
      prevHeight: 0,
    };
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        beforeLeave: this.beforeLeave,
        enterCancelled: this.enterCancelled,
        enter: this.enter,
        afterEnter: this.afterEnter,
      };
    },
  },
  methods: {
    beforeLeave(el) {
      this.prevHeight = getComputedStyle(el).height;
      this.$emit('before-leave', el);
    },
    enter(el) {
      const { height } = getComputedStyle(el);
      el.style.height = this.prevHeight;

      setTimeout(() => {
        el.style.height = height;
      });
      this.$emit('enter', el);
    },
    enterCancelled(el) {
      el.style.height = '';
      this.$emit('enter-cancelled', el);
    },
    afterEnter(el) {
      el.style.height = '';
      this.$emit('after-enter', el);
    },
  },
};
</script>

<style lang="scss">
.fade-with-height {
  &-enter-active,
  &-leave-active {
    transition-property: opacity, height;
    transition-duration: 50ms;
    transition-timing-function: ease-in-out;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>
