<template>
  <div class="search-menu-item">
    <div class="search-menu-item__inner">
      <span class="search-menu-item__title">
        <slot name="title" />
      </span>
      <span class="search-menu-item__text" v-html="highlighted" />
    </div>
    <span v-if="selected" class="search-menu-item__after">Selected</span>
  </div>
</template>

<script>
const identity = value => value;

export default {
  name: 'search-menu-item',
  props: {
    item: {
      type: Object,
      default: undefined
    },
    text: {
      type: String,
      default: ''
    },
    selected: {
      type: Boolean,
      default: false
    },
    focused: {
      type: Boolean,
      default: false
    },
    highlight: {
      type: Function,
      default: identity
    }
  },
  computed: {
    highlighted() {
      return this.highlight(this.text);
    }
  }
}
</script>

<style lang="scss">
.search-menu-item {
  display: flex;
  padding: 10px 15px;
  &__inner {
    display: flex;
    flex-direction: column;
    opacity: var(--search-menu-item-opacity, 1);
  }
  &__title {
    font-weight: 500;
    color: #8F8F8F;
  }
  &__text {
    color: #FFFFFF;
  }
  &__after {
    align-self: center;
    flex-shrink: 0;
    margin-left: auto;
    padding-left: 15px;
    font-size: 12px;
    color: #595857;
  }
}
</style>