<template>
  <base-table
    :data="data"
    :responsive="false"
    :columns="columns"
    v-bind="$attrs"
    v-on="$listeners"
    v-slot="{ item, index }"
  >
    <base-table-row :index="index" @click="navigateToEntity(item)" />
  </base-table>
</template>

<script>
import { cols, albumCols, statsCols, profileCols } from "helpers/table-columns/table-columns";
import BaseTable, { BaseTableRow } from "components/ui/base-table/base-table.vue";
import { TableCell } from 'components/ui/table-cell/table-cell';
import {trackActivityRoute, getCollaboratorRoute, songRoute} from 'helpers/routing';

const collaborationsColumns = [
  cols.rowIndex,
  profileCols.avatar,
  profileCols.collaboratorName
];

const discographyColumns = [
  cols.rowIndex,
  albumCols.cover,
  albumCols.discographySongName
];

const discographyColumnsDemo = [
  cols.rowIndex,
  albumCols.cover,
  albumCols.songTitleInfo
];

const groupColumnsMap = {
  collaborators: collaborationsColumns,
  tracks: discographyColumns
};

const groupColumnsMapDemo = {
  collaborators: collaborationsColumns,
  tracks: discographyColumnsDemo
};

const routingMap = {
  collaborators: getCollaboratorRoute,
  tracks: trackActivityRoute
};

export default {
  name: 'overview-table',
  components: {
    BaseTable,
    BaseTableRow
  },
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    type: {
      type: String,
      required: true,
      validator: value => (value in groupColumnsMap)
    },
    demoProfileId: {
      type: String,
      default: null
    }
  },
  computed: {
    columns() {
      let groupColumns = null;
      if (this.demoProfileId) {
        groupColumns = groupColumnsMapDemo[this.type];
      } else {
        groupColumns = groupColumnsMap[this.type];
      }
      return [
        ...groupColumns,
        this.statsCol
      ];
    },
    statsCol() {
      const { field, ...col } = statsCols.streams;
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
    navigateToEntity(item) {
      let getRoute = null;
      if (this.demoProfileId) {
        getRoute = songRoute
      } else {
        getRoute = routingMap[this.type];
      }
      this.$router.push(getRoute(item));
    }
  }
}
</script>
