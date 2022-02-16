<template>
  <div>
    <div
      ref="guider"
      class="ch-guider"
      :style="guiderStyle"
    >
      <div class="ch-guider-point" :style="guiderPointStyle" />
    </div>
   
    <div ref="tooltip">
      <slot name="tooltip" />
    </div>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core';

export default {
  name: 'chart-guider',
  inject: {
    chart: {
      type: Object,
      required: true
    }
  },
  props: {
    point: {
      type: Object,
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
  beforeDestroy() {
    this.tooltip.destroy();
  },
  watch: {
    point() {
      this.tooltip.update();
    }
  },
  computed: {
    guiderStyle() {
      return {
        transform: `translateX(${this.point.x}px)`,
        top: 0
      };
    },
    guiderPointStyle() {
      return {
        transform: `translateY(${this.point.y}px)`
      };
    }
  },
  methods: {
    createTooltip() {
      this.tooltip = createPopper(this.$refs.guider, this.$refs.tooltip.firstChild, {
        placement: 'right',
        modifiers: [{
          name: 'offset',
          options: {
            offset: [0, 10]
          }
        },
        {
          name: 'flip',
          options: {
            boundary: this.chart.$refs.wrap,
            fallbackPlacements: ['left']
          }
        }]
      });
    }
  }
}
</script>

<style lang="scss">
.ch-guider {
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  border-left: 1px solid #8F8F8F;
}
.ch-guider-point {
  pointer-events: none;
  --ch-guider-point-size: 11px;
  position: absolute;
  top: 0;
  left: 0;
  margin-left: -6px;
  margin-top: -5px;
  display: block;
  width: var(--ch-guider-point-size);
  height: var(--ch-guider-point-size);
  border-radius: var(--ch-guider-point-size);
  background-color: var(--overlay-1-color);
}
</style>