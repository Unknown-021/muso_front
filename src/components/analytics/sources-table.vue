<template>
  <base-table
    :data="data"
    :responsive="false"
    :columns="columns"
    v-bind="$attrs"
    v-on="$listeners"
    :row-skeleton-count="5"
    v-slot="{ index }"
    v-click-outside="hide"
  >
    <base-table-row :id="'row_' + index" :index="index" @click.self="showDropdown(index)" />
  </base-table>
</template>

<script>
import { cols } from 'helpers/table-columns/table-columns';
import BaseTable, { BaseTableRow } from 'components/ui/base-table/base-table.vue';
import SourceMoreBtn from 'components/ui/table-cell/source-more-btn';
import SourceDetails from 'components/ui/table-cell/source-details';
import SourceCover from 'components/ui/table-cell/source-cover';
import bus from 'services/bus.js';
import vClickOutside from "v-click-outside";

export const sourceCover = {
  title: '',
  key: 'cover',
  anatomy: 'master-avatar',
  component: SourceCover,
  componentProps: (item) => ({
    iconType: item.source,
    isPending: item.isPending
  }),
};
const sourcesColumns = [cols.rowIndex, sourceCover];

export default {
  name: 'sources-table',
  components: {
    BaseTable,
    BaseTableRow,
    SourceMoreBtn,
    SourceDetails,
    SourceCover,
    vClickOutside
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    sourceType: {
      type: String,
      required: true,
    },
    spotifySources: {
      type: Array
    },
    soundcloudSources: {
      type: Array
    }
  },
  computed: {
    columns() {
      return [...sourcesColumns, this.detailsCol, this.moreBtnCol];
    },
    detailsCol() {
      return {
        title: 'Name',
        key: 'name',
        anatomy: 'default',
        component: SourceDetails,
        componentProps: (item, index) => ({
          item: item,
          countType: this.sourceCountType(this.sourceType),
          count: this.countValue(item),
          index: index + 1,
          soundcloudSources: this.soundcloudSources,
          spotifySources: this.spotifySources
        }),
      };
    },
    moreBtnCol() {
      return {
        title: '',
        key: 'more-btn',
        anatomy: 'master-index',
        component: SourceMoreBtn,
        componentProps: (item, index) => ({
          item: item,
          index: index,
          listLength: this.data.length,
          count: this.countValue(item),
          countType: this.sourceCountType(this.sourceType),
          soundcloudSources: item.source === 'youtube' ? [] : this.soundcloudSources,
          spotifySources: item.source === 'youtube' ? [] : this.spotifySources
        }),
      };
    },
  },
  methods: {
    sourceCountType(sourceType) {
      if (sourceType === 'playlistsReach') {
        return 'Playlists Reach';
      } else if (sourceType === 'shazams') {
        return 'Shazams';
      } else if (sourceType === 'playlists' || sourceType === 'charts') {
        return 'Current position:';
      } else if (sourceType === 'tiktokViews') {
        return 'Views';
      } else {
        return 'Streams';
      }
    },
    countValue(item) {
      return item.count || item.followers || item.currentPosition
    },
    showDropdown(index) {
      bus.$emit('showDropdown', index)
    },
    hide() {
      bus.$emit('hide-menu')
    }
  },
};
</script>