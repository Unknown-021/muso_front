<template>
  <menu-item
    class="select-option"
    :hoverable="!disabled"
    :data-selected="select.isSelected(option.value)"
    :data-disabled="disabled"
    @click="selectOption"
    @select="selectOption"
  >
    <component :is="optionComponent" class="ellipsis">
      <slot>{{ option.title }}</slot>
    </component>
  </menu-item>
</template>

<script>
import { MenuItem } from 'components/ui/base-menu/base-menu.vue';
import BaseTag from 'components/ui/base-tag/base-tag.vue';

export default {
  name: 'form-option',
  components: {
    MenuItem
  },
  inject: {
    select: {
      type: Object,
      from: 'formSelectNode',
      required: true
    }
  },
  props: {
    option: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    optionComponent() {
      return this.select.isTaggable ? BaseTag : 'span';
    }
  },
  methods: {
    selectOption() {
      if (!this.disabled) {
        this.select.selectOption(this.option);
      }
    }
  }
}
</script>

<style lang="scss">
.select-option {
  &[data-focused] {
    background-color: var(--base-1-color);
  }
  &[data-selected],
  &[data-disabled] {
    opacity: 0.5;
  }
}
</style>