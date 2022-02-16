<template>
  <button class="auth-button" type="button" v-bind="$attrs" v-on="$listeners">
    <img v-if="logoSrc" :src="logoSrc" class="auth-button__icon" width="20" height="20" />
    <slot />
  </button>
</template>

<script>
export default {
  name: 'auth-button-base',
  props: {
    logoSrc: {
      type: [String, Object],
      default: undefined
    }
  }
}
</script>

<style lang="scss">
.auth-button {
  display: flex;
  justify-content: center;
  position: relative;
  padding-top: 9px;
  padding-bottom: 8px;
  padding-left: 22px;
  padding-right: 22px;
  -webkit-appearance: none;
  border: none;
  border-radius: 1px;
  box-shadow: none;
  width: 100%;
  min-height: 38px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.3px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: opacity 150ms linear;
  color: #000;
  background-color: #FFF;
  &[disabled] {
    opacity: 0.8;
  }
  &__icon {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
  }
}
</style>