<template>
  <nav class="header-nav">
    <template v-for="item in items">
      <component :key="item.text" :is="itemComponent(item)" v-bind="itemProps(item)" class="nav-link w-inline-block">
        {{ item.text }}
      </component>
    </template>
    <slot />
  </nav>
</template>

<script>

export default {
  name: 'header-nav',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    itemComponent(item) {
      return item.to ? 'router-link' : 'a';
    },
    itemProps({ text, ...item }) {
      return item;
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/utils/breakpoints.abstract.scss";

.header-nav {
  align-self: center;
  display: inline-flex;
  align-items: center;
  --header-nav-gap: 15px;
  margin-right: calc(-1 * var(--header-nav-gap));
  > * {
    margin-right: var(--header-nav-gap);
  }
  @media #{$before-phone} {
    font-size: 13px;
  }
  @media (min-width: 1200px) {
    --header-nav-gap: 25px;
  }
}
</style>