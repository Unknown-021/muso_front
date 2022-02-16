<template>
  <tr class="thead-row thead-row--skel">
    <template v-for="col in columns">
      <th :key="col.key" class="th" :class="getColumnClass(col)">
        <skeleton class="mini o8 thin" />
      </th>
    </template>
  </tr>
</template>

<script>
import Skeleton from 'components/ui/skeleton.vue';
import { getColumnClass } from './table-column.utils';

export default {
  name: 'base-thead-row-skeleton',
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
    getColumnClass
  }
}
</script>
