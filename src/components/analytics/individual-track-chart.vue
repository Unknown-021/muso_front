<template>
  <master-table class="individual-chart" :class="{'activity-chart-height': changeChartHeight}">
    <template #header>
      <master-header>
        <template #title>
          <div v-if="trackDetails" class="track-details">
            <img
              class="song-cover-cell"
              :src="trackDetails.album.avatarUrl"
              width="40"
              height="40"
            />
            <artists-enumeration class="track-details__artist" :artists="artists" :navigable="false" />
            <span class="track-details__separator">/</span>
            <span class="track-details__song-title">{{ trackTitle }}</span>
          </div>
          <div v-else class="track-details__skeleton">
            <div class="track-details__avatar-skeleton skeleton-loader" />
            <div class="track-details__title-skeleton skeleton-loader"/>
          </div>
        </template>
        <template #text>
          <div class="individual-chart__total-streams">
            <span v-if="!isLoading" >{{ $number(totalStreams) }}</span>
            <span v-else :class="{'skeleton-loader mheader-skeleton' : isLoading}" />
            {{ sourceTitle }}
          </div>
        </template>
      </master-header>
    </template>

    <trends-chart
      :period="period"
      :group="group"
      class="chart-table__chart"
      :is-loading="isLoading"
      chart-type="activity"
    />
  </master-table>
</template>

<script>
import MasterTable from 'components/ui/master-table.vue';
import MasterHeader from 'components/ui/master-header.vue';
import FormInlineSelect from 'components/ui/form-inline-select.vue';
import InlineFilters from 'components/ui/inline-filters.vue';
import TrendsChart from './trends-chart.vue';
import { statsPropertySourceMap } from 'store/modules/analytics/constants/stats-property';
import ArtistsEnumeration from 'components/artist/artists-enumeration.vue';

export default {
  name: 'trends-chart-table',
  components: {
    MasterTable,
    MasterHeader,
    InlineFilters,
    TrendsChart,
    FormInlineSelect,
    ArtistsEnumeration
  },
  props: {
    period: {
      type: String,
      required: true
    },
    group: {
      type: String,
      required: true
    },
    selectedSources: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      require: true
    },
    sourceTitle: {
      type: String,
      required: true
    }
  },
  computed: {
    totalStreams() {
      return this.$store.getters['analytics/activity/totalStreams'];
    },
    dataSources() {
      return statsPropertySourceMap['streams'];
    },
    artists() {
      return this.trackDetails.artists.filter(item => item.label === 'artist');
    },
    trackTitle() {
      return this.trackDetails.trackTitle;
    },
    changeChartHeight() {
      return (this.$route.name === 'activity')
    },
    trackDetails() {
      return this.$store.getters['analytics/activity/activityDetails'];
    },
  }
}
</script>

<style lang="scss">
.activity-chart-height {
  --chart-height: 440px;
}
.individual-chart {
  width: 796px;
  margin-right: 16px;
  align-self: flex-start;
  border-radius: 0;
  &__total-streams {
    color: var(--overlay-2-color);
    font-weight: 500;
  }
  & .zero-state-chart {
    top: 20%;
  }
  & .mheader {
    padding: 6px 16px;
    border-radius: 0;
  }
}
.track-details {
  display: flex;
  align-items: center;
  &__artist, &__song-title {
    font-size: 16px;
    font-weight: 500;
    color: var(--overlay-1-color);
  }
  &__artist {
    padding-left: 16px;
  }
  &__song-title {
    padding-left: 4px;
  }
  &__song-title, &__artist {
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    max-width: 256px;
  }
  &__separator {
    padding-left: 4px;
    font-size: 16px;
  }
  &__skeleton {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__avatar-skeleton {
    width: 40px;
    height: 40px;
  }
  &__title-skeleton {
    margin-left: 16px;
    width: 170px;
    height: 16px;
  }
}
.mheader-skeleton {
  position: relative;
  top: 2px;
  display: inline-flex;
  width: 50px;
  height: 12px;
}
</style>
