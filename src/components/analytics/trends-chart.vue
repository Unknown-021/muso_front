<template>
  <linear-chart :data="dataset" :axis-x="axisX" :axis-y="axisY" :is-loading="isLoading" @change="handleChange">
    <chart-guider v-if="currIndex !== -1 && !isEmpty" :point="chartPoint">
      <template #tooltip>
        <trends-chart-tooltip
          :group="group"
          :data-item-index="currIndex"
          :chart-type="chartType"
        />
      </template>
    </chart-guider>
  </linear-chart>
</template>

<script>
import LinearChart from 'components/ui/chart/linear-chart.vue';
import ChartGuider from 'components/ui/chart/chart-guider';
import ChartTooltip from 'components/ui/chart/chart-tooltip';
import TrendsChartTooltip from './trends-chart-tooltip.vue';
import { createArray } from 'helpers/array';
import { MILLISECONDS_IN_DAY } from 'helpers/date.constants';
import { min, max } from 'helpers/number';
import { resetTime, isTheSameYear } from 'helpers/date';
import number from 'filters/number';

const periodGrouping = {
  '1d': {
    tickCount: 2,
    step: 1
  },
  '1w': {
    tickCount: 7,
    step: 1
  },
  '1m': {
    tickCount: 7,
    step: 5
  },
  '3m': {
    tickCount: 12,
    step: 8
  },
  '1y': {
    tickCount: 12,
    step: 30
  },
  'ytd': {
    tickCount: 8,
    step: 30
  },
  'all': {
    tickCount: 10,
    step: 30
  }
};

function generateDates(date, count, step) {
  return createArray(count, index => {
    return Number(date) + (index * step);
  });
}

export default {
  name: 'trends-chart',
  components: {
    LinearChart,
    ChartGuider,
    ChartTooltip,
    TrendsChartTooltip
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
    isLoading: {
      type: Boolean,
      default: true
    },
    chartType: {
      type: String,
      default: 'trends'
    }
  },
  data() {
    return {
      currIndex: -1,
      chartPoint: null
    };
  },
  mounted() {
    window.trendsChart = this;
  },
  computed: {
    total() {
      return this.$store.getters[`analytics/${this.chartType}/chartTotal`];
    },
    periodData() {
      return periodGrouping[this.period];
    },
    isEmpty() {
      return this.total.length === 0;
    },
    zeroTotal() {
      return this.zeroDates.reverse().map(date => ({
        date,
        value: 0
      }));
    },
    zeroDates() {
      const today = resetTime(new Date());
      const step = -this.periodData.step * MILLISECONDS_IN_DAY;
      return generateDates(today, this.periodData.tickCount, step);
    },
    data() {
      return this.isEmpty
        ? this.zeroTotal
        : this.total;
    },
    groupedData() {
      return this.data;
    },
    dataset() {
      return this.data.map(item => ({
        x: new Date(item.date),
        y: item.value
      }));
    },
    axisX() {
      return {
        tickCount: this.periodData.tickCount,
        getTick: this.shortDate
      };
    },
    axisY() {
      return {
        min: 0,
        maxEmpty: 800000,
        tickCount: 5,
        getTick: tick => number(tick, true)
      };
    },
    isTheSameYear() {
      return isTheSameYear(new Date(this.minDate), new Date(this.maxDate));
    },
    minDate() {
      return min(this.dataset, 'x');
    },
    maxDate() {
      return max(this.dataset, 'x');
    }
  },
  methods: {
    shortDate(value) {
      return this.$date(value, this.isTheSameYear ? 'dayMonth' : 'short');
    },
    handleChange({ point, pointIndex }) {
      this.currIndex = pointIndex;
      this.chartPoint = point;
    }
  }
}
</script>
