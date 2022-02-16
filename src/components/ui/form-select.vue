<template>
  <form-select-trigger
    ref="trigger"
    :visible="isDropdownOpen"
    @update:visible="toggleSelect"
  >
    <div
      class="select"
      :aria-expanded="String(isDropdownOpen)"
      :data-inputable="searchable"
      :data-taggable="isTaggable"
      :data-has-value="Boolean(selectedOptions.length)"
    >
      <div class="form-control select__control" @click="handleSelectClick">
        <div class="tags-list">
          <flex-input
            v-if="searchable"
            ref="input"
            v-model="searchQuery"
            class="select__input"
            @focus="openDropdown"
            @keydown.tab="closeDropdownIfFocusMoved($event, 'backward')"
            @keydown.down="focusNextListItem"
            @keydown.up="focusPrevListItem"
            @keydown.enter="selectFocusedItem"
            @update:width="updateTrigger"
          />

          <template v-if="selectedOptions.length && isTaggable">
            <template v-for="option in selectedOptions">
              <base-tag :key="option.value" class="select__tag" removable @remove="removeOption(option)">
                <span class="ellipsis">{{ option.title }}</span>
              </base-tag>
            </template>
          </template>

          <template v-if="!searchQuery && singleOption">
            <span class="select__value ellipsis">{{ singleOption.title }}</span>
          </template>
        </div>
      </div>
      <button
        class="select__btn"
        @click="toggleSelect()"
        @keydown.tab="closeDropdownIfFocusMoved($event, 'forward')"
      >
        <arrow-down-icon class="select__arrow" />
      </button>
    </div>

    <template #dropdown>
      <form-select-dropdown ref="dropdown" :data-taggable="isTaggable">
        <template v-if="filteredOptions.length">
          <template v-for="option in filteredOptions">
            <slot :option="option">
              <form-option :option="option" />
            </slot>
          </template>
        </template>
        <template v-else>
          <menu-empty>No results found</menu-empty>
        </template>
      </form-select-dropdown>
    </template>
  </form-select-trigger>
</template>

<script>
import FormSelectTrigger from './form-select-trigger.vue';
import FormSelectDropdown from './form-select-dropdown.vue';
import FormOption from './form-option.vue';
import BaseMenu, { MenuEmpty } from 'components/ui/base-menu/base-menu.vue';
import ArrowDownIcon from 'assets/images/icons/arrow-down-new.svg';
import BaseTag from 'components/ui/base-tag/base-tag.vue';
import FlexInput from './flex-input.vue';
import { ListFocus } from 'helpers/list-focus';
import { isParentElementInteractive } from 'helpers/dom';

const types = ['taggable', 'single-taggable', 'single'];

export { FormOption };

export default {
  name: 'form-select',
  inheritAttrs: false,
  components: {
    FormSelectTrigger,
    FormSelectDropdown,
    FormOption,
    BaseMenu,
    MenuEmpty,
    BaseTag,
    FlexInput,
    ArrowDownIcon
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  provide() {
    return {
      formSelectNode: this
    };
  },
  props: {
    value: {
      type: [String, Array],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'single',
      validator: value => types.includes(value)
    },
    searchable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isDropdownOpen: false,
      searchQuery: '',
      listFocus: new ListFocus({
        getItems: () => this.$refs.dropdown.$el.querySelectorAll('.menu-item')
      })
    };
  },
  watch: {
    value() {
      if (this.isDropdownOpen) {
        this.updateTrigger();
      }
    },
    searchQuery() {
      if (this.isDropdownOpen) {
        // We have to use $nextTick two times, because dropdown trigger component
        // updates its slots.
        this.$nextTick(() => this.$nextTick(this.updateFocus));
      }
    }
  },
  computed: {
    valueModel() {
      return toArray(this.value);
    },
    // public
    isTaggable() {
      return this.type === 'taggable' || this.type === 'single-taggable';
    },
    valueSet() {
      return new Set(this.valueModel);
    },
    searchRexExp() {
      return new RegExp(this.searchQuery, 'i');
    },
    filteredOptions() {
      return this.searchQuery
        ? this.options.filter(item => item.title.match(this.searchRexExp))
        : this.options;
    },
    selectedOptions() {
      return this.valueModel
        .map(value => this.options.find(item => item.value === value))
        .filter(item => item);
    },
    singleOption() {
      const [firstOption] = this.selectedOptions;
      return firstOption
        ? this.isTaggable ? undefined : firstOption
        : this.defaultOption;
    },
    defaultOption() {
      return {
        value: '',
        title: this.type === 'taggable' ? 'Select option(s)' : 'Select option'
      };
    }
  },
  methods: {
    selectFocusedItem() {
      const { focusedItem } = this.listFocus;
      if (focusedItem) {
        focusedItem.dispatchEvent(new CustomEvent('select'));
      }
    },
    focusNextListItem() {
      this.listFocus.next();
    },
    focusPrevListItem() {
      this.listFocus.prev();
    },
    updateFocus() {
      this.listFocus.reset();
      this.focusNextListItem();
    },

    selectOption(option) {
      const values = this.type === 'taggable'
        ? this.toggleValue(option.value)
        : option.value;

      this.toggleSelect({ isOpen: this.type === 'taggable' });
      this.$emit('change', values);
    },
    removeOption(option) {
      const values = (this.type === 'taggable')
        ? this.removeValue(option.value)
        : '';

      this.$emit('change', values);
    },
    toggleValue(value) {
      const newValueModel = this.removeValue(value);
      const isValueRemoved = (newValueModel.length !== this.valueModel.length);
      if (!isValueRemoved) {
        newValueModel.push(value);
      }

      return newValueModel;
    },
    removeValue(value) {
      return this.valueModel.filter(curValue => curValue !== value);
    },
    isSelected(value) {
      return this.valueSet.has(value);
    },

    toggleSelect({ isOpen = !this.isDropdownOpen, clearInput = true } = {}) {
      this.isDropdownOpen = isOpen;
      this.setInputFocus(this.isDropdownOpen);
      if (clearInput) {
        this.searchQuery = '';
      }
    },
    handleSelectClick({ target }) {
      const isInteractive = isParentElementInteractive(target);
      const isOpen = this.isDropdownOpen
        ? isInteractive
        : !isInteractive;
      
      this.toggleSelect({
        isOpen,
        clearInput: false
      });
    },
    setInputFocus(value) {
      const input = this.$refs.input?.$el;
      const focusAction = value ? 'focus' : 'blur';
      if (input) {
        input[focusAction]();
      }
    },
    updateTrigger() {
      this.$refs.trigger?.update();
    },
    
    openDropdown() {
      this.isDropdownOpen = true;
    },
    closeDropdownIfFocusMoved(event, direction) {
      const focusDirection = event.shiftKey ? 'backward' : 'forward';
      if (focusDirection === direction) {
        this.toggleSelect({ isOpen: false });
      }
    }
  }
}

function toArray(value) {
  return Array.isArray(value) ? value : [value]
}
</script>

<style lang="scss">
.form-control {
  padding: 4px 10px;
  min-height: 30px;
  border: 1px solid var(--overlay-4-color);
  border-radius: 2px;
  line-height: 1.35;
  color: var(--overlay-1-color);
  background-color: transparent;
  &:focus {
    color: #000;
  }
}
.select {
  position: relative;
  display: inline-flex;
  width: 100%;
  max-width: 260px;
  --tag-padding: 2px 5px;
  &__control {
    flex-grow: 1;
    display: flex;
    max-width: 100%;
    padding-right: 27px;
    user-select: none;
    cursor: pointer;
    @at-root {
      .select[data-taggable][data-has-value] & {
        padding-left: 5px;
      }
      .select[data-inputable] & {
        cursor: text;
      }
    }
  }
  &__value {
    position: absolute;
    left: 0;
    width: 100%;
  }
  &__value,
  &__input {
    padding: 1px 0;
    line-height: 1.3;
  }
  &__input {
    position: relative;
    z-index: 2;
    flex-grow: 1;
    margin-right: 0;
    margin-right: -1px;
    border: 0;
    font: inherit;
    line-height: 1.3;
    background-color: transparent;
    @at-root {
      .select[aria-expanded=false] & {
        pointer-events: none;
      }
    }
  }
  &__tag {
    order: -1;
  }
  &__value {
    transition: color 60ms ease-in-out;
    @at-root {
      .select__input:focus + &,
      .select:not([data-has-value]) & {
        color: var(--overlay-4-color);
      }
    }
  }
  &__btn {
    position: absolute;
    top: 0;
    right: 0px;
    bottom: 0;
    display: flex;
    align-items: center;
    margin: auto;
    padding: 0 5px;
    border: 0;
    background-color: transparent;
    box-shadow: none;
  }
  &__arrow {
    width: 20px;
    fill: #979797;
    @at-root .select__control:focus + & {
      fill: #000;
    }
  }
  &__option-selected {
    margin-left: auto;
    padding-left: 10px;
    color: var(--overlay-4-color);
  }
  .base-tag {
    cursor: default;
  }
}

.select-dropdown {
  --menu-item-padding-left: 15px;
  --menu-item-padding-right: 15px;
  --menu-item-padding-y: 6px;
  --tag-padding: 2px 5px;
  &[data-taggable] {
    --menu-item-padding-y: 5px;
  }
}
</style>