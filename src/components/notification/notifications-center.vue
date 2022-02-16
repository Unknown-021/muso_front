<template>
  <aside
    class="notifs-list"
    v-infinite-scroll="loadMoreData"
    infinite-scroll-disabled="infiniteScrollDisabled"
    infinite-scroll-distance="200"
  >
    <div class="notifs-list__header">
      <h2 class="notifs-title">
        Notifications <template v-if="count">({{ count }})</template>
      </h2>
      <close-button class="notifs-list__close-btn" @close="hide" />
    </div>

    <template v-for="group in groupedNotifications">
      <p :key="group.title" class="notifs-list__date">{{ group.title }}</p>
      <template v-for="item in group.items">
        <notification-factory :key="item.id" :notification="item" type="card" />
      </template>
    </template>

    <template v-if="isLoading">
      <skeleton v-if="!count" class="notifs-list__date-loading thin" />
      <template v-for="index in notificationsLeft">
        <notification-skeleton :key="index" />
      </template>
    </template>
  </aside>
</template>

<script>
import CloseButton from 'components/ui/close-button.vue';
import NotificationFactory from './notification-factory.vue';
import NotificationSkeleton from './notification-skeleton.vue';
import { secondsDiff, isTheSameDay } from 'helpers/date';
import Skeleton from 'components/ui/skeleton.vue';

export default {
  name: 'notificatinos-center',
  components: {
    NotificationFactory,
    NotificationSkeleton,
    Skeleton,
    CloseButton
  },
  data() {
    return {
      isScrollDisabled: false
    };
  },
  mounted() {
    if (this.hasUnread) {
      this.markAsRead();
    }
  },
  watch: {
    $route() {
      this.hide();
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters['notification/loading'];
    },
    limit() {
      return this.$store.getters['notification/limit'];
    },
    count() {
      return this.$store.getters['notification/total'];
    },
    hasUnread() {
      return this.$store.getters['notification/hasUnread'];
    },
    hasMoreToLoad() {
      return this.$store.getters['notification/hasMoreToLoad'];
    },
    notificationsLeft() {
      const left = this.count - this.notifications.length;
      return Math.min(left, this.limit) || this.limit;
    },
    notifications() {
      return this.$store.getters['notification/list'];
    },
    infiniteScrollDisabled() {
      return this.isLoading || !this.hasMoreToLoad || this.isScrollDisabled;
    },
    groupedNotifications() {
      const now = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const groups = [{
        title: 'Now',
        criteria: ({ date }) => secondsDiff(now, date) <= 120, // 2 mins
        items: []
      }, {
        title: 'Today',
        criteria: ({ date }) => isTheSameDay(date, now),
        items: []
      }, {
        title: 'Yesterday',
        criteria: ({ date }) => isTheSameDay(date, yesterday),
        items: []
      }, {
        title: 'Earlier',
        criteria: () => true,
        items: []
      }];

      this.notifications.forEach(item => {
        const date = new Date(item.payload.date);
        const group = groups.find(group => group.criteria({ date }));
        group.items.push(item);
      });

      return groups.filter(group => group.items.length > 0);
    }
  },
  methods: {
    async loadMoreData() {
      try {
        this.isScrollDisabled = true;
        await this.$store.dispatch('notification/getMoreList');
      } catch (error) {
        this.$handleError(error);
      } finally {
        this.isScrollDisabled = false;
      }
    },
    async markAsRead() {
      try {
        await this.$store.dispatch('notification/markAsRead');
      } catch (error) {
        this.$handleError(error);
      }
    },
    hide() {
      this.$store.commit('layout/hideNotificationsPanel');
    }
  }
}
</script>

<style lang="scss">
@import "~assets/styles/helpers.abstract";

:root {
  --notifications-center-width: 420px;
}

.notifs-list {
  display: flex;
  flex-direction: column;
  padding: 15px;
  padding-bottom: 40px;
  width: var(--notifications-center-width);
  height: 100vh;
  overflow: auto;
  background-color: #21201F;
  &__header {
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__close-btn {
    margin-left: 15px;
    margin-right: 11px;
  }
  &__date {
    margin-top: 16px;
    margin-bottom: 11px;
    font-size: 14px;
    font-weight: normal;
    color: #8F8F8F;
  }
  &__date-loading {
    flex-shrink: 0;
    margin-top: 20px;
    margin-bottom: 15px;
    --skeleton-color: #313130;
  }
}

.notifs-title {
  font-weight: 500;
  font-size: 20px;
  line-height: 130%;
  color: #F2F2F2;
}
</style>