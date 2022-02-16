<template>
  <div class="time-period">
    <div class="time-period__list">
      <template v-for="item in periods">
        <time-period-option
          :key="item.key"
          :name="name"
          :option="item"
          :checked="item.value === value"
          @change="select(item)"
        />
      </template>
    </div>
  </div>
</template>

<script>
import TimePeriodOption from './time-period-option.vue';

const periods = [
  { title: '1D', value: '1d' }, 
  { title: '1W', value: '1w' },
  { title: '1M', value: '1m' },
  { title: '3M', value: '3m' },
  { title: '1y', value: '1y' },
  { title: 'YTD', value: 'ytd' },
  { title: 'All', value: 'all' }
];

export default {
  name: 'time-period',
  components: {
    TimePeriodOption
  },
  props: {
    value: {
      type: String,
      default: '1d'
    }
  },
  computed: {
    name() {
      return this._uid;
    },
    periods() {
      return periods;
    }
  },
  methods: {
    select(item) {
      this.$emit('update:value', item.value)
    }
  }
}
</script>

<style lang="scss">
.time-period {
  display: flex;
  align-items: baseline;
  font-weight: 500;
  &__label {
    margin-right: 12px;
    color: var(--overlay-3-color);
  }
  &__list {
    display: flex;
    margin-right: -15px;
    > * {
      margin-right: 12px;
    }
  }
}
</style>