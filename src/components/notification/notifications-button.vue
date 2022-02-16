<template>
  <button class="notifs-btn zero-btn" @click="showNotificationsPanel">
    <bell-icon class="notifs-btn__icon" />
    <transition name="zoom-in">
      <span v-if="hasUnreadNotifications" class="notifs-btn__new" />
    </transition>
  </button>
</template>

<script>
import BellIcon from 'assets/images/icons/bell.svg';

export default {
  name: 'notificatinos-button',
  components: {
    BellIcon
  },
  computed: {
    hasUnreadNotifications() {
      return this.$store.getters['notification/hasUnread'];
    }
  },
  methods: {
    showNotificationsPanel() {
      this.$store.commit('layout/showNotificationsPanel');
    }
  }
}
</script>

<style lang="scss">
.notifs-btn {
  position: relative;
  &__icon {
    width: 19px;
    transition: fill 100ms;
    @at-root {
      .notifs-btn:hover &,
      .notifes-btn:active & {
        fill: #6BE7C8;
      }
    }
  };
  &__new {
    $size: 8px;
    $border-width: 2px;
    position: relative;
    right: -2px;
    align-self: flex-start;
    margin-left: -#{2 * $border-width + $size};
    box-sizing: content-box;
    border: $border-width solid #171615;
    border-radius: 100%;
    width: $size;
    height: $size;
    background-color: #36B696;
  }
}
</style>