<template>
  <table-row-factory
    :get-column-content="getColumnContent"
    :hoverable="hoverable"
    :processing="processing"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import TableRowFactory from './table-row-factory.vue';

export default {
  name: 'base-table-row',
  components: {
    TableRowFactory
  },
  inject: {
    tableComponent: {
      type: Object,
      required: true
    }
  },
  props: {
    index: {
      type: Number,
      default: undefined
    },
    item: {
      type: Object,
      default: undefined
    },
    hoverable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      processing: this.item?.inProgress || false
    }
  },
  methods: {
    getColumnContent(column) {
      const dataItem = this.item || this.tableComponent.tableData[this.index];

      if (dataItem.inProgress && column.processable) {
        return '-';
      }

      let data = null;
      if (column.componentProps) {
        data = column.componentProps(dataItem, this.index);
      } else if (column.field) {
        data = dataItem[column.field];
      }

      let slot = null;
      if (column.key in this.$scopedSlots) {
        slot = this.$scopedSlots[column.key](data, this.index);
      }

      let content = null;
      if (slot) {
        content = slot;
      } else if (column.component) {
        content = <column.component attrs={data} />;
      } else {
        content = data;
      }

      return content;
    }
  }
}
</script>
