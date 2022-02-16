<template>
  <div class="media" v-touch="directiveValue" v-on="$listeners">
    <slot />
  </div>
</template>

<script>
import { touch } from "directives/touch";

const touchDirectiveValue = {
  // We need to prevent adding of .touched CSS class to song row
  // when we interact with more dropdown component. Will fix this problem later on
  // when rendering of more dropdown will be moved outside application layout.
  ignore: ['[data-ignore-touch]']
};

export default {
  name: 'mtable-row',
  directives: {
    touch
  },
  computed: {
    directiveValue() {
      return touchDirectiveValue;
    }
  }
}
</script>
