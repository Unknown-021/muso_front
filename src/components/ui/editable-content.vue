<template>
  <!-- IMPORTANT: don't user $slots in computed properties, because $slots property isn't reactive  -->
  <div
    class="editable"
    :data-inputable="!$slots.default"
    :data-prevent-hover="isPreventHover"
    :data-loading="isLoading"
    :data-focus="isFocused"
    :data-invalid="invalid"
    :data-disabled="!enabled"
    :data-empty="!isValueDefined && !this.$slots.default"
    @click="focusContent"
    @mouseenter="restoreHover"
  >
    <template v-if="!$slots.default && isInputReady && enabled">
      <component
        :is="component"
        ref="input"
        class="editable__input"
        :class="contentClass"
        :value="innerValue"
        :style="inputStyle"
        :placeholder="placeholder"
        spellcheck="false"
        v-bind="$attrs"
        v-on="listeners"
        @keydown.enter.prevent="unfocus"
        @keydown.esc="handleEscape"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @change="handleChange"
      />
    </template>
    <template v-else>
      <span
        :class="contentClass"
        class="editable__content"
        :data-placeholder="placeholder"
      ><slot>{{ value }}</slot></span>
    </template>

    <!-- Don't do v-if="$slots.after" to optimize this part of code, since there is weird bug which causes this slot not to be displayed -->
    <span v-if="$slots.after" class="editable__after">
      <slot name="after" />
    </span>
  </div>
</template>

<script>
import { calcTextWidth } from 'helpers/dom';

function domEl(el) {
  return el ? el.$el || el : null;
}

export default {
  name: 'editable-content-base',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    enabled: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    invalid: {
      type: Boolean,
      default: false
    },
    save: {
      type: Function,
      default: undefined
    },
    contentClass: {
      type: [Object, String],
      default: undefined
    },
    component: {
      type: [String, Object],
      default: 'input'
    }
  },
  data() {
    return {
      isFocused: false,
      isLoading: false,
      isPreventHover: false,
      needToRestoreValue: false,
      textWidth: NaN,
      innerValue: this.value
    };
  },
  mounted() {
    if (!this.$slots.default) {
      this.$nextTick(this.calcInputWidth);
    }
  },
  watch: {
    value(value) {
      this.innerValue = value;
    },
    innerValue() {
      this.calcInputWidth();
    }
  },
  computed: {
    isValueDefined() {
      return Boolean(this.innerValue) || this.innerValue === 0;
    },
    isInputReady() {
      return !isNaN(this.textWidth);
    },
    inputStyle() {
      return this.isInputReady ? { width: this.textWidth + 'px' } : undefined;
    },
    listeners() {
      const { input, change, ...rest } = this.$listeners;
      return rest;
    }
  },
  methods: {
    unfocus(event) {
      event.target.blur();
      this.isPreventHover = true;
    },
    getInput() {
      return domEl(this.$refs.input);
    },
    focusContent() {
      const inputEl = this.getInput();
      if (inputEl) {
        inputEl.focus();
      }
    },
    handleEscape(event) {
      if (this.value !== this.innerValue) {
        // we change input value on DOM element to prevent fire of 'change' event
        this.innerValue = this.getInput().value = this.value;
      }
      this.unfocus(event);
    },
    handleInput(event) {
      const value = typeof event === 'object' ? event.target.value : event;
      this.innerValue = value;
      this.$emit('input', value);
    },
    handleChange(event) {
      const value = typeof event === 'object' ? event.target.value : event;
      this.$emit('change', value);
      this.saveIfCan();
    },
    handleFocus() {
      this.isFocused = true;
      this.restoreHover();
    },
    restoreHover() {
      this.isPreventHover = false;
    },
    handleBlur() {
      this.isFocused = false;
    },
    async calcInputWidth() {
      const inputStyle = window.getComputedStyle(this.$el);
      const text = (this.isValueDefined) ? this.innerValue : this.placeholder;
      this.textWidth = text ?
        await calcTextWidth(text, inputStyle.font) + 1
        : 0;
    },
    async saveIfCan() {
      if (!this.save) return;

      try {
        this.isLoading = true;
        await this.save(this.innerValue);
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style lang="scss">
:root {
  --editable-content-color: inherit;
  --editable-placeholder-color: #595857;
  --editable-padding-x: 0.1em;
  --editable-padding-y: 0.1em;
  --editable-min-width: auto;
}

.editable {
  position: relative;
  display: inline-flex;
  display: inline-flex;
  border: 1px solid transparent;
  border-radius: 2px;
  // We don't border width to have impact on layout, that's we subtract here 1px
  margin: calc(-1 * var(--editable-padding-y) - 1px) calc(-1 * var(--editable-padding-x) - 1px);
  padding: var(--editable-padding-y) var(--editable-padding-x);
  box-sizing: content-box;
  transition:
    border-color 150ms ease-in-out,
    opacity 500ms;
  &[data-inputable] {
    max-width: 100%;
  }
  &:not([data-inputable]) {
    cursor: pointer;
  }
  &[data-loading] {
    opacity: 0.4;
  }
  &[data-focus],
  &[data-editable-hovered],
  &:hover {
    border-color: #595857;
  }
  &[data-prevent-hover] {
    border-color: transparent;
  }
  &[data-invalid] {
    border-color: #FF3B30;
    border-color: rgb(188, 51, 43);
  }
  &[data-disabled] {
    border-color: transparent;
  }
  &__input {
    border: 0;
    padding: 0;
    max-width: 100%;
    width: 100%;
    min-width: var(--editable-min-width);
    color: var(--editable-content-color);
    font: inherit;
    background-color: transparent;
    &:focus {
      min-width: 2px;
    }
    &::placeholder {
      color: var(--editable-placeholder-color);
    }
  }
  &__content {
    display: inline-flex;
    color: var(--editable-content-color);
    &[data-placeholder]:empty::before {
      content: attr(data-placeholder);
      color: var(--editable-placeholder-color);
    }
  }
  &__after {
    display: inline-flex;
    &:empty {
      display: none;
    }
    @at-root {
      .editable:not([data-empty]) & {
        margin-left: 2px;
      }
    }
  }
}
</style>