<template>
  <table-row-factory
    class="tsubhead"
    :get-column-content="getColumnContent"
    :hoverable="hoverable"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import TableRowFactory from './table-row-factory';

export default {
  name: 'base-table-subhead',
  components: {
    TableRowFactory
  },
  props: {
    hoverable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getColumnContent(column) {
      let slot = null;
      if (column.key in this.$scopedSlots) {
        slot = this.$scopedSlots[column.key]();
      }
      return slot;
    }
  }
};
</script>
