<template>
  <input v-bind="$attrs" v-on="listeners" @input="handleInput" />
</template>

<script>
export default {
  name: 'masked-input',
  props: {
    accepts: {
      type: Array,
      default: () => [/./]
    },
    maxLength: {
      type: [Number, Function],
      default: Infinity
    }
  },
  computed: {
    listeners() {
      const { input, ...listeners } = this.$listeners;
      return listeners;
    }
  },
  methods: {
    handleInput(event) {
      const value = event.target.value;
      const formatted = format(value, this.accepts, this.maxLength);
      this.$el.value = formatted;
      this.$emit('input', formatted);
    }
  }
};

function format(value, accepts, maxLength) {
  const matched = [...value].filter(char => accepts.some(token => token.test(char)));
  const formatted = matched.join('');
  const max = typeof maxLength === 'function'
    ? maxLength(formatted)
    : maxLength;

  return formatted.slice(0, max);
};
</script>