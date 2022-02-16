<template>
  <draggable
    ghost-class="ghost"
    tag="tbody"
    :list="tableComponent.tableData"
    @change="onMoved"
  >
    <slot/>
  </draggable>
</template>
<script>
import Draggable from 'vuedraggable';

export default {
  components: {
    Draggable
  },
  inject: {
    tableComponent: {
      type: Object,
      required: true
    }
  },
  methods: {
    onMoved(event) {
      this.tableComponent.$emit('update:data', this.tableComponent.tableData);
      this.tableComponent.$emit('row-drag', event);
    }
  }
};
</script>