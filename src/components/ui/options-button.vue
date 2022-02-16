<template>
  <dropdown-trigger
    placement="bottom-end"
    :offset="offset"
    :visible="visible"
    @visible-change="change"
  >
    <button type="button" :class="buttonClass" v-bind="$attrs" v-on="$listeners">
      <slot name="icon">
        <component :is="iconComponent" />
      </slot>
    </button>
    <template #dropdown="slotProps">
      <slot name="dropdown" />
    </template>
  </dropdown-trigger>
</template>

<script>
import DropdownTrigger from 'components/ui/base-dropdown-trigger/base-dropdown-trigger.vue';
import MoreIcon from 'assets/images/icons/more-2.svg';
import MoreThickIcon from 'assets/images/icons/more-thick.svg';
import { setDataset } from 'helpers/dom';

const offset = [0, 8];
const thickOffset = [0, 4];

export default {
  name: 'options-button',
  inheritAttrs: false,
  components: {
    DropdownTrigger
  },
  props: {
    visible: {
      type: Boolean,
      default: undefined
    },
    thick: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible() {
      this.updateAttr();
    }
  },
  computed: {
    offset() {
      return this.thick ? thickOffset : offset;
    },
    buttonClass() {
      return {
        'more-button': true,
        'more-button--thick': this.thick,
        'more-button--light': this.light
      };
    },
    iconComponent() {
      return this.thick ? MoreThickIcon : MoreIcon;
    }
  },
  methods: {
    updateAttr(visible) {
      const trEl = this.$el.closest('tr');
      if (trEl) {
        setDataset(trEl, 'active', visible);
      }
    },
    change(value) {
      this.updateAttr(value);
      this.$emit('update:visible', value);
    }
  }
};
</script>