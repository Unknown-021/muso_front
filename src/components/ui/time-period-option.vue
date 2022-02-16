<template>
  <div class="timep-option">
    <input
      type="radio"
      class="timep-option__input"
      :name="name"
      :value="option.value"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <label class="timep-option__label">{{ option.title }}</label>
  </div>
</template>

<script>
export default {
  name: 'time-period-option',
  inheritAttrs: false,
  props: {
    option: {
      type: Object,
      required: true
    },
    name: {
      type: [Number, String],
      required: true
    }
  }
}
</script>

<style lang="scss">
.timep-option {
  position: relative;
  display: inline-flex;
  cursor: pointer;
  &__input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  &__label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--overlay-3-color);
    transition-property: color;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
    @at-root {
      .timep-option__input:checked + & {
        color: var(--overlay-1-color);
      }
      .timep-option__input:hover + & {
        color: var(--overlay-1-color);
      }
    }
  }
}
</style>