<template>
  <base-table
    class="grouping-table"
    :data="data"
    :columns="columns"
    :responsive="false"
    v-bind="$attrs"
    v-on="$listeners"
    v-slot="{ item, index }"
  >
    <base-table-row :item="item" :key="item.id" :index="index" @click="navigateToTrackActivity(item)" />
  </base-table>
</template>

<script>
import BaseTable, { BaseTableRow, BaseTableSubhead} from "components/ui/base-table/base-table.vue";
import BasePercentage from "components/ui/base-percentage/base-percentage.vue";
import { cols, albumCols, statsCols } from "helpers/table-columns/table-columns";
import Selectable from "components/utils/selectable.vue";
import SelectableCheckbox from "components/ui/selectable-checkbox.vue";
import { trackActivityRoute, songRoute } from 'helpers/routing';

const tracksCoumns = [
  cols.rowIndex,
  albumCols.cover,
  albumCols.discographySongName,
];

const tracksCoumnsDemo = [
  cols.rowIndex,
  albumCols.cover,
  albumCols.discographySongNameDemo,
];

export const commonColumns = [
  statsCols.chartsSortable,
  statsCols.playlistsSortable,
  statsCols.playlistsReachSortable,
  statsCols.tiktokViewsSortable,
  statsCols.shazamsSortable,
  statsCols.streamsSortable,
  cols.optionsHidden
];

export default {
  name: "grouping-table",
  components: {
    BaseTable,
    BaseTableSubhead,
    BaseTableRow,
    Selectable,
    SelectableCheckbox,
    BasePercentage,
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    demoProfileId() {
      return this.$route.params.id;
    },
    columnsMap() {
      return this.demoProfileId ? tracksCoumnsDemo : tracksCoumns;
    },
    columns() {
      return [
        ...this.columnsMap,
        ...commonColumns,
      ];
    },
  },
  methods: {
    navigateToTrackActivity(item) {
      if (this.demoProfileId) {
        this.$router.push(songRoute(item));
      } else {
        this.$router.push(trackActivityRoute(item));
      }
    }
  }
}
</script>

<style lang="scss">
.trends-table {
  --subhead-col-master-span: 2;
  --col-master-span: 3;
  &[data-group="credits"] {
    --subhead-col-master-span: 1;
    --col-master-span: 2;
  }
  .th.col-avatar {
    display: none;
  }
  .th.col-master {
    padding-left: 0;
    grid-column: 2 / span var(--subhead-col-master-span);
  }
  .tsubhead {
    --tr-border-left-indent: var(--col-index);
    .col-avatar,
    .col-master + .col-def {
      // display: none;
    }
    .col-master {
      padding-left: 0;
      grid-column: 2 / span var(--subhead-col-master-span);
    }
  }
  .tr[data-last-selected] {
    --tr-border-left-indent: var(--col-index);
    --border-color: var(--overlay-4-color);
  }
  .tsubhead .col-avatar {
    display: none;
  }
  .td .skeleton {
    float: right;
  }
  .tr[data-last-selected] {
    .td {
      &:first-child {
        &::before {
          border-bottom: 1px solid var(--border-color);
        }
      }
    }
  }
}
.th--show-sorter {
  padding-right: 20px;
}
.trends-table .col-master.td {
  font-size: 16px;
}
.trends-table .hide-sorter-icon {
  padding-right: 0;
}
</style>
