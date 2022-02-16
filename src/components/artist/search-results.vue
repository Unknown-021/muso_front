<template>
  <div class="artist-search-page">
    <breadcrumb />
    <base-table
      class="artist-search-page__table"
      :data="artistList"
      :columns="tableColumns"
      :loading="isLoadingData"
      :row-skeleton-count="pagination.limit"
      :disable-infinite-scroll="noMoreDataToLoad"
      @load-more="fetchMoreData"
    >
      <template v-slot="{ item, index }">
        <base-table-row :index="index" @click="navigateToArtist($event, item)" />
      </template>

      <template #mobile-row="{ cells, item }">
        <base-table-mobile-row @click="navigateToArtist($event, item)">
          <base-table-cell :cell="cells.avatar" class="media__small-img" />
          <div class="media__content">
            <h3 class="media__title">
              <base-table-cell :cell="cells.name" class="media__title" />
            </h3>
            <!-- TODO: uncomment later when backend will send needed data for these columns -->
            <!-- <div class="media__text">
              <base-table-cell :cell="cells.tracks" /> <template>Tracks</template>
            </div> -->
          </div>
        </base-table-mobile-row>
      </template>

      <template #mobile-row-skeleton>
        <artist-mobile-row-skeleton />
      </template>
    </base-table>

    <mobile-footer v-if="noMoreDataToLoad" />
  </div>
</template>

<script>
import BaseTable, { BaseTableRow, BaseTableCell, BaseTableMobileRow } from 'components/ui/base-table/base-table.vue';
import { TableCell } from 'components/ui/table-cell/table-cell';
import Breadcrumb from 'components/breadcrumb';
import ArtistMobileRowSkeleton from 'components/artist/artist-mobile-row-skeleton.vue';
import { tableColumnsDef } from 'helpers/table-columns';
import { clientFetchData } from "mixins/client-fetch-data";
import { Pagination } from 'helpers/pagination';
import { isParentElementInteractive } from 'helpers/dom';
import MobileFooter from "components/layouts/mobile-footer.vue";
import { artistRoute } from 'helpers/routing';

const columns = [
  tableColumnsDef.profileAvatar,
  {
    title: 'Name',
    key: 'name',
    anatomy: 'master',
    component: TableCell.ProfileLink,
    componentProps: item => ({
      profile: item,
      getRoute: artistRoute
    })
  },
  // TODO: uncomment later when backend will send needed data for these columns
  // {
  //   title: 'Tracks',
  //   key: 'tracks',
  //   component: TableCell.Number,
  //   componentProps: (item) => ({
  //     value: item.creditCount
  //   }),
  //   class: 'col-search-at col-flexible'
  // },
  // {
  //   title: 'Albums',
  //   key: 'albums',
  //   component: TableCell.Number,
  //   componentProps: (item) => ({
  //     value: item.collectionCount
  //   }),
  //   class: 'col-search-aa'
  // }
];

export default {
  name: 'artist-search-results',
  mixins: [clientFetchData],
  components: {
    Breadcrumb,
    BaseTable,
    BaseTableRow,
    BaseTableCell,
    ArtistMobileRowSkeleton,
    BaseTableMobileRow,
    MobileFooter
  },
  serverPrefetch() {
    return this.fetchData();
  },
  clientFetchData() {
    this.fetchData();
  },
  data() {
    return {
      pagination: new Pagination({ limit: 20 }),
      isLoadingData: false
    };
  },
  computed: {
    artistList() {
      return this.$store.getters['search/artistSearchResults'];
    },
    noMoreDataToLoad() {
      return this.pagination.isNoMoreDataToLoad(this.artistList);
    },
    tableColumns() {
      return columns;
    }
  },
  watch: {
    $route() {
      this.pagination.reset();
      this.fetchData();
    },
  },
  methods: {
    async fetchData() {
      const query = this.$route.query;
      const payload = {
        query: {
          ...this.pagination.query,
          keyword: this.$route.query.keyword
        }
      };
      
      const action = this.pagination.page > 1
        ? 'search/searchMoreArtists'
        : 'search/searchArtist';

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
    navigateToArtist(event, artist) {
      if (!isParentElementInteractive(event.target)) {
        this.$router.push(artistRoute(artist));
      }
    }
  },
};
</script>

<style lang="scss">
.artist-search-page {
  @media (min-width: 768px) {
    padding-bottom: 35px;
  }
  &__table {
    --tr-border-left-indent: 61px;
    --tr-main-color: #141413;
  }
}
</style>