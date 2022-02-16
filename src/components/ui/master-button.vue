<template>
  <button class="master-btn" v-on="$listeners">
    <slot /><template v-if="value">: </template>
    <span v-if="value" class="master-btn__value">{{ value }}</span>
  </button>
</template>

<script>
export default {
  name: 'master-button',
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.master-btn {
  border: 0;
  border-radius: 4px;
  padding: 5px 5px;
  color: #8F8F8F;
  background-color: rgba(89, 88, 87, 0.3);
  transition-property: color, background-color;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  &:hover,
  &[data-active] {
    color: #CCCCCC;
    background-color: rgba(89, 88, 87, 0.5);
  }
  &__value {
    color: #F7F7F7;
  }
}
</style>