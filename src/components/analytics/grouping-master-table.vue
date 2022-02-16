<template>
  <master-table>
    <template #header>
      <master-header>
        <master-search :value="searchQuery" @input="setSearchQuery" debounce />

        <template #tags>
          <time-period :value.sync="timePeriod" />
        </template>
      </master-header>
    </template>

    <sort-button
      class="profile-credits__sorter"
      :sorting="sorting"
      :sorting-columns="sortingColumns"
      @change="handleSorterChange"
    />

    <grouping-table 
      :data="albumsTracks"
      :loading="pagination.loading"
      :row-skeleton-count="pagination.skeletonCount"
      :disable-infinite-scroll="pagination.noDataLeft"
      @load-more="pagination.nextPage"
      @change="handleTableChange"
    />
  </master-table>
</template>

<script>
import MasterTable from 'components/ui/master-table.vue';
import MasterHeader from 'components/ui/master-header.vue';
import MasterSearch from 'components/ui/master-search.vue';
import MasterGrouping from 'components/ui/master-grouping.vue';
import BaseIcon from 'components/ui/base-icon/base-icon.vue';
import SortButton from 'components/ui/sort-button.vue';
import TimePeriod from 'components/ui/time-period.vue';
import GroupingTable from 'components/analytics/grouping-table';
import { Pagination } from 'helpers/pagination-new';
import { commonColumns } from 'components/analytics/grouping-table.vue';

export default {
  name: 'grouping-master-table',
  components: {
    MasterTable,
    MasterHeader,
    MasterSearch,
    MasterGrouping,
    BaseIcon,
    SortButton,
    TimePeriod,
    GroupingTable
  },
  props: {
    entityId: {
      type: String,
      required: false
    },
    query: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timePeriod: 'all',
      searchQuery: '',
      isLoading: true,
      pagination: new Pagination({
        getData: this.fetchGroupingData
      }),
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    timePeriod() {
      this.fetchData();
    },
    query: {
      deep: true,
      handler: 'fetchData'
    }
  },
  computed: {
    sorting: {
      get() {
        return {
          key: this.query.sortKey,
          order: this.query.sortDirection || 'NONE'
        };
      },
      set(value) {
        let sortKey = undefined;
        let sortDirection = undefined;

        if (value.order !== 'NONE') {
          sortKey = value.key;
          sortDirection = value.order;
        }
        
        this.query.sortKey = sortKey;
        this.query.sortDirection = sortDirection;
      }
    },
    sortingColumns() {
      return commonColumns.filter(col => col.sorter);
    },
    albumsTracks() {
      return this.$store.getters['analytics/grouping/data'];
    },
    id() {
      return this.$route.params.entityId;
    },
    profileId() {
      return this.demoProfileId || this.user.id;
    },
    user() {
      return this.$store.getters['user/data'];
    },
    demoProfileId() {
      return this.$route.params.id;
    },
    groupType() {
      return this.$route.name;
    },
    sortingColumns() {
      return commonColumns.filter(col => col.sorter);
    },
  },
  methods: {
    setSearchQuery(value) {
      this.$emit('update:search-query', value);
    },
    async fetchData() {
      this.pagination.reset();
      return Promise.all([
        this.pagination.nextPage(),
      ])
    },
    fetchGroupingData() {
      return  this.$store.dispatch('analytics/grouping/getGroupingData', {
        id: this.id,
        group: this.groupType,
        profileId: this.profileId,
        pagination: this.pagination,
        params: {
          period: this.timePeriod,
          ...this.getSortingParams()
        }
      })
    },
    getSortingParams() {
      return {
        sortKey: this.query.sortKey,
        sortDirection: this.query.sortDirection,
      }
    },
    async handleSorterChange(sorting) {
      this.sorting = sorting;
    },
    handleTableChange({ sorting }) {
      this.handleSorterChange(sorting);
    },
  }
}
</script>
