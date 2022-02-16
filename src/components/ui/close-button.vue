<template>
  <button class="close-btn zero-btn" @click="close">
    <cross-icon class="close-btn__icon" width="12" />
  </button>
</template>

<script>
import CrossIcon from 'assets/images/icons/cross-new.svg';

export default {
  name: 'close-button',
  components: {
    CrossIcon
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss">
.close-btn {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: -10px;
    right: -10px;
    left: -10px;
    bottom: -10px;
  }
  &__icon {
    width: 9px;
    height: 9px;
    fill: #8F8F8F;
    transition: fill 100ms;
    @at-root .close-btn:hover & {
      fill: #F7F7F7;
    }
  }
}
</style>