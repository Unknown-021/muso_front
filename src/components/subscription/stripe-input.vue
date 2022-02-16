<template>
  <div class="stripe-input">
    <template v-if="placeholder">
      <label class="stripe-input__placeholder-mini" aria-hidden="true">{{ placeholder }}</label>
    </template>
    <input
      v-if="!isElement"
      class="stripe-input__control"
      v-bind="$attrs"
      :value="targetValue"
      v-on="{
        ...$listeners,
        input: event => {
          emitedValue = event.target.value;
          $emit('native-input', event);
          $emit('input', event.target.value);
        }
      }"
    />

    <div v-if="isElement" ref="elementRef" class="stripe-input__control">
      <!-- A Stripe Element will be inserted here. -->
    </div>
  </div>
</template>

<script>
import { stripeReady, createElement } from 'services/stripe';
import { transitionSafeDestroyed } from 'mixins/transition-safe-destroyed';

export default {
  name: 'stripe-input',
  mixins: [transitionSafeDestroyed],
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    element: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      emitedValue: '',
      el: null,
      isElement: false,
    };
  },
  async mounted() {
    if (this.element) {
      await stripeReady;
      this.isElement = true;
      this.el = await createElement(this.element);
      this.el.mount(this.$refs.elementRef);
      this.el.on('change', this.handleChange);
    }
  },
  removed() {
    this.el?.destroy();
  },
  methods: {
    handleChange(event) {
      this.$emit('change', event);
      if (event.complete) {
        this.$emit('error', false);
      } else if (event.error) {
        this.$emit('error', true);
      }
    }
  },
  computed: {
    targetValue() {
      return this.emitedValue;
    }
  },
};
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract";
@import "~assets/styles/utils/spacing.abstract";
@import "~assets/styles/utils/utils.abstract";

.stripe-input {
  font-size: 14px;
  line-height: 1.2;
  &__control {
    @include reset-outline;
    z-index: 1;
    border: none;
    border-bottom: 1px solid var(--border-color-2);
    border-radius: 0;
    padding: 9px 0 11px 0;
    width: 100%;
    font-size: 16px;
    background-color: transparent;
    @media #{$tablet} {
      font-size: 14px;
      padding-top: 8px;
      padding-bottom: 13px;
      border-bottom-color: var(--border-color-3);
    }
  }
  &__placeholder-mini {
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.3;
    text-align: left;
    text-align: start;
    color: var(--overlay-4-color);
    @media #{$tablet} {
      font-size: 12px;
      font-weight: normal;
      color: var(--overlay-3-color);
    }
  }
}
.mb-stripe-input {
  margin-bottom: 28px;
  @media #{$tablet} {
    margin-bottom: 23px;
  }
}
</style>
