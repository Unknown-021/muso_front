<template>
  <window-resize @change="calcSize">
    <div class="line-chart" :data-empty="isEmpty">
      <div ref="wrap" class="ch-wrap">
        <div class="line-chart__zero-state-wrapper">
          <div v-if="isEmpty && !isLoading" class="zero-static zero-static--light zero-state-chart">
            <base-icon name="activity"/>
            <span class="zero-static__text">No Data Available</span>
          </div>
        </div>
        <svg v-on="listeners">
          <g v-if="!isEmpty || (isEmpty && isLoading)" class="ch-grid">
            <chart-ticks axis="y" :tick-count="yTicks.length" :gap="gridRowGap" :width="width" />
          </g>
          <g class="ch-series" fill=none>
            <path :d="linePath" />
          </g>
          <g v-if="!isEmpty || !isLoading" fill="url(#MyGradient)">
            <path :d="linePathGradient" />
          </g>
          <linearGradient id="MyGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"  stop-color="#6be7c8" stop-opacity="0.4"/>
            <stop offset="68%" stop-color="#6be7c8" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#6be7c8" stop-opacity="0"/>
          </linearGradient>
        </svg>

        <slot />
      </div>
      <template v-if="width">
        <chart-axis axis="y" :ticks="yTicks" :get-tick="axisY.getTick" :points="yTicksPoints" :is-loading="isLoading" />
        <chart-axis
          axis="x"
          :ticks="xTicks"
          :get-tick="axisX.getTick"
          :points="xTicksPoints"
          :data-has-last-tick="axisXhasLastTicks"
          :is-loading="isLoading"
        />
      </template>
    </div>
  </window-resize>
</template>

<script>
import ChartBox from './chart-box.vue';
import ChartAxis from './chart-axis.vue';
import ChartTicks from './chart-ticks.vue';
import WindowResize from 'components/utils/window-resize';
import { drawLinearPath } from './chart-svg.utils';
import { lastElement } from 'helpers/array';
import { getExtremePoints, getCurrPointIndex } from './chart.utils';
import BaseIcon from 'components/ui/base-icon/base-icon.vue';

export default {
  name: 'linear-chart',
  extends: ChartBox,
  components: {
    WindowResize,
    ChartAxis,
    ChartTicks,
    BaseIcon
  },
  provide() {
    return {
      chart: this
    };
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      x: null
    };
  },
  mounted() {
    window.linear = this;
  },
  watch: {
    currPointIndex() {
      this.$emit('change', this.currData);
    }
  },
  computed: {
    listeners() {
      if (this.isEmpty) {
        return {};
      }
      return {
        mousemove: this.handleMouseMove,
        mouseleave: this.handleMouseLeave
      };
    },
    isEmpty() {
      return this.dataMaxY === 0;
    },
    linePath() {
      return drawLinearPath(this.points);
    },
    linePathGradient() {
      let gradientPoints = [...this.points];
      gradientPoints.unshift( {x:0, y: this.height} );
      gradientPoints.push({ x: this.width, y: this.height });
      return drawLinearPath(gradientPoints);
    },
    normalizePoints(points) {
      points.unshift({ x:0, y: this.height });
      points.unshift({ x: this.width, y: this.height });
      return points
    },
    currPointIndex() {
      if (this.x === null) {
        return -1;
      }
      const extremePoints = getExtremePoints(this.x, this.points);
      const pointIndex = getCurrPointIndex(this.x, extremePoints);
      return pointIndex;
    },
    currPoint() {
      return this.points[this.currPointIndex] || null;
    },
    currData() {
      return {
        point: this.currPoint,
        pointIndex: this.currPointIndex
      };
    },
    axisXhasLastTicks() {
      return this.dataMaxX === lastElement(this.xTicks);
    }
  },
  methods: {
    getBoxEl() {
      return this.$refs.wrap;
    },
    handleMouseMove(event) {
      const { currentTarget, clientX } = event;
      const box = currentTarget.getBoundingClientRect();
      this.x = clientX - box.left;
    },
    handleMouseLeave() {
      this.x = null;
    }
  }
}
</script>

<style lang="scss">
:root {
  --chart-height: 260px;
  --chart-series-stroke: var(--primary-color);
}
.line-chart {
  position: relative;
  display: block;
  padding-left: 50px;
  padding-bottom: 30px;
  width: 100%;
  &[data-empty] {
    --chart-series-stroke: var(--overlay-4-color);
  }
  svg {
    width: 100%;
    height: 100%;
    display: block;
    stroke-width: 2px;
    overflow: visible;
  }
  &__zero-state-wrapper {
    display: flex;
    justify-content: center;
    & svg {
      height: 48px;
      width: 48px;
    }
  }
}
.ch-wrap {
  position: relative;
  width: 100%;
  height: var(--chart-height);
}
.ch-grid {
  stroke: var(--overlay-4-color);
  stroke-width: 1px;
  // stroke-dasharray: 2px;
}
.ch-series {
  stroke: var(--chart-series-stroke);
  stroke-linecap: round;
}
.ch-point {
  stroke: #F7F7F7;
  stroke-width: 10px;
  stroke-linecap: round;
}
.x-axis,
.y-axis {
  font-size: 12px;
  color: var(--overlay-3-color);
}
.x-axis {
  position: absolute;
  bottom: 0;
  left: 50px;
  right: 0;
  padding-top: 12px;
  height: 30px;
}
.y-axis {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  bottom: 30px;
}
.zero-state-chart {
  position: absolute;
  margin-right: 54px;
}
</style>
