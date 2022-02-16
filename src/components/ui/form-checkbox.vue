<template>
  <div :class="[controlStyle === 'radio' ? 'radio' : 'checkbox']" :data-checked="isChecked">
    <input
      ref="checkbox"
      type="checkbox"
      :class="[ controlStyle === 'radio' ? 'radio__control' : 'checkbox__control' ]"
      :checked="isChecked"
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
    >
    <div v-if="controlStyle === 'radio'" class="radio__active" />
    <base-icon v-else class="checkbox__active" name="union"></base-icon>
  </div>
</template>

<script>
import { removeArrayElement } from 'helpers/array';
import BaseIcon from 'components/ui/base-icon/base-icon.vue';

export default {
  name: 'form-checkbox',
  inheritAttrs: false,
  components: {
    BaseIcon
  },
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    checked: {
      type: [Boolean, Array],
      default: undefined
    },
    controlStyle: {
      type: String,
      default: 'checkbox'
    }
  },
  data() {
    return {
      checkedValue: false
    };
  },
  watch: {
    checked: {
      immediate: true,
      handler(checked) {
        if (checked === undefined) return;
        this.checkedValue = checked;
      }
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        change: this.handleChange
      };
    },
    isChecked() {
      return Array.isArray(this.checkedValue)
        ? this.checkedValue.includes(this.value)
        : this.checkedValue;
    }
  },
  methods: {
    // public method
    toggle(checked = !this.isChecked) {
      const value = Array.isArray(this.checked)
        ? this.toggleArray(checked)
        : checked;

      if (this.checked === undefined) {
        this.checkedValue = value;
      } else if (this.$refs.checkbox) {
        this.$refs.checkbox.checked = this.isChecked;
      }

      this.$emit('change', value);
      this.$emit('native-change', event);
    },
    handleChange(event) {
      this.toggle(event.target.checked);
    },
    toggleArray(checked) {
      const newValue = [...this.checked];

      if (checked) {
        newValue.push(this.value);
      } else {
        removeArrayElement(newValue, this.value);
      }

      return newValue;
    }
  }
}
</script>

<style lang="scss">
.checkbox {
  width: 16px;
  height: 16px;
  position: relative;
  cursor: pointer;
  &__control,
  &__active {
    transition-property: border-color, transform, opacity;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
  }
  &__control {
    -webkit-appearance: none;
    appearance: none;
    border: 1px solid #595857;
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-color: transparent;
    &:checked {
      border-radius: 2px;
      border-color: #03C9A9;
      background: #03C9A9;
    }
    &:hover:not(:checked) {
      border-color: #797979;
    }
  }
  &__active {
    position: absolute;
    top: 4px;
    left: 2px;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 12px;
    height: 12px;
    transform: scale(0.85);
    opacity: 0;
    background-color: #03C9A9;
    pointer-events: none;
    @at-root .checkbox__control:checked + & {
      transform: scale(1);
      opacity: 1;
    }
  }
}
.checkbox-label {
  display: flex;
  align-items: center;
  &__text {
    margin-left: 10px;
    line-height: 1.2;
    user-select: none;
  }
}

.radio {
  width: 15px;
  height: 15px;
  position: relative;
  cursor: pointer;
  &__control,
  &__active {
    transition-property: border-color, transform, opacity;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
  }
  &__control {
    -webkit-appearance: none;
    appearance: none;
    border: 1px solid #595857;
    border-radius: 15px;
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-color: transparent;
    &:checked {
      border-color: #6BE7C8;
    }
    &:hover:not(:checked) {
      border-color: #797979;
    }
  }
  &__active {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 7px;
    width: 7px;
    height: 7px;
    transform: scale(0.55);
    opacity: 0;
    background-color: #6BE7C8;
    pointer-events: none;
    @at-root .radio__control:checked + & {
      transform: scale(1);
      opacity: 1;
    }
  }
}
</style>
