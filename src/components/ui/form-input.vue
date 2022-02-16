<template>
  <div
    class="form-input"
    :data-has-prefix="Boolean($slots.prefix)"
    :data-has-suffix="Boolean($slots.suffix)"
  >
    <div v-if="$slots.prefix" class="form-input__prefix">
      <slot name="prefix"></slot>
    </div>

    <input
      class="form-input__control"
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

    <div v-if="$slots.suffix" class="form-input__suffix">
      <slot name="suffix"></slot>
    </div>

    <template v-if="placeholder">
      <transition name="input-mini-placeholder-slide-down">
        <label class="form-input__placeholder-mini" v-if="targetValue" aria-hidden="true">{{ placeholder }}</label>
      </transition>
      <transition name="input-placeholder-slide-down">
        <label class="form-input__placeholder" v-if="!targetValue" aria-hidden="true">{{ placeholder }}</label>
      </transition>
    </template>
  </div>
</template>

<script>
export default {
  name: "form-input",
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      emitedValue: "",
    };
  },
  computed: {
    targetValue() {
      return this.value || this.emitedValue;
    }
  }
};
</script>

<style lang="scss">
@import "~assets/styles/utils/utils.abstract";

.form-input {
  --form-input-padding-top: 8px;
  position: relative;
  padding-top: var(--form-input-padding-top);
  font-family: Inter, sans-serif;
  font-size: 14px;
  line-height: 1.2;
  color: #f2f2f2;
  &__control {
    @include reset-outline;
    position: relative;
    z-index: 1;
    border: none;
    border-bottom: 1px solid rgba(39, 38, 37, 0.7);
    border-radius: 0;
    padding: 13px 0;
    width: 100%;
    background-color: transparent;
    &::placeholder {
      color: #595857;
    }
    &:focus {
      border-bottom-color: #f7f7f7;
    }
  }
  &[data-has-prefix] &__control {
    padding-left: 20px;
  }
  &__placeholder {
    pointer-events: none;
    display: flex;
    align-items: center;
    position: absolute;
    top: var(--form-input-padding-top);
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: left;
    text-align: start;
    color: #595857;
  }
  &[data-has-prefix] &__placeholder {
    left: 20px;
  }
  &__placeholder-mini {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 12px;
    text-align: left;
    text-align: start;
    color: #8F8F8F;
  }
  &__prefix,
  &__suffix {
    display: flex;
    align-items: center;
    position: absolute;
    z-index: 2;
    top: var(--form-input-padding-top);
    bottom: 0;
  }
  &__prefix {
    left: 0;
  }
  &__suffix {
    right: 0;
  }
}

.input-mini-placeholder-slide-down {
  &-enter-active,
  &-leave-active {
    transition: transform 200ms ease-in-out, opacity 200ms ease-in-out;
  }
  &-enter,
  &-leave-to {
    transform: translateY(-4px);
    opacity: 0;
  }
}

.input-placeholder-slide-down {
  &-enter-active,
  &-leave-active {
    transition: transform 200ms ease-in-out, opacity 200ms ease-in-out;
  }
  &-enter,
  &-leave-to {
    transform: translateY(6px);
    opacity: 0;
  }
}
</style>
