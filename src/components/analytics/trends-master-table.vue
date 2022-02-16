<template>
  <master-table>
    <template #header>
      <master-header>
        <master-search :value="searchQuery" @input="setSearchQuery" debounce />

        <template #tags>
          <master-grouping :value="group" :items="groupItems" @update:value="setGroup" />
        </template>
      </master-header>
    </template>

    <sort-button
      class="profile-credits__sorter"
      :sorting="sorting"
      :sorting-columns="sortingColumns"
      @change="handleSorterChange"
    />

    <trends-table
      v-if="!pagination.noDataLeft || data.length"
      :group="group"
      :data="data"
      :loading="pagination.loading"
      :row-skeleton-count="pagination.skeletonCount"
      :disable-infinite-scroll="pagination.noDataLeft"
      :time-period="timePeriod"
      :demo-profile-id="demoProfileId"
      @load-more="pagination.nextPage"
      @change="handleTableChange"
    />
    <div v-else-if="!isLoading" class="zero-static zero-static--light zero-state__table">
      <base-icon name="list"/>
      <span class="zero-static__text">No Data Available</span>
    </div>
  </master-table>
</template>

<script>
import MasterTable from 'components/ui/master-table.vue';
import MasterHeader from 'components/ui/master-header.vue';
import MasterSearch from 'components/ui/master-search.vue';
import MasterGrouping from 'components/ui/master-grouping.vue';
import TrendsTable from './trends-table.vue';
import BaseIcon from 'components/ui/base-icon/base-icon.vue';
import { commonColumns } from 'components/analytics/trends-table.vue';
import SortButton from 'components/ui/sort-button.vue';

export default {
  name: 'trends-master-table',
  components: {
    MasterTable,
    MasterHeader,
    MasterSearch,
    MasterGrouping,
    TrendsTable,
    BaseIcon,
    SortButton
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    group: {
      type: String,
      required: true
    },
    searchQuery: {
      type: String,
      default: ''
    },
    pagination: {
      type: Object,
      required: true
    },
    timePeriod: {
      type: String,
      required: true
    },
    query: {
      type: Object,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    demoProfileId: {
      type: String,
      default: null
    }
  },
  watch: {
    query(value) {
      this.$emit('query:update', value);
    }
  },
  computed: {
    groupItems() {
      return [
        {
          value: 'tracks',
          title: 'Tracks'
        }, {
          value: 'albums',
          title: 'Albums'
        }, {
          value: 'collaborators',
          title: 'Collaborators'
        }, {
          value: 'credits',
          title: 'Credits'
        }
      ];
    },
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
  },
  methods: {
    setSearchQuery(value) {
      this.$emit('update:search-query', value);
    },
    setGroup(value) {
      this.$emit('update:group', value);
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
