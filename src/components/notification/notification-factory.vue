<template>
  <component :is="component" :notification="notification" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
import NotificationTypes from './types/types';

export default {
  name: 'notification-factory',
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  computed: {
    component() {
      return NotificationTypes[this.notification.type];
    }
  }
}
</script>
