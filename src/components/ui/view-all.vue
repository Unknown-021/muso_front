<template>
  <plain-button
    component="router-link"
    variant="ghost"
    :to="to"
    v-bind="$attrs"
    v-on="$listeners"
  >
    View All
  </plain-button>
</template>

<script>
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';

export default {
  name: 'view-all-link',
  components: {
    PlainButton
  },
  props: {
    to: {
      type: [String, Object],
      required: true
    }
  }
}
</script>