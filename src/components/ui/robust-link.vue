<template>
  <component :is="component" :to="to" v-bind="$attrs" v-on="$listeners">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'robust-link',
  props: {
    to: {
      type: [Object, String],
      default: undefined
    },
    fallbackTag: {
      type: String,
      default: 'span'
    }
  },
  computed: {
    component() {
      return this.to ? 'router-link' : this.fallbackTag;
    }
  }
}
</script>