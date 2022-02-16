<template>
  <div class="songs-results-page">
    <breadcrumb />

    <base-table
      class="songs-results-page__table"
      :data="songList"
      :columns="tableColumns"
      :loading="isLoadingData"
      :row-skeleton-count="pagination.limit"
      :disable-infinite-scroll="noMoreDataToLoad"
      @load-more="fetchMoreData"
    >
      <template v-slot="{ item, index }">
        <base-table-row :index="index" @click="navigateToSong($event, item)" />
      </template>

      <template #mobile-row="{ cells, item }">
        <base-table-mobile-row @click="navigateToSong($event, item)">
          <base-table-cell :cell="cells.songCover" class="media__small-img" />
          <div class="media__content">
            <h3 class="media__title">
              <base-table-cell :cell="cells.title" class="media__title" />
            </h3>
            <div class="media__text search-sr__artist ellipsis">
              <base-table-cell :cell="cells.artist" />
            </div>
          </div>
        </base-table-mobile-row>
      </template>

      <template #mobile-row-skeleton>
        <song-mobile-row-skeleton />
      </template>
    </base-table>

    <mobile-footer v-if="noMoreDataToLoad" />
  </div>
</template>

<script>
import BaseTable, { BaseTableRow, BaseTableCell, BaseTableMobileRow } from 'components/ui/base-table/base-table.vue';
import Breadcrumb from 'components/breadcrumb';
import SongMobileRowSkeleton from 'components/song/song-mobile-row-skeleton.vue';
import MobileFooter from 'components/layouts/mobile-footer.vue';
import { tableColumnsDef as cols } from 'helpers/table-columns';
import { clientFetchData } from 'mixins/client-fetch-data';
import { Pagination } from 'helpers/pagination';
import { isParentElementInteractive } from 'helpers/dom';
import { songRoute } from 'helpers/routing';

const columns = [
  cols.songCover,
  cols.songTitle,
  cols.songArtistWithFallback,
  cols.songAlbum,
  cols.releaseDate
];

export default {
  name: 'song-search-results',
  mixins: [clientFetchData],
  components: {
    Breadcrumb,
    BaseTable,
    BaseTableRow,
    BaseTableCell,
    SongMobileRowSkeleton,
    BaseTableMobileRow,
    MobileFooter
  },
  data() {
    return {
      pagination: new Pagination({ limit: 20 }),
      isLoadingData: false
    };
  },
  serverPrefetch() {
    return this.fetchData();
  },
  clientFetchData() {
    return this.fetchData();
  },
  computed: {
    songList() {
      return this.$store.getters['search/songSearchResults'];
    },
    tableColumns() {
      return columns;
    },
    noMoreDataToLoad() {
      return this.pagination.isNoMoreDataToLoad(this.songList);
    }
  },
  watch: {
    $route() {
      this.pagination.reset();
      this.fetchData(this.$route.query);
    }
  },
  methods: {
    async fetchData() {
      const payload = {
        query: {
          ...this.pagination.query,
          keyword: this.$route.query.keyword
        }
      };
      
      const action = this.pagination.page > 1
        ? 'search/searchMoreSongs'
        : 'search/searchSongs';

      try {
        this.isLoadingData = true;
        await this.$store.dispatch(action, payload);
      } finally {
        this.isLoadingData = false;
      }
    },
    fetchMoreData() {
      return this.pagination.nextPage(this.fetchData);
    },
    navigateToSong(event, song) {
      if (!isParentElementInteractive(event.target)) {
        this.$router.push(songRoute(song));
      }      
    }
  }
};
</script>

<style lang="scss">
.songs-results-page {
  @media (min-width: 768px) {
    padding-bottom: 35px;
  }
  &__table {
    --tr-min-height: 50px;
    --tr-border-left-indent: 61px;
    --tr-main-color: #141413;
  }
}

.search-sr {
  &__artist {
    --artist-link-color: #8F8F8F;
    a {
      position: relative;
    }
  }
}
</style>