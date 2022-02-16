<script>
import { TableCell } from "components/ui/table-cell/table-cell";

export default {
  name: 'base-table-mobile',
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  render() {
    let content = null;

    const slot = this.$scopedSlots.default;
    if (slot) {
      content = this.data.map((item, index) => {
        return slot({ item, index, cells: this.getCells(item, index) })
      });
    }

    const skeleton = this.$slots.skeleton;

    return (<div class="table-mobile">{content}{skeleton}</div>);
  },
  methods: {
    getCells(dataItem, index) {
      const columns = {};
      
      for (let i = 0; i < this.columns.length; ++i) {
        const col = this.columns[i];
        columns[col.key] = {
          component: col.component || TableCell.PlainCell,
          props: getColumnProps(col, dataItem, index)
        }
      }

      return columns;
    }
  }
}

function getColumnProps(col, dataItem, index) {
  if ('componentProps' in col) {
    return col.componentProps(dataItem, index);
  } else if ('field' in col) {
    return {
      value: dataItem[col.field]
    };
  }

  return undefined;
}
</script>

<style lang="scss">
.table-mobile {
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    display: none;
  }
}
</style>