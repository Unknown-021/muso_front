<template>
  <div>
    <trends-chart-table
      class="mb-m"
      :period="timePeriod"
      :group="group"
      :chart-data="trendsChart"
      :selected-sources.sync="selectedSources"
      :is-loading="isLoadingChartData"
    />
    <!-- <div style="height:435px;">
      <trends-table-chart style="height:385px;" :group="group" :selectedSources="selectedSources" :timePeriod="timePeriod"></trends-table-chart>
    </div>  -->
    <trends-master-table
      :group.sync="group"
      :search-query.sync="searchQuery"
      :data="trends"
      :pagination="pagination"
      :time-period="timePeriod"
      :query.sync="query"
      :demo-profile-id="demoProfileId"
    />
  </div>
</template>

<script>
import TrendsMasterTable from 'components/analytics/trends-master-table.vue';
import TrendsChartTable from 'components/analytics/trends-chart-table.vue';
import TrendsTableChart from 'components/analytics/trends-table-chart.vue';
import { Pagination } from 'helpers/pagination-new';

export default {
  name: 'analytics-trends',
  components: {
    TrendsMasterTable,
    TrendsChartTable,
    TrendsTableChart
  },
  props: {
    timePeriod: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      group: 'tracks',
      selectedSources: [],
      searchQuery: '',
      pagination: new Pagination({
        getData: this.getTrends
      }),
      isLoadingChartData: true,
      isGroupingChanged: false,
      query: {
        sortKey: 'percentage',
        sortDirection: 'ASC'
      }
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    timePeriod: 'fetchData',
    group() {
      this.isGroupingChanged = true;
      this.fetchData();
    },
    searchQuery: 'fetchTableData',
    selectedSources: 'fetchData',
    selectedIds() {
      if (!this.isGroupingChanged) {
        this.getTrendsChart();
      }
      this.isGroupingChanged = false;
    },
    query: {
      deep: true,
      handler: 'fetchData'
    }
  },
  computed: {
    trends() {
      return this.$store.getters['analytics/trends/data'];
    },
    trendsChart() {
      return this.$store.getters['analytics/trends/chartTotal'];
    },
    selectedIds() {
      return this.$store.getters['analytics/trends/selectedIds'];
    },
    user() {
      return this.$store.getters['user/data'];
    },
    profileId() {
      return this.demoProfileId || this.user.id;
    },
    demoProfileId() {
      return this.$route.params.id;
    },
    defaultSortingForAllPeriod() {
      return this.timePeriod === 'all' && this.query.sortDirection === 'DESC' ? {sortKey: 'currentValue',sortDirection: 'DESC'} : this.query;
      }
  },
  methods: {
    async fetchTableData() {
      this.pagination.reset();
      return Promise.all([
        this.pagination.nextPage(),
      ])
    },
    async fetchData() {
      this.pagination.reset();
      return Promise.all([
        this.getTrendsChart(),
        this.pagination.nextPage(),
      ])
    },
    getTrends() {
      return this.$store.dispatch('analytics/trends/getTrends', {
        id: this.profileId,
        pagination: this.pagination,
        group: this.group,
        params: {
          query: this.searchQuery || undefined,
          sources: this.selectedSources.join(','),
          ...this.getRequestParams(),
          ...this.getSortingParams()
        }
      });
    },
    async getTrendsChart() {
      this.isLoadingChartData = true;
      try {
        await this.$store.dispatch('analytics/trends/getTrendsChart', {
          id: this.profileId,
          params: {
            group: this.group,
            sources: this.selectedSources,
            ...this.getRequestParams(),
          }
        });
      } catch (error) {
        this.$handleError(error);
      } finally {
        this.isLoadingChartData = false;
      }
    },
    getRequestParams() {
      return {
        period: this.timePeriod,
      };
    },
    getSortingParams() {
      return this.defaultSortingForAllPeriod;
    }
  }
}
</script>
