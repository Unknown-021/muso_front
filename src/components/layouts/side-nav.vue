<template>
  <nav class="side-nav">
    <ul class="side-nav__list">
      <template v-for="item in items">
        <side-nav-category :key="item.title" :category="item" />
      </template>
    </ul>
  </nav>
</template>

<script>
import SideNavCategory from './side-nav-category.vue';

export default {
  name: 'side-nav',
  components: {
    SideNavCategory
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.side-nav {
  max-width: 205px;
  padding: 15px;
  &__list {
    margin: 0;
    padding: 0;
  }
  &__category {
    display: flex;
    flex-direction: column;
    margin-bottom: 28px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__category-title {
    margin-bottom: 8px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #595857;
  }
  &__item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding-top: 6px;
    padding-bottom: 6px;
    font-size: 14px;
    color: #8F8F8F;
    &--active {
      &::before {
        content: "•";
        position: absolute;
        left: -12px;
        margin-top: -2px;
        font-size: 16px;
        color: #36B696;
      }
    }
  }
  &__link {
    flex-grow: 1;
    width: 0;
    text-underline-offset: 2px;
    @at-root .side-nav__item--active & {
      font-weight: 500;
      color: #F7F7F7;
      text-decoration: none;
    }
  }
  &__count {
    flex-shrink: 0;
    margin-left: 8px;
    font-size: 12px;
  }
  &__toggle-btn {
    align-self: flex-start;
    margin-top: 9px;
    color: #595857;
    --toggle-icon-color: #595857;
  }
}
</style>