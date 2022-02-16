<template>
  <div class="roles-table-tracks">
    <base-table
      :data="tracks"
      :columns="columns"
      v-bind="$attrs"
      v-on="$listeners"
      v-slot="{ item, index }"
    >
      <base-table-row :index="index" @click="navigateToTrackActivity(item)" />
    </base-table>
  </div>

</template>

<script>
import { cols, albumCols, statsCols } from 'helpers/table-columns/table-columns';
import { TableCell } from 'components/ui/table-cell/table-cell';
import BaseTable, { BaseTableRow } from 'components/ui/base-table/base-table.vue';
import { trackActivityRoute, songRoute } from 'helpers/routing';

const tracksColumns = [
  cols.rowIndex,
  albumCols.cover,
  albumCols.discographySongName
];

const tracksColumnsDemo = [
  cols.rowIndex,
  albumCols.cover,
  albumCols.songTitleInfo
];

export default {
  name: 'creadits-table',
  props: {
    tracks: {
      type: Array,
      required: true,
    },
    group: {
      type: String,
      required: true
    },
    demoProfileId: {
      type: String,
      default: null
    }
  },
  components : {
    BaseTable,
    BaseTableRow
  },
  computed: {
    columns() {
      let columns = null;
      if (this.demoProfileId) {
        columns = tracksColumnsDemo;
      } else {
        columns = tracksColumns;
      }
      return [
        ...columns,
        this.statsCol
      ]
    },
    statsCol() {
      const { field, ...col } = statsCols[this.group];
      return {
        ...col,
        anatomy: 'auto',
        class: 'col-number',
        component: TableCell.LocalNumber,
        componentProps: item => ({
          value: item.currentValue
        })
      }
    }
  },
  methods: {
    navigateToTrackActivity(item) {
      if (this.demoProfileId) {
        this.$router.push(songRoute(item));
      } else {
        this.$router.push(trackActivityRoute(item, 'Overview'));
      }
    }
  }
}
</script>

<style lang="scss">
.roles-table-tracks {
  width: 100%;
  max-width: 535px;
  height: 585px;
}
</style>
