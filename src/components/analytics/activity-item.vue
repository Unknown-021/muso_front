<template>
  <div class="activity-item">
    <div class="activity-item__logo-wrap">
      <base-logo-round :name="sourceLogo" width="25px" sizes="25px" />
    </div>
    <activity-card class="activity-item__card" :activity="activity" :activity-type="activityType" />
  </div>
</template>

<script>
import ActivityCard from './activity-card.vue';
import BaseLogoRound from 'components/ui/base-logo-round/base-logo-round.vue';

const sourceLogoMap = {
  'apple_music': 'apple-music',
  'amazon_music': 'amazon-music'
};

export default {
  name: 'activity-item',
  components: {
    ActivityCard,
    BaseLogoRound
  },
  props: {
    activity: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    activityType: {
      type: String,
      required: true
    }
  },
  computed: {
    sourceLogo() {
      const { type } = this.activity.source;
      return sourceLogoMap[type] || type;
    }
  }
}
</script>

<style lang="scss">
.activity-item {
  display: flex;
  align-items: center;
  &__logo-wrap {
    position: relative;
    flex-shrink: 0;
    margin-right: 20px;
    display: flex;
    &::before {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-top: 8px;
      margin-bottom: 8px;
      margin-left: -1px;
      height: 56px;
      width: 0;
      border-left: 1px dashed var(--overlay-4-color);
      @at-root {
        .activity-item:last-child & {
          display: none;
        }
      }
    }
  }
  &__card {
    flex-grow: 1;
  }
  + .activity-item {
    margin-top: 16px;
  }
}
</style>
