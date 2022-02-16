<template>
  <form
    action=""
    class="search-input"
    :data-has-value="Boolean(innerValue)"
    @submit.prevent="handleSearch"
  >
    <input
      ref="input"
      type="search"
      :placeholder="placeholder"
      :value="innerValue"
      class="search-input__control"
      autocorrect="off"
      spellcheck="false"
      v-bind="$attrs"
      v-on="listeners"
    />
    <div class="search-input__search-btn" @click="focusInput" />
    <button class="search-input__reset-btn" type="reset" @click="reset" />
    <!-- We need dummy submit button in order to fire "submit" event when user press "search" button on keyboard -->
    <input type="submit" class="visually-hidden" />
  </form>
</template>

<script>
export default {
  name: 'base-search',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Search...'
    }
  },
  data() {
    return {
      innerValue: ''
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: (event) => {
          this.$emit('input-native', event);
          this.setValue(event.target.value);
        }
      };
    },
  },
  watch: {
    value:{
      immediate: true,
      handler(value) {
        this.innerValue = value;
      }
    }
  },
  methods: {
    setValue(value) {
      this.innerValue = value;
      this.$emit('input', value);
    },
    reset() {
      this.setValue('');
    },
    handleSearch() {
      this.$refs.input.blur();
    },
    focusInput() {
      this.$refs.input.focus();
    }
  }
}
</script>
