<template>
  <div class="check-button-label" :data-selected="isSelected">
    <button
      class="check-button-label__btn"
      type="button"
      v-bind="$attrs"
      v-on="listeners"
    >
      <base-icon class="check-button-label__icon" name="check" width="10" height="10" />
    </button>
    <slot />
  </div>
</template>

<script>
import CheckIcon from "assets/images/icons/check-active.svg";
import BaseIcon from 'components/ui/base-icon/base-icon.vue';

export default {
  name: 'check-button-label',
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
.check-button-label {
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin: 6px 0;
  font-weight: 500;
  &[data-selected] {
    color: #FFFFFF;
  }

  &__btn {
    width: 15px;
    height: 15px;
    margin-right: 10px;
    position: relative;
    border: 1.5px solid var(--border-color-2);
    border-radius: 2px;
    background: transparent;
    color: var(--overlay-4-color);
    transition-property: background, color;
    transition-duration: 150ms;

    @at-root .check-button-label[data-selected] & {
      background: #6be7c8;
    }
  }

  &__img {
    margin-right: 5px;
  }

  &__icon {
    top: 0px;
    left: 0px;
    position: absolute;
    fill: transparent;
    transition: fill 150ms;
    @at-root .check-button-label[data-selected] & {
      fill: #FFFFFF;
    }
  }
}
</style>