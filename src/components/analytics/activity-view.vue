<template>
  <div
    class="activity-view"
    v-infinite-scroll="loadMoreData"
    infinite-scroll-disabled="isInfiniteScrollDisabled"
    infinite-scroll-distance="200"
  >
    <template v-for="group in labeledActivityGroups">
      <div :key="group.label">
        <p class="activity-view__date">{{ group.label }}</p>
        <template v-for="item in group.items" >
          <activity-item :key="item.id" :activity="item" :loading="loading" :activity-type="activityType" />
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import ActivityItem from './activity-item.vue';
import { isTheSameDay } from 'helpers/date';

export default {
  name: 'activity-view',
  components: {
    ActivityItem
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object,
      required: true
    },
    disableInfiniteScroll: {
      type: Boolean,
      default: false
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
    activityGroups() {
      const groups = [];

      this.data.forEach(item => {
        let lastGroup = groups[groups.length - 1];
        if (lastGroup?.date !== item.date) {
          lastGroup = {
            date: item.date,
            items: []
          }
          groups.push(lastGroup);
        }

        lastGroup.items.push(item);
      });

      return groups;
    },
    labeledActivityGroups() {
      const today = new Date();

      return this.activityGroups.map(({ date, items }) => {
        const dateObj = new Date(date);
        const label = isTheSameDay(today, dateObj) ? 'Today' : this.$date(dateObj);

        return { label, items };
      });
    },
    isInfiniteScrollDisabled() {
      const isEventListenerSet = ('load-more' in this.$listeners);
      return this.disableInfiniteScroll || this.loading || !isEventListenerSet || this.inactive;
    },
  },
  methods: {
    sourceLogo({ type }) {
      return sourceLogoMap[type] || type;
    },
    loadMoreData() {
      this.$emit('load-more');
    }
  }
}
</script>

<style lang="scss">
.activity-view {
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 798px;
  padding: 0 16px;
  &::-webkit-scrollbar {
    display: none;
  }
  &__date {
    margin-top: 16px;
    margin-bottom: 16px;
    padding-left: 0 16px;
    display: flex;
    align-items: center;
    padding-left: 45px;
    line-height: 1.4;
    color: var(--overlay-3-color);
    &::after {
      content: "";
      margin-left: 8px;
      width: 0;
      height: 1px;
      flex-grow: 1;
      background-color: var(--overlay-4-color);
    }
  }
}
</style>
