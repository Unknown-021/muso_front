<template>
  <master-table class="chart-table" :class="{'trends-chart-height' : changeChartHeight}">
    <template #header>
      <master-header>
        <template #title>
          <form-inline-select
            :value.sync="statsProperty"
            :options="statsProperties"
            :offset="[0, 12]"
          />
        </template>
        <template #text>
          Total {{ sourceTitle }}: 
          <span v-if="!isLoading" class="c-overlay-1">{{ $number(totalStreams) }}</span>
          <span v-else :class="{'skeleton-loader mheader-skeleton' : isLoading}"></span>
        </template>
      </master-header>
    </template>
    
    <div class="chart-table__filters">
      <template v-if="dataSources.length > 1">
        <inline-filters
          :items="dataSources"
          :selected="selectedSources"
          @update:selected="setSelectedSources"
        />
      </template>
    </div>

    <trends-chart
      :period="period"
      :group="group"
      class="chart-table__chart"
      :is-loading="isLoading"
    />
  </master-table>
</template>

<script>
import MasterTable from 'components/ui/master-table.vue';
import MasterHeader from 'components/ui/master-header.vue';
import FormInlineSelect from 'components/ui/form-inline-select.vue';
import InlineFilters from 'components/ui/inline-filters.vue';
import TrendsChart from './trends-chart.vue';
import { statsProperties, statsPropertySourceMap, statsPropertiesTabs } from 'store/modules/analytics/constants/stats-property';

export default {
  name: 'trends-chart-table',
  components: {
    MasterTable,
    MasterHeader,
    InlineFilters,
    TrendsChart,
    FormInlineSelect
  },
  props: {
    period: {
      type: String,
      required: true
    },
    group: {
      type: String,
      required: true
    },
    selectedSources: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      require: true
    }
  },
  watch: {
    statsProperty() {
      this.setSelectedSources([]);
    }
  },
  computed: {
    totalStreams() {
      return this.$store.getters['analytics/trends/totalStreams'];
    },
    statsProperties() {
      return statsProperties;
    },
    dataSources() {
      return statsPropertySourceMap[this.statsProperty];
    },
    statsProperty: {
      get() {
        return this.$store.getters['analytics/trends/statsProperty'];
      },
      set(value) {
        this.$store.commit('analytics/trends/setStatsProperty', value);
      }
    },
    changeChartHeight() {
      return (this.$route.name === 'analytics-trends')
    },
    sourceTitle() {
      const tabTitle = statsPropertiesTabs.filter( item => item.value === this.statsProperty);
      return tabTitle[0].title;
    }
  },
  methods: {
    setSelectedSources(value) {
      this.$emit('update:selected-sources', value);
    },
    setSearchQuery(value) {
      this.$emit('update:search-query', value);
    },
    setGroup(value) {
      this.$emit('update:group', value);
    }
  }
}
</script>

<style lang="scss">
.trends-chart-height {
  --chart-height: 260px;
}
.chart-table {
  &__filters {
    min-height: 26px;
  }
  &__chart {
    margin-top: 30px;
  }
}
.mheader-skeleton {
  position: relative;
  top: 2px;
  display: inline-flex;
  width: 50px;
  height: 17px;
}
</style>
