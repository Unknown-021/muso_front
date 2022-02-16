<template>
  <div :class="className" />
</template>

<script>
const names = ['accent-2', 'accent-3'];

export default {
  name: 'page-background',
  props: {
    name: {
      type: String,
      required: true,
      validator: value => names.includes(value)
    }
  },
  computed: {
    className() {
      return {
        'page-bg': true,
        [`page-bg--${this.name}`]: true
      };
    }
  }
}
</script>

<style lang="scss">
.page-bg {
  position: absolute;
  // top: -130px;
  left: 0;
  width: 100%;
  height: 212px;
  // filter: blur(250px);
  // opacity: 0.7;
  &--accent-2 {
    background-color: var(--accent-2-color);
  }
  &--accent-3 {
    background: linear-gradient(180deg, rgba(89, 88, 87, 0.25 ) 0%, rgba(89, 88, 87, 0) 100%);
    box-sizing: border-box;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
}
</style>