<template>
  <div :class="axisData.class">
    <template v-for="(tick, index) in ticks">
      <span
        :key="tick"
        class="ch-label"
        :class="{'skeleton-loader skeleton-loader--chart' : isLoading}"
        :style="getTickStyle(index)"
      >
        {{ getTick(tick) }}
      </span>
    </template>
  </div>
</template>

<script>
const axisDataMap = {
  x: {
    position: 'left',
    class: 'x-axis'
  },
  y: {
    position: 'top',
    class: 'y-axis'
  }
};

export default {
  name: 'chart-axis',
  props: {
    axis: {
      type: String,
      required: true
    },
    ticks: {
      type: Array,
      required: true
    },
    points: {
      type: Array,
      required: true
    },
    getTick: {
      type: Function,
      required: true
    },
    isLoading: {
      type: Boolean,
      require: true
    }
  },
  computed: {
    axisData() {
      return axisDataMap[this.axis];
    }
  },
  methods: {
    getTickStyle(index) {
      return {
        [this.axisData.position]: this.points[index] + 'px'
      };
    }
  }
}
</script>

<style lang="scss">
.x-axis {
  --axis-transform: translateX(-50%);
  :first-child {
    --axis-transform: translateX(0);
  }
  &[data-has-last-tick] :last-child {
    --axis-transform: translateX(-100%);
  }
}
.y-axis {
  --axis-transform: translateY(-50%);
}

.ch-label {
  position: absolute;
  white-space: nowrap;
  transform: var(--axis-transform);
}
</style>