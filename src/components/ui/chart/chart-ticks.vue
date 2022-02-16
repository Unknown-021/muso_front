<template>
  <g>
    <template v-for="tickNum in tickCount">
      <line :key="tickNum" v-bind="coords(tickNum - 1)" />
    </template>
  </g>
</template>

<script>
export default {
  name: 'chart-ticks',
  props: {
    axis: {
      type: String,
      required: true
    },
    tickCount: {
      type: Number,
      required: true
    },
    gap: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    }
  },
  methods: {
    coords(index) {
      const point = index * this.gap;
      if (this.axis === 'x') {
        return {
          x1: point,
          y1: 0,
          x2: point,
          y2: this.width
        };
      } else if (this.axis === 'y') {
        return {
          x1: 0,
          y1: point,
          x2: this.width,
          y2: point
        };
      }
    }
  }
}
</script>