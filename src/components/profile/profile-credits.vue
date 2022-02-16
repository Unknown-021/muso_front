<template>
  <transition name="fade" mode="out-in">
    <fade-height-transition>
    <skeleton-view v-if="loading" />

    <div v-else class="profile-credits">
      <h2 class="visually-hidden">Credits</h2>

      <div v-if="data.length || searchQuery || isLoadingData" class="profile-credits__controls-wrap">
        <div class="profile-credits__info">
          <span class="profile-credits__count">
            <slot name="title" />
          </span>
          <base-expandable-search :value="searchQuery" @input="debouncedSearchHandler" />
          <sort-button
            class="profile-credits__sorter"
            :sorting="sorting"
            :sorting-columns="sortingColumns"
            @change="handleSorterChange"
          />
        </div>

        <credits-filters
          class="profile-credits__filters"
          :parent-associations="filters"
          v-model="selectedAssociations"
          @change="fetchCredits"
        />
      </div>

      <template v-if="data.length || searchQuery || isLoadingData">
        <songs-credits-table
          class="profile-credits__table"
          :loading="isLoadingData"
          :data="data"
          :sorting="sorting"
          :row-skeleton-count="pagination.limit"
          :disable-infinite-scroll="noMoreDataToLoad"
          @change="handleTableChange"
          @load-more="fetchMoreCredits"
        />
      </template>

      <template v-else>
        <slot name="zero-state" />
      </template>
    </div>
    </fade-height-transition>
  </transition>
</template>

<script>
import CreditsFilters from "components/ui/credits/credits-filters";
import SkeletonView from "./profile-credits-skeleton";;
import SortButton from 'components/ui/sort-button.vue';
import SongsCreditsTable, { tableColumns } from 'components/song/songs-credits-table.vue';
import { Pagination } from 'helpers/pagination';
import { debounce } from 'helpers/utils';
import BaseExpandableSearch from 'components/ui/base-expandable-search/base-expandable-search.vue';
import FadeHeightTransition from 'components/utils/fade-height-transition.vue';

export default {
  name: 'profile-credits',
  components: {
    CreditsFilters,
    SkeletonView,
    SongsCreditsTable,
    SortButton,
    BaseExpandableSearch,
    FadeHeightTransition
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    creditsQuery: {
      type: Object,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    pagination: {
      type: Pagination,
      required: true
    },
    associations: {
      type: Array,
      required: true
    },
    fetchData: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      isLoadingData: false,
      query: {
        sortKey: undefined,
        sortDirection: undefined,
        filter: undefined,
        keyword: undefined
      }
    };
  },
  watch: {
    creditsQuery: {
      immediate: true,
      handler(value) {
        if (this.query !== value) {
          this.query = value;
        }
      }
    },
    query(value) {
      this.$emit('credits-query:update', value);
    }
  },
  computed: {
    searchQuery: {
      get() { return this.query.keyword; },
      set(value) { this.query.keyword = value; }
    },
    selectedAssociations: {
      get() { return this.query.filter || []; },
      set(value) { this.query.filter = value; }
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
    noMoreDataToLoad() {
      return this.pagination.isNoMoreDataToLoad(this.data);
    },
    filters() {
      return this.associations.filter(item => item.id !== null);
    },
    isSelectedAllAssociations() {
      return (
        this.selectedAssociations.length === 0 ||
        this.selectedAssociations.length === this.filters.length
      );
    },
    sortingColumns() {
      return tableColumns.filter(col => col.sorter);
    },
    debouncedSearchHandler() {
      return debounce((value) => {
        const query = value || undefined;

        if (this.searchQuery !== query) {
          this.searchQuery = query;
          this.fetchCredits();
        }
      }, 200);
    }
  },
  methods: {
    handleTableChange({ sorting }) {
      this.handleSorterChange(sorting);
    },
    async handleSorterChange(sorting) {
      this.sorting = sorting;
      await this.fetchCredits();
    },
    async fetchCredits() {
      try {
        this.isLoadingData = true;
        this.pagination.reset();
        await this.fetchData();
      } finally {
        this.isLoadingData = false;
      }
    },
    async fetchMoreCredits() {
      try {
        this.isLoadingData = true;
        await this.pagination.nextPage(this.fetchData);
      } finally {
        this.isLoadingData = false;
      }
    }
  }
};
</script>

<style lang="scss">
.profile-credits {
  &__controls-wrap {
    @media (min-width: 768px) {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 5px;
    }
  }
  &__info {
    display: flex;
    align-items: center;
    @media (max-width: 767px) {
      margin-top: -5px;
      margin-bottom: 19px;
    }
    @media (min-width: 768px) {
      order: 1;
      flex-shrink: 0;
      justify-content: flex-end;
      margin-left: 30px;
      width: 215px;
    }
  }
  &__sorter {
    margin-left: 10px;
    @media (min-width: 768px) {
      display: none;
    }
  }
  &__count {
    margin-right: auto;
    font-size: 15px;
    line-height: 1.2;
    font-weight: 600;
    color: #8F8F8F;
    @media (min-width: 768px) {
      display: none;
    }
  }
  &__filters {
    @media (max-width: 767px) {
      margin-bottom: 12px;
    }
  }
}
</style>
