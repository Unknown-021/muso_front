<script>
import BaseTableHeader from './base-table-header.vue';

export default {
  name: 'base-table-head-row',
  inject: ['tableComponent'],
  render(h) {
    const getItem = (column) => {
      let slot = null;

      if (column.key in this.$scopedSlots) {
        slot = this.$scopedSlots[column.key](column);
      }

      return (
        <BaseTableHeader column={column}>
          {slot}
        </BaseTableHeader>
      );
    };
    
    return (
      <tr role="row" class="thead-row" attrs={this.$attrs} on={this.$listeners}>
        {this.tableComponent.columns.map(getItem)}
      </tr>
    );
  }
}
</script>

<style lang="scss">
.thead-row {
  // margin-top: 10px;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #8F8F8F;
  @media (max-width: 767px) {
    display: none;
  }
  &--skel {
    pointer-events: none;
    .skeleton {
      display: inline-flex;
      transform: translateY(1px);
    }
  }
}
</style>
