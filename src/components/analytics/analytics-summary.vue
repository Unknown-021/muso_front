<template>
  <div class="grid grid--stats">
    <template v-for="item in summary">
      <stats-card
        :key="item.source"
        :source="item.source"
        :value="item.value"
        :percentage="item.percentage"
        :loading="loading"
      />
    </template>
  </div>
</template>

<script>
import StatsCard from 'components/ui/stats-card.vue';

export default {
  name: 'analytics-summary',
  components: {
    StatsCard
  },
  props: {
    summary: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss">
:root {
  --grid-gap: 16px;
}
.grid {
  display: grid;
  grid-gap: var(--grid-gap);
  &--stats {
    grid-template-columns: repeat(auto-fill, minmax(165px, 1fr));
  }
  &--half {
    // grid-template-columns: repeat(auto-fill, 1fr);
    // grid-template-columns: 1fr;
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
}
.mt-grid {
  margin-top: var(--grid-gap);
}
</style>