<template>
  <div :class="['notify-dialog', `notify-dialog--${type}`]">
    <slot/>
  </div>
</template>

<script>
export const types = ['error', 'info', 'warning'];

export default {
  name: 'notify-dialog',
  props: {
    type: {
      type: String,
      validator: value => types.includes(value)
    },
    duration: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      timerId: null
    };
  },
  mounted() {
    this.timerId = setTimeout(() => {
      this.$emit("close");
    }, this.duration);
  },
  beforeDestroy() {
    clearTimeout(this.timerId);
  }
};
</script>

<style lang="scss">
.notify-dialog {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  padding: 16px 20px;
  width: 100%;
  min-height: 50px;
  font-family: Inter, sans-serif;
  font-size: 14px;
  text-align: center;
  color: #fff;
  background-color: #000;
  p {
    margin: 0;
  }
  &--error {
    color: #f7f7f7;
    background-color: #eb5757;
  }
  &--info {
    color: #000;
    background-color: #6be7c8;
  }
  &--warning {
    color: #000;
    background-color: #DBD053;
  }
}
</style>