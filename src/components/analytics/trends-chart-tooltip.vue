<template>
  <div class="ch-tooltip">
    <div class="ch-tooltip__head">
      <h3 class="ch-tooltip__title">{{ date }}</h3>
      <span>{{ statsPropertyText }}</span>
    </div>
    <p v-if="!selectedItems.length || selectedItems.length > 1" class="ch-tooltip__item">
      <span class="ch-tooltip__category">{{ totalLabel }}</span>
      <span>{{ $number(dataItem.value) }}</span>
    </p>
    <template v-for="item in selectedItems">
      <p :key="item.id" class="ch-tooltip__item">
        <span class="ch-tooltip__item-title">{{ item.label }}</span>
        <span>{{ $number(item.value) }}</span>
      </p>
    </template>
    <p v-if="restCount" class="ch-tooltip__item ch-tooltip__item--rest">
      <span class="ch-tooltip__item-title">{{ restCount }} More Tracks</span>
      <span>{{ $number(restStreamsCount) }}</span>
    </p>
  </div>
</template>

<script>
import { streamsAccumulator } from 'store/modules/analytics/trends';
import { statsPropertyText } from 'store/modules/analytics/constants/stats-property';
import { capitalizeWord } from 'helpers/text';

export default {
  name: 'trends-chart-tooltip',
  inject: {
    chart: {
      type: Object,
      required: true
    }
  },
  props: {
    group: {
      type: String,
      required: true
    },
    dataItemIndex: {
      type: Number,
      required: true
    },
    chartType: {
      type: String,
      default: 'trends'
    }
  },
  computed: {
    statsPropertyText() {
      const statsProperty = this.$store.getters['analytics/trends/statsProperty'];
      return statsPropertyText(statsProperty);
    },
    dataItem() {
      return this.total[this.dataItemIndex];
    },
    totalLabel() {
      return this.selected.length
        ? 'Total'
        : 'All ' + capitalizeWord(this.group);
    },
    date() {
      return this.$date(this.dataItem.date);
    },
    selectedItems() {
      return this.selected.map(item => ({
        id: item.id,
        label: item.title,
        value: this.getItemValueByDate(item.data)
      }));
    },
    total() {
      return this.$store.getters[`analytics/${this.chartType}/chartTotal`];
    },
    selected() {
      return this.$store.getters['analytics/trends/limitedChartSelected'];
    },
    restCount() {
      return this.$store.getters['analytics/trends/selectionExceededLimitCount'];
    },
    restStreamsCount() {
      const selectedStreamsCount = this.selectedItems.reduce(streamsAccumulator, 0);
      return this.dataItem.value - selectedStreamsCount;
    }
  },
  methods: {
    getItemValueByDate(items) {
      const item = items.find(item => item.date === this.dataItem.date);
      return item?.value || 0;
    }
  }
}
</script>

<style lang="scss">
.ch-tooltip {
  position: absolute;
  z-index: 999;
  pointer-events: none;
  padding: 15px;
  width: 270px;
  border-radius: 8px;
  background-color: #21201F;
  &__head {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    line-height: 1.3;
    color: var(--overlay-1-color);
  }
  &__title {
    margin-right: 20px;
    font-size: 14px;
    font-weight: 500;
  }
  &__item {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    line-height: 1.3;
    --chart-tooltip-item-title-color: var(--overlay-2-color);
    &--rest {
      color: var(--overlay-3-color);
      --chart-tooltip-item-title-color: currentColor;
    }
  }
  &__item-title {
    margin-right: 20px;
    color: var(--chart-tooltip-item-title-color);
  }
}
</style>