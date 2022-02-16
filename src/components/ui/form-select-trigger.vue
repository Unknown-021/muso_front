<template>
  <dropdown-trigger
    ref="trigger"
    :visible="visible"
    placement="bottom"
    trigger="manual"
    :modifiers="modifiers"
    :offset="offset"
    @auto-close="handleAutoClose"
  >
    <slot />
    <template #dropdown>
      <slot name="dropdown" />
    </template>
  </dropdown-trigger>
</template>

<script>
import DropdownTrigger from 'components/ui/base-dropdown-trigger/base-dropdown-trigger.vue';
import { sameWidth } from 'components/ui/base-dropdown-trigger/modifiers/same-width';

const dropdownWidth = {
  ...sameWidth,
  options: {
    extendWidth: 30,
    prop: 'width'
  }
};
const modifiers = [dropdownWidth];
const offset = [0, 5];

export default {
  name: 'form-select-trigger',
  inheritAttrs: false,
  components: {
    DropdownTrigger
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    modifiers: () => modifiers,
    offset: () => offset
  },
  methods: {
    update() {
      this.$refs.trigger.update();
    },
    handleAutoClose({ relatedToReference }) {
      if (!relatedToReference) {
        this.$emit('update:visible', false);
      }
    }
  }
}
</script>
