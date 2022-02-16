<template>
  <base-table
    class="catalog-table"
    :data="data"
    :columns="columns"
    :responsive="false"
    v-bind="$attrs"
    v-on="$listeners"
    v-slot="{ item, index }"
  >
    <base-table-row :index="index" @click="navigateToTrackActivity(item)" />
  </base-table>
</template>

<script>
import BaseTable, { BaseTableRow } from 'components/ui/base-table/base-table.vue';
import { albumGroupingRoute, trackActivityRoute, creditsGroupingRoute, collabotatorsGroupingRoute, songRoute } from 'helpers/routing';
import { cols, albumCols, profileCols, creditCols, statsCols } from 'helpers/table-columns/table-columns';

const tracksCoumns = [
  cols.rowIndex,
  albumCols.cover,
  albumCols.discographySongName,
];

const tracksColumnsDemo = [
  cols.rowIndex,
  albumCols.cover,
  albumCols.songTitleInfo,
];

const albumsColumns = [
  cols.rowIndex,
  albumCols.cover,
  albumCols.titleGrouping,
];

const collaboratorsColumns = [
  cols.rowIndex,
  profileCols.avatar,
  profileCols.collaboratorGroupName,
];

const creditsColumns = [
  creditCols.creditAvatar,
  creditCols.title
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

const groupColumnsMap = {
  tracks: tracksCoumns,
  albums: albumsColumns,
  collaborators: collaboratorsColumns,
  credits: creditsColumns
};

const groupColumnsMapDemo = {
  tracks: tracksColumnsDemo,
  albums: albumsColumns,
  collaborators: collaboratorsColumns,
  credits: creditsColumns
};

export default {
  name: 'activity-table',
  components: {
    BaseTable,
    BaseTableRow
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    group: {
      type: String,
      required: true,
      validator: value => (value in groupColumnsMap)
    }
  },
  computed: {
    columns() {
      let groupColumns = null;
      if (this.demoProfileId) {
        groupColumns = groupColumnsMapDemo[this.group];
      } else {
        groupColumns = groupColumnsMap[this.group];
      }
      return [
        ...groupColumns,
        ...commonColumns
      ];
    },
    demoProfileId() {
      return this.$route.params.id;
    }
  },
  methods: {
    navigateToTrackActivity(item) {
      if (this.group === 'tracks') {
        if (this.demoProfileId) {
          this.$router.push(songRoute(item));
        } else {
          this.$router.push(trackActivityRoute(item));
        }
      } else if (this.group === 'credits') {
          this.$store.commit('analytics/grouping/setCreditsTitle', item.credit)
          this.$router.push(creditsGroupingRoute(item, this.demoProfileId));
      } else if (this.group === 'albums') {
          this.$router.push(albumGroupingRoute(item, this.demoProfileId));
      } else {
          this.$store.commit('analytics/grouping/setCollaboratorsName', item.fullName)
          this.$router.push(collabotatorsGroupingRoute(item, this.demoProfileId))
      }
    }
  }
}
</script>

<style lang="scss">
.th--show-sorter {
  padding-right: 20px;
}
.catalog-table .col-master.td {
  font-size: 16px;
}
.catalog-table .td:first-child {
  padding-right: 0;
  margin-right: 12px;
}
</style>
