<template>
  <button
    class="check-btn"
    :data-selected="isSelected"
    type="button"
    v-bind="$attrs"
    v-on="listeners"
  >
    <slot />
    <base-icon class="check-btn__icon" name="check" width="16" height="16" />
  </button>
</template>

<script>
import CheckIcon from "assets/images/icons/check-active.svg";
import BaseIcon from 'components/ui/base-icon/base-icon.vue';

export default {
  name: 'check-button',
  components: {
    CheckIcon,
    BaseIcon
  },
  model: {
    prop: 'selected',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number],
      default: undefined
    },
    selected: {
      type: [Boolean, Array],
      default: false
    }
  },
  computed: {
    isSelected() {
      return Array.isArray(this.selected)
        ? this.selected.includes(this.value)
        : this.selected;
    },
    listeners() {
      return {
        ...this.$listeners,
        click: (event) => {
          this.$emit('click', event);
          this.toggle();
        }
      };
    }
  },
  methods: {
    toggle() {
      if (Array.isArray(this.selected)) {
        const arr = this.isSelected
          ? this.selected.filter(item => item !== this.value)
          : [...this.selected, this.value];
        
        this.$emit('change', arr);
      } else {
        this.$emit('change', !this.selected);
      }
    }
  }
}
</script>

<style lang="scss">
.check-btn {
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px 9px;
  border: 1px solid var(--border-color-2);
  border-radius: 2px;
  background: transparent;
  font-weight: 600;
  font-size: 11px;
  line-height: 1.3;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--overlay-4-color);
  transition-property: border-color, color;
  transition-duration: 150ms;
  @media (min-width: 768px) {
    min-width: 79px;
  }

  &[data-selected] {
    border: 1px solid #CCC;
    color: #f7f7f7;
  }

  &__img {
    margin-right: 5px;
  }

  &__icon {
    margin-top: -2px;
    margin-left: 2px;
    fill: #595857;
    transition: fill 150ms;
    @at-root .check-btn[data-selected] & {
      fill: #6be7c8;
    }
  }
}
</style>