<template>
  <input
    :value="value"
    :style="style"
    v-bind="$attrs"
    v-on="{
      ...$listeners,
      input: handleInput
    }"
  />
</template>

<script>
import { calcTextWidth } from 'helpers/dom';

const MIN_WIDTH = 1; // px

export default {
  name: 'flex-input',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      width: MIN_WIDTH
    };
  },
  mounted() {
    this.computedStyle = window.getComputedStyle(this.$el);
  },
  watch: {
    async value() {
      const inputStyle = window.getComputedStyle(this.$el);
      const width = await calcTextWidth(this.value, inputStyle.font);
      this.setWidth(width);
    }
  },
  computed: {
    style() {
      return {
        width: this.width + 'px'
      };
    }
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value);
    },
    setWidth(width) {
      this.width = width || MIN_WIDTH;
      this.$emit('update:width');
    }
  }
}
</script>