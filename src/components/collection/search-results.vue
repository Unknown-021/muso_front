<template>
  <div class="albums-search">
    <breadcrumb />
    <albums-grid
      v-if="albums.length || isLoadingData"
      :albums="albums"
      :loading="isLoadingData"
      :pagination="pagination"
      :fetch-data="fetchData"
    />

    <div v-else class="empty">
      <img class="empty__img" src="images/zero-state/sad-smile.svg" width="96" height="96" />
      <p class="empty__text">Oops, no results found.</p>
    </div>

    <mobile-footer v-if="noMoreDataToLoad" />
  </div>
</template>

<script>
import Breadcrumb from 'components/breadcrumb';
import AlbumsGrid from 'components/collection/albums-grid.vue';
import { Pagination } from 'helpers/pagination';
import MobileFooter from "components/layouts/mobile-footer.vue";
import { clientFetchData } from "mixins/client-fetch-data";

export default {
  name: 'albums-search-results',
  mixins: [clientFetchData],
  components: {
    Breadcrumb,
    AlbumsGrid,
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
    albums() {
      return this.$store.getters['search/collectionSearchResults'];
    },
    noMoreDataToLoad() {
      return this.pagination.isNoMoreDataToLoad(this.albums);
    },
  },
  watch: {
    $route(to, from) {
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
        ? 'search/searchMoreCollections'
        : 'search/searchCollections';

      try {
        this.isLoadingData = true;
        await this.$store.dispatch(action, payload);
      } finally {
        this.isLoadingData = false;
      }
    },
  },
};
</script>

<style lang="scss">
.albums-search {
  @media (min-width: 768px) {
    padding-bottom: 35px;
  }
}
</style>