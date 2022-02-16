<template>
  <form-checkbox
    :checked="controller.checked"
    @change="controller[type]"
    :control-style="controlStyle"
  />
</template>

<script>
import FormCheckbox from 'components/ui/form-checkbox.vue';

function itemController({ isSelected, toggle, select }, item) {
  return {
    checked: isSelected(item),
    toggle: () => toggle(item),
    select: () => select(item)
  };
}

function allItemsController({ isAllSelected, toggleAll }) {
  return {
    checked: isAllSelected,
    toggle: toggleAll
  };
}

export default {
  name: 'base-table-checkbox',
  components: {
    FormCheckbox
  },
  inject: {
    selectable: {
      type: Object,
      required: true
    }
  },
  props: {
    item: {
      type: Object,
      default: undefined
    },
    type: {
      type: String,
      default: 'toggle'
    },
    controlStyle: {
      type: String,
      default: 'checkbox'
    }
  },
  computed: {
    controller() {
      return this.item
        ? itemController(this.selectable, this.item)
        : allItemsController(this.selectable)
    }
  }
}
</script>
