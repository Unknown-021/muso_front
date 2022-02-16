<template>
  <!-- <fade-height-transition @after-enter="afteEnter"> -->
    <div>
      <slot v-if="loading" name="skeleton" />
      <slot v-else />
    </div>
  <!-- </fade-height-transition> -->
</template>

<script>
import FadeHeightTransition from 'components/utils/fade-height-transition.vue';

export default {
  name: 'base-hero',
  components: {
    FadeHeightTransition
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    afteEnter(event) {
      if (!this.loading) {
        this.$emit('info-show');
      }
      this.$emit('after-enter', event);
    }
  }
}
</script>