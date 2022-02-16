<template>
  <div class="activity-info">
    <div class="activity-info__cover-container">
      <album-cover :album="activity.artwork" class="activity-info__cover" />
    </div>
    <div class="activity-info__details">
      <interpolated-text :text="activityText">
        <template #songTitle>
          <a @click="navigateToEntity" class="activity-info__title">{{ trackDetails.title }}</a>
        </template>
        <template #sourceTitle>
          <a :href="activity.source.externalUrl" target="_blank">{{ activity.source.title }}</a>
        </template>
        <template #oldPosition="props">
          <span class="strike">{{ activity.oldPosition }}</span>
        </template>
        <template #currentPosition="props">
          <span :class="currPositionClass">{{ activity.currentPosition }}</span>
        </template>
      </interpolated-text>
      <div class="activity-card__meta">
        <template v-for="item in meta">
          <p :key="item.title" class="activity-meta">
            {{ item.title }}: <span class="activity-meta__value">{{ item.value | NumberFilter(true) }}</span>
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import AlbumCover from 'components/collection/album-cover.vue';
import InterpolatedText from 'components/ui/interpolated-text';
import { eventsText } from './activity-info.data';
import { compileText } from './activity-info.utils';
import { songRoute, trackActivityRoute } from 'helpers/routing';
import { generateMeta } from './activity-card.utils';

const eventsTextMap = compileText(eventsText);

const meta = [
  {
    title: 'Followers',
    field: 'followersCount'
  }, {
    title: 'Position',
    field: 'currentPosition'
  }
];

export default {
  name: 'activity-info',
  components: {
    AlbumCover,
    InterpolatedText
  },
  props: {
    activity: {
      type: Object,
      required: true
    },
    full: {
      type: Boolean,
      default: false
    },
    activityType: {
      type: String,
      required: true
    }
  },
  computed: {
    activityText() {
      const { text, fullText } = eventsTextMap[this.activity.event];
      return this.full && fullText ? fullText : text;
    },
    songRoute() {
      return songRoute(this.activity.song);
    },
    currPositionClass() {
      const { currentPosition, oldPosition } = this.activity;

      return {
        'mark': true,
        'mark--danger': currentPosition > oldPosition
      };
    },
    trackDetails() {
      return this.$store.getters[`analytics/activityOverview/${this.activityType}TrackDetails`];
    },
    meta() {
      return generateMeta(this.activity, meta);
    }
  },
  methods: {
    navigateToEntity() {
      this.$router.push(trackActivityRoute(this.trackDetails));
    }
  }
}
</script>

<style lang="scss">
.activity-info {
  display: flex;
  align-items: center;
  color: var(--overlay-2-color);
  &__cover {
    --album-cover-size: 40px;
    margin-right: 12px;
  }
  &__title {
    color: var(--overlay-1-color);
    font-weight: 500;
  }
  a {
    color: var(--overlay-1-color);
  }
}
.activity-card {
  &__meta {
    display: flex;
    > * {
      margin-right: 22px;
    }
  }
}
.activity-meta {
  display: block;
  line-height: 1.3;
  font-weight: 500;
  white-space: nowrap;
  color: var(--overlay-2-color);
  padding-top: 4px;
  &__value {
    color: var(--overlay-1-color);
  }
}
</style>
