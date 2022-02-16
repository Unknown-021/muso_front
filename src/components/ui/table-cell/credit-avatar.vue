<template>
  <base-icon class="" :name="credit" width="24" height="24" />
</template>

<script>
import BaseIcon from 'components/ui/base-icon/base-icon.vue';

export default {
  name: 'table-cell-credit-avatar',
  components: {
    BaseIcon
  },
  props: {
    credit: {
      type: String,
      required: true
    }
  },
};
</script>

<style lang="scss">
.song-cover-cell {
  display: block;
}
</style>
