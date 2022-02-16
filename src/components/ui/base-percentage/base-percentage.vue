<template>
  <span :class="className">{{ $number(formatted) }}%</span>
</template>

<script>
export default {
  name: 'base-percentage',
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    className() {
      return {
        'pct': true,
        [`pct--neg`]: this.isNegative,
        [`pct--pos`]: this.isPositive,
      };
    },
    isNegative() {
      return this.value < 0;
    },
    isPositive() {
      return this.value > 0;
    },
    formatted() {
      const truncated = Math.trunc(this.value);
      return truncated === this.value ? this.value : this.value.toFixed(1);
    }
  }
}
</script>

<style lang="scss">
:root {
  --pct-font-weight: 500;
}
.pct {
  font-weight: var(--pct-font-weight);
  line-height: 1.2;
  color: var(--overlay-3-color);
  &--neg {
    color: var(--error-color);
    &::before {
      content: "";
    }
  }
  &--pos {
    color: var(--primary-color);
    &::before {
      content: "+";
    }
  }
}
</style>
