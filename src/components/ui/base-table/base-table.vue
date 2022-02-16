<template>
  <!-- TODO: Create dedicated component-wrapper for table infinite scroll -->
  <div
    class="table-root"
    v-infinite-scroll="loadMoreData"
    infinite-scroll-disabled="isInfiniteScrollDisabled"
    infinite-scroll-distance="200"
  >
    <!-- Since we turn our table into flexbox we have to manually add aria role attributes, so table will not lose it semantic -->
    <table
      role="table"
      class="table"
      :class="hasClasses"
      :style="style"
      :data-def-cols-count="defaultColumnsCount"
      :data-responsive="responsive"
    >
      <thead role="rowgroup">
        <slot name="head-row">
          <base-table-head-row />
        </slot>

        <template v-if="!subheadLoading">
          <slot name="subhead" />
        </template>
        <template v-else-if="$slots.subhead">
          <base-table-row-skeleton class="tsubhead" :columns="columns" />
        </template>
      </thead>

      <component :is="tableComponents.body">
        <template v-for="(item, index) in tableData">
          <slot :item="item" :index="index">
            <base-table-row :key="item.id" :item="item" :index="index" :hoverable="hoverable" />
          </slot>
        </template>

        <template v-if="loading">
          <base-table-row-skeleton v-for="index in skeletonCount" :key="index" :columns="columns" />
        </template>
      </component>
    </table>

    <base-table-mobile :data="data" :columns="columns">
      <template #default="props">
        <slot name="mobile-row" v-bind="props" />
      </template>

      <template #skeleton>
        <template v-if="loading">
          <template v-for="index in skeletonCount">
            <slot name="mobile-row-skeleton" :index="index" />
          </template>
        </template>
      </template>
    </base-table-mobile>

    <slot v-if="!tableData.length && !loading" name="no-data" />
  </div>
</template>

<script>
import BaseTableHeadRow from './base-table-head-row';
import BaseTableSubhead from './base-table-subhead.vue';
import BaseTableRow from './base-table-row';
import BaseTableRowSkeleton from './base-table-row-skeleton';
import BaseTableMobile from './base-table-mobile.vue';
import BaseTableMobileRow from './base-table-mobile-row.vue';
import { BaseTableCell } from './base-table-cell';
import { invertSorter } from 'helpers/sorters';
import { validateColumnsProp } from './base-table.utils';
import { getColumnsHasClasses, isMasterTable } from './table-column.utils';
import { getColumnSizes } from './table-column.size';

export { BaseTableHeadRow, BaseTableSubhead, BaseTableRow, BaseTableMobileRow, BaseTableCell };

export default {
  name: 'base-table',
  components: {
    BaseTableHeadRow,
    BaseTableMobile,
    BaseTableRow,
    BaseTableRowSkeleton
  },
  provide() {
    return {
      tableComponent: this
    };
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true,
      validator: process.env.NODE_ENV === 'production'
        ? undefined
        : validateColumnsProp
    },
    loading: {
      type: Boolean,
      default: false
    },
    disableInfiniteScroll: {
      type: Boolean,
      default: false
    },
    sorting: {
      type: Object,
      default: undefined
    },
    rowSkeletonCount: {
      type: Number,
      default: 20
    },
    responsive: {
      type: Boolean,
      default: true
    },
    hoverable: {
      type: Boolean,
      default: true
    },
    components: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      dataInner: [],
      skeletonCount: this.rowSkeletonCount,
      inactive: false,
      innerSorting: {
        key: undefined,
        order: 'NONE'
      }
    };
  },
  activated() {
    this.inactive = false;
  },
  deactivated() {
    this.inactive = true;
  },
  watch: {
    sorting: {
      immediate: true,
      handler(sorting) {
        if (sorting) {
          this.innerSorting = this.sorting;
        }
      }
    },
    data: {
      immediate: true,
      handler(data) {
        this.dataInner = data.slice();
      }
    }
  },
  computed: {
    tableData() {
      return this.sortedData;
    },
    sortedData() {
      const res = typeof this.sorter === 'function'
        ? this.dataInner.sort(this.sorter)
        : this.dataInner;
      return res;
    },
    tableSorting() {
      return this.innerSorting;
    },
    tableComponents() {
      return {
        body: 'tbody',
        ...this.components
      };
    },
    sortingColumn() {
      return this.innerSorting.key
        ? this.columns.find(col => col.sortKey === this.innerSorting.key)
        : null;
    },
    sorter() {
      const column = this.sortingColumn;
      if (!column) return null;

      // When sorter value set to "true", it means that
      // we show sorting controls (toggle button with arrow icon), but don't
      // do anything with table data itself. It's useful for remote sorting
      if (column.sorter === true) {
        return null;
      } else if (typeof column.sorter === 'function') {
        return getColumnSorter(column, order);
      }
    },
    subheadLoading() {
      return this.loading && !this.data.length;
    },
    isMasterTable() {
      return isMasterTable(this.columns);
    },
    isInfiniteScrollDisabled() {
      const isEventListenerSet = ('load-more' in this.$listeners);
      return this.disableInfiniteScroll || this.loading || !isEventListenerSet || this.inactive;
    },
    hasClasses() {
      return getColumnsHasClasses(this.columns);
    },
    defaultColumnsCount() {
      return this.columns.filter(col => col.anatomy === 'default').length;
    },
    style() {
      if (this.isMasterTable) {
        return {
          '--table-columns': this.columnsSizes
        };
      }
    },
    columnsSizes() {
      return getColumnSizes(this.columns).join(' ');
    }
  },
  methods: {
    setSorting(sorting) {
      this.innerSorting = sorting;
      this.$emit('change', { sorting });
    },
    loadMoreData() {
      this.$emit('load-more');
    }
  }
}

function getColumnSorter(column, sortingOrder) {
  let sorter = null;
  if (sortingOrder === 'ASC') {
    sorter = column.sorter;
  } else if (sortingOrder === 'DESC') {
    sorter = invertSorter(column.sorter);
  }

  return sorter;
}
</script>

<style lang="scss">
:root {
  --tr-hover-offset: 20px;
  --tr-main-color: #21201F;
  --tr-border-color: unset;
  --tr-border-left-indent: 0;
  --tr-hover-background-color: unset;
  --tr-min-height: 50px;
  --table-columns: unset;
}

.table {
  display: flex;
  flex-direction: column;
  width: 100%;
  thead,
  tbody {
    display: flex;
    flex-direction: column;
  }
  &[data-responsive] {
    @media (max-width: 767px) {
      display: none;
    }
  }
}

.thead-row,
.tr {
  display: grid;
  align-items: center;
  grid-template-columns: var(--table-columns);
}
.tr:first-child {
  margin-top: 8px;
}

.th,
.td {
  padding: 8px;
  padding-left: 0;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
}

.th {
  padding-top: 3px;
  padding-bottom: 3px;
}

@import "~assets/styles/components/table-columns";
</style>
