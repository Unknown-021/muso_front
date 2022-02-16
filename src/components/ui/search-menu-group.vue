<template>
  <div v-if="group.items.length || group.empty" class="search-group">
    <h3 v-if="group.title" class="search-group__title">{{ group.title }}</h3>

    <template v-if="group.items.length">
      <div
        v-for="item in group.items"
        :key="item.id"
        :data-id="item.id"
        data-search-item
        :data-disabled="isItemSelected(item)"
        class="search-menu__item"
        @select="selectItem(item)"
        @click="selectItem(item)"
        @mouseenter="enterItem(item)"
        @mouseleave="resetHoveredItem"
      >
        <slot name="item" :item="item" :focused="isItemFocused(item)" :selected="isItemSelected(item)" />
      </div>
    </template>
    <p v-else class="search-group__empty">
      <template v-if="typeof group.empty === 'string'">{{ group.empty }}</template>
      <component v-else :is="group.empty" />
    </p>
  </div>
</template>

<script>
export default {
  name: 'search-menu-group',
  inject: {
    searchMenu: {
      type: Object,
      required: true
    }
  },
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      hoveredItem: null
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('item-select', item);
    },
    isItemFocused(item) {
      return this.searchMenu.isItemFocused(item) || this.hoveredItem === item;
    },
    isItemSelected(item) {
      return this.searchMenu.isItemSelected(item);
    },
    enterItem(item) {
      this.hoveredItem = item;
    },
    resetHoveredItem() {
      this.hoveredItem = null;
    }
  }
}
</script>

<style lang="scss">
.search-group {
  padding-top: 5px;
  padding-bottom: 5px;
  &__title {
    margin-bottom: 11px;
    padding-left: var(--menu-padding-x);
    padding-right: var(--menu-padding-x);
    font-size: 14px;
    font-weight: normal;
    color: #8F8F8F;
  }
  &:first-child .search-group__title {
    margin-top: 5px;
  }
  &__empty {
    margin-bottom: 5px;
    padding-left: var(--menu-padding-x);
    padding-right: var(--menu-padding-x);
    font-size: 12px;
    line-height: 1.3;
    text-align: left;
    color: #CCCCCC;
  }
}
</style>