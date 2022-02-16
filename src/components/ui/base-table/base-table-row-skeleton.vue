<template>
  <tr class="tr tr--skel" aria-hidden>
    <template v-for="col in columns">
      <td :key="col.key" class="td" :class="getColumnClass(col)">
        <skeleton class="o8 thin skeleton-loader" :class="col.skeletonClass" />
      </td>
    </template>
  </tr>
</template>

<script>
import Skeleton from 'components/ui/skeleton';
import { getColumnClass } from './table-column.utils';
import { randomInt } from 'helpers/number';

const anatomyRandomSizes = new Set(['master', 'default']);
const sizes = ['col-skel-1', 'col-skel-2', 'col-skel-3', 'col-skel-4', 'col-skel-5', 'col-skel-6'];

export default {
  name: 'base-table-row-skeleton',
  components: {
    Skeleton
  },
  props: {
    columns: {
      type: Array,
      required: true
    }
  },
  methods: {
    getColumnClass(column) {
      const classes = getColumnClass(column);
      
      if (anatomyRandomSizes.has(column.anatomy)) {
        const sizeClass = sizes[randomInt(0, sizes.length - 1)];
        classes.push(sizeClass);
      }

      return classes;
    }
  }
}
</script>

<style lang="scss">
.td .skeleton {
  display: flex;
}
.col-skel-1 {
  --skeleton-width: 100px;
}
.col-skel-2 {
  --skeleton-width: 110px;
}
.col-skel-3 {
  --skeleton-width: 120px;
}
.col-skel-4 {
  --skeleton-width: 130px;
}
.col-skel-5 {
  --skeleton-width: 140px;
  @at-root {
    [data-def-cols-count="7"] & {
      --skeleton-width: 100px;
    }
  }
}
.col-skel-6 {
  --skeleton-width: 150px;
  @at-root {
    [data-def-cols-count="6"] & {
      --skeleton-width: 130px;
    }
    [data-def-cols-count="7"] & {
      --skeleton-width: 120px;
    }
  }
}
.tr--skel .col-index{ 
  width: 12px;
}

</style>
