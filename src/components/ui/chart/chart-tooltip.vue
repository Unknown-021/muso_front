<template>
  <div class="ch-tooltip">
    <p class="ch-tooltip__head">Feb 20, 2021</p>
    <p class="ch-tooltip__item">
      <span class="ch-tooltip__category">Total</span>
      <span>634,678</span>
    </p>
    <p class="ch-tooltip__item">
      <span class="ch-tooltip__category">Heartless</span>
      <span>2,155</span>
    </p>
    <!-- <p v-if="activeDataItem" class="ch-tooltip__item">
      <span class="ch-tooltip__category">Value</span>
      <span>{{ activeDataItem.y }}</span>
    </p> -->
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core';

export default {
  name: 'chart-tooltip',
  inject: {
    chart: {
      type: Object,
      required: true
    }
  },
  props: {
    getRef: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      tooltip: null
    };
  },
  mounted() {
    this.$nextTick(this.createTooltip);
  },
  watch: {
    'currentData'() {
      if (this.tooltip) {
        this.tooltip.update();
      }
    }
  },
  computed: {
    currentData() {
      return this.chart.currentData;
    }
  },
  methods: {
    createTooltip() {
      console.log(this.getRef());
      this.tooltip = createPopper(this.getRef(), this.$el, {
        placement: 'right',
        modifiers: [{
          name: 'offset',
          options: {
            offset: [0, 10]
          }
        },
        {
          name: 'preventOverflow'
        },
        {
          name: 'flip',
          options: {
            boundary: this.chart.$refs.wrap,
            fallbackPlacements: ['left']
          }
        },
        ]
      });
    },
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
    font-weight: 500;
    line-height: 1.3;
  }
  &__item {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    line-height: 1.3;
  }
  &__category {
    margin-right: 20px;
    color: #CCCCCC;
  }
}
</style>