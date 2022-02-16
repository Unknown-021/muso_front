<template>
  <th class="th" :class="cssClass" role="columnheader" v-on="listeners">
    <div class="th__inner">
      <span class="th__title">
        <slot>{{ column.title }}</slot>
      </span>
      <toggle-button v-if="column.sorter" class="th__sorter" :active="sortingOrder === 'ASC'" />
    </div>
  </th>
</template>

<script>
import ToggleButton from 'components/ui/toggle-button.vue';
import { getNextArrayElement} from 'helpers/array';
import { DEFAULT_SORT_DIRECTIONS } from 'helpers/constants';
import { getColumnClass } from './table-column.utils';

export default {
  name: 'base-table-header',
  components: {
    ToggleButton
  },
  inject: ['tableComponent'],
  props: {
    column: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      sortingOrder: 'NONE'
    }
  },
  created() {
    if (this.column.sortDefault) {
      this.sortingOrder = this.column.sortDefault;
    }
  },
  computed: {
    cssClass() {
      const classes = getColumnClass(this.column);
    
      if (this.column.sorter) {
        classes.push('th--clickable');
      }
      if (this.sortingOrder !== 'NONE') {
        classes.push('th--show-sorter');
      }

      return classes;
    },
    listeners() {
      const on = {};
      if (this.column.sorter) {
        on.click = this.toggleSortingOrder
      }

      return on;
    },
    sortDirections() {
      return this.column.sortDirections || DEFAULT_SORT_DIRECTIONS;
    }
  },
  watch: {
    'tableComponent.tableSorting': {
      immediate: true,
      handler(tableSorting) {
        if (tableSorting.key !== this.column.sortKey) {
          this.sortingOrder = 'NONE';
        } else if (tableSorting.order !== this.sortingOrder) {
          this.sortingOrder = tableSorting.order;
        }
      }
    }
  },
  methods: {
    toggleSortingOrder() {
      this.sortingOrder = getNextArrayElement(this.sortDirections, this.sortingOrder);
      this.tableComponent.setSorting({
        key: this.column.sortKey,
        order: this.sortingOrder
      });
    }
  }
}
</script>

<style lang="scss">
.th {
  font-weight: 600;
  text-align: left;
  &--clickable {
    cursor: pointer;
    user-select: none;
    &:hover {
      background-color: var(--tr-main-color);
    }
    &--no-hover:hover {
      background-color: transparent;
    }
  }
  &__inner {
    display: inline-flex;
    position: relative;
  }
  &__sorter {
    position: absolute;
    left: 100%;
    top: 0;
    bottom: 1px;
    margin-left: 5px;
    margin-top: auto;
    margin-bottom: auto;
    opacity: 0;
    pointer-events: none;
    --toggle-icon-color: #F7F7F7;
    @at-root .th--show-sorter & {
      opacity: 1;
      pointer-events: auto;
    }
  }
  &__title {
    @at-root .th--clickable:hover & {
      color: #F7F7F7;
    }
  }
}
</style>
