<template>
  <!-- "action" attribute is required if we want blue "search" button to appear on the keyboard -->
  <form action="" :class="cssClass" @click="showIfCan" @submit.prevent="handleSearch">
    <span class="expand-search__fake-placeholder" aria-hidden>
      {{ placeholder }}
    </span>
    <div ref="expandableArea" class="expand-search__expandable-area" :style="innerStyle">
      <div class="expand-search__control-wrap">
        <!--
          We need this fake input in order to make keyboard to appear on iOS,
          because input.focus() method has no effect if we call it inside setTimeout
        -->
        <input type="search" ref="fakeInput" class="expand-search__fake-input" />
        <input
          ref="input"
          type="search"
          :value="innerValue"
          :placeholder="placeholder"
          class="search-input__control expand-search__control"
          autocorrect="off"
          spellcheck="false"
          v-bind="$attrs"
          v-on="listeners"
          @input="handleInput"
          @blur="handleBlur"
        />
        <button class="search-input__search-btn" type="button" />
        <button class="search-input__reset-btn search-input__reset-btn--shown" type="reset" @click="reset" />
        <!-- We need dummy submit button in order to fire "submit" event when user press "search" button on keyboard -->
        <input type="submit" class="visually-hidden" />
      </div>
    </div>
  </form>
</template>

<script>
import { onTransitionFinished } from 'helpers/dom';
import { isServer } from 'helpers/constants';
import { onWindowResize } from 'helpers/vue';
import { isParentElementInteractive } from 'helpers/dom';

export default {
  name: 'base-expandable-search',
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
      isShown: false,
      isMobile: false,
      fullpageWidth: null,
      innerValue: ''
    }
  },
  computed: {
    cssClass() {
      return {
        'search-input': true,
        'expand-search': true,
        'expand-search--shown': this.isShown
      };
    },
    listeners() {
      const { input, ...listeners } = this.$listeners;
      return listeners;
    },
    innerStyle() {
      if (this.fullpageWidth) {
        return `--input-fullpage-width: ${this.fullpageWidth}px`;
      }
    }
  },
  mounted() {
    onWindowResize(this, this.calcExpandableAreaWidthIfNeeded, { throttle: 50 });
    this.$syncMediaWithComponent(this.$mediaQueries.PHONE, 'isMobile');

    if (this.isShown) {
      this.calcExpandableAreaWidthIfNeeded();
    }
  },
  watch: {
    value:{
      immediate: true,
      handler(value) {
        this.innerValue = value;
        if (value && !this.isShown) {
          this.show();
        }
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
      this.hide();
    },
    hide() {
      this.isShown = false;
      this.$refs.input.blur();
    },
    show() {
      if (this.isShown) return;

      this.isShown = true;
      if (isServer) return;

      this.calcExpandableAreaWidthIfNeeded();
      this.focusInputAfterTransition();
    },
    showIfCan(event) {
      if (!isParentElementInteractive(event.target)) {
        this.show();
      }
    },
    calcExpandableAreaWidthIfNeeded() {
      if (this.isMobile) {
        const coords = this.$el.getBoundingClientRect();
        const parentEl = this.$el.closest('[data-expand-parent]') || this.$el.parentElement;
        const parentCoords = parentEl.getBoundingClientRect();
  
        this.fullpageWidth = (coords.left - parentCoords.left) + coords.width;
      }
    },
    handleSearch() {
      this.$refs.input.blur();
    },
    handleInput(event) {
      this.$emit('input-native', event);
      this.setValue(event.target.value);
    },
    handleBlur({ relatedTarget }) {
      if (this.$el.contains(relatedTarget)) return;
      if (this.isMobile || this.innerValue) return;
      this.isShown = false;
    },
    focusInputAfterTransition() {
      const { expandableArea, fakeInput, input } = this.$refs;
      if (!expandableArea || !fakeInput || !input) return;

      if (isIOS()) {
        fakeInput.focus();
      }
      onTransitionFinished(expandableArea, () => {
        input.focus()
      });
    }
  }
}

function isIOS() {
  return /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
}
</script>

<style lang="scss">
:root {
  --expand-search-width: 86px;
  --expand-search-active-width: 215px;
}
.expand-search {
  @media (max-width: 767px) {
    --expand-search-width: 32px
  }
  .search-input__search-btn {
    @media (max-width: 767px) {
      left: 0;
    }
  }
  &__expandable-area {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    min-width: 215px;
    width: var(--input-fullpage-width);
    @media (min-width: 768px) {
      width: var(--expand-search-active-width);
    }
    @at-root .expand-search--shown & {
      pointer-events: auto;
    }
  }
  &__control-wrap {
    position: relative;
    height: 100%;
    transform: translateX(calc(100% - var(--expand-search-width)));
    transition: transform var(--search-input-transition-duration) var(--search-input-transition-timing-function);
    @media (max-width: 767px) {
      --expand-search-width: 32px;
    }
    @at-root .expand-search--shown & {
      transform: translateX(0);
    }
  }
  &__control {
    &:focus {
      border-bottom-color: transparent;
    }
    @at-root .expand-search--shown & {
      @media (max-width: 767px) {
        border-radius: 5px;
        background-color: #21201F;
      }
      @media (min-width: 768px) {
        border-bottom-color: #272625;
      }
    }
  }
  &__fake-placeholder {
    font-size: 14px;
    @media (max-width: 767px) {
      display: none;
    }
    @media (min-width: 768px) {
      position: relative;
      display: flex;
      align-items: center;
      opacity: 0;
      padding-right: 5px;
      padding-left: 24px;
    }
  }
  &__fake-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    font-size: 0;
    border: 0;
    pointer-events: none;
    caret-color: #4CC2A5;
  }
}
</style>