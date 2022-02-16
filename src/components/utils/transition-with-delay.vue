<template>
  <transition v-bind="$attrs" v-on="listeners">
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'transition-with-delay',
  inheritAttrs: false,
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        beforeEnter: this.beforeEnter,
        afterEnter: this.afterEnter
      };
    }
  },
  methods: {
    beforeEnter(el) {
      const delay = el.dataset.enterDelay;
      if (delay) {
        el.style.transitionDelay = delay;
      }
    },
    afterEnter(el) {
      el.style.transitionDelay = '';
    }
  }
}
</script>
