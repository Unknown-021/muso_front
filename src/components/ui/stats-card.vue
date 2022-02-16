<template>
  <article @click="trendsRoute" class="stats-card">
    <div class="stats-card__content">
      <div class="stats-card__inner">
        <apps-list :apps="sourceData.apps" class="stats-card__apps" />

        <h3 class="stats-card__title">{{ sourceData.title }}</h3>
        <p class="stats-card__text">
          <strong v-if="loading" class="stats-card__value skeleton-loader"></strong>
          <strong v-else-if="value" class="stats-card__value">{{ value | NumberFilter(true) }}</strong>
          <strong v-else class="stats-card__value">-</strong>
          <span v-if="loading" class="stats-card__pct skeleton-loader" />
          <base-percentage v-if="percentage && !loading" :value="percentage" class="stats-card__pct" />
        </p>
      </div>
    </div>
  </article>
</template>

<script>
import AppsList from './apps-list.vue';
import BasePercentage from './base-percentage/base-percentage.vue';
import { sourceData } from './stats-card.data';

const sources = ['streams', 'shazams', 'playlistsReach', 'tiktokViews', 'playlists', 'charts'];

export default {
  name: 'stats-card',
  components: {
    AppsList,
    BasePercentage
  },
  props: {
    source: {
      type: String,
      required: true,
      validator: value => sources.includes(value)
    },
    value: {
      type: Number,
      default: 0
    },
    percentage: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    sourceData() {
      return sourceData[this.source];
    },
    id() {
      return this.$route.params.id
    }
  },
  methods: {
    trendsRoute() {
      this.$store.commit('analytics/trends/setStatsProperty', this.source);
      this.$router.push({ 
        name: 'analytics-trends',
        params: {
          id: this.id
        }
      })
    }
  }
}
</script>

<style lang="scss">

.stats-card {
  position: relative;
  height: 172px;
  width: 100%;
  min-width: 160px;
  background-color: var(--base-1-color);
  color: var(--overlay-1-color);
  background: #000;
  background-clip: padding-box; 
  border: solid 1px transparent; 
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    border-color: var(--base-5-color);
  }
  &__content {
    display: flex;
    padding-top: calc(100% - 5px);
  }
  &__inner {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    padding: 12px;
    background-color: rgba(23, 22, 21, 1);
    border-radius: 4px;
  }
  &__title {
    margin-top: 48px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.4;
    color: var(--overlay-2-color);
  }
  &__text {
    margin-top: 5px;
    padding-bottom: 12px;
    padding-top: 4px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
  }
  &__value {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.4;

  }
  &__value.skeleton-loader {
    width: 62px;
    height: 33px;
    border-radius: 4px;
  }
  &__pct.skeleton-loader {
    width: 56px;
    height: 16px;
    border-radius: 4px;
  }
  &:nth-of-type(5) &__title {
        margin-top: 12px;
  }
  &:nth-of-type(6) &__title {
        margin-top: 12px;
  }
}

</style>
