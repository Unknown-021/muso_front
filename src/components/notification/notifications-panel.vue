<template>
  <div
    class="notifs-panel"
    :data-visible="notificationsShown"
    @transitionend.self="update"
  >
    <notifications-center v-if="centerShown" ref="center" class="notifs-panel__center" />
    <notifications-queue ref="queue" class="notifs-panel__queue" />
  </div>
</template>

<script>
import NotificationsCenter from './notifications-center.vue';
import NotificationsQueue from './notifications-queue.vue';
import * as Socket from 'services/socket';
import { onClickOutside } from 'helpers/vue';

export default {
  name: 'notifications-panel',
  components: {
    NotificationsCenter,
    NotificationsQueue
  },
  data() {
    return {
      centerShown: false
    }
  },
  mounted() {
    onClickOutside(this, this.$el, this.hide, { capture: true });

    const on = Socket.componentOn(this);
    on('onPushWebNotifications', this.handlePushNotification);
  },
  watch: {
    notificationsShown(value) {
      if (value) {
        this.update();
      }
    }
  },
  computed: {
    notificationsShown() {
      return this.$store.getters['layout/isNotificationsVisible'];
    }
  },
  methods: {
    handlePushNotification(data) {
      this.$refs.queue.add(data);
      this.$store.commit('notification/pushItem', data);
      this.$store.commit('layout/showNotificationsPanel');

    },
    update() {
      this.centerShown = this.notificationsShown;
    },
    hide() {
      this.$refs.center?.hide();
    }
  }
};
</script>

<style lang="scss">
.notifs-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: var(--notifications-center-width);
  height: 100%;
  z-index: 9999;
  transition: transform 300ms ease-in-out;
  transform: translateX(100%);
  &[data-visible] {
    transform: translateX(0);
  }
  &__center {
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0;
    height: 100%;
  }
  &__queue {
    position: absolute;
    $top: 65px;
    top: 65px;
    right: 100%;
    width: calc(var(--notification-max-width) + 15px);
    max-height: calc(100% - #{$top});
    overflow: hidden;
  }
}
</style>