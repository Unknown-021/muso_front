<template>
  <button class="gicon-btn" type="button" v-bind="$attrs" v-on="$listeners">
    <base-icon :name="icon" />
  </button>
</template>

<script>
import BaseIcon from 'components/ui/base-icon/base-icon.vue';

export default {
  name: 'icon-button',
  components: {
    BaseIcon
  },
  props: {
    icon: {
      name: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract";

.gicon-btn {
  display: inline-flex;
  padding: 0;
  width: 24px;
  height: 24px;
  border: 0;
  background: transparent;
  svg {
    width: 100%;
    height: 100%;
  }
}
</style>