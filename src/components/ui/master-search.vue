<template>
  <form
    action=""
    class="master-search"
    @submit.prevent="handleSearch"
  >
    <span class="master-search__search-btn">
      <img width="16" src="data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='%23CCC' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.02 3.271a5.479 5.479 0 11-7.748 7.749A5.479 5.479 0 0111.02 3.27zm1.047 8.088a6.48 6.48 0 10-.966.92l3.032 3.032.943-.943-3.009-3.009z' /%3E%3C/svg%3E" aria-hidden="true" />
    </span>
    <input
      ref="input"
      type="search"
      :placeholder="placeholder"
      :value="innerValue"
      class="master-search__control"
      autocorrect="off"
      spellcheck="false"
      v-bind="$attrs"
      v-on="listeners"
    />

    <transition name="fade-fast" mode="out-in">
      <reset-button  v-if="innerValue"  type="reset" aria-label="Clear search" @click="reset" class="master-search__reset-btn" />
    </transition>
    <!-- We need dummy submit button in order to fire "submit" event when user press "search" button on keyboard -->
    <input type="submit" class="visually-hidden" />
  </form>
</template>

<script>
import SearchIcon from 'assets/images/icons/search-new.svg';
import CrossIcon from 'assets/images/icons/cross-new.svg';
import { debounce } from 'helpers/utils';
import ResetButton from 'components/ui/reset-button.vue';

const DEFAULT_DEBOUNCE = 500;

export default {
  name: 'master-search',
  inheritAttrs: false,
  components: {
    SearchIcon,
    CrossIcon,
    ResetButton
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Search...'
    },
    debounce: {
      type: [Number, Boolean],
      default: false
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
        input: this.debouncedInput
      };
    },
    debouncedInput() {
      return debounce(this.handleInput, this.debounce ? this.debounceTimeout : 0)
    },
    debounceTimeout() {
      return this.debounce === true ? DEFAULT_DEBOUNCE : this.debounce;
    }
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
    handleInput(event) {
      this.setValue(event.target.value);
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract";
@import "~assets/styles/utils/utils.abstract";

.master-search {
  position: relative;
  width: 100%;
  max-width: 280px;
  border-radius: 2px;
  &__control {
    @include reset-outline;
    border: 0;
    padding: 7px 25px;
    padding-bottom: 8px;
    padding-left: 31px;
    width: 100%;
    height: 29px;
    font-size: 16px;
    caret-color: #4CC2A5;
    color: #F7F7F7;
    background-color: var(--base-3-color);
    border-width: 1px;
    border-style: solid;
    border-color: var(--search-input-border-color, transparent);
    transition: border-color 150ms ease-in-out;
    @media #{$tablet} {
      border-radius: 2px;
      padding-left: 35px;
      height: 32px;
      font-size: 14px;
    }
    &::placeholder {
      color: var(--overlay-2-color);
    }
    &:hover,
    &:focus {
      border-color: var(--overlay-3-color);
    }
  }
  &__search-btn {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    height: 100%;
    border: 0;
    border-radius: 0;
    background-color: transparent;
  }
  &__search-btn {
    pointer-events: none;
    left: 0;
    padding: 0 8px;
    @media #{$tablet} {
      padding: 0 8px;
    }
  }
  &__reset-icon {
    fill: #948080;
  }
  &__reset-btn {
    right: 8px;
    top: 0;
    bottom: 0;
    position: absolute;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    margin-bottom: auto;
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
