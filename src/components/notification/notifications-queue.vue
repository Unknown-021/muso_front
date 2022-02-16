<template>
  <div class="notifs-queue" @mouseenter="stopTimers" @mouseleave="releaseTimers">
    <transition-group
      tag="div"
      name="notif-slide-in"
      @before-leave="updateHeight"
      @after-leave="cleanHeight"
    >
      <template v-for="item in queue">
        <notification-factory
          :key="item.id"
          :notification="item"
          type="alert"
          @click="markAsRead"
          @close="remove(item)"
        />
      </template>
    </transition-group>
  </div>
</template>

<script>
import NotificationFactory from './notification-factory.vue';
import { TimeoutManager } from 'helpers/timeout-manager';
import { removeArrayElement } from 'helpers/array';

const NOTIFICATION_TIMEOUT = 5000;

export default {
  name: 'notifications-queue',
  components: {
    NotificationFactory
  },
  data() {
    return {
      queue: [],
      timeoutManager: new TimeoutManager(),
      timersMap: {}
    };
  },
  beforeDestroy() {
    this.timeoutManager.clear();
  },
  computed: {
    notifications() {
      return this.$store.getters['notification/list'];
    }
  },
  methods: {
    add(notification) {
      this.queue.push(notification);
      this.addTimer(notification, this.remove, NOTIFICATION_TIMEOUT);
    },
    remove(notification) {
      removeArrayElement(this.queue, notification);
      this.removeTimer(notification);
    },
    addTimer(notification, handler, timeout) {
      const timer = this.timeoutManager.add(handler, timeout, notification);
      this.timersMap[notification.id] = timer;
    },
    removeTimer(notification) {
      const timer = this.timersMap[notification.id];
      this.timeoutManager.remove(timer);
      delete this.timersMap[notification.id];
    },
    stopTimers() {
      this.timeoutManager.freeze();
    },
    releaseTimers() {
      this.timeoutManager.release();
    },
    markAsRead() {
      this.$store.dispatch('notification/markAsRead');
    },
    updateHeight() {
      this.$el.style.height = this.$el.clientHeight + 'px';
    },
    cleanHeight() {
      this.$el.style.height = '';
    }
  }
}
</script>

<style lang="scss">
.notifs-queue {
  width: var(--notification-max-width);
}

.notif-slide-in {
  &-enter-active,
  &-leave-to,
  &-move {
    transition: transform 300ms ease-in-out !important;
  }
  &-enter,
  &-leave-to {
    transform: translateX(100%);
  }
  &-leave-active {
    position: absolute;
  }
}
</style>