<template>
  <client-only>
    <div class="pie-chart">
      <template v-if="activeSegment">
        <div class="pie-chart__status">
          <span 
            class="pie-chart__status-name" 
            :class="{ 'skeleton-loader' : loading }"
          >
          {{ activeSegment.id }}
          </span>
          <span 
            class="pie-chart__status-value" 
            :class="{ 'skeleton-loader' : loading }"
          >
            {{ activeSegment.currentValue | NumberFilter(true) }} 
            {{ groupTitle }}
          </span>
          <span 
            class="pie-chart__status-percentage" 
            :class="{ 'skeleton-loader' : loading }"
          >
            ({{ percentage }}%)
          </span>
        </div>
      </template>

      <button
        class="pie-chart__prev-btn"
        :class="{'pie-chart__prev-btn--disabled' : disableBtn('backward')}"
        @click="shiftActiveSegment('backward')"
        :disabled="disableBtn('backward')"
      >
        <base-icon name="chevron-left" width="16" />
      </button>

      <div class="pie-chart__wrap">
        <template>
          <pie-chart
            :labels="labels"
            :dataset="dataset"
            :active-segment-index="activeIndex"
            @segment-click="setActive($event._index)"
          />
          <nav-dots
            :count="itemsChart.length"
            :active-index="activeIndex"
            @change="setActive"
          />
        </template>
      </div>

      <button
        class="pie-chart__next-btn"
        :class="{ 'pie-chart__next-btn--disabled' : disableBtn('forward') }"
        @click="shiftActiveSegment('forward')"
        :disabled="disableBtn('forward')"
      >
        <base-icon name="chevron-right" width="16" />
      </button>
    </div>
  </client-only>
</template>

<script>
import BaseIcon from "components/ui/base-icon/base-icon.vue";
import PieChart from "components/ui/pie-chart.vue";
import NavDots from 'components/ui/nav-dots.vue';
import { shiftIndex } from 'helpers/array';
import ClientOnly from 'vue-client-only';


export default {
  name: 'analytics-roles-pie',
  components: {
    PieChart,
    NavDots,
    BaseIcon,
    ClientOnly
  },
  props: {
    activeIndex: {
      type: Number,
      required: true
    },
    group: {
      type: String,
      required: true
    },
    itemsChart: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    dataset() {
      return {
        data: this.datasetData,
        borderColor: '#0c0b09',
        borderWidth: 2,
        hoverBackgroundColor: '#438473'
      };
    },
    labels() {
      return this.itemsChart.map(item => item.id);
    },
    datasetData() {
      return this.itemsChart.map(item => item.currentValue);
    },
    activeSegment() {
      return this.itemsChart[this.activeIndex];
    },
    totalValue() {
      const accumulateValue = (accumulator, item) => accumulator + item.currentValue;
      return this.itemsChart.reduce(accumulateValue, 0);
    },
    percentage() {
      const value = calcPercentage(this.activeSegment.currentValue, this.totalValue);
      return value < 1 ? '<1' : Math.round(value);
    },
    groupTitle() {
      return this.group === 'tiktokViews' ? 'TitTok Views' : this.group
    }
  },
  methods: {
    setActive(index) {
      this.$emit('update:active-index', index);
    },
    shiftActiveSegment(direction) {
      const newIndex = shiftIndex(direction, this.activeIndex, this.itemsChart.length);
      this.setActive(newIndex);
    },
    disableBtn(direction) {
      if (direction === 'backward' && this.activeIndex === 0) {
        return true;
      } else if (direction === 'forward' && this.activeIndex === this.itemsChart.length - 1) {
        return true;
      } else {
        return false;
      }
    }
  }
};

function calcPercentage(value, max) {
  return value / max * 100;
}
</script>

<style lang="scss">
.pie-chart {
  position: relative;
  width: 574px;
  display: flex;
  justify-content: center;
  padding: 70px 0;
  align-items: center;

  &__status {
    position: absolute;
    top: 43%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  
    &-name {
      font-size: 20px;
      font-weight: 500;
      font-style: normal;
      color: color(--overlay-1-color);
    }
    &-name.skeleton-loader {
      font-size: 0;
      width: 100px;
      height: 20px;
    }  
    &-value,
    &-percentage {
      font-size: 16px;
      font-weight: 500;
      font-style: normal;
      text-transform: capitalize;
      color: var(--overlay-2-color);
    }
    &-value.skeleton-loader{
      margin-top: 5px;
      font-size: 0;
      width: 100px;
      height: 20px;
    }
    &-percentage.skeleton-loader {
      margin-top: 5px;
      font-size: 0;
      width: 60px;
      height: 20px;
    }
  }
  &__skeleton {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  &__wrap {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    height: 400px;
  }

  &__prev-btn {
    margin-right: 12px;
  }

  &__next-btn {
    margin-left: 12px;
  }

  &__next-btn,
  &__prev-btn {
    padding: 3px;
    width: 24px;
    height: 24px;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    border: 1px solid var(--overlay-2-color);
    background: none;
    outline: none;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
    &:hover{
      border-color: #928f8f;
      text-decoration: none;
      background: rgba(143, 143, 143, 0.25);
      box-shadow: inset 0 -20px 11px -13px #f7f7f74d;
      filter: drop-shadow(0 0 1px hsla(0, 0%, 96.9%, 0.5));
    }
    &--disabled {
      border: 1px solid var(--overlay-4-color);
    }
    &--disabled:hover {
      border-color: var(--overlay-4-color);
      background: none;
      box-shadow: none;
      filter: none;
    }
    &:hover svg {
      path {
        fill: #F7F7F7;
      }
    }
    &--disabled:hover svg {
      path {
        fill: var(--overlay-4-color);
      }
    }
    svg {
      width: 18px;
      height: 18px;
      path {
        fill: var(--overlay-2-color);
      }
    }
    &--disabled svg {
      path {
        fill: var(--overlay-4-color);
      }
    }
  }
}
.nav-dots {
  margin-top: 24px;
  display: flex;
  &__dot {
    margin: 0 4px;
    padding: 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: none;
    background-color: var(--overlay-3-color);
    cursor: pointer;
    &[data-active] {
      background-color: var(--overlay-1-color);
    }
  }
}
// .pie-chart__status-name.skeleton-loader {
//   font-size: 0;
//   width: 100px;
//   height: 20px;
// }
</style>
