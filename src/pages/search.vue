<template>
  <div>
    <breadcrumb />
    <search-result />
  </div>
</template>

<script>
import Breadcrumb from "components/breadcrumb";
import SearchResult from "components/search";
import { debounce } from 'helpers/utils';
import { clientFetchData } from "mixins/client-fetch-data";

export default {
  name: 'search-page',
  mixins: [clientFetchData],
  components: {
    Breadcrumb,
    SearchResult
  },
  serverPrefetch() {
    return this.search();
  },
  clientFetchData() {
    this.search();
  },
  watch: {
    keyword() {
      this.debouncedSearch();
    }
  },
  computed: {
    debouncedSearch() {
      return debounce(this.search, 300);
    },
    keyword() {
      return this.$route.query.keyword;
    }
  },
  methods: {
    search(keyword = this.keyword) {
      return this.$store.dispatch('search/search', {
        query: {
          keyword,
          limit: 6,
        }
      });
    }
  }
};
</script>
