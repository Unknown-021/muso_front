<template>
  <div class="num-picker">
    <icon-button
      icon="minus"
      size="small"
      aria-label="Decrease number"
      @click="stepDown"
    />
    <span class="num-picker__value-wrap mx-s">
      <span :class="valueClass">{{ value }}</span>
    </span>
    <icon-button
      icon="plus"
      size="small"
      aria-label="Increase number"
      @click="stepUp"
    />
  </div>
</template>

<script>
import BaseIcon from 'components/ui/base-icon/base-icon.vue';
import IconButton from 'components/ui/icon-button.vue';

export default {
  name: 'number-picker',
  components: {
    BaseIcon,
    IconButton
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: Number.NEGATIVE_INFINITY
    },
    max: {
      type: Number,
      default: Number.POSITIVE_INFINITY
    }
  },
  computed: {
    valueClass() {
      return {
        'num-picker__value': true,
        'num-picker__value--large': this.value > 9
      };
    }
  },
  methods: {
    setValue(value) {
      this.$emit('update:value', value);
    },
    stepUp() {
      this.setValue(Math.min(this.value + 1, this.max));
    },
    stepDown() {
      this.setValue(Math.max(this.value - 1, this.min));
    }
  }
}
</script>

<style lang="scss">
.num-picker {
  display: flex;
  align-items: center;
  &__value-wrap {
    position: relative;
    // We set fixed width in order to prevent content jump when user changes value
    width: 12px;
    height: 26px;
    font-size: 24px;
    color: var(--overlay-1-color);
  }
  &__value {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    &--large {
      font-size: 22px;
    }
  }
}
</style>