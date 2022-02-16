<template>
  <base-table
    class="songs-ct"
    :columns="columns"
    :data="data"
    v-bind="$attrs"
    v-on="$listeners"
    data-component="songs-credits-table"
  >
    <template v-slot="{ item, index }">
      <base-table-row :index="index" :key="item.id" @click="navigateToSong($event, item)" />
    </template>

    <template #mobile-row="{ item, cells }">
      <song-credits-mobile-row :cells="cells" :song="item" />
    </template>

    <template #mobile-row-skeleton>
      <song-credits-mobile-row-skeleton />
    </template>

    <template #no-data>
      <div class="empty">
        <img class="empty__img" src="images/zero-state/sad-smile.svg" width="96" height="96" />
        <p class="empty__text">Oops, no results found.</p>
      </div>
    </template>
  </base-table>
</template>

<script>
import BaseTable, { BaseTableRow } from "components/ui/base-table/base-table.vue";
import SongCreditsMobileRow from 'components/song/song-credits-mobile-row';
import SongCreditsMobileRowSkeleton from 'components/song/song-credits-mobile-row-skeleton.vue';
import { creditCols, albumCols } from 'helpers/table-columns/table-columns';
import { isParentElementInteractive } from "helpers/dom";
import { songRoute } from 'helpers/routing';

export const tableColumns = [
  albumCols.cover2,
  albumCols.songTitle2Sortable,
  albumCols.artistSortable,
  albumCols.songAlbum2,
  creditCols.role,
  albumCols.releaseDateSortable
];

export default {
  name: 'songs-credits-table',
  inheritAttrs: false,
  components: {
    BaseTable,
    BaseTableRow,
    SongCreditsMobileRow,
    SongCreditsMobileRowSkeleton
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    navigateToSong(event, song) {
      if (!isParentElementInteractive(event.target)) {
        this.$router.push(songRoute(song));
      }
    }
  },
  computed: {
    columns() {
      return tableColumns;
    }
  }
}
</script>

<style lang="scss">
.songs-ct {
  --tr-min-height: 50px;
  --tr-border-left-indent: 61px;
  --tr-main-color: #141413;
}
</style>