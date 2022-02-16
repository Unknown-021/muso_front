<template>
  <base-menu class="search-menu" :data-has-buttons="Boolean($slots.buttons)">
    <div v-if="showSearch" class="search-menu__top-panel" >
      <div class="search-menu__tags tags-list">
        <template v-for="item in selectedItems">
          <base-tag :key="item.id" :removable="true" @remove="unselectItem(item)">
            <slot name="selected-item" :item="item" />
          </base-tag>
        </template>

        <input
          ref="input"
          type="text"
          :value="value"
          class="search-menu__input"
          :placeholder="inputPlaceholder"
          @input="handleInput"
          @keydown.down="focusNextListItem"
          @keydown.up="focusPrevListItem"
          @keydown.enter="selectFocusedItem"
          @blur="resetListFocus"
        />
      </div>
    </div>

    <div class="search-menu__list-wrap">
      <transition name="fade-fast">
        <div v-if="loading" class="search-menu__loader-wrap">
          <base-loader class="search-menu__loader" />
        </div>
      </transition>
      <div class="search-menu__list">
        <template v-if="someGroupHasItems">
          <search-menu-group
            v-for="group in list"
            :key="group.id"
            :group="group"
            @item-select="handleSelect"
          >
            <template #item="props">
              <slot name="item" v-bind="props" :highlight="highlight" />
            </template>
          </search-menu-group>
        </template>
        <template v-else>
          <div class="search-menu__content">
            <template v-if="dataState === 'zero'">
              <p>
                <slot name="search-placeholder">Type to start search</slot>  
              </p>
            </template>
            <template v-else-if="dataState === 'empty'">
              <p>Oops, no results found. Try something else.</p>
            </template>
          </div>
        </template>
      </div>
    </div>

    <div v-if="$slots.buttons" class="search-menu__buttons">
      <slot name="buttons" />
    </div>
  </base-menu>
</template>

<script>
import BaseMenu from 'components/ui/base-menu/base-menu.vue';
import BaseTag from 'components/ui/base-tag/base-tag.vue';
import BaseLoader from 'components/ui/loader.vue';
import { arrayFlat, removeArrayElementById } from 'helpers/array';
import { createIdsMap } from 'helpers/object';
import { ListFocus } from 'helpers/list-focus';
import SearchIcon from 'assets/images/icons/search-3.svg';
import SadSmileIcon from 'assets/images/zero-state/sad-smile.svg';
import SearchMenuGroup from './search-menu-group.vue';

export default {
  name: 'search-menu',
  components: {
    BaseTag,
    BaseMenu,
    BaseLoader,
    SearchIcon,
    SadSmileIcon,
    SearchMenuGroup
  },
  provide() {
    return {
      searchMenu: this
    };
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      required: true
    },
    selectedItems: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Search...'
    },
    showSearch: {
      type: Boolean,
      default: true
    }
  },
  inject: {
    dropdownTrigger: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      dataState: this.getDataState(),
      focusedItem: null,
      listFocus: new ListFocus({
        getItems: () => this.$el.querySelectorAll('[data-search-item]')
      })
    };
  },
  created() {
    this.focusInputIfCan();
  },
  watch: {
    list() {
      this.dataState = this.getDataState();
      if (this.dropdownTrigger) {
        this.dropdownTrigger.update();
      }
      this.resetListFocus();
    },
    listFocusIndex() {
      this.listFocus.scrollToFocusedElement();
    },
    selectedItems() {
      if (this.dropdownTrigger) {
        this.dropdownTrigger.update();
      }
    },
    focusedEl(el) {
      const itemId = el?.dataset.id;
      this.focusedItem = this.itemsMap[itemId] || null;
    }
  },
  computed: {
    inputPlaceholder() {
      return this.selectedItems.length ? undefined : this.placeholder;
    },
    someGroupHasItems() {
      return this.list.some(group => group.items.length || group.empty)
    },
    selectedItemsMap() {
      return createIdsMap(this.selectedItems);
    },
    items() {
      return arrayFlat(this.list.map(listItem => listItem.items));
    },
    itemsMap() {
      return createIdsMap(this.items);
    },
    isListItemsCanBeFocused() {
      return (!this.loading && this.someGroupHasItems);
    },
    listFocusIndex() {
      return this.listFocus.index;
    },
    focusedEl() {
      return this.listFocus.focusedItem;
    },
    highlight() {
      if (!this.value) {
        return val => val;
      }
      const regexp = new RegExp(this.value, 'ig');
      return (val = '') => val.replace(regexp, '<span class="semi-bold">$&</span>');
    }
  },
  methods: {
    // We have to handle 'empty' and 'zero' states of data exactly in this way,
    // otherwise we will have bad UX for cases when we fetch "list" prop from the server.
    // Bad UX means that some state can be displayed when it's should not.
    // Old way of handling different states was:
    // v-if="!value" for 'zero' state
    // v-else for 'empty' state
    // This approach worked fine when there are no async actions like request to the server.
    getDataState() {
      return this.value ? 'empty' : 'zero';
    },
    handleSelect(item) {
      this.$emit('item-select', item);
      this.focusInput();
    },
    handleInput(event) {
      const value = event.target.value;
      this.$emit('input', value);
    },
    resetListFocus() {
      this.listFocus.reset();
    },
    // public method
    isItemSelected(item) {
      return item.id in this.selectedItemsMap;
    },
    // public method
    isItemFocused(item) {
      return this.focusedItem === item;
    },
    selectFocusedItem() {
      if (this.listFocus.index === -1) return;
      const focusedItemEl = this.listFocus.focusedItem;
      if (focusedItemEl) {
        focusedItemEl.dispatchEvent(new CustomEvent('select'));
      }
    },
    unselectItem(item) {
      const selectedItems = [...this.selectedItems];
      removeArrayElementById(selectedItems, item.id);
      this.$emit('update:selected-items', selectedItems);
    },
    focusNextListItem() {
      if (!this.isListItemsCanBeFocused) return;
      this.listFocus.next();
    },
    focusPrevListItem() {
      if (!this.isListItemsCanBeFocused) return;
      this.listFocus.prev();
    },
    // Unfortunately, we cannot use v-focus directive, because it causes
    // sometimes content glitches in chrome and firefox
    focusInputIfCan() {
      if (this.dropdownTrigger) {
        this.dropdownTrigger.$on('after-enter', this.focusInput);
      } else {
        this.$nextTick(this.focusInput);
      }
    },
    focusInput() {
      const { input } = this.$refs;
      if (input) {
        input.focus();
      }
    }
  }
}
</script>

<style lang="scss">
.tags-list {
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  margin-right: -5px;
  margin-bottom: -5px;
  > * {
    margin-right: 5px;
    margin-bottom: 5px;
  }
}

:root {
  --search-menu-width: 330px;
  --search-menu-background-color: rgb(33, 32, 31);
}

.search-menu {
  padding: 0;
  width: var(--search-menu-width);
  background-color: var(--search-menu-background-color);
  &__top-panel {
    display: flex;
    flex-wrap: wrap;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 8px 15px;
    min-height: 40px;
    color: #F7F7F7;
    background-color: rgb(39, 38, 37);
  }
  &__input {
    border: 0;
    flex-grow: 1;
    width: 0;
    min-width: 100px;
    box-shadow: none;
    padding: 3px 0;
    font: inherit;
    background-color: transparent;
  }
  &__list-wrap {
    position: relative;
  }
  &__list {
    flex-basis: 0;
    flex-grow: 1;
    border-radius: var(--menu-border-radius);
    padding-top: 5px;
    padding-bottom: 5px;
    max-height: var(--search-menu-list-max-width, 260px);
    overflow: auto;
  }
  &__item {
    --background-color: var(--search-menu-item-background-color, transparent);
    background-color: var(--background-color);
    &[data-focused] {
      --user-avatar-icon-background-color: var(--background-color);
      --search-menu-item-background-color: rgba(27, 26, 25);
    }
    &:hover {
      cursor: pointer;
      --search-menu-item-background-color: #151413;
      --user-avatar-icon-background-color: var(--background-color);
    }
    &[data-disabled] {
      pointer-events: none;
      --search-menu-item-opacity: 0.6;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 11px var(--menu-padding-x);
    text-align: left;
    color: #595857;
    @at-root {
      .search-menu[data-has-buttons] & {
        min-height: 55px;
      }
    }
  }
  &__buttons {
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid rgba(89, 88, 87, 0.4);
    padding: 15px;
    > * {
      margin-right: 13px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &__loader-wrap {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    border-radius: var(--menu-border-radius);
    background-color: rgba(33, 32, 31, 0.81);
  }
  &__loader {
    transform: scale(0.8);
  }
}
</style>