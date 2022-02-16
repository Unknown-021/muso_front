<template>
  <dropdown-trigger :placement="placement" :offset="offset">
    <slot v-bind="selectedOption">
      <button class="iselect-btn">
        {{ selectedOption.title }}
        <base-icon class="iselect-btn__icon" name="arrow-down" width="20" height="20" />
      </button>
    </slot>
    <template #dropdown>
      <base-menu>
        <template v-for="option in options">
          <menu-item :key="option.value" @click="selectOption(option)">{{ option.title }}</menu-item>
        </template>
      </base-menu>
    </template>
  </dropdown-trigger>
</template>

<script>
import DropdownTrigger from 'components/ui/base-dropdown-trigger/base-dropdown-trigger.vue';
import BaseMenu, { MenuItem } from 'components/ui/base-menu/base-menu';
import BaseIcon from 'components/ui/base-icon/base-icon.vue';

const defaultOption = {
  value: 'streams',
  title: 'Streams'
};
const defaultOffset = [0, 5];

export default {
  name: 'form-inline-select',
  components: {
    BaseMenu,
    MenuItem,
    BaseIcon,
    DropdownTrigger
  },
  props: {
    value: {
      type: String,
      required: false
    },
    options: {
      type: Array,
      required: true
    },
    offset: {
      type: Array,
      default: () => defaultOffset
    },
    placement: {
      type: String,
      default: 'bottom-start'
    }
  },
  data() {
    return {
      modelValue: ''
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value !== this.modelValue) {
          this.modelValue = value;
        }
      }
    }
  },
  computed: {
    selectedOption() {
      return this.options.find(item => item.value === this.modelValue) || defaultOption;
    }
  },
  methods: {
    selectOption(item) {
      this.modelValue = item.value;
      this.$emit('update:value', this.modelValue);
    }
  }
}
</script>

<style lang="scss">
.iselect-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0;
  border: none;
  background-color: transparent;
  &__icon {
    margin-left: 2px;
    margin-top: -2px;
    margin-bottom: -2px;
    fill: var(--overlay-1-color);
    transition: transform 150ms ease-in-out;
    @at-root .iselect-btn[data-active] & {
      transform: rotate(180deg);
    }
  }
}
</style>
