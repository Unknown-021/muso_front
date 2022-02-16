<template>
  <div>
    <catalog-master-table
      :group.sync="group"
      :search-query.sync="searchQuery"
      :data="catalog"
      :pagination="pagination"
      :query.sync="query"
    />
    <router-view :key="$route.path" />
  </div>
</template>

<script>
import CatalogMasterTable from 'components/analytics/catalog-master-table.vue';
import { Pagination } from 'helpers/pagination-new';

export default {
  name: 'analytics-catalog',
  components: {
    CatalogMasterTable
  },
  props: {
    timePeriod: {
      type: String,
      required: true
    },
    groupBy: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      searchQuery: '',
      pagination: new Pagination({
        getData: this.getCatalog
      }),
      isLoading: false,
      query: {
        sortKey: 'streams',
        sortDirection: 'DESC'
      }
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    timePeriod: 'fetchData',
    group: 'fetchData',
    searchQuery: 'fetchData',
    groupBy: {
      immediate: true,
      handler: 'setGroup'
    },
    query: {
      deep: true,
      handler: 'fetchData'
    } 
  },
  computed: {
    catalog() {
      return this.$store.getters['analytics/catalog/data'];
    },
    group: {
      get() {
        return this.$store.getters['analytics/catalog/group'];
      },
      set(value) {
        this.$store.commit('analytics/catalog/setGroup', value);
      }
    },
    user() {
      return this.$store.getters['user/data'];
    },
    profileId() {
      return this.demoProfileId || this.user.id;
    },
    demoProfileId() {
      return this.$route.params.id;
    }
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      this.pagination.reset();
      return this.pagination.nextPage().then(() => this.isLoading = false);
    },
    getCatalog() {
      return this.$store.dispatch('analytics/catalog/getCatalog', {
        id: this.profileId,
        pagination: this.pagination,
        params: {
          period: this.timePeriod,
          group: this.group,
          query: this.searchQuery || undefined,
          ...this.getSortingParams()
        }
      });
    },
    setGroup(value) {
      if (value) {
        this.group = value;
      }
    },
    getSortingParams() {
      return {
        sortKey: this.query.sortKey,
        sortDirection: this.query.sortDirection,
      }
    }
  }
}
</script>